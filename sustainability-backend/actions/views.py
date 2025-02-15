from rest_framework.views import APIView
from rest_framework.response import Response

# GET and POST Requests


class ActionList(APIView):
    def get(self, request):
        return Response({"message": "Hello from GET"})

    def post(self, request):
        return Response({"message": "Hello from POST"})

# PUT/PATCH and DELETE Requests


class ActionDetail(APIView):
    def put(self, request, id):
        return Response({"message": f"Hello from PUT/PATCH for ID {id}"})

    def delete(self, request, id):
        return Response({"message": f"Hello from DELETE for ID {id}"})