from django.contrib import admin
from .models import Donor, BloodRequest

@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ('id','name','blood_type','contact_number','city','created_at')
    search_fields = ('name','blood_type','city')

@admin.register(BloodRequest)
class BloodRequestAdmin(admin.ModelAdmin):
    list_display = ('id','patient_name','blood_type_needed','hospital_name','city','phone_number','created_at')
    search_fields = ('patient_name','blood_type_needed','hospital_name','city','phone_number')
