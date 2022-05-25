from apps.blog.models import Post, PostAction
from django.core.management import BaseCommand
from apps.users.models import ChatSubscription, Subscription
from datetime import datetime
import time
import logging


class Command(BaseCommand):
    def handle(self, *args, **options):
        run = True
        while run:
            try:
                ts = datetime.now()
                subs = Subscription.objects.filter(
                    end_date__lte=ts, finished=False)
                subs.update(finished=True)
                subs = ChatSubscription.objects.filter(
                    end_date__lte=ts, finished=False)
                subs.update(finished=True)
            except KeyboardInterrupt:
                run = False
            except Exception as e:
                logging.error(e)
            time.sleep(10)
