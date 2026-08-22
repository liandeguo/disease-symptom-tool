// server side
import conditionsJson from './index.json' with { type: 'json' };
import symptomsJson from './symptomsIndex.json' with { type: 'json' };
import Fuse from 'fuse.js';

interface ConditionRecord {
	id: number;
	name: string;
	icd_10: string;
	symptoms: { symptom: string; percentage: number }[];
	commonTestProcedures?: string[];
	commonMedication?: string[];
}

interface SymptomRecord {
	symptom: string;
	id: number[];
	icd_10_name?: string;
	icd_10?: string;
}

export interface ClinicalTrial {
	protocolSection?: {
		identificationModule?: {
			nctId?: string;
			officialTitle?: string;
			organization?: { fullName?: string };
		};
		statusModule?: {
			startDateStruct?: { date?: string };
			primaryCompletionDateStruct?: { date?: string };
		};
		designModule?: { enrollmentInfo?: { count?: number } };
	};
}

export interface ResolvedCondition extends ConditionRecord {
	summary: string | null;
	clinicalTrials: ClinicalTrial[];
	icdStructure: [string, string][];
}

export interface ResolvedSymptom extends SymptomRecord {
	summary: string | null;
}

const conditions = conditionsJson as ConditionRecord[];
const symptoms = symptomsJson as SymptomRecord[];

const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;

const responseCache = new Map<string, { expires: number; value: unknown }>();

async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
	const hit = responseCache.get(key);
	if (hit && hit.expires > Date.now()) {
		return hit.value as T;
	}

	const value = await load();
	responseCache.set(key, { expires: Date.now() + CACHE_TTL_MS, value });

	if (responseCache.size > CACHE_MAX_ENTRIES) {
		for (const [k, entry] of responseCache) {
			if (entry.expires <= Date.now()) responseCache.delete(k);
		}
	}
	return value;
}

async function getJson(url: string): Promise<unknown> {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(8_000) });
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
}

function normalizeName(name: string) {
	return name.toLowerCase().replace(/\s+/g, '_');
}

async function wikipediaAPI(term?: string): Promise<string | null> {
	if (!term) return null;

	return cached(`wiki:${term}`, async () => {
		const data = (await getJson(
			'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(term)
		)) as { extract?: string } | null;
		return data?.extract ?? null;
	});
}

async function clinicalTrialsAPI(conditionName?: string): Promise<ClinicalTrial[]> {
	if (!conditionName) return [];

	return cached(`trials:${conditionName}`, async () => {
		const url =
			'https://clinicaltrials.gov/api/v2/studies?format=json&query.cond=' +
			encodeURIComponent(conditionName) +
			'&filter.overallStatus=ACTIVE_NOT_RECRUITING&sort=%40relevance&pageSize=3';
		const data = (await getJson(url)) as { studies?: ClinicalTrial[] } | null;
		return data?.studies ?? [];
	});
}

async function clinicalTablesAPI(icdCode?: string): Promise<[string, string][]> {
	if (!icdCode) return [];

	return cached(`icd:${icdCode}`, async () => {
		const url =
			'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=' +
			encodeURIComponent(icdCode.split('.')[0]);
		const data = await getJson(url);
		const rows = Array.isArray(data) ? (data[data.length - 1] as unknown) : null;
		return Array.isArray(rows) ? (rows as [string, string][]) : [];
	});
}

export async function resolveCondition(slug: string): Promise<ResolvedCondition | null> {
	const condition = conditions.find((c) => normalizeName(c.name) === slug || c.id === Number(slug));

	if (!condition) return null;

	const [summary, clinicalTrials, icdStructure] = await Promise.all([
		wikipediaAPI(condition.name),
		clinicalTrialsAPI(condition.name),
		clinicalTablesAPI(condition.icd_10)
	]);

	return { ...condition, summary, clinicalTrials, icdStructure };
}

export function resolveConditionName(
	query: string | number,
	symptom?: string
): { id: number; name: string; icd_10: string; symptom?: number } | null {
	const condition = conditions.find(
		(c) => normalizeName(c.name) === query || c.id === Number(query)
	);

	if (!condition) return null;

	if (symptom != null) {
		return {
			id: condition.id,
			name: condition.name,
			icd_10: condition.icd_10,
			symptom: condition.symptoms.find((s) => s.symptom === symptom)?.percentage
		};
	}
	return { id: condition.id, name: condition.name, icd_10: condition.icd_10 };
}

export async function resolveSymptom(slug: string): Promise<ResolvedSymptom | null> {
	const symptom = symptoms.find(
		(s) =>
			normalizeName(s.symptom) === slug ||
			(s.icd_10_name ? normalizeName(s.icd_10_name) === slug : false)
	);

	if (!symptom) return null;

	const summary = await wikipediaAPI(symptom.symptom);
	return { ...symptom, summary };
}

const fuseConditions = new Fuse(conditions, {
	keys: [
		{ name: 'name', weight: 0.7 },
		{ name: 'icd_10', weight: 0.7 }
	],
	threshold: 0.4,
	includeScore: true,
	ignoreLocation: true,
	useExtendedSearch: true
});

const fuseSymptoms = new Fuse(symptoms, {
	keys: [
		{ name: 'symptom', weight: 0.7 },
		{ name: 'icd_10_name', weight: 0.7 },
		{ name: 'icd_10', weight: 0.7 }
	],
	threshold: 0.4,
	includeScore: true,
	ignoreLocation: true,
	useExtendedSearch: true
});

export interface ConditionSearchResult {
	id: number;
	name: string;
	icd_10: string;
	relevance: number;
}

export interface SymptomSearchResult {
	symptom: string;
	icd_10_name?: string;
	icd_10?: string;
	relevance: number;
}

export function searchConditions(query: string, limit = 10): ConditionSearchResult[] {
	if (!query || query.trim().length < 2) {
		return [];
	}

	return fuseConditions
		.search(query.trim())
		.slice(0, limit)
		.map(({ item, score }) => ({
			id: item.id,
			name: item.name,
			icd_10: item.icd_10,
			relevance: Math.round((1 - (score || 0)) * 100)
		}));
}

export function searchSymptoms(query: string, limit = 10): SymptomSearchResult[] {
	if (!query || query.trim().length < 2) {
		return [];
	}

	return fuseSymptoms
		.search(query.trim())
		.slice(0, limit)
		.map(({ item, score }) => ({
			symptom: item.symptom,
			icd_10_name: item.icd_10_name,
			icd_10: item.icd_10,
			relevance: Math.round((1 - (score || 0)) * 100)
		}));
}
