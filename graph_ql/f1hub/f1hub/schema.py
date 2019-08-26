import graphene

import drivers.schema
import circuits.schema
import constructors.schema
import results.schema
import seasons.schema
import races.schema

class Query(drivers.schema.Query, circuits.schema.Query, constructors.schema.Query, results.schema.Query, seasons.schema.Query, races.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)