# Generated by Django 4.2.7 on 2023-12-09 00:15

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0017_remove_offerrevision_delv_fee_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offerrevisionpackage',
            old_name='discount_amount',
            new_name='discount',
        ),
        migrations.RemoveField(
            model_name='offerrevisionpackage',
            name='discount_type',
        ),
        migrations.RemoveField(
            model_name='offerrevisionpackageservice',
            name='desc',
        ),
        migrations.AddField(
            model_name='offerrevisionpackageservice',
            name='detail',
            field=ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='offerrevisionpackage',
            name='tax',
            field=models.BooleanField(default=False),
        ),
    ]
