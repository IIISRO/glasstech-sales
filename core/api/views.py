from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView, CreateAPIView, DestroyAPIView
from .serializers import BacklogSerializer
from core.models import Backlog
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404
from rest_framework import permissions
import json
from django.contrib import messages


class BacklogCreateApi(CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    model = Backlog
    serializer_class = BacklogSerializer
    
    def post(self, request, *args, **kwargs):
        messages.add_message(request, messages.SUCCESS, (f"Yeni backlog yazıldı!"))
        return super().post(request, *args, **kwargs)