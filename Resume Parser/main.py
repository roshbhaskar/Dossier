import name
import phone
import rp_email
import skills

import sys
#pip3 install pdfminer.six
from pdfminer.high_level import extract_text


def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)


    
if __name__ == '__main__':
    text = extract_text_from_pdf('resume.pdf')
    names = name.extract_names(text)

    if names:
        print("Name: ",names[0])

    phone_number = phone.extract_phone_number(text)

    print("Phone: ",phone_number)

    emails = rp_email.extract_emails(text)

    if emails:
        print("email: ",emails[0])
    
    skills = skills.extract_skills(text)

    print("Skills: \n", skills)