from django.http import JsonResponse, HttpResponse
from .models import Dictionary, Word
from itertools import groupby
from operator import itemgetter
from django.conf import settings
import encodings

from rest_framework.views import APIView
from rest_framework import permissions

from google.cloud import texttospeech
from google.oauth2 import service_account

class CreateDictionaryView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):
        try:
            if Dictionary.objects.filter(dict_name=request.data["dict_name"], language=request.data["language"]):

                return JsonResponse({'status': 'exists'}, content_type='application/json', safe=False)

            dictionary = Dictionary.objects.create(
                dict_name=request.data["dict_name"],
                language=request.data["language"],
            )

            dictionary.save()

            if request.data["word_list"] is not None:
                word_list = request.data["word_list"]

                add_word_list(dictionary, word_list)

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except:
            return JsonResponse({'error': 'Something went wrong when trying to create dictionary'})


class AddWordView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"])

            if Word.objects.filter(parent_dict=dictionary, word_str=request.data["word_str"]):

                return JsonResponse({'status': 'exists'}, content_type='application/json', safe=False)

            if Word.objects.filter(word_str=request.data["word_str"], language=request.data["language"]):
                word = Word.objects.get(
                    word_str=request.data["word_str"], language=request.data["language"])
                word.parent_dict.add(dictionary)

                return JsonResponse({'status': 'dictionary added to existing word'}, content_type='application/json', safe=False)

            word = Word.objects.create(
                language=request.data["language"],
                word_str=request.data["word_str"],
                cro_translation=request.data["cro_translation"],
                definition=request.data["definition"],
                word_type=request.data["word_type"],
            )

            word.parent_dict.set([dictionary])
            word.save()

            return JsonResponse({'success': 'yes'}, content_type='applicaton/json', safe=False)
        except:
            return JsonResponse({'error': 'Something went wrong when trying to add word to dictionary'})


class RemoveDictionaryView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"])

            dictionary.delete()

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            return JsonResponse({'error': 'Something went wrong when trying to remove dictionary'})



class RemoveWordView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"],
                language=request.data["language"]
            )

            if Word.objects.filter(parent_dict=dictionary, word_str=request.data["word_str"], language=request.data["language"]):
                word = Word.objects.get(
                    parent_dict=dictionary, word_str=request.data["word_str"], language=request.data["language"])

                word.parent_dict.remove(dictionary)

                if word.parent_dict.count() <= 0:
                    word.delete()

                    return JsonResponse({'status': 'whole word deleted'}, content_type='application/json', safe=False)

                return JsonResponse({'status': 'just removed dictionary, word still has other dictionaries'}, content_type='application/json', safe=False)

            return JsonResponse({'status': 'word does not exist in particular dictionary'})
        except SystemError as e:
            return JsonResponse({'error': 'Something went wrong when trying to remove word from dictionary'})


class EditDictionaryView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"])

            if Dictionary.objects.filter(dict_name=request.data["new_dict_name"], language=request.data["language"]):

                return JsonResponse({'status': 'this dictionary name is already in use, try different one'})

            dictionary.dict_name = request.data["new_dict_name"]

            dictionary.save()

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            return JsonResponse({'error': 'Something went wrong when trying to edit dictionary'})


class EditWordView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):

        try:
            word = Word.objects.get(
                word_str=request.data["word_str"], language=request.data["language"])

            if request.data["new_word_str"] is not None:
                word.word_str = request.data["new_word_str"]

            if request.data["new_cro_translation"] is not None:
                word.cro_translation = request.data["new_cro_translation"]

            if request.data["new_definition"] is not None:
                word.definition = request.data["new_definition"]

            if request.data["new_word_type"] is not None:
                word.word_type = request.data["new_word_type"]

            word.save()

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            return JsonResponse({'error': 'Something went wrong when trying to edit word'})


class GetDictionariesView(APIView):
    def get(self, request, format=None):
        MIN_WORDS_PER_CAT = 4
        
        dicts = Dictionary.objects.all()
        dictionary_dict = [dict.to_dict() for dict in dicts]
        dictionary_dict = sorted(dictionary_dict, key=itemgetter('language'))

        json_dict = {}

        for lang_name, dicts_in_group in groupby(dictionary_dict, key=itemgetter("language")):
            dicts_for_lang = []
            for dict in dicts_in_group:
                isLearnable = False
                nounCount, verbCount, adjectiveCount, adverbCount = 0, 0, 0, 0
                words_in_dict = Word.objects.filter(parent_dict__language=lang_name,
                                                    parent_dict__dict_name=dict["dict_name"])
                for word in words_in_dict:
                    word_type = word.to_dict()["word_type"]
                    if word_type == "imenica": nounCount += 1
                    elif word_type == "glagol": verbCount += 1
                    elif word_type == "pridjev": adjectiveCount += 1
                    elif word_type == "prijedlog": adverbCount += 1 # TODO: nije prijedlog nego prilog

                if (nounCount >= MIN_WORDS_PER_CAT and 
                    verbCount >= MIN_WORDS_PER_CAT and 
                    adjectiveCount >= MIN_WORDS_PER_CAT and 
                    adverbCount >= MIN_WORDS_PER_CAT): isLearnable = True

                dicts_for_lang.append({"dict_name" : dict["dict_name"], "isLearnable" : isLearnable})
                
            json_dict[lang_name] = dicts_for_lang
        
        return JsonResponse({'dicts': json_dict}, content_type='application/json', safe=False)


class GetWordsFromDictView(APIView):
    def put(self, request, format=None):
        words = Word.objects.filter(
            parent_dict__language=request.data["language"], parent_dict__dict_name=request.data["dict_name"])
        words_dict = [word.to_dict() for word in words]
        for word in words_dict: del word["_id"]
        return JsonResponse({'words': words_dict}, content_type='application/json', safe=False)


class AddWordListView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"])

            word_list = request.data["word_list"]
            
            add_word_list(dictionary, word_list)

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            return JsonResponse({'error': 'Something went wrong when trying to add list of words to dictionary'})


def add_word_list(dictionary, word_list):
    for word in word_list:
        if Word.objects.filter(parent_dict=dictionary, word_str=word["word_str"]) or word['language'] != dictionary.language:
            continue

        if Word.objects.filter(word_str=word["word_str"], language=dictionary.language):
            word = Word.objects.get(
                word_str=word["word_str"], language=dictionary.language)
            word.parent_dict.add(dictionary)
            continue

        new_word = Word.objects.create(**word)
        new_word.parent_dict.set([dictionary])
        new_word.save()

class GetWordAudioView(APIView):
    def put(self, request, format=None):
        try:
            client = texttospeech.TextToSpeechClient(credentials=service_account.Credentials.from_service_account_file(settings.GOOGLE_SERVICE_ACCOUNT_PATH))

            synthesis_input = texttospeech.SynthesisInput(text=request.data["word"])

            voice = texttospeech.VoiceSelectionParams(
                language_code=settings.GOOGLE_LANGUAGE_CODE,
                name=settings.GOOGLE_VOICE_NAME,
                ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
            )

            audio_config = texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.LINEAR16
            )

            response = client.synthesize_speech(
                input=synthesis_input,
                voice=voice,
                audio_config=audio_config
            )

            return HttpResponse(response.audio_content, content_type='application/octet-stream')
        except Exception as e:
            print(e)
            return HttpResponse(bytes(bytearray(0)), content_type='application/octet-stream')