from pathlib import Path
from transliterate import translit, get_available_language_codes
import re 
import os


def has_cyrillic(text):
    return bool(re.search('[а-яА-Я]', text))

def getFileName(filepath):
    return filepath.split('/')[-1][:-3]

def addSlugToFile(filepath, slug):
    slug_string = f"slug: \"{slug}\"\n"
    reader = open(filepath, 'r')
    content = reader.read()
    parts = content.split('---')
    parts[1] += slug_string
    reader.close()
    writer = open(filepath, 'w')
    writer.write('---'.join(parts))  
    writer.close()


files = list(Path(".").rglob("*.md"))
files = list(map(lambda x: str(x), files))
files = [filepath for filepath in files if has_cyrillic(filepath)]

for filepath in files:
   ru_filename = getFileName(filepath)
   addSlugToFile(filepath, ru_filename)
   en_filepath = filepath.replace(ru_filename, translit(ru_filename, 'ru', reversed=True))
   os.rename(filepath,en_filepath)




