from django.db import models

class SustainabilityAction(models.Model):
    # ID field will be automatically created as the primary key by Django
    action = models.CharField(max_length=255)  # Name of the action
    date = models.DateField()  # Date when the action was performed
    points = models.IntegerField()  # Points associated with the action

    def __str__(self):
        return self.action + " on " + self.date + " for " + self.points + " points"