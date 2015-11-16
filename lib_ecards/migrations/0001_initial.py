# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='sheet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('subjects', models.TextField()),
                ('thumbnail_id', models.CharField(max_length=32)),
                ('link_id', models.CharField(max_length=32)),
                ('recordid', models.CharField(max_length=100)),
            ],
        ),
    ]
