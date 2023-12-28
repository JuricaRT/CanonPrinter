from .models import Dictionary
from django.http import JsonResponse
from .runtime_models import RuntimeSession

from rest_framework.views import APIView
from rest_framework import permissions

class InitializeSessionView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"]
            )
            dict_id = dictionary._id

            runtime_session = RuntimeSession()
            runtime_session.create_session(
                request.user._id,
                mode="test",
                selected_dictionary=dict_id
            )

            runtime_session.generate_question(request.user._id)

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            print(e)

class AnswerQuestionView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        try:
            runtime_session = RuntimeSession()

            session_data = runtime_session.session_data[request.user._id]
            if session_data.current_question.word_correct == request.data["answer"]:
                session_data.answers_correct += 1
            else:
                session_data.answers_incorrect += 1

            runtime_session.generate_question(request.user._id)

            return JsonResponse({'success': 'yes'}, content_type='application/json')
        except Exception as e:
            print(e)

class GetSessionView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        pass
        #print(Session.get_all())
