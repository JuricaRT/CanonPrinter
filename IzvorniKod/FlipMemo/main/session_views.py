from .models import Dictionary, StudyData, StudyDataDictionary, StudyDataWords, Word
from django.http import JsonResponse
from .runtime_models import runtime_session, Mode
import random

from rest_framework.views import APIView

#TODO polish - modificranje dictionaryja bi trebalo izbrisat study data za taj dictionary

class InitializeSessionView(APIView):
    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"]
            )

            study_data = StudyData.objects.filter(student_id=request.user).first()

            if study_data is None:
                study_data = StudyData.objects.create(
                    student_id=request.user
                )
                study_data.save()

            study_data_dictionary = StudyDataDictionary.objects.filter(study_data=study_data, _dict=dictionary).first()

            if study_data_dictionary is None:
                study_data_dictionary = StudyDataDictionary.objects.create(
                    study_data=study_data,
                    _dict=dictionary
                )
                study_data_dictionary.save()

            runtime_session.create_session(
                request.user._id,
                mode=Mode(int(request.data["mode"])),
                selected_dictionary=dictionary
            )

            runtime_session.generate_question(request.user._id, study_data_dictionary, None)

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Something went wrong when trying to initialize session for particular user'})


class AnswerQuestionView(APIView):
    def post(self, request, format=None):
        try:
            session_data = runtime_session.session_data[request.user._id]
            answer_correct = ''

            if session_data.mode == Mode.LTC or session_data.mode == Mode.CTL or session_data.mode == Mode.AUD:
                if session_data.current_question.word_correct == request.data["answer"]:
                    session_data.answers_correct += 1
                    answer_correct = 'yes'
                else:
                    session_data.answers_incorrect += 1
                    answer_correct = 'no'
            elif session_data.mode == Mode.REC:
                rand_res = random.randint(1, 10)
                answer_correct = str(rand_res)
                if rand_res < 6:
                    session_data.answers_incorrect += 1
                else:
                    session_data.answers_correct += 1

            
            study_data = StudyData.objects.get(student_id=request.user)
            study_data_dictionary = StudyDataDictionary.objects.get(study_data=study_data, _dict=session_data.selected_dictionary)
            study_data_word = StudyDataWords.objects.filter(study_data_dictionary=study_data_dictionary, _word=session_data.current_question.word).first()

            if study_data_word is None:
                word_count = Word.objects.filter(parent_dict=session_data.selected_dictionary).count()
                study_data_word = StudyDataWords.objects.create(
                    study_data_dictionary=study_data_dictionary, 
                    _word=session_data.current_question.word,
                    hidden_for = word_count / 2
                    )
                study_data_word.save()

            study_data_words_all = StudyDataWords.objects.filter(study_data_dictionary=study_data_dictionary)
            for word in study_data_words_all:
                word.hidden_for -= 1
                word.save()
                if word.hidden_for <= 0:
                    word.delete()

            runtime_session.generate_question(request.user._id, study_data_dictionary, study_data_words_all)

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
            print(e)
            return JsonResponse({'error': 'Something went wrong when trying to get session for particular user'})

class DestroySessionView(APIView):
    def get(self, request, format=None):

        try:
            runtime_session.destroy_session(request.user._id)
            return JsonResponse({'success' : 'yes'})
        except Exception as e:
            return JsonResponse({'error': 'Something went wrong when trying to destroy session for particular user'})
