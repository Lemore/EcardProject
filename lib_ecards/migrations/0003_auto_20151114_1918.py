# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lib_ecards', '0002_auto_20151114_1847'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sheet',
            name='rights',
        ),
        migrations.AlterField(
            model_name='sheet',
            name='subjects',
            field=models.TextField(),
        ),
    ]
