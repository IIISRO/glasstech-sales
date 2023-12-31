# Generated by Django 4.2.7 on 2023-12-18 02:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_delete_material_product_unit'),
        ('sales', '0027_rename_finish_reason_order_status_change_reason'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceUsedProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('quantity', models.FloatField(default=0.0)),
                ('price', models.FloatField(default=0.0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='offerrevisionpackageservice',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='product_services', to='products.product'),
        ),
        migrations.DeleteModel(
            name='OrderServiceUsedProduct',
        ),
        migrations.AddField(
            model_name='serviceusedproduct',
            name='order_service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services_used_products', to='sales.offerrevisionpackageservice'),
        ),
        migrations.AddField(
            model_name='serviceusedproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='products_useds', to='products.product'),
        ),
    ]
