from django.db import models

# Create your models here.
class sheet(models.Model):
    title = models.CharField(max_length=200)
    subjects = models.TextField()
    thumbnail_id = models.CharField(max_length=32)
    link_id = models.CharField(max_length=32)
    recordid = models.CharField(max_length=100)
    rights = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.title + " " + self.recordid