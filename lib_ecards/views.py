import json
import random

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext

from . import primo_reader
from .models import sheet
from .models import ecard_text

# Create your views here.
def thumbnail_list_next(request, pk):
    start_idx = random.randint(0, 15800)
    bulk_size = 20
    sheets = primo_reader.getSheets(start_idx, bulk_size, "")
    # sheets = primo_reader.getSheets(int(pk), bulk_size)
    print("PK = " + pk)
    print(len(sheets))
    last_index = start_idx
    return render(request, 'lib_ecards/thumbnail_list.html', {'sheets' : sheets, 'last_index' : last_index})



def thumbnail_list(request):
    sheets = primo_reader.getSheets(1, 20, "")
    last_index = 1 + 20
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
    rights = request.POST.get('rights')

    mysheet = sheet(title=tit, thumbnail_id=thumb, link_id=link, recordid=rec, subjects=sub, rights=rights)
    mysheet.save()

    return JsonResponse({'message': 'success'})


def add_picture_template(request):
    print("Adding Picture template")

    rec = request.POST.get('recordid')
    sht = primo_reader.getSheetByRecId(rec)
    tit = sht.get('title')
    thumb = sht.get('thumbnail_id')
    link = sht.get('link_id')
    sub = sht.get('subjects')
    rights = sht.get('rights')
    regions = request.POST.get('regions')

    print("About to save")
    mysheet = sheet(title=tit, thumbnail_id=thumb, link_id=link, recordid=rec,
                    subjects=sub, rights=rights, regions=regions)
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



def mem_editor_save (request, pk):
    tmplt = sheet.objects.get(pk=pk)
    regions = json.loads(tmplt.regions)

    text = "{"
    for r in regions:
        input = "input_" + str(r.get("id"))
        if text != "{":
            text = text + ","
        text = text + "\"" + str(r.get("id")) + "\" : \"" + request.POST.get(input) + "\""
    text = text + "}"

    etext = ecard_text(sheet=tmplt, text=text)
    etext.save()
    etext_id = etext.id
    print("etext ID: " + str(etext_id))

    context = {'tmplt': tmplt, 'regions': json.loads(tmplt.regions), 'strings' : json.loads(text)}
    url = "/show_ecard/" + str(etext_id) + "/"
    return redirect(url, context)



def show_ecard(request, pk):
    etext = ecard_text.objects.get(pk=pk)
    sht = etext.sheet
    strings = json.loads(etext.text)
    sheet_pk = sht.id
    tmplt = sheet.objects.get(pk=sheet_pk)

    regions = json.loads(tmplt.regions)
    for r in regions:
        txt_id = str(r["id"])
        r['text'] = strings[txt_id]

    context = {'tmplt': tmplt, 'regions': regions }
    return render(request, 'lib_ecards/show_ecard.html', context)



def search_tmplts (request):
    print ("SEARCHING")
    search_str = request.GET.get('search')

    start_idx = 1
    bulk_size = 20
    sheets = primo_reader.getSheets(start_idx, bulk_size, search_str)
    sheets_num = len(sheets)
    # sheets = primo_reader.getSheets(int(pk), bulk_size)
    last_index = start_idx + bulk_size
    return render(request, 'lib_ecards/thumbnail_search_list.html', {'sheets' : sheets, 'last_index' : last_index, 'search_str' : search_str})


def search_tmplts_next (request, search, pk):
    print ("SEARCHING")
    # search_str = request.GET.get('search')
    start_idx = pk
    bulk_size = 20
    sheets = primo_reader.getSheets(start_idx, bulk_size, search)
    print (len(sheets))
    # if sheets_num < 20:
    #     last_index = int(pk)
    # else:
    last_index = int(pk) + bulk_size
    # len(sheets) + 1

    return render(request, 'lib_ecards/thumbnail_search_list.html', {'sheets' : sheets, 'last_index' : last_index, 'search_str' : search})


def select_picture(request, pk):
    print ("In Select Picture")
    pic_url = "http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid=FL9179903"
    return HttpResponse.__setitem__("link_url", "HELLO")


def template_editor(request, pk):
    print(request)
        # switch back when library works and disable link=pk
        # sheet = primo_reader.getSheetByRecId(pk);
        # link = sheet.get("link_id")
    link = pk

    pic_url = "http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid=" + link
    print("PICURL" + pic_url)
    context = {'pic_url': pic_url }
    return render(request, 'lib_ecards/template_editor.html', context)


def thirdauth(request):
   context = RequestContext(request,
                           {'request': request,
                            'user': request.user})
   return render_to_response('lib_ecards/thirdauth.html',
                             context_instance=context)


