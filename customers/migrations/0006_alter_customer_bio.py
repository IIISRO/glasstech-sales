# Generated by Django 4.2.7 on 2023-11-23 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0005_alter_customer_phone_alter_customer_reference'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='bio',
            field=models.CharField(blank=True, max_length=70, null=True),
        ),
    ]