import pandas as pd
import json

df = pd.read_csv('symptomsMapped.csv')
df.to_json(r'symptomsMapped.json')