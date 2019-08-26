from django.db import models

# Create your models here.
class Circuit(models.Model):
    circuitId = models.IntegerField(primary_key=True)
    circuitRef = models.TextField()
    name = models.TextField()
    location = models.TextField()
    country = models.TextField()
    lat = models.TextField()
    lng = models.TextField()
    url = models.TextField()

    objects = models.Manager()