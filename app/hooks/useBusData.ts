import { useCallback, useEffect, useState } from 'react';
import { busCollection } from '../components/busCollection';
import { useSeoulBus } from '../components/BusTimeline';
import { getProcessSteps } from '../components/steps';

const builduseSeoulBusQuery = (id: number) => `
  query {
    seoulBusArrival(routeId: ${id}) {
      response {
        msgBody {
          itemList {
            arrmsg1
            rtNm
            firstTm
            lastTm
            term
            stNm
          }
        }
      }
    }
  }
`;
const buildGyeonggiBusQuery = (id: number) => `
  query {
    gyeonggiBusArrival(stationId: ${id}) {
      response {
        msgBody {
          busArrivalList {
            routeName
            predictTime1
            locationNo1
            stationNm1
          }
        }
      }
    }
  }
`;

export const useBusData = (pathname: string) => {
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);
  const vehicle = pathname.slice(4, pathname.length);
  const isuseSeoulBus = useSeoulBus()
  console.log(vehicle)
  const fetchStep = async (id: number) => {
    let response;
    if (pathname.includes('se')) {
      // response = await fetch(`http://localhost:3000/seArrival/${id}`);
      response = await fetch(`http://localhost:5000/graphql`, {
      // response = await fetch(`https://qlroutes.onrender.com/graphql`, {
      // response = await fetch(`https://routes-xlbe.vercel.app/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: builduseSeoulBusQuery(id),
        }),
      });

      const responseText = await response.json();
      const res = responseText.data.seoulBusArrival;
      return res;
    }
    // response = await fetch(`http://localhost:3000/gyArrival/${id}`);
    response = await fetch(`http://localhost:5000/graphql`, {
    // response = await fetch(`https://qlroutes.onrender.com/graphql`, {
    // response = await fetch(`https://routes-xlbe.vercel.app/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: buildGyeonggiBusQuery(id),
      }),
    });

    const data = await response.json();
    const res = data.data.gyeonggiBusArrival?.response?.msgBody?.busArrivalList
    return res;
  };

  const fetchBusData = useCallback(async () => {
    const steps = getProcessSteps(vehicle);
    if (isuseSeoulBus) {
      const busNum = pathname.includes('busOne') ? '01' : pathname.includes('busTwo') ? '02' : 'A01';
      const busId = busCollection.seoul[busNum];
      const data = await fetchStep(busId);
      setBusData(data);
    } else {
      console.log('steps', steps)
      const prevData = {} as { [key: number]: any };
      const fetchPromises = steps.map(async (step) => {
        if (typeof step !== 'string' && 'id' in step) {
          try {
            const data = await fetchStep((step as any).id);
            prevData[(step as any).id] = data
            return data;
          } catch (error) {
            console.error('Error fetching bus data:', error);
            return null;
          }
        }
        return null;
      });
      
      await Promise.all(fetchPromises);
      setBusData(prevData);
    }
    setTimeUntilNextFetch(60);
  }, [vehicle, getProcessSteps]);

  useEffect(() => {
    if (vehicle?.includes('bus')) {
      fetchBusData();
      const interval = setInterval(fetchBusData, 60000);
      const countdownInterval = setInterval(() => {
        setTimeUntilNextFetch(prev => {
          if (prev <= 1) return 60;
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [vehicle, fetchBusData]);

  return { busData, timeUntilNextFetch, fetchBusData };
};
