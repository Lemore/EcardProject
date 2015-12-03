import json

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
    tmplts = sheet.objects.filter(subject__contains=search_str)
    last_index = len(tmplts)
    return HttpResponse()
        ### render(request, 'lib_ecards/show_tmplts.html', {'tmplts' : tmplts, 'first_index' : 0 , 'last_index' : last_index})


def select_picture(request, pk):
    print ("In Select Picture")
    pic_url = "http://rosetta.nli.org.il/delivery/DeliveryManagerServlet?dps_func=stream&dps_pid=FL9179903"
    return HttpResponse.__setitem__("link_url", "HELLO")


def thirdauth(request):
   context = RequestContext(request,
                           {'request': request,
                            'user': request.user})
   return render_to_response('lib_ecards/thirdauth.html',
                             context_instance=context)


