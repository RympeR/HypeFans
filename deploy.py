import os
import sys
import shutil

if sys.platform == 'win32':
    comands = [
        'cd D:\develop\pypr\HypeFans',
        'venv\Scripts\activate',
        'cd frontend',
        'yarn build',
        'rmdir -r ../build',
        'mv -Force build ../build',
        'cd ..',
        'cp ./bundle.min.css ./build/static/css/bundle.min.css',
        'update ./build/index.html bundle.min.css',
        'python manage.py collectstatic --no-input',
    ]
    for command in comands:
        print(command)
        if command.startswith('cd'):
            os.chdir(command.split(' ')[-1])
        if command.startswith('update'):
            print('here')
            insert_text = f'''<link href="/static/css/{command.split(' ')[-1]}" rel="stylesheet">'''
            with open(command.split(' ')[1], 'r+', encoding='utf-8') as f:
                text = f.readlines()
                for line in text:
                    if '<title>HypeFans</title>' in line:
                        ind = line.index('</title>') + 8
                        f.seek(ind)
                        f.write(insert_text)
                        # f.truncate()
                        break
        if command.startswith('cp'):
            print(command.split(' ')[-2], command.split(' ')[-1])
            shutil.copyfile(command.split(' ')[-2], command.split(' ')[-1])
        if command.startswith('rmdir'):
            shutil.rmtree(command.split(' ')[-1])
        if command.startswith('mv'):
            shutil.move(command.split(' ')[-2], command.split(' ')[-1])
        else:
            os.system(command)
    print('finished')
