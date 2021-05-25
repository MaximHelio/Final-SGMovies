from rest_framework import serializers
from .models import Movie, Comment, Wishlist


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment 
        fields = ('user','movie', 'rank', 'content', 'username', 'id')
        # 댓글을 작성할 때, movie는 입력하지 않을 것이므로, movie필드는 읽기 전용.
        read_only_fields = ['movie', 'user', 'id']


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ('movie', 'user')
        read_only_fields = ['movie', 'user']


class MovieItemSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
        
    class Meta:
        model = Movie
        fields = ('id', 'title', 'original_title', 
        'overview', 'language', 'poster', 'genres', 
        'runtime', 'release_date', 'vote_average', 'vote_count', 
        'comment_set')