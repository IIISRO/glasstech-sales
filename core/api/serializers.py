from rest_framework import serializers
from core.models import Backlog
from accounts.models import User

class BacklogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Backlog
        fields = (
            'id',
            'title',
            'by',
            'mention',
            'message',
            'content_type',
            'object_id'
        )

    