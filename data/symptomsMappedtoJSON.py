import csv
import json
import re
from typing import List, Dict

def parse_symptoms_csv_to_json(csv_file_path: str, output_json_path: str = None):

    results = []
    
    with open(csv_file_path, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        
        next(reader, None)
        
        for row in reader:
            if not row or len(row) < 4:
                continue
                
            symptom = row[0].strip()
            id_str = row[1].strip()
            icd_name = row[2].strip()
            icd_code = row[3].strip()
            
            id_list = []
            if id_str.startswith('[') and id_str.endswith(']'):
                numbers = id_str[1:-1].strip()
                if numbers:
                    id_list = [int(x.strip()) for x in numbers.split(',') if x.strip().isdigit()]
            
            entry = {
                "symptom": symptom,
                "id": id_list,
                "icd_10_name": icd_name,
                "icd_10": icd_code
            }
            
            results.append(entry)
    
    if output_json_path:
        with open(output_json_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

    
    return results


if __name__ == "__main__":
    input_file = "symptomsMapped.csv"
    output_file = "symptomsMapped.json"
    
    data = parse_symptoms_csv_to_json(input_file, output_file)
    
    if data:
        print("\nFirst entry example:")
        print(json.dumps(data[0], indent=2))