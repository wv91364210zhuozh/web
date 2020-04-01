# Generated by Django 2.2.4 on 2020-03-25 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grants', '0048_auto_20200324_1829'),
    ]

    operations = [
        migrations.AddField(
            model_name='grant',
            name='amount_received_in_round',
            field=models.DecimalField(decimal_places=4, default=0, help_text='The amount received in DAI this round.', max_digits=50),
        ),
    ]
