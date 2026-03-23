import { useState, useCallback, useEffect } from 'react';

export const useBusData = (vehicle: string, getProcessSteps: (vehicleType: string) => any[]) => {
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);

  const fetchStep = async (id: number) => {
    let response;
    if (vehicle === 'busOne' || vehicle === 'busTwo') {
      response = await fetch(`http://localhost:3000/bus/${id}`);
      const responseText = await response.text();
      return responseText;
    }
    response = await fetch(`https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&stationId=${id}&format=json`);
    const data = await response.json();
    const res = data.response.msgBody.busArrivalList;
    return res;
  };

  const fetchBusData = useCallback(async () => {
    const steps = getProcessSteps(vehicle);
    steps.forEach(async (step) => {
      if (typeof step !== 'string' && 'id' in step) {
        const data = await fetchStep((step as any).id);
        setBusData(prev => ({ ...prev, [(step as any).id]: data }));
      }
    });
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
