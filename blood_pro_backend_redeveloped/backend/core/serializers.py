from rest_framework import serializers
from .models import Donor, BloodRequest

class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ['id','name','blood_type','contact_number','city','created_at']

class BloodRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BloodRequest
        fields = ['id','patient_name','blood_type_needed','hospital_name','city','phone_number','created_at']
