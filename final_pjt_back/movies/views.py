import re
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator
# from django.shortcuts import render

from django.shortcuts import get_object_or_404

from .serializers import (
    MovieSerializer,
    CommentSerializer
)
from .models import Movie, Comment


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


# 댓글 전체 리스트 가져오기
@api_view(['GET'])
def comment_list(request, movie_id):
    print(movie_id)
    comments = Comment.objects.filter(movie_id=movie_id)
    print(comments)
    serializer = CommentSerializer(comments, many=True)
    return Response(data=serializer.data)
    # comments = Comment.objects.all()
    # serializer = CommentSerializer(comments, many=True)
    # return Response(data=serializer.data)

# 댓글 만들기
@api_view(['POST'])
def create_comment(request):
    movie_id = request.data.get('movieId')
    username = request.data.get('userId')
    content = request.data.get('comment')
    rank = float(request.data.get('rank'))
    print(movie_id, username)
    print(request.data)

    movie = get_object_or_404(Movie, id=movie_id)
    user = get_object_or_404(get_user_model(), username=username)
    data = {
        'content': content,
        'rank': rank,
        'username': username,
    }

    serializer = CommentSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        # 댓글 정보 영화에 저장
        comment = serializer.save(movie=movie, user=user)
        return Response(data=serializer.data)

# 댓글 수정 및 삭제
# http://localhost:8000/api/v1/movies/comments/<int:comment_id>/
@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(data=serializer.data)

    elif request.method == 'DELETE':
        comment = comment.delete()
        data = {
            'message': '댓글 삭제가 완료되었습니다.'
        }
        return Response(data=data, status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True): 
            serializer.save()
            return Response(data=serializer.data)

# Create your views here.
@api_view(['GET'])
def latest(request):
    # 1. 모든 movie list를 가져온다
    movies = Movie.objects.all()
    # 2. serialize
    serializer = MovieSerializer(movies, many=True)
    # 3. 응답
    return Response(data=serializer.data)


@api_view(['GET'])
def best(request):
    movies = Movie.objects.order_by('vote_average')[:5]
    serializer = MovieSerializer(movies, many=True)
    return Response(data=serializer.data)


@api_view(['GET'])
def search_movie(request, keyword):
    reg = re.compile(r'[a-zA-Z]')

    if reg.match(keyword):
        movies = Movie.objects.filter(original_title__contains=keyword)
    else:
        movies = Movie.objects.filter(title__contains=keyword)
    
    serializer = MovieSerializer(movies, many=True)
    
    return Response(data=serializer.data)


@api_view(['GET'])
def filter_movie(request, category):
    movies = Movie.objects.filter(genres__contains=category)

    serializer = MovieSerializer(movies, many=True)

    return Response(data=serializer.data)


@api_view(['POST'])
def check_movie(request):
    print(request.data)
    return Response({'message':'wait'})