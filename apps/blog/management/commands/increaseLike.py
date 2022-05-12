from apps.blog.models import Post, PostAction
from apps.users.models import User
from django.core.management import BaseCommand


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('like_amount', nargs='+', type=int)
        parser.add_argument('post_id', nargs='+', type=int)

    def handle(self, *args, **options):
        print(options['like_amount'])
        # Create like post action object in range of passed argument for args
        for _ in range(int(options['like_amount'][0])):
            PostAction.objects.create(
                user=User.objects.get(pk=1),
                post=Post.objects.get(pk=int(options['post_id'][0])),
                like=True
            )
        self.stdout.write(self.style.SUCCESS('Successfully created'))