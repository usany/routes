import { createSchema, createYoga } from 'graphql-yoga'
 
const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
  type BusArrivalInfo {
    plateNo: String
    remainTime: String
    remainingStops: String
    location: String
    lowPlate: String
    busType: String
    isLast: String
    isFullFlag: String
  }

  type BusRouteInfo {
    routeId: String
    routeName: String
    routeType: String
    routeTypeName: String
    company: String
    firstBusTime: String
    lastBusTime: String
    intervalTime: String
    routeLength: String
  }

  type ResponseHeader {
    resultCode: String
    resultMsg: String
  }

  type ResponseBody {
    items: ResponseItems
  }

  type ResponseItems {
    item: [BusArrivalInfo]
  }

  type SeoulBusResponse {
    resultCode: String
    resultMsg: String
    itemList: [BusArrivalInfo]
  }

  type GyeonggiBusResponse {
    response: GyeonggiResponseWrapper
  }

  type GyeonggiResponseWrapper {
    header: ResponseHeader
    body: ResponseBody
  }

  type RouteResponseItems {
    item: [BusRouteInfo]
  }

  type RouteResponseBody {
    items: RouteResponseItems
  }

  type GyeonggiRouteResponse {
    response: GyeonggiRouteWrapper
  }

  type GyeonggiRouteWrapper {
    header: ResponseHeader
    body: RouteResponseBody
  }

  type Query {
    hello: String
    seoulBusArrival(routeId: String!): SeoulBusResponse
    gyeonggiBusArrival(stationId: String!): GyeonggiBusResponse
    gyeonggiBusRoute(routeId: String!): GyeonggiRouteResponse
    busArrival(routeId: String!): String
  }

  type Mutation {
    setMessage(message: String!): String
  }
`,
    resolvers: {
      Query: {
        hello: () => 'Hello Deno!'
      }
    }
  }),
  graphqlEndpoint: '/graphql'
})
 
Deno.serve(yoga, {
  onListen({ hostname, port }) {
    console.log(`Listening on http://${hostname}:${port}/${yoga.graphqlEndpoint}`)
  }
})
