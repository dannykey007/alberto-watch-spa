from django.contrib import admin
from .models import Watch , SiteMedia

@admin.register(Watch)
class WatchAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'gender')
    list_filter = ('category', 'gender')
    search_fields = ('name', 'description')


@admin.register(SiteMedia)
class SiteMediaAdmin(admin.ModelAdmin):
    list_display = ('title', 'intro_video', 'men_banner_image', 'women_banner_image')
