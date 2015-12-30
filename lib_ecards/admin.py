from django.contrib import admin
from .models import Sheet
from .models import EcardText

# Register your models here.
admin.site.register(Sheet)
admin.site.register(EcardText)