from celery import shared_task
from .models import ChatSubscription, Subscription
from datetime import datetime


@shared_task
def finishSubscription():
    ts = datetime.now()
    subs = Subscription.objects.filter(end_date__lte=ts, finished=False)
    subs.update(finished=True)
    subs = ChatSubscription.objects.filter(end_date__lte=ts, finished=False)
    subs.update(finished=True)
