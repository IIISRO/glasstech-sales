# Generated by Django 4.2.7 on 2023-12-15 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_delete_material_product_unit'),
        ('sales', '0023_rename_finish_reason_offer_status_change_reason_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderServiceUsedProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('quantity', models.FloatField(default=0.0)),
                ('price', models.FloatField(default=0.0)),
                ('order_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders_services', to='sales.offerrevisionpackageservice')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='orders_services_usedproducts', to='products.product')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='orderservicesystemproduct',
            name='order_service',
        ),
        migrations.RemoveField(
            model_name='orderservicesystemproduct',
            name='product',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='equipment',
            new_name='equipment_note',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='installation',
            new_name='installation_note',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='packaging',
            new_name='packaging_note',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='production',
            new_name='production_note',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='transportation',
            new_name='transportation_note',
        ),
        migrations.RemoveField(
            model_name='order',
            name='costumer',
        ),
        migrations.AlterField(
            model_name='contract',
            name='offer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offer_contract', to='sales.offer'),
        ),
        migrations.AlterField(
            model_name='order',
            name='contract',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contract_orders', to='sales.contract'),
        ),
        migrations.DeleteModel(
            name='OrderService',
        ),
        migrations.DeleteModel(
            name='OrderServiceSystemProduct',
        ),
    ]
