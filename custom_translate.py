import json

"""generate json based on txt file
 string are presented in format key:value 
 key is the name of the field in the json
    value is the value of the field
 result saved to {file_name}.json
 """


def generate_json(file_name):
    with open(file_name, 'r') as f:
        lines = f.readlines()
        json_dict = {}
        for line in lines:
            line = line.strip()
            key, value = line.split(':')
            json_dict[key] = value
        with open(file_name + '.json', 'w') as f:
            json.dump(json_dict, f, indent=4)
