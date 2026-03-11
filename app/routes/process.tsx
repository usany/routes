import { useSearchParams, Link } from "react-router";
import { useState, useEffect } from "react";

const process = {
  busTo: '외국어대-사색의 광장',
  busFrom: '사색의 광장-정문 건너편',
  shuttle: '캠퍼스 셔틀버스',
  commute: '영통역 통학버스'
} as { [key: string]: string };
const commuteTime = [
  "8:45am",
  "10:00am",
  "1:00pm",
  "6:00pm",
] as string[];
export default function Process() {
  const [searchParams] = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  const destination = searchParams.get("destination");
  const from = searchParams.get("from");
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);

  const fetchStep = async (id: number) => {
    const response = await fetch(`https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&stationId=${id}&format=json`);
    const data = await response.json()
    const res = data.response.msgBody.busArrivalList;
    return res;
  }

  const fetchBusData = async () => {
    const steps = getProcessSteps(vehicle);
    steps.forEach(async (step) => {
      if (typeof step !== 'string' && step.id) {
        const data = await fetchStep(step.id);
        setBusData(prev => ({ ...prev, [step.id]: data }));
      }
    });
    // Reset countdown when fetch completes
    setTimeUntilNextFetch(60);
  };

  useEffect(() => {
    if (vehicle === 'busTo' || vehicle === 'busFrom') {
      // Fetch immediately
      fetchBusData();
      
      // Then fetch every minute (60000 milliseconds)
      const interval = setInterval(fetchBusData, 60000);

      // Countdown timer - update every second
      const countdownInterval = setInterval(() => {
        setTimeUntilNextFetch(prev => {
          if (prev <= 1) return 60; // Reset when reaching 0
          return prev - 1;
        });
      }, 1000);

      // Cleanup intervals on component unmount
      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [vehicle]);

  const getProcessSteps = (vehicleType: string) => {
    const steps: { [key: string]: (string | { id: number; nameKo: string; nameEn: string; })[] } = {
      car: [
        "Start the car engine",
        "Enter destination in GPS", 
        "Follow the route",
        "Park at destination",
        "Arrive at " + destination
      ],
      train: [
        "Go to the train station",
        "Buy a ticket",
        "Wait for the train",
        "Board the train",
        "Arrive at " + destination + " station"
      ],
      plane: [
        "Go to the airport",
        "Check in and go through security",
        "Board the plane", 
        "Flight to destination",
        "Arrive at " + destination
      ],
      ship: [
        "Go to the port",
        "Board the ship",
        "Sail to destination",
        "Disembark at port",
        "Arrive at " + destination
      ],
      busTo: [
        {id: 228000710 , nameKo: "외국어대", nameEn: "Sasakomaru Square"},
        {id: 228000709 , nameKo: "생명과학대", nameEn: "Life Science College.Industrial College"},
        {id: 228000708 , nameKo: "사색의 광장", nameEn: "KHU Physical Education College.Foreign University"},
      ],
      busFrom: [
        {id: 228001174, nameKo: "사색의 광장", nameEn: "Sasakomaru Square"},
        {id: 228000704 , nameKo: "생명과학대", nameEn: "Life Science College.Industrial College"},
        {id: 228000703 , nameKo: "체육대", nameEn: "KHU Physical Education College.Foreign University"},
        {id: 203000125 , nameKo: "정문 건너편", nameEn: "KHU"}
      ],
      commute: [
        "영통역 1번 출구-외국어대학-생명과학대학-사색의 광장",
        "영통역 1번 출구-외국어대학-생명과학대학-사색의 광장",
        "영통역 1번 출구-외국어대학-생명과학대학-사색의 광장",
        "사색의 광장-생명과학대학-외국어대학-영통역 1번 출구",
      ],
      walking: [
        "Check the route",
        "Start walking",
        "Follow the path",
        "Enjoy the journey",
        "Arrive at " + destination
      ],
    };
    return steps[vehicleType] || [];
  };

  if (!vehicle || !destination) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Invalid Request</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Please select a vehicle and destination.
          </p>
        </div>
      </div>
    );
  }

  const steps = getProcessSteps(vehicle);
  return (
    <div className="flex items-center justify-center min-h-screen pb-24">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {vehicle} Journey to {destination}
        </h1>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">{process[vehicle]}</h2>
          {vehicle.includes('bus') && (
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Next data update in: <span className="font-semibold text-blue-600">{timeUntilNextFetch}s</span>
              </p>
              <button
                onClick={fetchBusData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Refresh Now
              </button>
            </div>
          )}
          {vehicle === 'commute' && (
            <div className='flex flex-col items-center'>
              <div>학기 중 공휴일, 휴무일을 제외한 평일</div>
              <div>요금: 무료</div>
            </div>
          )}
          <div className="relative flex justify-center">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600"></div>
            <div className="relative space-y-8">
              {steps.map((step, index) => {
                if (vehicle === "commute") {
                  const currentHour = new Date().getHours();
                  const currentMinute = new Date().getMinutes();
                  let nextBus = 4
                  if (currentHour >= 6 && currentHour <= 8) {
                    if (currentHour === 8 && currentMinute >= 45) {
                      nextBus = 1
                    } else {
                      nextBus = 0
                    }
                  } else if (currentHour > 8 && currentHour < 10) {
                    nextBus = 1
                  } else if (currentHour >= 10 && currentHour < 13) {
                    nextBus = 2
                  } else if (currentHour >= 13 && currentHour < 18) {
                    nextBus = 3
                  }
                  return (
                    <div key={index} className="flex items-center space-x-6">
                      <div className={`w-18 h-16 ${nextBus <= index ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded-md flex items-center justify-center font-semibold text-md z-10`}>
                        {commuteTime[index]}
                      </div>
                      <div className="text-left max-w-md">
                        <p className="text-lg font-medium">
                          {typeof step === 'string' ? step : `${step.nameKo} (${step.nameEn})`}
                        </p>
                      </div>
                    </div>
                  )
                }
                
                // For bus steps, we can access the fetched data from state
                const stepId = typeof step !== 'string' ? step.id : null;
                const fetchedData = stepId ? busData[stepId] : null;
                return (
                  <div key={index} className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg z-10">
                      {index + 1}
                    </div>
                    <div className="text-left max-w-md">
                      <p className="text-lg font-medium">
                        {typeof step === 'string' ? step : `${step.nameKo} (${step.nameEn})`}
                      </p>
                      {fetchedData && (
                        fetchedData.map((data: any, index: number) => {
                          const routeName = data.routeName
                          const predictTime1 = data.predictTime1;
                          return (
                            <p key={index} className="text-sm text-gray-600 mt-1">
                              Bus data: {routeName}
                              <br />
                              {predictTime1 ? `${predictTime1}분` : '대기'}
                            </p>
                          )
                        })
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to={destination === "Place One" ? "/place-one" : "/place-two"}
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete Journey
          </Link>
          <div className="mt-4">
            <Link
              to={from === "Place One" ? "/place-one" : from === "Place Two" ? "/place-two" : "/"}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← Back to {from || "Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
