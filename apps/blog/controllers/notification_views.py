
from apps.blog.models import *
from apps.blog.serializers import *
from apps.users.models import ChatSubscription, Donation, Subscription, User
from apps.users.serializers import (ChatSubscriptionNotificationSerializer,
                                    DonationNotificationSerializer,
                                    SubscriptionNotificationSerializer,
                                    UserShortRetrieveSeriliazer)
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from silk.profiling.profiler import silk_profile


class UserNotifications(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserShortRetrieveSeriliazer

    def get(self, request):
        limit = int(request.GET.get('limit', 50))
        offset = int(request.GET.get('offset', 0))
        notification_type = request.GET.get('notification_type', 'all')
        user = request.user
        comments_result = []
        likes_result = []
        donations_result = []
        subscriptions_result = []
        if notification_type == 'all' or notification_type == 'comment':
            for comment in PostAction.objects.filter(
                comment__isnull=False,
                post__user=user
            ).order_by('-date_time').distinct():
                if comment.user != user:
                    res_dict = {
                        'user': self.serializer_class(
                            instance=comment.user, context={'request': request}).data,
                        'post': CommentRetrieveSerializer(
                            instance=comment, context={'request': request}).data,
                        'type': 'comment'
                    }
                    comments_result.append(res_dict)
        if notification_type == 'all' or notification_type == 'like':
            for like in PostAction.objects.filter(post__user=user, like=True).distinct():
                if like.user != user:
                    res_dict = {
                        'user': self.serializer_class(
                            instance=like.user, context={'request': request}).data,
                        'post': LikeRetrieveSerializer(
                            instance=like, context={'request': request}).data,
                        'type': 'like'
                    }
                    likes_result.append(res_dict)
        if notification_type == 'all' or notification_type == 'donation':
            for donation in user.recieved_user.all().order_by('-datetime').distinct():
                if user != donation.sender:
                    res_dict = {
                        'user': self.serializer_class(
                            instance=donation.sender, context={'request': request}).data,
                        'donation': {
                            'amount': donation.amount,
                            'date_time': donation.datetime.timestamp() if donation.datetime else None
                        },
                        'type': 'donation'
                    }
                    donations_result.append(res_dict)

        if notification_type == 'all' or notification_type == 'subscription':
            for subscription in user.target_user_subscribe.all().order_by('-start_date').distinct():
                if user != subscription.source:
                    res_dict = {}
                    res_dict['user'] = self.serializer_class(
                        instance=subscription.source, context={'request': request}).data
                    res_dict['subscription'] = {
                        'amount': user.subscribtion_price,
                        'length': user.subscribtion_price,
                        'start_date': subscription.start_date.timestamp() if subscription.start_date else None,
                        'end_date': subscription.end_date.timestamp() if subscription.end_date else None
                    }
                    res_dict['type'] = 'subscription'
                    subscriptions_result.append(res_dict)

        if notification_type == 'all' or notification_type == 'chat_subscription':
            for subscription in user.target_user_chat_subscribe.all().order_by('-start_date').distinct():
                if user != subscription.source:
                    res_dict = {}
                    res_dict['user'] = self.serializer_class(
                        instance=subscription.source, context={'request': request}).data
                    res_dict['chat_subscription'] = {
                        'amount': user.subscribtion_price,
                        'start_date': subscription.start_date.timestamp() if subscription.start_date else None,
                        'end_date': subscription.end_date.timestamp() if subscription.end_date else None
                    }
                    res_dict['type'] = 'chat_subscription'
                    subscriptions_result.append(res_dict)
        result = [
            *comments_result,
            *likes_result,
            *donations_result,
            *subscriptions_result,
        ]
        return Response(result[offset:offset+limit])


class UserAlertNotificatitons(APIView):

    @silk_profile(name='View Composite notifications')
    def get(self, request):
        user = request.user
        last_action = user.user_online.last_action
        result_notifications = []

        if user.show_chat_subscribption_notifications:
            chat_subscriptions = ChatSubscription.objects.filter(
                target=user,
                start_date__gte=last_action
            )
            result_notifications.extend(ChatSubscriptionNotificationSerializer(
                instance=chat_subscriptions,
                many=True,
                context={'request': request}
            ).data)

        if user.show_subscribption_notifications:
            subscriptions = Subscription.objects.filter(
                target=user,
                start_date__gte=last_action
            )
            result_notifications.extend(SubscriptionNotificationSerializer(
                instance=subscriptions,
                many=True,
                context={'request': request}
            ).data)
        if user.show_like_notifications:
            post_action_like = PostAction.objects.filter(
                post__user=user,
                date_time__gte=last_action.timestamp(),
                like=True,
                parent__isnull=True
            )
            post_comment_action_like = PostAction.objects.filter(
                post__user=user,
                date_time__gte=last_action.timestamp(),
                like=True,
                parent__isnull=False
            )
            result_notifications.extend(PostActionNotificationSerializer(
                instance=[*post_action_like, *post_comment_action_like],
                many=True,
                context={'request': request}
            ).data)
        if user.show_comment_notifications:
            post_action_comment = PostAction.objects.filter(
                post__user=user,
                date_time__gte=last_action.timestamp(),
                like=False,
                comment__isnull=False,
                parent__isnull=True
            )
            post_action_comment_comment = PostAction.objects.filter(
                post__user=user,
                date_time__gte=last_action.timestamp(),
                like=False,
                comment__isnull=False,
                parent__isnull=False
            )
            result_notifications.extend(PostActionNotificationSerializer(
                instance=[*post_action_comment, *post_action_comment_comment],
                many=True,
                context={'request': request}
            ).data)

        if user.show_donate_notifications:
            donation_notifications = Donation.objects.filter(
                reciever=user,
                datetime__gte=last_action,
            )
            result_notifications.extend(DonationNotificationSerializer(
                instance=donation_notifications,
                many=True,
                context={'request': request}
            ).data)
        return Response({
            "result": result_notifications
        })
