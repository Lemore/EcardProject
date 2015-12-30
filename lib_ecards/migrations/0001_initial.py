# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EcardText',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('text', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('image_file', models.ImageField(height_field='height', width_field='width', upload_to='cards/images/')),
                ('width', models.IntegerField()),
                ('height', models.IntegerField()),
                ('rosetta_id', models.CharField(max_length=200, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sheet',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('subjects', models.TextField(default='')),
                ('thumbnail_id', models.CharField(max_length=32)),
                ('link_id', models.CharField(max_length=32)),
                ('recordid', models.CharField(max_length=100)),
                ('rights', models.CharField(max_length=200, blank=True)),
                ('regions', models.TextField(default='')),
            ],
        ),
        migrations.AddField(
            model_name='ecardtext',
            name='sheet',
            field=models.ForeignKey(to='lib_ecards.Sheet'),
        ),
    ]
