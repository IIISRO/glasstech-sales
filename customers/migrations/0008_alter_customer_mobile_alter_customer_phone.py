# Generated by Django 4.2.7 on 2023-11-29 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0007_customer_mobile_alter_customer_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='mobile',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
