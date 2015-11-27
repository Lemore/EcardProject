# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lib_ecards', '0004_sheet_rights'),
    ]

    operations = [
        migrations.AddField(
            model_name='sheet',
            name='regions',
            field=models.TextField(default=''),
        ),
    ]
