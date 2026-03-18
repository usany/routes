import { gql } from '@apollo/client';

export const GET_BUS_SCHEDULES = gql`
  query GetBusSchedules($campus: String!, $routeIds: [Int!]!) {
    busSchedules(campus: $campus, routeIds: $routeIds) {
      routeName
      upFirstTime
      upLastTime
      peekAlloc
      nPeekAlloc
      satPeekAlloc
      satNPeekAlloc
      sunPeekAlloc
      sunNPeekAlloc
      wePeekAlloc
      weNPeekAlloc
    }
  }
`;
