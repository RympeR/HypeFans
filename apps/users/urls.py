from django.urls import path
from .views import (
    UserRetrieveAPI,
    UserCreateAPI,
    UserAPI,
    UserPartialUpdateAPI,
    UserSubscription,
    UserPostDonation,
    CardRetrieveAPI,
    CardCreateAPI,
    CardAPI,
    CardPartialUpdateAPI,
    DonationRetrieveAPI,
    DonationCreateAPI,
    PaymentRetrieveAPI,
    PaymentCreateAPI,
    PendingUserCreateAPI
)

urlpatterns = [
    path('get-user/', UserRetrieveAPI.as_view()),
    path('create-user/', UserCreateAPI.as_view()),
    path('update-delete-user/', UserAPI.as_view()),
    path('partial-update-user/', UserPartialUpdateAPI.as_view()),
    path('user-subscription/<int:pk>', UserSubscription.as_view()),
    #TODO -- to update
    path('create-donation/', UserPostDonation.as_view()),
    path('get-card/<int:pk>', CardRetrieveAPI.as_view()),
    path('create-card/', CardCreateAPI.as_view()),
    path('update-delete-card/<int:pk>', CardAPI.as_view()),
    path('partial-update-card/', CardPartialUpdateAPI.as_view()),
    path('get-donation/<int:pk>', DonationRetrieveAPI.as_view()),
    path('create-donation/', DonationCreateAPI.as_view()),
    path('get-payment/<int:pk>', PaymentRetrieveAPI.as_view()),
    path('create-payment/', PaymentCreateAPI.as_view()),
    path('validate-user/', PendingUserCreateAPI.as_view()),
]