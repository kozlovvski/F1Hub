import graphene
from graphene_django import DjangoObjectType

from .models import Result


class ResultType(DjangoObjectType):
    class Meta:
        model = Result


class Query(graphene.ObjectType):
    results = graphene.List(ResultType, raceId=graphene.Int(), constructor=graphene.String(), year=graphene.Int())

    def resolve_results(self, info, raceId=None, constructor=None, year=None, **kwargs):
        data = Result.objects.all()
        if year and constructor:
            return data.filter(raceId_id__year=year).filter(constructorId_id__constructorRef=constructor)[:2]
        if raceId:
            return data.filter(raceId=raceId)       
        if constructor:
            return data.filter(constructorId_id__constructorRef=constructor)
        if year:
            return data.filter(raceId_id__year=year)