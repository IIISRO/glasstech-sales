# Generated by Django 4.2.7 on 2023-11-28 23:27

import ckeditor_uploader.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0012_rename_offerrevison_offerrevision_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offerrevisionpackageservice',
            name='desc',
            field=ckeditor_uploader.fields.RichTextUploadingField(verbose_name='description'),
        ),
    ]
