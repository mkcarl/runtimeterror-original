import os
import json
import sys
#import xlrd
import pandas as pd
import numpy as np
import pickle
import base64
import io
# Gmail API utils
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
# for encoding/decoding messages in base64
from base64 import urlsafe_b64decode, urlsafe_b64encode
# for dealing with attachement MIME types
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from mimetypes import guess_type as guess_mime_type
# IMPORTs for data manipulation
from base64 import urlsafe_b64decode
import email

# Request all access (permission to read/send/receive emails, manage the inbox, and more)
SCOPES = ['https://mail.google.com/']
our_email = 'runtimeterrorh2h@gmail.com'

# Does the authentication with Gmail API and returns a service object
def gmail_authenticate():
    creds = None
    # the file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first time
    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)
    # if there are no (valid) credentials availablle, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # save the credentials for the next run
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)
    return build('gmail', 'v1', credentials=creds)

# SEARCHING FOR UNREAD EMAILS
def search_messages(service, query):

    result = service.users().messages().list(userId='me',q=query, labelIds='UNREAD').execute()
    messages = [ ]
    if 'messages' in result:
        messages.extend(result['messages'])
    while 'nextPageToken' in result:
        page_token = result['nextPageToken']
        result = service.users().messages().list(userId='me',q=query, pageToken=page_token).execute()
        if 'messages' in result:
            messages.extend(result['messages'])

    # MARK EMAIL AS READ
    try:
        service.users().messages().batchModify(
        userId='me',
        body={
            'ids': [ msg['id'] for msg in messages],
            'removeLabelIds': ['UNREAD']
        }
        ).execute()
    except:
        pass

    return messages


# READ EMAILS
# utility functions
def get_size_format(b, factor=1024, suffix="B"):
    """
    Scale bytes to its proper byte format
    e.g:
        1253656 => '1.20MB'
        1253656678 => '1.17GB'
    """
    for unit in ["", "K", "M", "G", "T", "P", "E", "Z"]:
        if b < factor:
            return f"{b:.2f}{unit}{suffix}"
        b /= factor
    return f"{b:.2f}Y{suffix}"


def clean(text):
    # clean text for creating a folder
    return "".join(c if c.isalnum() else "_" for c in text)

# Convert downloaded orders as json format
def excel_to_json(filepath, filename):
    excel_data_fragment = pd.read_excel(os.getcwd()+"\\"+filepath)
    json_str = excel_data_fragment.to_json()
    return json_str

def get_database():
    return

def extract_excel_to_json(filepath, filename):
    df = pd.read_excel(os.getcwd()+"\\"+filepath)
    print(df.head())

    # Preprocessing
    # Will be dropping any invalid data 
    try:
        # Replace 0 as NaN in quantity
        df['Quantity'] = df['Quantity'].replace(0, np.NaN)

        # Convert all values of Quantity into numeric
        # If user input char it will convert into NaN
        df['Quantity'] = pd.to_numeric(df["Quantity"])

        # Drop all rows with NaN
        df = df.dropna()

        # Reset index number
        df.reset_index(drop=True)


        #compare id ID and name is existed in the database
        for i in len(df):
            flag = False
            # if df.at[i,"Inventory ID"] not in dict
            #   df = df.drop(df.index[i])

    finally:
        json_str = df.to_json()
        return json_str


def parse_parts(service, parts, folder_name, message, jsdata):
    """
    Utility function that parses the content of an email partition
    """
    if parts:
        for part in parts:
            filename = part.get("filename")
            mimeType = part.get("mimeType")
            body = part.get("body")
            data = body.get("data")
            file_size = body.get("size")
            part_headers = part.get("headers")
            if part.get("parts"):
                # recursively call this function when we see that a part
                # has parts inside
                parse_parts(service, part.get("parts"), folder_name, message, jsdata)
            if mimeType == "text/plain":
                # if the email part is text plain
                if data:
                    text = urlsafe_b64decode(data).decode()
                    print(text)
                    jsdata["Body"] = text
            elif mimeType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                # if the email part is an xlsx content
                # save the xlsx file
                if not filename:
                    filename = "index.xlsx"
                # Step I - Getting the attachment
                attachment_id = body.get("attachmentId")
                attachment = service.users().messages() \
                            .attachments().get(id=attachment_id, userId='me', messageId=message['id']).execute()
                data = attachment.get("data")
                filepath = os.path.join(folder_name, filename)
                print("Saving xlsx to", filepath)

                # Step II - Manipulating the data
                bytesFile = base64.urlsafe_b64decode(data.encode('UTF-8'))
                if bytesFile[0:2] != b'PK':
                    raise ValueError('The attachment is not a XLSX file!')
                message = email.message_from_bytes(bytesFile)

                # Step III - Storing the file
                with open(filepath, "wb") as f:
                    f.write(message.get_payload(decode=True))

                jsdata["RawOrderData"] = excel_to_json(filepath,filename)

                jsdata["OrderItem"] = extract_excel_to_json(filepath,filename)



            else:
                # attachment other than a plain text or xlsx
                for part_header in part_headers:
                    part_header_name = part_header.get("name")
                    part_header_value = part_header.get("value")
                    if part_header_name == "Content-Disposition":
                        if "attachment" in part_header_value:
                            # we get the attachment ID 
                            # and make another request to get the attachment itself
                            print("Saving the file:", filename, "size:", get_size_format(file_size))
                            attachment_id = body.get("attachmentId")
                            attachment = service.users().messages() \
                                        .attachments().get(id=attachment_id, userId='me', messageId=message['id']).execute()
                            data = attachment.get("data")
                            filepath = os.path.join(folder_name, filename)
                            if data:
                                with open(filepath, "wb") as f:
                                    f.write(urlsafe_b64decode(data))


def read_message(service, message):
    """
    This function takes Gmail API `service` and the given `message_id` and does the following:
        - Downloads the content of the email
        - Prints email basic information (To, From, Subject & Date) and plain/text parts
        - Creates a folder for each email based on the subject
        - Downloads text/xlsx content (if available) and saves it under the folder created as index.xlsx
        - Downloads any file that is attached to the email and saves it in the folder created
    """
    msg = service.users().messages().get(userId='me', id=message['id'], format='full').execute()
    # parts can be the message body, or attachments
    payload = msg['payload']
    headers = payload.get("headers")
    parts = payload.get("parts")
    folder_name = "email"
    has_subject = False
    jsdata = {}
    if headers:
        # this section prints email basic info & creates a folder for the email
        for header in headers:
            name = header.get("name")
            value = header.get("value")
            if name.lower() == 'from':
                # we print the From address
                print("From:", value)
                jsdata['CompanyName'] = value
            if name.lower() == "to":
                # we print the To address
                print("To:", value)
            if name.lower() == "subject":
                # make our boolean True, the email has "subject"
                has_subject = True
                # make a directory with the name of the subject
                folder_name = clean(value)
                # we will also handle emails with the same subject name
                folder_counter = 0
                while os.path.isdir(folder_name):
                    folder_counter += 1
                    # we have the same folder name, add a number next to it
                    if folder_name[-1].isdigit() and folder_name[-2] == "_":
                        folder_name = f"{folder_name[:-2]}_{folder_counter}"
                    elif folder_name[-2:].isdigit() and folder_name[-3] == "_":
                        folder_name = f"{folder_name[:-3]}_{folder_counter}"
                    else:
                        folder_name = f"{folder_name}_{folder_counter}"
                os.mkdir(folder_name)
                print("Title:", value)
                jsdata['Title'] = value
            if name.lower() == "date":
                # we print the date when the message was sent
                print("Date:", value)
                jsdata["date"] = value

    if not has_subject:
        # if the email does not have a subject, then make a folder with "email" name
        # since folders are created based on subjects
        if not os.path.isdir(folder_name):
            os.mkdir(folder_name)
    parse_parts(service, parts, folder_name, message, jsdata)
    print(jsdata)
    print("="*50)
    return jsdata


# get the Gmail API service
service = gmail_authenticate()

def get_new_emails():
    """
    This function will ignore emails that have already been read
    """
    # get emails that match the query you specify
    results = search_messages(service, "[Order]")
    
    jsdata_list = []
    # for each email matched, read it (output plain/text to console & save HTML and attachments)
    for msg in results:
        jsdata_list.append(read_message(service, msg))
    
    return jsdata_list
