from django.db import models

class Donor(models.Model):
    BLOOD_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'),
        ('AB+','AB+'), ('AB-','AB-'), ('O+','O+'), ('O-','O-'),
    ]
    name = models.CharField(max_length=120)
    blood_type = models.CharField(max_length=3, choices=BLOOD_CHOICES)
    contact_number = models.CharField(max_length=30)
    city = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.blood_type})"

class BloodRequest(models.Model):
    patient_name = models.CharField(max_length=120)
    blood_type_needed = models.CharField(max_length=3, choices=Donor.BLOOD_CHOICES)
    hospital_name = models.CharField(max_length=200)
    city = models.CharField(max_length=120, blank=True)
    phone_number = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient_name} needs {self.blood_type_needed}"
