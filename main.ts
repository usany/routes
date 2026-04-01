import { createSchema, createYoga } from 'graphql-yoga'
import xmlToJson from './xmlToJson.ts'
import { load } from "@std/dotenv";
// import { load } from "jsr:@std/dotenv";

const env = await load()
// const env = await load({
  // optional: choose a specific path (defaults to ".env")
  // envPath: ".env.local",
  // optional: also export to the process environment (so Deno.env can read it)
  // export: true,
// });
const schema = `
  type BusArrivalInfo {
    arrmsg1: String
    rtNm: String
    vehId1: String
    firstTm: String
    lastTm: String
    term: String
    stId: String
  }

  type GyeonggiBusArrivalInfo {
    routeName: String
    predictTime1: String
    locationNo1: String
    stationNm1: String
  }
    
  type GyeonggiBusRouteInfo {
    routeName: String
    upFirstTime: String
    upLastTime: String
    peekAlloc: String
    nPeekAlloc: String
    satPeekAlloc: String
    satNPeekAlloc: String
    sunPeekAlloc: String
    sunNPeekAlloc: String
    wePeekAlloc: String
    weNPeekAlloc: String
  }

  type SeoulMsgHeader {
    headerCd: String
    headerMsg: String
    itemCount: String
  }

  type SeoulMsgBody {
    itemList: [BusArrivalInfo]
  }

  type SeoulResponse {
    msgHeader: SeoulMsgHeader
    msgBody: SeoulMsgBody
  }

  type SeoulBusResponse {
    response: SeoulResponse
  }

  type GyeonggiHeader {
    resultCode: String
    resultMsg: String
  }

  type GyeonggiBody {
    busArrivalList: [GyeonggiBusArrivalInfo]
  }

  type GyeonggiBusResponse {
    response: GyeonggiResponse
  }

  type GyeonggiResponse {
    msgHeader: GyeonggiHeader
    msgBody: GyeonggiBody
  }
  type GyeonggiRouteBody {
    busRouteInfoItem: GyeonggiBusRouteInfo
  }

  type GyeonggiRouteResponse {
    response: GyeonggiRouteResponseData
  }

  type GyeonggiRouteResponseData {
    msgHeader: GyeonggiHeader
    msgBody: GyeonggiRouteBody
  }

  type Query {
    hello: String
    seoulBusArrival(routeId: Int!): SeoulBusResponse
    gyeonggiBusArrival(stationId: Int!): GyeonggiBusResponse
    gyeonggiBusRoute(routeId: Int!): GyeonggiRouteResponse
    busArrival(routeId: Int!): String
  }

  type Mutation {
    setMessage(message: String!): String
  }
`;

const yoga = createYoga({
  schema: createSchema({
    typeDefs: schema,
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
