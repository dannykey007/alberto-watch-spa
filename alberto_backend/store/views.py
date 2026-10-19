from django.http import HttpResponse, JsonResponse
from .models import Watch, SiteMedia


def home_view(request):
    return HttpResponse("Welcome to Alberto Watch Company Backend API! Use /api/watches/ or /admin/")


def watch_api_list(request):
    watches = Watch.objects.all()
    watch_data = []
    for w in watches:
        img_url = w.image.url if w.image else "assets/rolex-submariner.jpg"
        watch_data.append({
            "name": w.name,
            "price": w.price,
            "category": w.category,
            "gender": w.gender,
            "desc": w.description,
            "image": request.build_absolute_uri(img_url) if w.image else "assets/rolex-submariner.jpg"
        })

    media_obj, created = SiteMedia.objects.get_or_create(id=1)

    media_data = {
        "intro_video": request.build_absolute_uri(media_obj.intro_video.url) if media_obj.intro_video else "",
        "men_banner": request.build_absolute_uri(media_obj.men_banner_image.url) if media_obj.men_banner_image else "assets/rolex-submariner.jpg",
        "women_banner": request.build_absolute_uri(media_obj.women_banner_image.url) if media_obj.women_banner_image else "assets/rolex-lady-datejust.jpg",
    }

    return JsonResponse({"watches": watch_data, "media": media_data}, safe=False)
