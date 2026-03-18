import { useEffect, useState, useRef, memo } from "react";
import { ChevronDown, ChevronUp, Clock, Calendar } from "lucide-react";
import { useQuery, gql } from "@apollo/client";
import { GET_BUS_SCHEDULES } from "../../graphql/queries";
import type { BusScheduleData } from "../../graphql/schema";

// Global flag to prevent multiple fetches across component remounts
// let globalHasFetched = false;

export const busCollection = {
  seoul: {
    '01': 1,
    '02': 2,
    'A01': 3,
  },
  gwangneung: {
    '2': 241348004,
    '21': 222000170,
    '2-2': 241348005,
    '2-2A': 241348002,
    '2A': 241348001,
  },
  global: {
    'M5107': 234001243,
    '5100': 200000115,
    '1112': 234000016,
    '9': 200000103,
    '1560A': 234000884,
    '1560B': 228000433,
    '7000': 200000112,
    'P9242(퇴근)': 233000335,
    '1550-1': 234000324,
    '1112(reserved)': 200000333,
    '28-3': 241425038,
    '900': 200000010,
    '7-2': 200000040,
    '53': 241425010,
    '18-1': 241425018,
    '9-1': 200000186,
    '310': 200000024,
    '5': 200000076,
    'M5107(reserved)': 200000335,
    '1550-1(reserved)': 223000151,
    '32': 241425007
  },
}

interface ScheduleProps {
  vehicle: string;
}

const Schedule = ({ vehicle }: ScheduleProps) => {
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const campus = vehicle.includes('Seoul') ? 'seoul' : vehicle.includes('Gwangneung') ? 'gwangneung' : 'global';
  const selectedBus = busCollection[campus];
  
  const routeIds = selectedBus ? Object.values(selectedBus) : [];
  
  const { data: busData, loading, error } = useQuery(GET_BUS_SCHEDULES, {
    variables: { campus, routeIds },
    skip: !selectedBus || routeIds.length === 0,
  });
  
  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  const renderAccordionContent = (bus: BusScheduleData, index: number) => {
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
    const isOpen = openAccordions.has(index);
    
    return (
      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleAccordion(index)}
          className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
            </div>
            <span className="font-medium text-left">{routeName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{upFirstTime}~{upLastTime}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>
        
        {isOpen && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">운행시간</span>
                <span className="text-gray-700">{upFirstTime}~{upLastTime}</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-600 mt-1" />
                <div>
                  <span className="font-medium">배차간격</span>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">평일:</span>
                      <span className="text-gray-800">{peekAlloc}~{nPeekAlloc}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">토요일:</span>
                      <span className="text-gray-800">{satPeekAlloc}~{satNPeekAlloc}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">일요일:</span>
                      <span className="text-gray-800">{sunPeekAlloc}~{sunNPeekAlloc}분</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">공휴일:</span>
                      <span className="text-gray-800">{wePeekAlloc}~{weNPeekAlloc}분</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='flex flex-col space-y-2'>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="text-left w-full hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">버스 시간표</h2>
          <p className="text-sm text-gray-600">클릭하여 전체 버스 시간표 보기</p>
        </button>
      </div>

      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out max-h-[80vh]">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">버스 시간표</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
              {loading && <div className="text-center py-4">Loading bus schedules...</div>}
              {error && <div className="text-center py-4 text-red-500">Error loading bus schedules: {error.message}</div>}
              {busData?.busSchedules?.map((bus: any, index: number) => renderAccordionContent(bus, index))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default memo(Schedule);