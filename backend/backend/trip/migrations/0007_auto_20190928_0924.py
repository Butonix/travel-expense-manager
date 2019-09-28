# Generated by Django 2.2.5 on 2019-09-28 09:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0006_auto_20190723_2138'),
    ]

    operations = [
        migrations.CreateModel(
            name='TripCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trip_category', to='trip.Trip')),
            ],
            options={
                'verbose_name': 'trip category',
                'verbose_name_plural': 'trips categories',
                'db_table': 'trip_trip_category',
            },
        ),
        migrations.AddField(
            model_name='expense',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='expenses', to='trip.TripCategory'),
        ),
    ]
