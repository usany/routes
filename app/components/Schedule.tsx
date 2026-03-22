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
      <div key={index} style={styles.accordionContainer as React.CSSProperties}>
        <button
          onClick={() => toggleAccordion(index)}
          style={styles.accordionButton as React.CSSProperties}
        >
          <div style={styles.accordionHeaderLeft as React.CSSProperties}>
            <div style={styles.accordionIconCircle as React.CSSProperties}>
              <span style={styles.accordionIconText as React.CSSProperties}>{index + 1}</span>
            </div>
            <span style={styles.accordionRouteName as React.CSSProperties}>{routeName}</span>
          </div>
          <div style={styles.accordionHeaderRight as React.CSSProperties}>
            <span style={styles.accordionTimeText as React.CSSProperties}>{upFirstTime}~{upLastTime}</span>
            {isOpen ? <ChevronUp style={styles.accordionChevron as React.CSSProperties} /> : <ChevronDown style={styles.accordionChevron as React.CSSProperties} />}
          </div>
        </button>
        
        {isOpen && (
          <div style={styles.accordionContent as React.CSSProperties}>
            <div style={styles.accordionContentSpace as React.CSSProperties}>
              <div style={styles.accordionRow as React.CSSProperties}>
                <Clock style={styles.accordionRowIcon as React.CSSProperties} />
                <span style={styles.accordionRowLabel as React.CSSProperties}>운행시간</span>
                <span style={styles.accordionRowValue as React.CSSProperties}>{upFirstTime}~{upLastTime}</span>
              </div>
              
              <div style={styles.accordionDetailRow as React.CSSProperties}>
                <Calendar style={styles.accordionDetailIcon as React.CSSProperties} />
                <div>
                  <span style={styles.accordionRowLabel as React.CSSProperties}>배차간격</span>
                  <div style={styles.accordionDetailContainer as React.CSSProperties}>
                    <div style={styles.accordionDetailItem as React.CSSProperties}>
                      <span style={styles.accordionDetailItemLabel as React.CSSProperties}>평일:</span>
                      <span style={styles.accordionDetailItemValue as React.CSSProperties}>{peekAlloc}~{nPeekAlloc}분</span>
                    </div>
                    <div style={styles.accordionDetailItem as React.CSSProperties}>
                      <span style={styles.accordionDetailItemLabel as React.CSSProperties}>토요일:</span>
                      <span style={styles.accordionDetailItemValue as React.CSSProperties}>{satPeekAlloc}~{satNPeekAlloc}분</span>
                    </div>
                    <div style={styles.accordionDetailItem as React.CSSProperties}>
                      <span style={styles.accordionDetailItemLabel as React.CSSProperties}>일요일:</span>
                      <span style={styles.accordionDetailItemValue as React.CSSProperties}>{sunPeekAlloc}~{sunNPeekAlloc}분</span>
                    </div>
                    <div style={styles.accordionDetailItem as React.CSSProperties}>
                      <span style={styles.accordionDetailItemLabel as React.CSSProperties}>공휴일:</span>
                      <span style={styles.accordionDetailItemValue as React.CSSProperties}>{wePeekAlloc}~{weNPeekAlloc}분</span>
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
  console.log(busData)
  return (
    <>
      <div style={styles.triggerWrapper as React.CSSProperties}>
        <button
          onClick={() => setIsDrawerOpen(true)}
          style={styles.triggerButton as React.CSSProperties}
        >
          <h2 style={styles.triggerTitle as React.CSSProperties}>버스 시간표</h2>
          <p style={styles.triggerSubtitle as React.CSSProperties}>클릭하여 전체 버스 시간표 보기</p>
        </button>
      </div>

      {isDrawerOpen && (
        <>
          <div 
            style={styles.drawerOverlay as React.CSSProperties}
            onClick={() => setIsDrawerOpen(false)}
          />
          <div style={styles.drawerContainer as React.CSSProperties}>
            <div style={styles.drawerHeader as React.CSSProperties}>
              <h2 style={styles.drawerTitle as React.CSSProperties}>버스 시간표</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={styles.drawerCloseButton as React.CSSProperties}
              >
                <ChevronDown style={styles.drawerCloseIcon as React.CSSProperties} />
              </button>
            </div>
            
            <div style={styles.drawerContent as React.CSSProperties}>
              {loading && <div style={styles.loadingText as React.CSSProperties}>Loading bus schedules...</div>}
              {error && <div style={styles.errorText as React.CSSProperties}>Error loading bus schedules: {error.message}</div>}
              {busData?.busSchedules?.map((bus: any, index: number) => renderAccordionContent(bus, index))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  // Accordion Item
  accordionContainer: { border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' },
  accordionButton: { width: '100%', padding: '12px 16px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' },
  accordionHeaderLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  accordionIconCircle: { width: 32, height: 32, backgroundColor: '#dbeafe', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  accordionIconText: { color: '#2563eb', fontWeight: 600, fontSize: 14 },
  accordionRouteName: { fontWeight: 500, textAlign: 'left', margin: 0 },
  accordionHeaderRight: { display: 'flex', alignItems: 'center', gap: 8 },
  accordionTimeText: { fontSize: 14, color: '#6b7280' },
  accordionChevron: { width: 16, height: 16 },
  accordionContent: { padding: '12px 16px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' },
  accordionContentSpace: { display: 'flex', flexDirection: 'column', gap: 12 },
  accordionRow: { display: 'flex', alignItems: 'center', gap: 8 },
  accordionRowIcon: { width: 16, height: 16, color: '#4b5563' },
  accordionRowLabel: { fontWeight: 500 },
  accordionRowValue: { color: '#374151' },
  accordionDetailRow: { display: 'flex', alignItems: 'flex-start', gap: 8 },
  accordionDetailIcon: { width: 16, height: 16, color: '#4b5563', marginTop: 4 },
  accordionDetailContainer: { marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14 },
  accordionDetailItem: { display: 'flex', justifyContent: 'space-between' },
  accordionDetailItemLabel: { color: '#4b5563' },
  accordionDetailItemValue: { color: '#1f2937' },

  // Drawer
  triggerWrapper: { display: 'flex', flexDirection: 'column', gap: 8 },
  triggerButton: { textAlign: 'left', width: '100%', padding: 12, borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' },
  triggerTitle: { fontSize: 20, fontWeight: 600, marginBottom: 8, margin: 0 },
  triggerSubtitle: { fontSize: 14, color: '#4b5563', margin: 0 },
  drawerOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 40 },
  drawerContainer: { position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.1)', zIndex: 50, transition: 'transform 300ms ease-in-out', maxHeight: '80vh' },
  drawerHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid #e5e7eb' },
  drawerTitle: { fontSize: 20, fontWeight: 600, margin: 0 },
  drawerCloseButton: { padding: 8, borderRadius: 9999, transition: 'background-color 0.2s', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' },
  drawerCloseIcon: { width: 20, height: 20 },
  drawerContent: { padding: 16, overflowY: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', gap: 8 },
  loadingText: { textAlign: 'center', padding: '16px 0' },
  errorText: { textAlign: 'center', padding: '16px 0', color: '#ef4444' },
};

export default memo(Schedule);