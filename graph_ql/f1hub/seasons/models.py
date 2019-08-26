from django.db import models

# Create your models here.
class Seasons(models.Model):
    year = models.IntegerField(primary_key=True)
    url = models.TextField()

    objects = models.Manager()