# Generated by Django 5.1.5 on 2025-02-08 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("properties", "0003_remove_property_image_property_is_available_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="thumbnail",
            field=models.ImageField(
                blank=True, null=True, upload_to="property_thumbnails/"
            ),
        ),
    ]
