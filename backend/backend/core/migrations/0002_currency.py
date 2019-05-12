# Generated by Django 2.2 on 2019-05-01 20:13
import django.core.validators
from django.db import migrations, models
from django.core.management import call_command


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='name')),
                ('name_plural', models.CharField(max_length=50, verbose_name='name plural')),
                ('code', models.CharField(max_length=3, verbose_name='code')),
                ('symbol', models.CharField(max_length=200, verbose_name='symbol')),
                ('symbol_native', models.CharField(max_length=200, verbose_name='symbol native')),
                ('decimal_digits', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)], verbose_name='decimal digits')),
           ],
            options={
                'verbose_name': 'currency',
                'verbose_name_plural': 'currencies',
            },
        ),
    ]