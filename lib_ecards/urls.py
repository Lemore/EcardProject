__author__ = 'user'

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^list$', views.thumbnail_list, name='thumbnail_list'),
    url(r'^list_next/(?P<pk>[0-9]+)/$', views.thumbnail_list_next, name='thumbnail_list_next'),
    url(r'^add_picture$', views.add_picture, name='add_picture'),
    url(r'^select_picture/(?P<pk>.*)/$', views.select_picture, name='select_picture'),
    url(r'^$', views.show_tmplts, name='show_tmplts'),
    url(r'^mem_editor/(?P<pk>[0-9]+)/$', views.mem_editor, name='mem_editor'),
    url(r'^mem_editor/(?P<pk>[0-9]+)/save/$', views.mem_editor_save, name='mem_editor_save'),
    url(r'^show_ecard/(?P<pk>[0-9]+)/$', views.show_ecard, name='show_ecard'),
    url(r'^show_tmplts$', views.show_tmplts, name='show_tmplts'),
    url(r'^show_tmplts_next/(?P<pk>[0-9]+)/$', views.show_tmplts_next, name='show_tmplts_next'),
    url(r'^show_tmplts_prev/(?P<pk>[0-9]+)/$', views.show_tmplts_prev, name='show_tmplts_prev'),
    url(r'^search_tmplts/$', views.search_tmplts, name='search_tmplts'),

    url(r'^thirdauth/$', views.thirdauth, name='thirdauth'),
]
