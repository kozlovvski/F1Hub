import graphene
from graphene_django import DjangoObjectType

from .models import Seasons


class SeasonsType(DjangoObjectType):
    class Meta:
        model = Seasons


class Query(graphene.ObjectType):
    seasons = graphene.List(SeasonsType)

    def resolve_seasons(self, info, **kwargs):
        return Seasons.objects.all()