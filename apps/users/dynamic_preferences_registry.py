from dynamic_preferences.types import (
    StringPreference,
    IntegerPreference,
    FloatPreference,
)
from dynamic_preferences.preferences import Section
from dynamic_preferences.registries import global_preferences_registry
from core.utils.customClasses import PreferenceMixin


settings = Section('settings')


@global_preferences_registry.register
class ReferralPercentage(PreferenceMixin, FloatPreference):
    section = settings
    name = 'referral_percentage'
    default = 0.05


@global_preferences_registry.register
class WithdrawPercentage(PreferenceMixin, FloatPreference):
    section = settings
    name = 'withdraw_percentage'
    default = 0.8


@global_preferences_registry.register
class CrdtitTransferPercentage(PreferenceMixin, FloatPreference):
    section = settings
    name = 'credit_transfer_percentage'
    default = 0.1


@global_preferences_registry.register
class FreeDays(PreferenceMixin, IntegerPreference):
    section = settings
    name = 'free_days'
    default = 7


@global_preferences_registry.register
class ChatSubscriptionDuration(PreferenceMixin, IntegerPreference):
    section = settings
    name = 'chat_subscription_duration'
    default = 7


@global_preferences_registry.register
class HostName(PreferenceMixin, StringPreference):
    section = settings
    name = 'host_name'
    default = 'hype-fans.com/'


@global_preferences_registry.register
class CryptoWalletAddress(PreferenceMixin, StringPreference):
    section = settings
    name = 'crypto_address'
    default = 'hype-fans.com/'
