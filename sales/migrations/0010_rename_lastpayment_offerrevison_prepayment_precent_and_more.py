# Generated by Django 4.2.7 on 2023-11-27 18:10

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0009_alter_offer_context'),
    ]

    operations = [
        migrations.RenameField(
            model_name='offerrevison',
            old_name='lastpayment',
            new_name='prepayment_precent',
        ),
        migrations.RemoveField(
            model_name='offer',
            name='context',
        ),
        migrations.RemoveField(
            model_name='offerpackageservice',
            name='img',
        ),
        migrations.RemoveField(
            model_name='offerrevison',
            name='prepayment',
        ),
        migrations.AlterField(
            model_name='offer',
            name='potency',
            field=models.CharField(blank=True, choices=[('Pis', 'Pis'), ('Orta', 'Orta'), ('Yaxşı', 'Yaxşı')], max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='offer',
            name='status',
            field=models.CharField(blank=True, choices=[('Aktiv', 'Aktiv'), ('Uğurlu', 'Uğurlu'), ('Uğursuz', 'Uğursuz')], default='Aktiv', max_length=8, null=True),
        ),
        migrations.AlterField(
            model_name='offerpackageservice',
            name='desc',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
    ]