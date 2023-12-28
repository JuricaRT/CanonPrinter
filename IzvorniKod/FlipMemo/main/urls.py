from django.urls import path
import main.user_views as user_views
import main.admin_views as admin_views
import main.dict_views as dict_views
import main.session_views as session_views

urlpatterns = [
    path("login", user_views.LoginView.as_view()),
    path('authenticated', user_views.CheckAuthenticatedView.as_view()),
    path('logout', user_views.LogoutView.as_view()),
    path('signup', user_views.SignupView.as_view()),
    path('csrf_cookie', user_views.GetCSRFToken.as_view()),
    path('profile', user_views.UserProfileView.as_view()),
    path("edit_profile", user_views.EditProfileView.as_view()),
    path("update_pass", user_views.ChangeInitialPassView.as_view()),
    path("delete_user_admin", admin_views.DeleteUserViewAdmin.as_view()),
    path("delete_user", user_views.DeleteUserView.as_view()),

    path("get_admins", admin_views.GetAdministratorsView.as_view()),
    path("add_admin", admin_views.AddAdministratorView.as_view()),
    path("remove_admin", admin_views.RemoveAdministratorView.as_view()),
    path("get_students", admin_views.GetStudentsView.as_view()),

    path("create_dictionary", dict_views.CreateDictionaryView.as_view()),
    path("add_word", dict_views.AddWordView.as_view()),
    path("remove_dictionary", dict_views.RemoveDictionaryView.as_view()),
    path("remove_word", dict_views.RemoveWordView.as_view()),
    path("edit_dictionary", dict_views.EditDictionaryView.as_view()),
    path("edit_word", dict_views.EditWordView.as_view()),
    path("get_dictionaries", dict_views.GetDictionariesView.as_view()),
    path("get_words_from_dict", dict_views.GetWordsFromDictView.as_view()),
    path("add_word_list", dict_views.AddWordListView.as_view()),

    path("initialize_session", session_views.InitializeSessionView.as_view()),
    path("get_session", session_views.GetSessionView.as_view()),
    path("answer_question", session_views.AnswerQuestionView.as_view()),
]