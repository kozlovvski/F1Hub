import graphene

import drivers.schema
import results.schema
import constructors.schema
import races.schema


class Query(drivers.schema.Query, results.schema.Query, constructors.schema.Query, races.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
