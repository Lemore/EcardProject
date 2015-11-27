from django.db import models

# Create your models here.
class sheet(models.Model):
    title = models.CharField(max_length=200)
    subjects = models.TextField()
    thumbnail_id = models.CharField(max_length=32)
    link_id = models.CharField(max_length=32)
    recordid = models.CharField(max_length=100)
    rights = models.CharField(max_length=200, blank=True)
    regions = models.TextField(default='')

    def __str__(self):
        return self.title + " " + self.recordid

    def image_url(self):
        return 'http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid={}'.format(self.link_id)

    def thumbnail_url(self):
        return 'http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=thumbnail&dps_pid={}'.format(self.thumbnail_id)
