from apps.users.models import ChatSender
from apps.chat.models import Chat, Room
from django.core.management import BaseCommand
from datetime import datetime
import time
import logging


class Command(BaseCommand):
    def handle(self, *args, **options):
        run = True
        while run:
            try:
                qs = ChatSender.objects.filter(sended=False)
                for sender in qs:
                    for user in sender.custom_list.invited.all():
                        room_sq = Room.objects.filter(
                            creator=sender.custom_list.creator,
                            invited__in=[user],
                        )
                        if room_sq.exists():
                            Chat.objects.create(
                                user=sender.custom_list.creator,
                                room=room_sq.first(),
                                text=sender.text,
                            ).save()
                        else:
                            room = Room.objects.create(
                                creator=sender.custom_list.creator,
                            )
                            room.invited.add(user)
                            room.save()
                            Chat.objects.create(
                                user=sender.custom_list.creator,
                                room=room,
                                text=sender.text,
                            ).save()
                    sender.sended = True
                    sender.save()
            except KeyboardInterrupt:
                run = False
            except Exception as e:
                logging.error(e)
            time.sleep(10)
