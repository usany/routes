import { useSearchParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { Bus } from "lucide-react";

export const process = {
  busTo: '외국어대학-사색의 광장',
  busFrom: '사색의 광장-정문 건너편',
  shuttle: '캠퍼스 셔틀버스',
  commute: '영통역 통학버스'
} as { [key: string]: string };
export const commuteTime = [
  "8:45am",
  "10:00am",
  "1:00pm",
  "6:00pm",
] as string[];
export const shuttleSeoul = [
  "07:10",
  "10:00",
  "11:55",
  "13:30",
  "16:40",
] as string[];
export const shuttleGlobal = [
  "07:20",
  "10:00",
  "13:00",
  "16:40",
  "18:00",
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
      if (typeof step !== 'string' && 'id' in step) {
        const data = await fetchStep((step as any).id);
        setBusData(prev => ({ ...prev, [(step as any).id]: data }));
      }
    });
    // Reset countdown when fetch completes
    setTimeUntilNextFetch(60);
  };

  useEffect(() => {
    if (vehicle === 'busTo' || vehicle === 'busFrom' || vehicle === 'busGwangneungOne' || vehicle === 'busGwangneungTwo') {
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
    const steps: { [key: string]: (string | { id: number; nameKo: string; nameEn: string } | { time: string; routeKo: string; routeEn: string } | { clock: string; routeKo: string; routeEn: string })[] } = {
      busSeoulOne: [
        "회기역",
        "경희대입구", 
        "의료원입구사거리",
        "경희대",
        "경희대입구",
        "회기역"
      ],
      busSeoulTwo: [
        "회기역",
        "",
        "경희중고",
        "경희맨션",
        "경희대동문",
        "외대/경희대후문",
        "",
        "",
        "",
        "",
        "외대앞역",
        "",
        "",
        "",
        "외대/경희대후문",
        "경희대동문",
        "경희맨션",
        "경희중고",
        "",
        "",
        "회기역"
      ],
      shuttleSeoul: [
        {clock: shuttleSeoul[0], routeKo: "온실-외국어대학-생명과학대학-사색의 광장", routeEn: "온실-외국어대학-생명과학대학-사색의 광장"},
        {clock: shuttleSeoul[1], routeKo: "온실-외국어대학-생명과학대학-사색의 광장", routeEn: "온실-외국어대학-생명과학대학-사색의 광장"},
        {clock: shuttleSeoul[2], routeKo: "온실-외국어대학-생명과학대학-사색의 광장", routeEn: "온실-외국어대학-생명과학대학-사색의 광장"},
        {clock: shuttleSeoul[3], routeKo: "온실-외국어대학-생명과학대학-사색의 광장", routeEn: "온실-외국어대학-생명과학대학-사색의 광장"},
        {clock: shuttleSeoul[4], routeKo: "온실-외국어대학-생명과학대학-사색의 광장", routeEn: "온실-외국어대학-생명과학대학-사색의 광장"},
      ],
      // bicycle: [
      //   "Go to the port",
      //   "Board the ship",
      //   "Sail to destination",
      //   "Disembark at port",
      //   "Arrive at " + destination
      // ],
      busTo: [
        {id: 228000710 , nameKo: "외국어대학", nameEn: "Sasakomaru Square"},
        {id: 228000709 , nameKo: "생명과학대학", nameEn: "Life Science College.Industrial College"},
        {id: 228000708 , nameKo: "사색의 광장", nameEn: "KHU Physical Education College.Foreign University"},
      ],
      busFrom: [
        {id: 228001174, nameKo: "사색의 광장", nameEn: "Sasakomaru Square"},
        {id: 228000704 , nameKo: "생명과학대학", nameEn: "Life Science College.Industrial College"},
        {id: 228000703 , nameKo: "체육대학", nameEn: "KHU Physical Education College.Foreign University"},
        {id: 203000125 , nameKo: "정문 건너편", nameEn: "KHU"}
      ],
      shuttleGlobal: [
        {clock: shuttleGlobal[0], routeKo: "사색의 광장-생명과학대학-체육대학-온실", routeEn: "Sasakomaru Square - Life Science College - Physical Education College - Greenhouse"},
        {clock: shuttleGlobal[1], routeKo: "사색의 광장-생명과학대학-체육대학-온실", routeEn: "Sasakomaru Square - Life Science College - Physical Education College - Greenhouse"},
        {clock: shuttleGlobal[2], routeKo: "사색의 광장-생명과학대학-체육대학-온실", routeEn: "Sasakomaru Square - Life Science College - Physical Education College - Greenhouse"},
        {clock: shuttleGlobal[3], routeKo: "사색의 광장-생명과학대학-체육대학-온실", routeEn: "Sasakomaru Square - Life Science College - Physical Education College - Greenhouse"},
        {clock: shuttleGlobal[4], routeKo: "사색의 광장-생명과학대학-체육대학-온실", routeEn: "Sasakomaru Square - Life Science College - Physical Education College - Greenhouse"},
      ],
      commute: [
        {clock: commuteTime[0], routeKo: "영통역 1번 출구-외국어대학-생명과학대학-사색의 광장", routeEn: "Yeongtong Station 1st Exit - Foreign Language College - Life Science College - Sasakomaru Square"},
        {clock: commuteTime[1], routeKo: "영통역 1번 출구-외국어대학-생명과학대학-사색의 광장", routeEn: "Yeongtong Station 1st Exit - Foreign Language College - Life Science College - Sasakomaru Square"},
        {clock: commuteTime[2], routeKo: "영통역 1번 출구-외국어대학-생명과학대학-사색의 광장", routeEn: "Yeongtong Station 1st Exit - Foreign Language College - Life Science College - Sasakomaru Square"},
        {clock: commuteTime[3], routeKo: "사색의 광장-생명과학대학-외국어대학-영통역 1번 출구", routeEn: "Sasakomaru Square - Life Science College - Foreign Language College - Yeongtong Station 1st Exit"},
      ],
      busGwangneungOne: [
        {id: 222000665, nameKo: "봉선사입구 내산정 방면", nameEn: "Bongseonsa Entrance Nae-sanjeom Direction"},
      ],
      busGwangneungTwo: [
        {id: 222000751, nameKo: "봉선사입구 종점 방면", nameEn: "Bongseonsa Entrance Terminal Direction"},
      ],
    };
    return steps[vehicleType] || [];
  };

  if (!vehicle) {
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
          {vehicle.includes('bus') && !vehicle.includes('Seoul') && (
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
          {vehicle.includes('shuttle') && (
            <div className='flex flex-col items-center'>
              <div>공휴일, 휴무일을 제외한 평일</div>
              <div>요금: 페이코 승차권 예약 2000원</div>
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
                if (vehicle === "shuttleSeoul") {
                  const currentHour = new Date().getHours();
                  const currentMinute = new Date().getMinutes();
                  let nextBus = 5
                  if (currentHour >= 6 && currentHour <= 7) {
                    if (currentHour === 7 && currentMinute >= 10) {
                      nextBus = 1
                    } else {
                      nextBus = 0
                    }
                  } else if (currentHour > 7 && currentHour < 10) {
                    nextBus = 1
                  } else if (currentHour > 10 && currentHour <= 11) {
                    if (currentHour === 11 && currentMinute >= 55) {
                      nextBus = 3
                    } else {
                      nextBus = 2
                    }
                  } else if (currentHour > 11 && currentHour <= 13) {
                    if (currentMinute >= 30) {
                      nextBus = 4
                    } else {
                      nextBus = 3
                    }
                  } else if (currentHour > 13 && currentHour <= 16) {
                    if (currentHour === 16 && currentMinute >= 40) {
                      nextBus = 5
                    } else {
                      nextBus = 4
                    }
                  }
                  return (
                    <div key={index} className="flex items-center space-x-6">
                      <div className={`w-18 h-16 ${nextBus <= index ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded-md flex items-center justify-center font-semibold text-md z-10`}>
                        {step.clock}
                      </div>
                      <div className="text-left max-w-md">
                        <p className="text-lg font-medium">
                          {step.routeKo}
                        </p>
                      </div>
                    </div>
                  )
                } else if (vehicle === "shuttleGlobal") {
                  const currentHour = new Date().getHours();
                  const currentMinute = new Date().getMinutes();
                  let nextBus = 5
                  if (currentHour >= 6 && currentHour <= 7) {
                    if (currentHour === 7 && currentMinute >= 20) {
                      nextBus = 1
                    } else {
                      nextBus = 0
                    }
                  } else if (currentHour > 7 && currentHour < 10) {
                    nextBus = 1
                  } else if (currentHour > 10 && currentHour < 13) {
                    nextBus = 2
                  } else if (currentHour >= 13 && currentHour <= 16) {
                    if (currentMinute >= 40) {
                      nextBus = 4
                    } else {
                      nextBus = 3
                    }
                  } else if (currentHour > 16 && currentHour < 18) {
                    nextBus = 4
                  }
                  return (
                    <div key={index} className="flex items-center space-x-6">
                      <div className={`w-18 h-16 ${nextBus <= index ? 'bg-blue-600' : 'bg-gray-600'} text-white rounded-md flex items-center justify-center font-semibold text-md z-10`}>
                        {step.clock}
                      </div>
                      <div className="text-left max-w-md">
                        <p className="text-lg font-medium">
                          {step.routeKo}
                        </p>
                      </div>
                    </div>
                  )
                } else if (vehicle === "commute") {
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
                        {step.clock}
                      </div>
                      <div className="text-left max-w-md">
                        <p className="text-lg font-medium">
                          {step.routeKo}
                        </p>
                      </div>
                    </div>
                  )
                }
                
                // For bus steps, we can access the fetched data from state
                const stepId = typeof step !== 'string' && 'id' in step ? (step as any).id : null;
                const fetchedData = stepId ? busData[stepId] : null;
                
                return (
                  <div key={index} className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg z-10">
                      <Bus />
                    </div>
                    <div className="text-left max-w-md">
                      <p className="text-lg font-medium">
                        {typeof step === 'string' ? step : 'nameKo' in step ? `${step.nameKo} (${step.nameEn})` : JSON.stringify(step)}
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
