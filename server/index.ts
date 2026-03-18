import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql';

// GraphQL schema
const typeDefs = gql`
  type BusSchedule {
    routeName: String!
    upFirstTime: String!
    upLastTime: String!
    peekAlloc: String!
    nPeekAlloc: String!
    satPeekAlloc: String!
    satNPeekAlloc: String!
    sunPeekAlloc: String!
    sunNPeekAlloc: String!
    wePeekAlloc: String!
    weNPeekAlloc: String!
  }

  type Query {
    busSchedules(campus: String!, routeIds: [Int!]!): [BusSchedule!]!
  }
`;

// Bus collection data (same as in frontend)
const busCollection = {
  seoul: {
    '01': 1,
    '02': 2,
    'A01': 3,
  },
  gwangneung: {
    '2': 241348004,
    '21': 222000170,
    '2-2': 241348005,
    '2-2A': 241348002,
    '2A': 241348001,
  },
  global: {
    'M5107': 234001243,
    '5100': 200000115,
    '1112': 234000016,
    '9': 200000103,
    '1560A': 234000884,
    '1560B': 228000433,
    '7000': 200000112,
    'P9242(퇴근)': 233000335,
    '1550-1': 234000324,
    '1112(reserved)': 200000333,
    '28-3': 241425038,
    '900': 200000010,
    '7-2': 200000040,
    '53': 241425010,
    '18-1': 241425018,
    '9-1': 200000186,
    '310': 200000024,
    '5': 200000076,
    'M5107(reserved)': 200000335,
    '1550-1(reserved)': 223000151,
    '32': 241448007
  },
};

// Fetch bus data from REST API
const fetchBusData = async (id: number) => {
  const response = await fetch(`https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&routeId=${id}&format=json`);
  const data = await response.json();
  const res = data.response.msgBody.busRouteInfoItem;
  
  // Only return the fields we need
  return {
    routeName: res.routeName,
    upFirstTime: res.upFirstTime,
    upLastTime: res.upLastTime,
    peekAlloc: res.peekAlloc,
    nPeekAlloc: res.nPeekAlloc,
    satPeekAlloc: res.satPeekAlloc,
    satNPeekAlloc: res.satNPeekAlloc,
    sunPeekAlloc: res.sunPeekAlloc,
    sunNPeekAlloc: res.sunNPeekAlloc,
    wePeekAlloc: res.wePeekAlloc,
    weNPeekAlloc: res.weNPeekAlloc
  };
};

// Resolvers
const resolvers = {
  Query: {
    busSchedules: async (_: any, { campus, routeIds }: { campus: string, routeIds: number[] }) => {
      try {
        console.log(`Fetching bus schedules for campus: ${campus}, routeIds: ${routeIds}`);
        
        const promises = routeIds.map((routeId: number) => fetchBusData(routeId));
        const results = await Promise.all(promises);
        
        console.log(`Successfully fetched ${results.length} bus schedules`);
        return results;
      } catch (error) {
        console.error('Error fetching bus schedules:', error);
        throw new Error('Failed to fetch bus schedules');
      }
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 GraphQL Server ready at: ${url}`);
}

startServer().catch(console.error);
