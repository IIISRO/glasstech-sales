# Generated by Django 4.2.7 on 2023-11-17 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0003_offerrevison_delv_time_order_contract_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offer',
            name='status',
            field=models.CharField(choices=[('Aktiv', 'Aktiv'), ('Uğurlu', 'Uğurlu'), ('Uğursuz', 'Uğursuz')], default='Aktiv', max_length=8),
        ),
    ]
