# Generated by Django 4.2.7 on 2024-01-23 13:19

import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_delete_material_product_unit'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductDescriptionTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('description', ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_descriptions', to='products.product')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
