from apps.blog.models import Post, PostAction
from apps.users.models import User
from django.core.management import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Create like post action object in range of passed argument for args
        print(args)
        self.stdout.write(args)
        for _ in range(int(args[0])):
            PostAction.objects.create(
                user=User.objects.get(pk=1),
                post=Post.objects.get(pk=args[1]),
                like=True
            )
        self.stdout.write(self.style.SUCCESS('Successfully created'))
        self.stdout.write(self.style.SUCCESS(f'{args[0]} like post actions'))
