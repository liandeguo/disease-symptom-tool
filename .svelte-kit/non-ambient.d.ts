
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/search" | "/conditions" | "/conditions/[slug]" | "/symptoms" | "/symptoms/[slug]";
		RouteParams(): {
			"/conditions/[slug]": { slug: string };
			"/symptoms/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/api": Record<string, never>;
			"/api/search": Record<string, never>;
			"/conditions": { slug?: string };
			"/conditions/[slug]": { slug: string };
			"/symptoms": { slug?: string };
			"/symptoms/[slug]": { slug: string }
		};
		Pathname(): "/" | "/api/search" | `/conditions/${string}` & {} | `/symptoms/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}