from django.shortcuts import render

def display_editor(request):
    return render(request, 'editor/index.html')