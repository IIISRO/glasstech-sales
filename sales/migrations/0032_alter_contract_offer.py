# Generated by Django 4.2.7 on 2023-12-21 02:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0031_order_customer_feedback_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contract',
            name='offer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offer_contracts', to='sales.offer'),
        ),
    ]
