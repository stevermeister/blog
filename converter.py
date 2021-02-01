from pathlib import Path
from transliterate import translit, get_available_language_codes
import re 

def has_cyrillic(text):
    return bool(re.search('[а-яА-Я]', text))

def getFileName(filepath):
    return filepath.split('/')[-1][:-3]

files = list(Path(".").rglob("*.md"))
files = list(map(lambda x: str(x), files))
files = [filepath for filepath in files if has_cyrillic(filepath)]
files = list(map(lambda x: getFileName(x), files))
files = list(map(lambda x: translit(x, 'ru', reversed=True), files))


print(files)

slug_string = "slugs: \n - rabota_apple"

