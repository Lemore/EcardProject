# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lib_ecards', '0005_sheet_regions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sheet',
            name='subjects',
            field=models.TextField(default=''),
        ),
    ]
