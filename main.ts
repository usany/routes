import { createSchema, createYoga } from 'graphql-yoga'
import xmlToJson from './xmlToJson.ts'
import { load } from "jsr:@std/dotenv";

const env = await load({
  // optional: choose a specific path (defaults to ".env")
  envPath: ".env.local",
  // optional: also export to the process environment (so Deno.env can read it)
  export: true,
});

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
        seoulBusArrival: async ({ routeId }: { routeId: String }) => {
    try {
      const apiKey = env.USERID;
      const url = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${apiKey}&busRouteId=${routeId}`;
      const response = await fetch(url);
      const xmlData = await response.text();
      const jsonData = xmlToJson(xmlData);

      // Transform XML data to match GraphQL schema
      return {
        resultCode: jsonData.ServiceResult?.msgHeader?.resultCode || "ERROR",
        resultMsg:
          jsonData.ServiceResult?.msgHeader?.resultMsg ||
          "Failed to fetch data",
        itemList:
          jsonData.ServiceResult?.msgBody?.itemList?.map((item) => ({
            plateNo: item.plainNo || "",
            remainTime: item.arrTime || "",
            remainingStops: item.remainSeatCnt || "",
            location: item.staNm || "",
            lowPlate: item.lowPlate || "",
            busType: item.busType || "",
            isLast: item.isLast || "",
            isFullFlag: item.isFullFlag || "",
          })) || [],
      };
    } catch (error) {
      console.error("Error fetching Seoul bus data:", error);
      return {
        resultCode: "ERROR",
        resultMsg: "Error fetching Seoul bus data",
        itemList: [],
      };
    }
  },

  gyeonggiBusArrival: async ({ stationId }: { stationId: String }) => {
    try {
      const apiKey = env.USERID;
      const url = `https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=${apiKey}&stationId=${stationId}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Gyeonggi bus arrival data:", error);
      return {
        response: {
          header: {
            resultCode: "ERROR",
            resultMsg: "Error fetching Gyeonggi bus arrival data",
          },
          body: {
            items: {
              item: [],
            },
          },
        },
      };
    }
  },

  gyeonggiBusRoute: async ({ routeId }: { routeId: String }) => {
    try {
      const apiKey = env.USERID;
      const url = `https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=${apiKey}&routeId=${routeId}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Gyeonggi bus route data:", error);
      return {
        response: {
          header: {
            resultCode: "ERROR",
            resultMsg: "Error fetching Gyeonggi bus route data",
          },
          body: {
            items: {
              item: [],
            },
          },
        },
      };
    }
  },
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
