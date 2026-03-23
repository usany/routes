import { useSearchParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { Bus, BusFront, ChevronDown, MonitorStop, PersonStanding, SquareStop, StopCircle } from "lucide-react";
import Schedule from "../../components/Schedule";
import { busCollection } from "../../components/busCollection";
import { process } from "../../components/process";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  // const navigate = useNavigate();
  // const from = searchParams.get("from");
  // const destination = searchParams.get("destination");
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);
  const [activeShuttleTab, setActiveShuttleTab] = useState<'seoul' | 'global'>('seoul');
  
  const handleShuttleTabChange = (tab: 'seoul' | 'global') => {
    setActiveShuttleTab(tab);
    const newVehicle = tab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal';
    setSearchParams({ vehicle: newVehicle });
  };
  
  useEffect(() => {
    if (vehicle?.includes('shuttle')) {
      setActiveShuttleTab(vehicle === 'shuttleSeoul' ? 'seoul' : 'global');
    }
  }, [vehicle]);
  
  const fetchStep = async (id: number) => {
    let response
    if (vehicle === 'busSeoulOne' || vehicle === 'busSeoulTwo') {
      response = await fetch(`http://localhost:3000/bus/${id}`)
      const responseText = await response.text();
      return responseText
    } else {
      response = await fetch(`https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&stationId=${id}&format=json`);
    }
      const data = await response.json()
      const res = data.response.msgBody.busArrivalList;
      return res;
  }
  const fetchBusData = useCallback(async () => {
    const steps = getProcessSteps(vehicle);
    steps.forEach(async (step) => {
      if (typeof step !== 'string' && 'id' in step) {
        const data = await fetchStep((step as any).id);
        const vehId1Match = data.match(/<arrmsg1>(.*?)<\/arrmsg1>/);
        console.log(data)
        console.log(vehId1Match)
        setBusData(prev => ({ ...prev, [(step as any).id]: data }));
      }
    });
    // const dataBus = await fetchBus()
    // console.log(dataBus)
    // Reset countdown when fetch completes
    setTimeUntilNextFetch(60);
  }, [vehicle]);

  useEffect(() => {
    // if (vehicle === 'busTo' || vehicle === 'busFrom' || vehicle === 'busGwangneungOne' || vehicle === 'busGwangneungTwo') {
    if (vehicle?.includes('bus')) {
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
  }, [vehicle, fetchBusData]);

  const getProcessSteps = (vehicleType: string) => {
    const steps: { [key: string]: (string | { id: number; nameKo: string; nameEn: string } | { time: string; routeKo: string; routeEn: string } | { clock: string; routeKo: string; routeEn: string })[] } = {
      busSeoulOne: [
        {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"},
        {id: 105900051, nameKo: "경희대입구", nameEn: "Kyunghee University Entrance"}, 
        {id: 105900001, nameKo: "의료원입구사거리", nameEn: "Medical Center Entrance Intersection"},
        {id: 105900050, nameKo: "경희대", nameEn: "Kyunghee University"},
        {id: 105000184, nameKo: "경희대입구", nameEn: "Kyunghee University Entrance"},
        {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"}
      ],
      busSeoulTwo: [
        {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"},
        {id: 105900057, nameKo: "동안교회", nameEn: "Dongan Church"},
        {id: 105900024, nameKo: "경희중고", nameEn: "Kyunghee Middle/High School"},
        {id: 105900023, nameKo: "경희맨션", nameEn: "Kyunghee Apartment"},
        {id: 105900021, nameKo: "경희대동문", nameEn: "Kyunghee University East Gate"},
        {id: 105900019, nameKo: "외대.경희대후문", nameEn: "Foreign Language University/Kyunghee University Back Gate"},
        {id: 105000561, nameKo: "천장산로33", nameEn: "Cheonjangsan-ro 33"},
        {id: 105000562, nameKo: "삼성래미안", nameEn: "Samsung Raemian"},
        {id: 105000563, nameKo: "래미안라그란데", nameEn: "Raemian Lagrande"},
        {id: 105000044, nameKo: "이문동우체국", nameEn: "Imun-dong Post Office"},
        {id: 105900056, nameKo: "외대앞역", nameEn: "Foreign Language University Front Station"},
        {id: 105000564, nameKo: "래미안라그란데", nameEn: "Raemian Lagrande"},
        {id: 105900016, nameKo: "삼성래미안", nameEn: "Samsung Raemian"},
        {id: 105900060, nameKo: "천장산로33", nameEn: "Cheonjangsan-ro 33"},
        {id: 105900012, nameKo: "외대.경희대후문", nameEn: "Foreign Language University/Kyunghee University Back Gate"},
        {id: 105900011, nameKo: "경희대동문", nameEn: "Kyunghee University East Gate"},
        {id: 105900009, nameKo: "경희맨션", nameEn: "Kyunghee Apartment"},
        {id: 105900007, nameKo: "경희중고", nameEn: "Kyunghee Middle/High School"},
        {id: 105900006, nameKo: "동안교회", nameEn: "Dongan Church"},
        {id: 105900061, nameKo: "시조사삼거리", nameEn: "Sijosa Intersection"},
        {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"}
      ],
      busThree: [
        {id: 105900050, nameKo: "경희대", nameEn: "Kyunghee University"}
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
      <div style={styles.errorContainer as React.CSSProperties}>
        <div style={styles.errorContent as React.CSSProperties}>
          <h1 style={styles.errorTitle as React.CSSProperties}>Invalid Request</h1>
          <p style={styles.errorText as React.CSSProperties}>
            Please select a vehicle and destination.
          </p>
        </div>
      </div>
    );
  }

  const steps = getProcessSteps(vehicle.includes('shuttle') ? (activeShuttleTab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal') : vehicle);
  return (
    <div style={styles.mainContainer as React.CSSProperties}>
      <div style={styles.mainContent as React.CSSProperties}>
        <div style={styles.processSection as React.CSSProperties}>
          <h2 style={styles.processTitle as React.CSSProperties}>{vehicle.includes('shuttle') ? process[activeShuttleTab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal'] : process[vehicle]}</h2>
          {vehicle === 'busThree' && (
            <div style={styles.infoContainer as React.CSSProperties}>
              <div>장한평역-청량리역-경희대</div>
              <div>운행시간: 배차간격: 평일 75분</div>
            </div>
          )}
          {vehicle.includes('bus') && vehicle !== 'busThree' && vehicle.indexOf('busSeoul') === -1 && <Schedule vehicle={vehicle} />}
          {vehicle.includes('bus') && (
            <div style={styles.refreshContainer as React.CSSProperties}>
              <p style={styles.refreshText as React.CSSProperties}>
                Next data update in: <span style={styles.refreshCounter as React.CSSProperties}>{timeUntilNextFetch}s</span>
              </p>
              <button
                onClick={fetchBusData}
                style={styles.refreshButton as React.CSSProperties}
              >
                Refresh Now
              </button>
            </div>
          )}
          {vehicle.includes('shuttle') && (
            <>
              <div style={styles.infoContainer as React.CSSProperties}>
                <div>공휴일, 휴무일을 제외한 평일</div>
                <div>요금: 페이코 승차권 예약 2000원</div>
              </div>
              <div style={styles.tabContainer as React.CSSProperties}>
                <button
                  onClick={() => handleShuttleTabChange('seoul')}
                  style={(activeShuttleTab === 'seoul' ? styles.tabActive : styles.tabInactive) as React.CSSProperties}
                >
                  서울-국제 셔틀
                </button>
                <button
                  onClick={() => handleShuttleTabChange('global')}
                  style={(activeShuttleTab === 'global' ? styles.tabActive : styles.tabInactive) as React.CSSProperties}
                >
                  국제-서울 셔틀
                </button>
              </div>
            </>
          )}
          {vehicle === 'commute' && (
            <div style={styles.infoContainer as React.CSSProperties}>
              <div>학기 중 공휴일, 휴무일을 제외한 평일</div>
              <div>요금: 무료</div>
            </div>
          )}
          <div style={styles.timelineContainer as React.CSSProperties}>
            <div style={styles.timelineLine as React.CSSProperties}></div>
            <div style={(vehicle.includes('bus') ? styles.timelineContentBus : styles.timelineContentShuttle) as React.CSSProperties}>
              {steps.map((step, index) => {
                if (vehicle.includes('shuttle')) {
                  const currentHour = new Date().getHours();
                  const currentMinute = new Date().getMinutes();
                  let nextBus = 5;
                  
                  if (activeShuttleTab === 'seoul') {
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
                  } else if (activeShuttleTab === 'global') {
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
                  }
                  
                  return (
                    <div key={index} style={styles.stepContainer as React.CSSProperties}>
                      <div style={(nextBus <= index ? styles.stepIconShuttleActive : styles.stepIconShuttleInactive) as React.CSSProperties}>
                        {step.clock}
                      </div>
                      <div style={styles.stepTextContainer as React.CSSProperties}>
                        <p style={styles.stepTitle as React.CSSProperties}>
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
                    <div key={index} style={styles.stepContainer as React.CSSProperties}>
                      <div style={(nextBus <= index ? styles.stepIconShuttleActive : styles.stepIconShuttleInactive) as React.CSSProperties}>
                        {step.clock}
                      </div>
                      <div style={styles.stepTextContainer as React.CSSProperties}>
                        <p style={styles.stepTitle as React.CSSProperties}>
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
                  <div key={index} style={styles.busStepContainer as React.CSSProperties}>
                    <div style={styles.busIconWrapper as React.CSSProperties}>
                      <div style={styles.busIconInner as React.CSSProperties}>
                        {fetchedData && (() => {
                          const targetDataList = fetchedData.filter((data: any) => data.locationNo1 === 1);
                          return targetDataList.length > 0 ? (
                            <div style={styles.busIncomingContainer as React.CSSProperties}>
                              <div style={styles.busIncomingText as React.CSSProperties}>
                                {targetDataList.map((data: any, idx: number) => (
                                  <div key={idx}>{data.routeName}</div>
                                ))}
                              </div>
                              <BusFront />
                            </div>
                          ) : null;
                        })()}
                        <div style={styles.busStopIcon as React.CSSProperties}>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                    <div style={styles.stepTextContainer as React.CSSProperties}>
                      <p style={styles.stepTitle as React.CSSProperties}>
                        {typeof step === 'string' ? step : 'nameKo' in step ? `${step.nameKo} (${step.nameEn})` : JSON.stringify(step)}
                      </p>
                      {fetchedData && (
                        fetchedData.map((data: any, dataIndex: number) => {
                          if (vehicle === 'busSeoulOne' || vehicle === 'busSeoulTwo' ) {
                            console.log(data)
                            return null
                          }
                          const routeName = data.routeName
                          const predictTime1 = data.predictTime1;
                          const locationNo1 = data.locationNo1
                          const stationNm1 = data.stationNm1
                          return (
                            <p key={dataIndex} style={styles.busSubtitle as React.CSSProperties}>
                              Bus data: {routeName}
                              <br />
                              {predictTime1 ? `${predictTime1}분 (${locationNo1} 정거장) ${stationNm1}` : '대기'}
                              {index === steps.length - 1 && predictTime1 ? `(${stationNm1} ${locationNo1})` : ''}
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

        <div style={styles.navContainer as React.CSSProperties}>
          <div style={styles.navInner as React.CSSProperties}>
            <Link
              to={vehicle.includes('Gwangneung') ? "/gwangneung" : vehicle.includes('Seoul') ? "/place-one" : "/place-two"}
              style={styles.navLink as React.CSSProperties}
            >
              ← Back to {vehicle.includes('Gwangneung') ? "/gwangneung" : vehicle.includes('Seoul') ? "/place-one" : "/place-two"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // Error state
  errorContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' },
  errorContent: { textAlign: 'center' },
  errorTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 16, margin: 0 },
  errorText: { fontSize: 18, color: '#4b5563', margin: 0 },

  // Main layout
  mainContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  mainContent: { textAlign: 'center', maxWidth: 672, margin: '0 auto', padding: 32 },
  processSection: { display: 'flex', flexDirection: 'column', gap: 24 },
  processTitle: { fontSize: 24, fontWeight: 600, marginBottom: 24, margin: 0 },
  
  // Info text
  infoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  
  // Refresh section
  refreshContainer: { textAlign: 'center', marginBottom: 16 },
  refreshText: { fontSize: 14, color: '#4b5563', marginBottom: 8, margin: 0 },
  refreshCounter: { fontWeight: 600, color: '#2563eb' },
  refreshButton: { padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, transition: 'background-color 0.2s', cursor: 'pointer' },

  // Tabs
  tabContainer: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' },
  tabActive: { padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' },
  tabInactive: { padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', cursor: 'pointer' },

  // Timeline
  timelineContainer: { position: 'relative' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32, paddingTop: 20 },
  timelineContentShuttle: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32 },

  // Timeline item
  stepContainer: { display: 'flex', alignItems: 'center', gap: 24 },
  stepIconShuttleActive: { width: 72, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepIconShuttleInactive: { width: 72, height: 64, backgroundColor: '#4b5563', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 500, margin: 0 },

  // Bus specific
  busStepContainer: { display: 'flex', gap: 24 },
  busIconWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64 },
  busIconInner: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  busIncomingContainer: { display: 'flex', height: 64, alignItems: 'center', marginLeft: -80 },
  busIncomingText: { marginRight: 8, textAlign: 'right' },
  busStopIcon: { width: 64, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, zIndex: 10 },
  busSubtitle: { fontSize: 14, color: '#4b5563', marginTop: 4, margin: 0 },

  // Link
  navContainer: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecoration: 'underline' }
};
