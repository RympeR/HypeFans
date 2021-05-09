from rest_framework import generics
from rest_framework import permissions
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.views import APIView
from .models import *
import random
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
