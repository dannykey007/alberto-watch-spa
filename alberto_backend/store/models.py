from django.db import models

class Watch(models.Model):
    CATEGORY_CHOICES = [
        ('luxury', 'Luxury'),
        ('vintage', 'Vintage'),
        ('smart', 'Smart Watches'),
    ]
    
    GENDER_CHOICES = [
        ('men', 'Men'),
        ('women', 'Women'),
        ('unisex', 'Unisex'),
    ]

    name = models.CharField(max_length=200)
    price = models.CharField(max_length=50)  # e.g. "$14,500"
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='men')
    description = models.TextField()
    image = models.ImageField(upload_to='watches/', blank=True, null=True)

    def __str__(self):
        return self.name


class SiteMedia(models.Model):
    title = models.CharField(max_length=100, default="Homepage Assets")
    intro_video = models.FileField(upload_to='videos/', blank=True, null=True, help_text="Upload your homepage intro video")
    men_banner_image = models.ImageField(upload_to='banners/', blank=True, null=True, help_text="Image for Men's section")
    women_banner_image = models.ImageField(upload_to='banners/', blank=True, null=True, help_text="Image for Women's section")

    def __str__(self):
        return self.title
