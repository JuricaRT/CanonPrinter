from django.http import JsonResponse
from .models import Dictionary, Word
from itertools import groupby
from operator import itemgetter

from rest_framework.views import APIView
from rest_framework import permissions

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

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            print(e)


class AddWordView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):

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
        except SystemError as e:
            print(e)


class RemoveDictionaryView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def post(self, request, format=None):

        try:
            dictionary = Dictionary.objects.get(
                dict_name=request.data["dict_name"], language=request.data["language"])

            dictionary.delete()

            return JsonResponse({'success': 'yes'}, content_type='application/json', safe=False)
        except SystemError as e:
            print(e)


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
            print(e)


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
            print(e)


class EditWordView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    # def put(self, request, format=None):

    #     try:
    #         word = Word.objects.get(
    #             word_str=request.data["word_str"], language=request.data["language"])
    #     except SystemError as e:
    #         print(e)

class GetDictionariesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        dicts = Dictionary.objects.all()
        dictionary_dict = [dict.to_dict() for dict in dicts]
        dictionary_dict = sorted(dictionary_dict, key=itemgetter('language'))

        json_dict = {dict_name : [dict["dict_name"] for dict in dicts_in_group] 
                     for dict_name, dicts_in_group in groupby(dictionary_dict, key=itemgetter("language"))}

        return JsonResponse({'dicts': json_dict}, content_type='application/json', safe=False)


class GetWordsFromDictView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        words = Word.objects.filter(parent_dict__language=request.data["language"], parent_dict__dict_name=request.data["dict_name"])
        words_dict = [word.to_dict() for word in words]

        return JsonResponse({'words': words_dict}, content_type='application/json', safe=False)
