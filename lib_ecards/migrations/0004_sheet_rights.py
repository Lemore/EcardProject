# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lib_ecards', '0003_auto_20151114_1918'),
    ]

    operations = [
        migrations.AddField(
            model_name='sheet',
            name='rights',
            field=models.CharField(max_length=200, blank=True),
        ),
    ]
