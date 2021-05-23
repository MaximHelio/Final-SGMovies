from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator
# from django.shortcuts import render

from django.shortcuts import get_object_or_404

from .serializers import MovieSerializer
from .models import Movie

# Create your views here.
@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'GET':
        # 1. 모든 movie list를 가져온다
        movies = Movie.objects.all()
        # 1-2. 20개씩 짤라서 페이지네이션
        paginator = Paginator(movies, 20)  

        page = request.GET.get('page')
        movies = paginator.get_page(page)

        # 2. serialize
        serializer = MovieSerializer(movies, many=True) 
        # 3. 응답
        return Response(data=serializer.data)
    
    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data) # binding
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user)
            # API 응답 구조
            # - 응답 데이터
            # - 상태 코드(201)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, todo_id):
    movies = get_object_or_404(Movie, pk=todo_id)
    
    if request.method == 'GET':
        serializer = MovieSerializer(movies)
        return Response(data=serializer.data)

    elif request.method == 'PUT':
        serializer = MovieSerializer(
            data=request.data, instance=movies
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data)
    
    elif request.method == 'DELETE':
        movies.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)