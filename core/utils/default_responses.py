from rest_framework import status
from rest_framework.response import Response

def api_created_201(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_201_CREATED
    )

def api_accepted_202(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_202_ACCEPTED
    )

def api_created_226(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_226_IM_USED
    )

def api_payment_required_402(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_402_PAYMENT_REQUIRED
    )

def api_not_found_404(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_404_NOT_FOUND
    )


def api_locked_423(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_423_LOCKED
    )


def api_block_by_policy_451(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS
    )


def api_not_implemented_501(obj:dict = {}):
    return Response(
        obj,
        status=status.HTTP_501_NOT_IMPLEMENTED
    )

