# Generated by Django 4.2.7 on 2023-12-18 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0029_rename_order_service_serviceusedproduct_service'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='order_install',
            new_name='order_installer',
        ),
        migrations.AlterField(
            model_name='order',
            name='handover',
            field=models.ImageField(blank=True, upload_to='OrderHandovers/', verbose_name='handover'),
        ),
    ]
