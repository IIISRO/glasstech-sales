# Generated by Django 4.2.7 on 2024-01-23 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0008_alter_customer_mobile_alter_customer_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='potency',
            field=models.CharField(blank=True, choices=[('PİS', 'PİS'), ('ORTA', 'ORTA'), ('YAXŞI', 'YAXŞI')], max_length=6, null=True),
        ),
    ]