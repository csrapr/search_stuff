import os
import json

def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]
    else:
        d['type'] = "file"
    return d

raw_data = json.loads(json.dumps(path_to_dict('websites/')))
websites = raw_data["children"]

if not os.path.exists("register.json"):
  with open("register.json", "w") as file:
    json.dump(websites, file)
else:
  with open("register.json", 'w') as file:
    json.dump(websites, file)