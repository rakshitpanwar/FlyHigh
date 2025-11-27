import json
import re

notebook_path = '/Users/rakshit/Desktop/Codes/FlyHigh/machine-learning-project-flight-price-prediction.ipynb'

def parse_notebook(path):
    with open(path, 'r', encoding='utf-8') as f:
        nb = json.load(f)

    cells = nb.get('cells', [])
    
    relevant_content = []
    
    keywords = ['read_csv', 'read_excel', 'LabelEncoder', 'get_dummies', 'drop', 'replace', 'map']
    
    for cell in cells:
        source = cell.get('source', [])
        if isinstance(source, str):
            source = [source]
        
        text = ''.join(source)
        
        # Check if any keyword is in the cell content
        if any(kw.lower() in text.lower() for kw in keywords):
            relevant_content.append(f"--- CELL TYPE: {cell['cell_type']} ---\n{text}\n")

    return "\n".join(relevant_content)

print(parse_notebook(notebook_path))
