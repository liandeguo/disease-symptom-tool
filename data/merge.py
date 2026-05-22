import pandas as pd
import json

with open('clean_dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

df_json = pd.DataFrame(data)

print(f"Loaded {len(df_json)} records from JSON")
print("JSON columns:", df_json.columns.tolist())

df_csv = pd.read_csv('icd.csv')
df_csv = df_csv[['icd_10', 'id']]
print(f"Loaded {len(df_csv)} records from CSV")
print("CSV columns:", df_csv.columns.tolist())

df_merged = df_json.merge(df_csv, on='id', how='left')

print(f"Merged result: {len(df_merged)} records")

with open('data_enriched.json', 'w', encoding='utf-8') as f:
    json.dump(df_merged.to_dict(orient='records'), f, indent=2, ensure_ascii=False)
