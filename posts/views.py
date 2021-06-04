from django.db.models import query
from django.shortcuts import render
from .models import Author, Post
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serlializers import PostSerializer


def home(request):
    return render(request, "index.html")


class PostListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    queryset = Post.objects.all()
