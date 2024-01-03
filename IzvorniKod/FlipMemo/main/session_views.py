from .models import Dictionary
from django.http import JsonResponse
from .runtime_models import runtime_session, Mode

from rest_framework.views import APIView

class InitializeSessionView(APIView):
    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"]
            )

            runtime_session.create_session(
                request.user._id,
                mode=Mode(request.data["mode"]),
                selected_dictionary=dictionary
            )

            runtime_session.generate_question(request.user._id)

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except:
            return JsonResponse({'error': 'Something went wrong when trying to initialize session for particular user'})


class AnswerQuestionView(APIView):
    def post(self, request, format=None):
        try:
            session_data = runtime_session.session_data[request.user._id]
            answer_correct = ''

            if session_data.mode == Mode.LTC or session_data.mode == Mode.CTL:
                if session_data.current_question.word_correct == request.data["answer"]:
                    session_data.answers_correct += 1
                    answer_correct = 'yes'
                else:
                    session_data.answers_incorrect += 1
                    answer_correct = 'no'

            runtime_session.generate_question(request.user._id)

            return JsonResponse({'success': 'yes', 'answer_correct': answer_correct}, content_type='application/json')
        except SystemError as e:
            return JsonResponse({'error': 'Something went wrong when trying answer question'})

class GetSessionView(APIView):
    def get(self, request, format=None):

        try:
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
            return JsonResponse({'error': 'Something went wrong when trying to get session for particular user'})

class DestroySessionView(APIView):
    def post(self, request, format=None):

        try:
            runtime_session.destroy_session(request.user._id)
        except Exception as e:
            return JsonResponse({'error': 'Something went wrong when trying to destroy session for particular user'})
