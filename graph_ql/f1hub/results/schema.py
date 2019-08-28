import graphene
from graphene_django import DjangoObjectType

from .models import Result


class ResultType(DjangoObjectType):
    class Meta:
        model = Result


class Query(graphene.ObjectType):
    results = graphene.List(ResultType, raceId=graphene.Int(), constructor=graphene.String(), year=graphene.Int(), round=graphene.Int())

    def resolve_results(self, info, raceId=None, constructor=None, year=None, round=None, **kwargs):
        data = Result.objects.all()
        if raceId:
            data = data.filter(raceId=raceId)       
        if constructor:
            data = data.filter(constructorId_id__constructorRef__icontains=constructor)
        if year:
            data = data.filter(raceId_id__year=year)
        if round:
            data = data.filter(raceId_id__round=round)

        return data