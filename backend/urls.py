from django.urls import path
from . import views

urlpatterns = [
    path("get-all-employees", views.get_all_employees, name="all-employees"),
    path("get-incoming-emails", views.get_incoming_emails, name="incoming-emails"),
    path("get-an-email", views.get_an_email, name="an-email"),
    path("reject", views.reject, name="reject"),
    path("get-inventory", views.get_inventory, name="inventory"),
    path("generate-report", views.generate_report, name="generate_report")
]

