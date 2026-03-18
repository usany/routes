export const typeDefs = `
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

export interface BusScheduleData {
  routeName: string;
  upFirstTime: string;
  upLastTime: string;
  peekAlloc: string;
  nPeekAlloc: string;
  satPeekAlloc: string;
  satNPeekAlloc: string;
  sunPeekAlloc: string;
  sunNPeekAlloc: string;
  wePeekAlloc: string;
  weNPeekAlloc: string;
}
