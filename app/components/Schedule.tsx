import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { memo, useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { busCollection } from "./busCollection";

// Global flag to prevent multiple fetches across component remounts
// let globalHasFetched = false;
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

const buildGyeonggiBusRouteQuery = (id: number) => `
  query {
    gyeonggiBusRoute(routeId: ${id}) {
      response {
        msgBody {
          busRouteInfoItem {
            routeName
            upFirstTime
            upLastTime
            peekAlloc
            nPeekAlloc
            satPeekAlloc
            satNPeekAlloc
            sunPeekAlloc
            sunNPeekAlloc
            wePeekAlloc
            weNPeekAlloc
          }
        }
      }
    }
  }
`;

const Schedule = () => {
  const pathname = usePathname();
  const [busData, setBusData] = useState<any[]>([]);
  const [openAccordions, setOpenAccordions] = useState<Set<number>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const hasFetched = useRef(false);
  const campus = pathname.includes('se') ? 'seoul' : pathname.includes('gw') ? 'gwangneung' : 'global';
  const selectedBus = busCollection[campus];
  
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
  
  const fetchBus = async (id: number) => {
    if (pathname.includes('se')) {
      // const response = await fetch(`http://localhost:8000/graphql`, {
      const response = await fetch(`https://qlroute.onrender.com/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: builduseSeoulBusQuery(id),
        }),
      });
      const data = await response.json();
      const res = data.data.seoulBusArrival.response.msgBody.itemList[5];
      return res;
    }
    // const response = await fetch(`http://localhost:8000/graphql`, {
    const response = await fetch(`https://qlroutes.onrender.com/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: buildGyeonggiBusRouteQuery(id),
      }),
    });
    const data = await response.json();
    const res = data.data.gyeonggiBusRoute.response.msgBody.busRouteInfoItem
    return res
  }

  useEffect(() => {
    // console.log('Schedule useEffect triggered, globalHasFetched:', globalHasFetched);
    // if (globalHasFetched) return;
    
    const fetchAllBuses = async () => {
      console.log('Starting fetch...');
      if (selectedBus) {
        const busRoutes = Object.values(selectedBus);
        const promises = busRoutes.map((routeId: number) => fetchBus(routeId));
        const results = await Promise.all(promises);
        const allBusData = results.flat();
        setBusData(allBusData);
      }
    };
    
    fetchAllBuses();
  }, []);
  
  console.log('Schedule render, busData length:', busData.length);
    const renderContent = (bus: any, index: number) => {
    const routeName = bus.rtNm;
    const upFirstTime = bus.firstTm.slice(8, 10) + ':' + bus.firstTm.slice(10, 11)+'0';
    const upLastTime = bus.lastTm.slice(8, 10) + ':' + bus.lastTm.slice(10, 11)+'0';
    const peekAlloc = bus.term;
    
    return (
      <View key={index} style={styles.busItem}>
        <View style={styles.busItemHeader}>
          <View style={styles.busItemHeaderLeft}>
            <View style={styles.busNumber}>
              <Text style={styles.busNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.routeName}>{routeName}</Text>
          </View>
          <Text style={styles.timeText}>{upFirstTime}~{upLastTime}</Text>
        </View>

        <View style={styles.busItemContent}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text style={styles.infoLabel}>운행시간</Text>
            <Text style={styles.infoValue}>{upFirstTime}~{upLastTime}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#6b7280" />
            <Text style={styles.infoLabel}>배차간격</Text>
            <Text style={styles.infoValue}>{peekAlloc}분</Text>
          </View>
        </View>
      </View>
    );
  }

  const renderAccordionContent = (bus: any, index: number) => {
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
      <View key={index} style={styles.accordionItem}>
        <TouchableOpacity
          onPress={() => toggleAccordion(index)}
          style={styles.accordionHeader}
        >
          <View style={styles.accordionHeaderLeft}>
            <View style={styles.busNumber}>
              <Text style={styles.busNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.routeName}>{routeName}</Text>
          </View>
          <View style={styles.accordionHeaderRight}>
            <Text style={styles.timeText}>{upFirstTime}~{upLastTime}</Text>
            <Ionicons 
              name={isOpen ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#6b7280" 
            />
          </View>
        </TouchableOpacity>
        
        {isOpen && (
          <View style={styles.accordionContent}>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text style={styles.infoLabel}>운행시간</Text>
              <Text style={styles.infoValue}>{upFirstTime}~{upLastTime}</Text>
            </View>
            
            <View style={styles.scheduleSection}>
              <View style={styles.scheduleHeader}>
                <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                <Text style={styles.infoLabel}>배차간격</Text>
              </View>
              <View style={styles.scheduleDetails}>
                <View style={styles.scheduleRow}>
                  <Text style={styles.scheduleLabel}>평일:</Text>
                  <Text style={styles.scheduleValue}>{peekAlloc}~{nPeekAlloc}분</Text>
                </View>
                <View style={styles.scheduleRow}>
                  <Text style={styles.scheduleLabel}>토요일:</Text>
                  <Text style={styles.scheduleValue}>{satPeekAlloc}~{satNPeekAlloc}분</Text>
                </View>
                <View style={styles.scheduleRow}>
                  <Text style={styles.scheduleLabel}>일요일:</Text>
                  <Text style={styles.scheduleValue}>{sunPeekAlloc}~{sunNPeekAlloc}분</Text>
                </View>
                <View style={styles.scheduleRow}>
                  <Text style={styles.scheduleLabel}>공휴일:</Text>
                  <Text style={styles.scheduleValue}>{wePeekAlloc}~{weNPeekAlloc}분</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setIsDrawerOpen(true)}
          style={styles.scheduleButton}
        >
          <Text style={styles.scheduleTitle}>버스 시간표</Text>
          <Text style={styles.scheduleSubtitle}>클릭하여 전체 버스 시간표 보기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isDrawerOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsDrawerOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>버스 시간표</Text>
            <TouchableOpacity
              onPress={() => setIsDrawerOpen(false)}
              style={styles.closeButton}
            >
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.busList}>
              {busData.map((bus: any, index: number) =>
                pathname.includes('se') ? renderContent(bus, index) : renderAccordionContent(bus, index)
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
  },
  scheduleButton: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  busList: {
    padding: 16,
    gap: 8,
  },
  
  // Accordion styles
  accordionItem: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'white',
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  busNumber: {
    width: 32,
    height: 32,
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  busNumberText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 14,
  },
  routeName: {
    fontWeight: '500',
    fontSize: 16,
  },
  accordionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  
  accordionContent: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontWeight: '500',
    fontSize: 16,
  },
  infoValue: {
    color: '#374151',
    fontSize: 16,
  },
  
  scheduleSection: {
    gap: 8,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleDetails: {
    gap: 4,
    paddingLeft: 24,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  scheduleValue: {
    color: '#1f2937',
    fontSize: 14,
  },
  
  // Bus item styles for Seoul campus
  busItem: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  busItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  busItemHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  busItemContent: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
});

export default memo(Schedule);