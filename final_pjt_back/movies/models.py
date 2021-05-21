from django.db import models
from django import forms
from django.conf import settings
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=200)
    original_title = models.CharField(max_length=200)
    overview = models.TextField()
    language = models.CharField(max_length=50)
    poster = models.URLField()
    genres = models.TextField()
    runtime = models.IntegerField()
    release_date = models.TextField()
    vote_average = models.FloatField()
    vote_count = models.IntegerField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(to=Movie, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)
    rank = models.IntegerField()
    
    def __str__(self):
        return self.content



class Wishlist(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(to=Movie, on_delete=models.CASCADE)

    def __str__(self):
        return self.movie