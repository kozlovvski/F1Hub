from django.db import models

# Create your models here.
class Driver(models.Model):
    id = models.IntegerField(primary_key=True)
    driverRef = models.TextField()
    number = models.IntegerField(null=True)
    code = models.TextField()
    forename = models.TextField()
    surname = models.TextField()
    dob = models.TextField()
    nationality = models.TextField()
    url = models.TextField()

    objects = models.Manager()