"""
ASGI config for Chatroom project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

# import os
# import django
# # from django.core.asgi import get_asgi_application
# from channels.routing import get_default_application
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Chatroom.settings')
# django.setup()
# # application = get_asgi_application()
# application = get_default_application()

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Chatroom.settings')

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from djangochat.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
    # Just HTTP for now. (We can add other protocols later.)
})
