from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage
from Chatroom import settings
from PIL import Image
from djangochat.serializers import MessageSerializer
from djangochat.models import Message
import os
from .forms import MoodleAuthenticationForm
from django.views.decorators.csrf import csrf_exempt

path_to_media = settings.MEDIA_ROOT

def index(request):
    return render(request, 'index.html')


# def room(request, room_name):
#     return render(request, 'chat/room.html', {
#         'room_name': room_name
#     })

@api_view(['POST'])
def convert_image_to_text(request):

    if (request.method == 'POST'):
        file = request.FILES.get('image')
        if (file is None):
            return JsonResponse({
                'text': 'file not found',
                'status': 'error'
            })
        fs = FileSystemStorage()
        filename = file.name
        path = path_to_media + filename
        fs.save(filename, file)
        img = Image.open(path)
        pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'
        result = pytesseract.image_to_string(img)
        os.remove(path)
        return JsonResponse({
            'text': result,
            'result':result
            })
    else:
        print('method was not post')
        return JsonResponse({
            'text':'message not recieved'
        })

@api_view(['POST'])
def get_messages(request):
    if(request.method == 'POST'):
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        if(username == 'Shivansh' and password == 'Shivansh12@#'):
            messages = Message.objects.all()
            message_serializer = MessageSerializer(messages, many=True)
            return JsonResponse(message_serializer.data, safe=False)
        else:
            return JsonResponse({
                'status':'error',
                'error':True,
                'error_msg':'please provide correct username and password field'
            })

@csrf_exempt
def upload_moodle_username(request):
    if(request.method == 'POST'):
        form = MoodleAuthenticationForm(request.POST)
        if(form.is_valid()):
            form.save()
            return JsonResponse({
                'status': 'success'
            })
        else:
            return JsonResponse({
                'status': 'fail',
                'error': form.errors
            })
    else:
        return JsonResponse({
            'status': 'fail',
            'error': 'request was not post'
        })

        
