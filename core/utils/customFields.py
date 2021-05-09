from rest_framework import serializers

class TimestampField(serializers.Field):
    def to_representation(self, value):
        return value.timestamp()

    def to_internal_value(self, value):
        return value
