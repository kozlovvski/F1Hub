import graphene
from graphene_django import DjangoObjectType

from .models import Results


class ResultsType(DjangoObjectType):
    class Meta:
        model = Results


class Query(graphene.ObjectType):
    results = graphene.List(ResultsType, driver=graphene.String())

    def resolve_results(self, info,driver=None, **kwargs):
        if driver:
            return Results.objects.filter(driver_id=driver)
        return Results.objects.all()