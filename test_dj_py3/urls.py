from django.conf.urls import patterns, url, include
from django.contrib import admin
from rest_framework import routers
from core import views
from core.views import IndexTemplateView

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^index/$', IndexTemplateView.as_view(), name='index'),
    url(r'^admin/', include(admin.site.urls)),
)
