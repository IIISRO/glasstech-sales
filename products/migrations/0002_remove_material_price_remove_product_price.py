# Generated by Django 4.2.7 on 2023-11-16 22:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='material',
            name='price',
        ),
        migrations.RemoveField(
            model_name='product',
            name='price',
        ),
    ]
