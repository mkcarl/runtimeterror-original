from django.http import HttpResponse
from django.shortcuts import render

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from datetime import date

from backend.email_extractor import get_new_emails

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db=firestore.client()

# Create your views here.
def get_all_employees(request):
    # retrieve all employees data from db
    # employees_ref = db.collection('Employees')
    # inventory_docs = inventory_ref.stream()
    # inventory_list = []
    
    # for doc in inventory_docs:
    #     current_dict = doc.to_dict()
    #     current_dict['id'] = doc.id
    #     inventory_list.append(current_dict)
    
    # inventory_json = json.dumps(inventory_list)
    # return HttpResponse(inventory_json)
    return HttpResponse("Hello")

def get_incoming_emails(request):
    # Get new incoming emails, save them to firebase in json
    # new_emails_list = get_new_emails()

    # if len(new_emails_list) > 0:
    #     emails_json = json.dumps(new_emails_list) 
    #     # TODO: upload emails_json directly to firestore

    # # Get all emails fron firebase, display them
    # emails_ref = db.collection('OrderEmails')
    # emails_docs = emails_ref.stream()
    # emails_list = []

    # for doc in emails_docs:
    #     current_dict = doc.to_dict()
    #     current_dict['id'] = doc.id
    #     emails_list.append(current_dict)
    
    # inventory_json = json.dumps(emails_list)
    # return HttpResponse(inventory_json)
    return HttpResponse("Hello")

def get_an_email(request):
    return HttpResponse("Hello")

def reject(request):
    return HttpResponse("Hello")

def get_inventory(request):
    # retrieve all inventory data from db
    inventory_ref = db.collection('InventoryStock')
    inventory_docs = inventory_ref.stream()
    inventory_list = []
    
    for doc in inventory_docs:
        current_dict = doc.to_dict()
        current_dict['id'] = doc.id
        inventory_list.append(current_dict)
    
    inventory_json = json.dumps(inventory_list)
    return HttpResponse(inventory_json)

def generate_report(request):
    return HttpResponse("Hello")



