import { useEffect, useState, useRef, memo } from "react";

// Global flag to prevent multiple fetches across component remounts
let globalHasFetched = false;

export const busCollection = {
  seoul: {
    '01': 1,
    '02': 2,
    'A01': 3,
  },
  gwangneung: {
    '2': 241348004,
    '21': 222000170,
    '2-2A': 241348002,
    '2A': 241348001,
    '2-2': 241348005
  },
  global: {
    'M5107': 234001243,
    '5100': 200000115,
    '1112(reserved)': 200000333,
    '1112': 234000016,
    'P9242(퇴근)': 233000335,
    '28-3': 241425038,
    '900': 200000010,
    '7-2': 200000040,
    '53': 241425010,
    '18-1': 241425018,
    '9-1': 200000186,
    '1560A': 234000884,
    '7000': 200000112,
    '9': 200000103,
    '310': 200000024,
    '5': 200000076,
    'M5107(예약)': 200000335,
    '1550-1(예약)': 223000151,
    '1560B': 228000433,
    '1550-1': 234000324,
    '32': 241425007
  },
}

interface ScheduleProps {
  vehicle: string;
}

const Schedule = ({ vehicle }: ScheduleProps) => {
  const [busData, setBusData] = useState<any[]>([]);
  const hasFetched = useRef(false);
  const campus = vehicle.includes('Seoul') ? 'seoul' : vehicle.includes('Gwangneung') ? 'gwangneung' : 'global';
  const selectedBus = busCollection[campus];
  
  const fetchBus = async (id: number) => {
    const response = await fetch(`https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&routeId=${id}&format=json`);
    const data = await response.json();
    const res = data.response.msgBody.busRouteInfoItem;
    return res;
  }

  useEffect(() => {
    console.log('Schedule useEffect triggered, globalHasFetched:', globalHasFetched);
    if (globalHasFetched) return;
    
    const fetchAllBuses = async () => {
      console.log('Starting fetch...');
      if (selectedBus) {
        const busRoutes = Object.values(selectedBus);
        const promises = busRoutes.map((routeId: number) => fetchBus(routeId));
        const results = await Promise.all(promises);
        const allBusData = results.flat();
        setBusData(allBusData);
        globalHasFetched = true;
        console.log('Fetch completed, globalHasFetched set to true');
      }
    };
    
    fetchAllBuses();
  }, []);
  
  console.log('Schedule render, busData length:', busData.length);
  
  return (
    <div className='flex flex-col'>
      <h1>Schedule</h1>
      {busData.map((bus: any, index: number) => {
        const routeName = bus.routeName;
        const upFirstTime = bus.upFirstTime;
        const upLastTime = bus.upLastTime;
        const peekAlloc = bus.peekAlloc;
        const nPeekAlloc = bus.nPeekAlloc;
        const satPeekAlloc = bus.satPeekAlloc;
        const satNPeekAlloc = bus.satNPeekAlloc;
        const sunPeekAlloc = bus.sunPeekAlloc;
        const sunNPeekAlloc = bus.sunNPeekAlloc;
        const wePeekAlloc = bus.wePeekAlloc;
        const weNPeekAlloc = bus.weNPeekAlloc;
        return (
          <div key={index} className="flex flex-col">
            <p>{routeName}</p>
            <div className='flex'>
              <div>운행시간</div>
              <div>{upFirstTime}~{upLastTime}</div>
            </div>
            <div className='flex'>
              <div>배차간격</div>
              <div className='flex flex-col'>
                <p>평일: {peekAlloc}~{nPeekAlloc}분</p>
                <p>토요일: {satPeekAlloc}~{satNPeekAlloc}분</p>
                <p>일요일: {sunPeekAlloc}~{sunNPeekAlloc}분</p>
                <p>공휴일: {wePeekAlloc}~{weNPeekAlloc}분</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(Schedule);