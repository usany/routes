import { useEffect, useState } from "react";
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

const Schedule = (vehicle: string) => {
    const [busData, setBusData] = useState<any[]>([]);
    const campus = vehicle.includes('Seoul') ? 'seoul' : vehicle.includes('Gwangneung') ? 'gwangneung' : 'global';
    const selectedBus = busCollection[campus];
    const fetchBus = async (id: number) => {
        const response = await fetch(`https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&routeId=${id}&format=json`);
        const data = await response.json()
        const res = data.response.msgBody.busArrivalList;
        return res;
    }

    useEffect(() => {
        const fetchAllBuses = async () => {
            if (selectedBus) {
                const busRoutes = Object.values(selectedBus);
                const promises = busRoutes.map((routeId: number) => fetchBus(routeId));
                const results = await Promise.all(promises);
                const allBusData = results.flat();
                setBusData(allBusData);
            }
        };
        fetchAllBuses();
    }, [selectedBus]);
    
return (
    <div>
        <h1>Schedule</h1>
        {busData.map((bus, index) => (
            <div key={index}>
                <p>{bus.nPeekAlloc}</p>
            </div>
        ))}
    </div>
)
}
export default Schedule;