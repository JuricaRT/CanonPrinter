from django.http import JsonResponse
from .models import CustomUser, Dictionary, Word
import json

from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


class DeleteUserViewAdmin(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):
        try:
            CustomUser.objects.get(email=request.data["email"]).delete()

            return JsonResponse({'success': 'User deleted successfully', 'email': request.data["email"]}, content_type='application/json', safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Something went wrong when trying to delete user'})


class GetStudentsView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        students = CustomUser.objects.filter(is_staff__in=[False])

        students_list = []

        for student in students:
            students_list.append(student.to_dict())

        json_data = json.dumps(students_list)

        return JsonResponse({'students': json_data}, content_type='application/json', safe=False)


class GetAdministratorsView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):
        admins = CustomUser.objects.filter(is_staff__in=[True])

        admins_list = []

        for admin in admins:
            admins_list.append(admin.to_dict())

        json_data = json.dumps(admins_list)

        return JsonResponse({'admins': json_data}, content_type='application/json', safe=False)


class AddAdministratorView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.data["email"])
            user.is_superuser = True
            user.is_staff = True
            user.save()

            return JsonResponse({'success': 'yes', 'email': request.data["email"]}, content_type='application/json', safe=False)

        except CustomUser.DoesNotExist:
            pass


class RemoveAdministratorView(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def put(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.data["email"])
            user.is_superuser = False
            user.is_staff = False
            user.save()

            return JsonResponse({'success': 'yes', 'email': request.data["email"]}, content_type='application/json', safe=False)

        except CustomUser.DoesNotExist:
            pass


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

            word = Word.objects.get(
                parent_dict=dictionary, word_str=request.data["word_str"], language=request.data["language"])

            word.parent_dict.remove(dictionary)

            if word.parent_dict.count() <= 0:
                word.delete()

                return JsonResponse(({'status': 'whole word deleted'}), content_type='application/json', safe=False)

            return JsonResponse({'status': 'just removed dictionary, word still has other dictionaries'}, content_type='application/json', safe=False)
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
