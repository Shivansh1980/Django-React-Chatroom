from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage
from Chatroom import settings
# import pytesseract
import os

path_to_media = settings.MEDIA_ROOT

def index(request):
    return render(request, 'index.html')


# def room(request, room_name):
#     return render(request, 'chat/room.html', {
#         'room_name': room_name
#     })

# @api_view(['POST'])
# def convert_image_to_text(request):

#     if (request.method == 'POST'):
#         file = request.FILES.get('image')
#         if (file is None):
#             return JsonResponse({
#                 'text': 'file not found',
#                 'status': 'error'
#             })
#         fs = FileSystemStorage()
#         filename = file.name
#         path = path_to_media + filename
#         fs.save(filename, file)
#         img = Image.open(path)
#         pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'
#         result = pytesseract.image_to_string(img)
#         os.remove(path)
#         return JsonResponse({
#             'text': result,
#             'result':result
#             })
#     else:
#         print('method was not post')
#         return JsonResponse({
#             'text':'message not recieved'
#         })
