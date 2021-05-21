from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=30, unique=True)
    password = models.TextField()
    email = models.EmailField(unique=True)
    pass

class Userlike(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.IntegerField()
    adventure = models.IntegerField()
    animation = models.IntegerField()
    comedy = models.IntegerField()
    crime = models.IntegerField()
    documentary = models.IntegerField()
    drama = models.IntegerField()
    family = models.IntegerField()
    fantasy = models.IntegerField()
    history = models.IntegerField()
    horror = models.IntegerField()
    music = models.IntegerField()
    mystery = models.IntegerField()
    romance = models.IntegerField()
    sf = models.IntegerField()
    tvmovie = models.IntegerField()
    thriller = models.IntegerField()
    war = models.IntegerField()
    western = models.IntegerField()