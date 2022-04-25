from django import template
from app.dynamic_preferences_registry import  (LowFilterBorder,
                                                UpperFilterBorder,)
register = template.Library()

@register.simple_tag
def lower(*args):
    return LowFilterBorder.value()

@register.simple_tag
def upper(*args):
    return UpperFilterBorder.value()