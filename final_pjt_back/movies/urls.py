from django.urls import path
from . import views


urlpatterns = [

    # GET, POST http://localhost:8000/api/v1/
    path('', views.index),
    # GET, PIT, DELETE  http://localhost:8000/api/v1/todos/:id
    path('<int:todo_id>/', views.movie_detail),
    # GET, POST http://localhost:8000/api/v1/latest/
    path('latest/', views.latest),
]