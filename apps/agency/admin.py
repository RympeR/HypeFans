from django.contrib import admin
from .models import Agency


@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = [
        'username', 'wallet',
    ]
    search_fields = [
        'username', 'wallet'
    ]
