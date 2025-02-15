from django.urls import path
from .views import ActionList, ActionDetail

urlpatterns = [
    path('actions/', ActionList.as_view(), name='action-list'),  # GET and POST
    path('actions/<int:id>/', ActionDetail.as_view(),
         name='action-detail'),  # PUT/PATCH and DELETE
]