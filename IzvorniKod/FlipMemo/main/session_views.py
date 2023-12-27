from .models import Session, Dictionary
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework import permissions


class InitializeSessionView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"]
            )

            Session.objects.create(
                student_id=request.user,
                answers_correct=0,
                answers_incorrect=0,
                mode=request.data["mode"],
                selected_dictionary=dictionary,
                current_question=None,
            )

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            print(e)
