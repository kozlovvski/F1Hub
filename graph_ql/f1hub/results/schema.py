import graphene
from graphene_django import DjangoObjectType

from .models import Results


class ResultsType(DjangoObjectType):
    class Meta:
        model = Results


class Query(graphene.ObjectType):
    results = graphene.List(ResultsType)

    def resolve_results(self, info, **kwargs):
        return Results.objects.all()