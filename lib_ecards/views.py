import json

from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from . import primo_reader
from .models import sheet


# Create your views here.
def thumbnail_list_next(request, pk):
    sheets = primo_reader.getSheets(int(pk), 50)
    print("PK = " + pk)
    print(len(sheets))
    last_index = int(pk) + 50
    return render(request, 'lib_ecards/thumbnail_list.html', {'sheets' : sheets, 'last_index' : last_index})


def thumbnail_list(request):
    sheets = primo_reader.getSheets(1, 50)
    last_index = 1 + 50
    return render(request, 'lib_ecards/thumbnail_list.html', {'sheets' : sheets, 'last_index' : last_index})


def add_picture(request):
    print("Adding Picture")
#    print(request)
#    print(request.GET.keys())


    tit = request.POST.get('title')
    thumb = request.POST.get('thumbnail_id')
    link = request.POST.get('link_id')
    rec = request.POST.get('recordid')
    sub = request.POST.get('subjects')


    print("thumbnail" + thumb)

    mysheet = sheet(title=tit, thumbnail_id=thumb, link_id=link, recordid=rec, subjects=sub)
    mysheet.save()

    return JsonResponse({'message': 'success'})


def show_tmplts (request):
    tmplts = sheet.objects.all()[:10]
    return render(request, 'lib_ecards/show_tmplts.html', {'tmplts' : tmplts, 'first_index' : 0 , 'last_index' : 9})


def show_tmplts_next(request, pk):
    last_index = int(pk)

    if last_index + 11 > len(sheet.objects.all()):
        last_index = len(sheet.objects.all())
        first_index = last_index - 10
    else:
        first_index = last_index + 1
        last_index = last_index + 10

    tmplts = sheet.objects.all()[first_index : last_index]
    return render(request, 'lib_ecards/show_tmplts.html', {'tmplts' : tmplts, 'first_index' : first_index , 'last_index' : last_index})


def show_tmplts_prev(request, pk):
    first_index = int(pk)

    if first_index - 10 < 0:
        first_index = 0
        last_index = 9
    else:
        last_index = first_index
        first_index = first_index - 10

    tmplts = sheet.objects.all()[first_index : last_index]
    return render(request, 'lib_ecards/show_tmplts.html', {'tmplts' : tmplts, 'first_index' : first_index , 'last_index' : last_index})


def mem_editor(request, pk):
    tmplt = sheet.objects.get(pk=pk)
    context = {'tmplt': tmplt, 'regions': json.loads(tmplt.regions)}
    return render(request, 'lib_ecards/mem_editor.html', context)


def search_tmplts (request):
    print ("SEARCHING")
    search_str = request.GET.get('search')
    tmplts = sheet.objects.filter(subject__contains=search_str)
    last_index = len(tmplts)
    return HttpResponse()
        ### render(request, 'lib_ecards/show_tmplts.html', {'tmplts' : tmplts, 'first_index' : 0 , 'last_index' : last_index})


def select_picture(request, pk):
    print ("In Select Picture")
    pic_url = "http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid=FL9179903"
    return HttpResponse.__setitem__("link_url", "HELLO")
