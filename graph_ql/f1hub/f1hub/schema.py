import graphene

import drivers.schema
import circuits.schema
import constructors.schema
import results.schema


class Query(drivers.schema.Query, circuits.schema.Query, constructors.schema.Query, results.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)