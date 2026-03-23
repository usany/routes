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
export const stepsCollection: { [key: string]: (string | { id: number; nameKo: string; nameEn: string } | { time: string; routeKo: string; routeEn: string } | { clock: string; routeKo: string; routeEn: string })[] } = {
  busOne: [
    {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"},
    {id: 105900051, nameKo: "경희대입구", nameEn: "Kyunghee University Entrance"}, 
    {id: 105900001, nameKo: "의료원입구사거리", nameEn: "Medical Center Entrance Intersection"},
    {id: 105900050, nameKo: "경희대", nameEn: "Kyunghee University"},
    {id: 105000184, nameKo: "경희대입구", nameEn: "Kyunghee University Entrance"},
    {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"}
  ],
  busTwo: [
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
  busN: [
    {id: 222000665, nameKo: "봉선사입구 내산정 방면", nameEn: "Bongseonsa Entrance Nae-sanjeom Direction"},
  ],
  busJ: [
    {id: 222000751, nameKo: "봉선사입구 종점 방면", nameEn: "Bongseonsa Entrance Terminal Direction"},
  ],
};

export const getProcessSteps = (vehicleType: string) => {
  return stepsCollection[vehicleType] || [];
};
