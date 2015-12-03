# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lib_ecards', '0006_auto_20151127_1057'),
    ]

    operations = [
        migrations.CreateModel(
            name='ecard_text',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, primary_key=True, serialize=False)),
                ('text', models.TextField(default='')),
                ('sheet', models.ForeignKey(to='lib_ecards.sheet')),
            ],
        ),
    ]
