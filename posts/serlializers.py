from rest_framework import serializers
from .models import Author, Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

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
    def get_author(self, obj):
        return obj.author.username