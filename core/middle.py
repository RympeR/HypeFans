from rest_framework.authtoken.models import Token
from apps.users.models import User

class DisableCSRFMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
        response = self.get_response(request)
        return response

class CustomAuthMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.pk and request.headers.get('Auth'):
            token = Token.objects.get(key=request.headers['Auth'].split()[1])
            user = User.objects.get(username=token.user)
            setattr(request, 'user', user)
        response = self.get_response(request)
        return response
