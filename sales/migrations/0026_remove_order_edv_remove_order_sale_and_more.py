# Generated by Django 4.2.7 on 2023-12-17 14:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sales', '0025_rename_ncp_order_nps_remove_order_plan_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='edv',
        ),
        migrations.RemoveField(
            model_name='order',
            name='sale',
        ),
        migrations.AlterField(
            model_name='order',
            name='order_accountant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='order_accountant', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_install',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='order_install', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_production',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='order_production', to=settings.AUTH_USER_MODEL),
        ),
    ]
