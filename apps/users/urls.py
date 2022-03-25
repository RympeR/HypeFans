from django.urls import path
from .views import (
    AddBlockedUserAPI,
    UserActivationView,
    UserRetrieveAPI,
    UserCreateAPI,
    UserAPI,
    UserPartialUpdateAPI,
    UserSubscription,
    CardRetrieveAPI,
    CardCreateAPI,
    CardAPI,
    CardPartialUpdateAPI,
    DonationRetrieveAPI,
    DonationCreateAPI,
    PaymentRetrieveAPI,
    PaymentCreateAPI,
    PendingUserCreateAPI,
    UserOnlineRetrieveAPI,
    UserOnlineCreateAPI,
    UserCardListAPI,
    DonationPayedUserRetrieveAPI,
    DonationPayedUserToRetrieveAPI,
    CreateSubscriptioAPI,
    PaymentUserHistoryRetrieveAPI,
    UserProfileRetrieveAPI,
    UserSettingsRetrieveAPI,
    UserBlockedListAPI,
    PayStatsHistoryRetrieveAPI,
    UserSearchRetrieveAPI,
    UserLoginAPI,
    UserMeRetrieveAPI,
    UserChatSubscription,
    SpendStatsHistoryRetrieveAPI,
    RepheralHistoryRetrieveAPI,
    UserChangePasswordAPI,
)
urlpatterns = [
    path('me/', UserMeRetrieveAPI.as_view()),
    path('change-password/', UserChangePasswordAPI.as_view()),
    path('get-user/', UserRetrieveAPI.as_view()),
    path('get-profile/<str:username>', UserProfileRetrieveAPI.as_view()),
    path('user-search/', UserSearchRetrieveAPI.as_view()),
    path('get-settings/', UserSettingsRetrieveAPI.as_view()),
    path('create-user/', UserCreateAPI.as_view()),
    path('login-user/', UserLoginAPI.as_view()),
    path('delete-user/', UserAPI.as_view()),
    path('partial-update-user/', UserPartialUpdateAPI.as_view()),
    path('user-subscription/<int:pk>', UserSubscription.as_view()),
    path('user-chat-subscription/<int:pk>', UserChatSubscription.as_view()),
    path('get-card/<int:pk>', CardRetrieveAPI.as_view()),
    path('create-card/', CardCreateAPI.as_view()),
    path('create-subscription/', CreateSubscriptioAPI.as_view()),
    path('update-delete-card/<int:pk>', CardAPI.as_view()),
    path('partial-update-card/', CardPartialUpdateAPI.as_view()),
    path('get-donation/<int:pk>', DonationRetrieveAPI.as_view()),
    path('create-donation/', DonationCreateAPI.as_view()),
    path('get-payment/<int:pk>', PaymentRetrieveAPI.as_view()),
    path('create-payment/', PaymentCreateAPI.as_view()),
    path('validate-user/', PendingUserCreateAPI.as_view()),
    path('online-user-retrieve/', UserOnlineRetrieveAPI.as_view()),
    path('online-user-create/', UserOnlineCreateAPI.as_view()),
    path('user-cards-list/', UserCardListAPI.as_view()),
    path('user-donation-recieved/', DonationPayedUserRetrieveAPI.as_view()),
    path('user-donation-sended/', DonationPayedUserToRetrieveAPI.as_view()),
    path('user-payment-history/', PaymentUserHistoryRetrieveAPI.as_view()),
    path('pay-stats-history/', PayStatsHistoryRetrieveAPI.as_view()),
    path('referral-stats-history/', RepheralHistoryRetrieveAPI.as_view()),
    path('spend-stats-history/', SpendStatsHistoryRetrieveAPI.as_view()),
    path('block-user/', AddBlockedUserAPI.as_view(), name='BlockUser'),
    path('block-user-list/', UserBlockedListAPI.as_view(), name='BlockUserList'),
]
