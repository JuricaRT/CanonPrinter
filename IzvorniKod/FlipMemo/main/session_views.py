from .models import Dictionary
from django.http import JsonResponse
from .runtime_models import RuntimeSession, Mode

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
                mode=Mode(int(request.data["mode"])),
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
            answer_correct = ''

            if session_data.mode == '0' or session_data.mode == '1':
                if session_data.current_question.word_correct == request.data["answer"]:
                    session_data.answers_correct += 1
                    answer_correct = 'yes'
                else:
                    session_data.answers_incorrect += 1
                    answer_correct = 'no'
            

            runtime_session.generate_question(request.user._id)

            return JsonResponse({'success': 'yes', 'answer_correct': answer_correct}, content_type='application/json')
        except SystemError as e:
            print(e)

class GetSessionView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):

        try:
            runtime_session = RuntimeSession()

            session_data = runtime_session.session_data[request.user._id]

            return JsonResponse(
                {
                    'question': session_data.current_question.word_question,
                    'answers': session_data.current_question.word_answers,
                    'correct': session_data.current_question.word_correct,
                    'correct_answers': session_data.answers_correct,
                    'incorrect_answers': session_data.answers_incorrect,
                }
            )
        except Exception as e:
            print(e)

class DestroySessionView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):

        try:
            runtime_session = RuntimeSession()

            runtime_session.destroy_session(request.user._id)
        except Exception as e:
            print(e)


