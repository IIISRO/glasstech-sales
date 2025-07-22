from django.utils import timezone
from django.conf import settings
import pytz


def get_local_time(utc_time):
    local_tz = pytz.timezone(settings.TIME_ZONE)
    return utc_time.astimezone(local_tz)

