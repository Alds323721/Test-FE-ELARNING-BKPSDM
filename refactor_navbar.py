import os
import glob
import re

directory = r'c:\Users\Lenovo\Downloads\Latihan-BKPSDM\Test-BKPSDM\src\Admin-Komunitas'
files = glob.glob(os.path.join(directory, '*.jsx'))

settings_btn_regex = re.compile(r'<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">\s*<Settings className="w-5 h-5" />\s*</button>', re.DOTALL)
ui_avatar_regex = re.compile(r'"https://ui-avatars\.com/api/\?name=Admin[^"]*"')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    if '<Settings' in content:
        content = settings_btn_regex.sub('', content)
        modified = True
        
    if 'ui-avatars.com' in content:
        content = ui_avatar_regex.sub('{userImg}', content)
        modified = True
        
    if modified:
        if 'import userImg' not in content:
            content = content.replace('import React', "import userImg from '../assets/user.png';\nimport React", 1)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Modified {file}')
