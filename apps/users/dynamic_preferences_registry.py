from dynamic_preferences.types import (
    BooleanPreference,
    StringPreference,
    IntegerPreference,
    FloatPreference,
)
from dynamic_preferences.preferences import Section
from dynamic_preferences.registries import global_preferences_registry
from core.utils.customClasses import PreferenceMixin

general = Section('general')
settings = Section('settings')


@global_preferences_registry.register
class ReferralPercentage(PreferenceMixin, FloatPreference):
    section = settings
    name = 'referral_percentage'
    default = 0.05


@global_preferences_registry.register
class HostName(PreferenceMixin, StringPreference):
    section = settings
    name = 'host_name'
    default = 'hype-fans.com/'
