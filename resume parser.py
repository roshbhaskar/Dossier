
import sys
sys.path.append('c:/users/arjun/onedrive/desktop/capstone project/notebooks/env/lib/site-packages')

from pdfminer.high_level import extract_text
import nltk as nltk
import re
import subprocess
from pandas import *
# import requests


PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
EMAIL_REG = re.compile(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+')


def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)



# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('maxent_ne_chunker')
# nltk.download('words')
# nltk.download('stopwords')

skillsDB = read_csv("all_skills.csv")
SKILLS_DB = skillsDB['skill_name'].tolist()


'''
SKILLS_DB = [
    'machine learning',
    'data science',
    'python',
    'word',
    'excel',
    'English',
    'c++',
    'c',
    'MySql',
    'Flask',
    'Django',
    'css',
    'Algorithms',
    'java',
]
'''

RESERVED_WORDS = [
    'school',
    'college',
    'univers',
    'academy',
    'faculty',
    'institute',
    'faculdades',
    'Schola',
    'schule',
    'lise',
    'lyceum',
    'lycee',
    'polytechnic',
    'kolej',
    'ünivers',
    'okul',
]


def extract_names(txt):
    person_names = []
    
    for sent in nltk.sent_tokenize(txt):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'PERSON':
                person_names.append(
                    ' '.join(chunk_leave[0] for chunk_leave in chunk.leaves())
                )

    return person_names


def extract_phone_number(resume_text):
    phone = re.findall(PHONE_REG, resume_text)

    if phone:
        number = ''.join(phone[0])

        if resume_text.find(number) >= 0 and len(number) < 16:
            return number
    return None



def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)




def extract_skills(input_text):
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = nltk.tokenize.word_tokenize(input_text)

    # remove the stop words
    filtered_tokens = [w for w in word_tokens if w not in stop_words]

    # remove the punctuation
    filtered_tokens = [w for w in word_tokens if w.isalpha()]

    # generate bigrams and trigrams (such as artificial intelligence)
    bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))

    # we create a set to keep the results in.
    found_skills = set()

    # we search for each token in our skills database
    for token in filtered_tokens:
        if token.lower() in SKILLS_DB:
            found_skills.add(token)

    # we search for each bigram and trigram in our skills database
    for ngram in bigrams_trigrams:
        if ngram.lower() in SKILLS_DB:
            found_skills.add(ngram)

    return found_skills






'''

USING SKILLS API

'''

# def skill_exists(skill):
#     url = f'https://api.promptapi.com/skills?q={skill}&count=1'
#     headers = {'apikey': 'eP1Vl10xe9ECZgdzM0ITpQ8ucyNIPX2T'}
#     response = requests.request('GET', url, headers=headers)
#     result = response.json()

#     if response.status_code == 200:
#         return len(result) > 0 and result[0].lower() == skill.lower()
#     raise Exception(result.get('message'))


# def extract_skills(input_text):
#     stop_words = set(nltk.corpus.stopwords.words('english'))
#     word_tokens = nltk.tokenize.word_tokenize(input_text)

#     # remove the stop words
#     filtered_tokens = [w for w in word_tokens if w not in stop_words]

#     # remove the punctuation
#     filtered_tokens = [w for w in word_tokens if w.isalpha()]

#     # generate bigrams and trigrams (such as artificial intelligence)
#     bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))

#     # we create a set to keep the results in.
#     found_skills = set()

#     # we search for each token in our skills database
#     for token in filtered_tokens:
#         if skill_exists(token.lower()):
#             found_skills.add(token)

#     # we search for each bigram and trigram in our skills database
#     for ngram in bigrams_trigrams:
#         if skill_exists(ngram.lower()):
#             found_skills.add(ngram)

#     return found_skills



def extract_education(input_text):
    organizations = []

    # first get all the organization names using nltk
    for sent in nltk.sent_tokenize(input_text):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'ORGANIZATION':
                organizations.append(' '.join(c[0] for c in chunk.leaves()))

    # we search for each bigram and trigram for reserved words
    # (college, university etc...)
    education = set()
    for org in organizations:
        for word in RESERVED_WORDS:
            if org.lower().find(word) >= 0:
                education.add(org)

    return education


if __name__ == '__main__':
    text = extract_text_from_pdf("resume.pdf")
    # print(text)
    names = extract_names(text)
    if names:
        print(names[0]) 
    
    phone_number = extract_phone_number(text)

    print(phone_number)

    emails = extract_emails(text)

    if emails:
        print(emails[0]) 
    
    skills = extract_skills(text)

    print(skills)  

    education_information = extract_education(text)

    print(education_information)
