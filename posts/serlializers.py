from rest_framework import serializers
from .models import Author, Post


class AuthorSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()


    class Meta:
        model = Author
        fields = (
            'username',
        )

    def get_username(self, obj):
        return obj.user.username

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'content',
            'publish_date',
            'update',
            'author',
        )


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'title',
            'content',
            'author',
        )