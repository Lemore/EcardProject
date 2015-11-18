"""website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

import os.path
import editor.views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^editor/', editor.views.display_editor),
    url(r'', include('lib_ecards.urls')),
]

EDITOR_PATH = os.path.join(os.path.dirname(__file__), '..', 'editor')

urlpatterns += static("app/", document_root=os.path.join(EDITOR_PATH, 'app'))
urlpatterns += static("bower_components/", document_root=os.path.join(EDITOR_PATH, 'bower_components'))