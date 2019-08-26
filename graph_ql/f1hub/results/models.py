from django.db import models

# Create your models here.
class Results(models.Model):
    resultId = models.IntegerField(primary_key=True)
    raceId = models.IntegerField()
    driverId = models.IntegerField()
    constructorId = models.IntegerField()
    number = models.IntegerField(null=True)
    grid = models.IntegerField()
    position = models.IntegerField(null=True)
    positionText = models.TextField()
    positionOrder = models.IntegerField()
    points = models.FloatField()
    laps = models.IntegerField()
    time = models.TextField(null=True)
    milliseconds = models.IntegerField(null=True)
    fastestLap = models.IntegerField(null=True)
    rank = models.IntegerField(null=True)
    fastestLapTime = models.TextField(null=True)
    fastestLapSpeed = models.TextField(null=True)
    statusId = models.IntegerField(null=True)
    driver = models.ForeignKey('drivers.Driver', on_delete=models.CASCADE)
    
    objects = models.Manager()