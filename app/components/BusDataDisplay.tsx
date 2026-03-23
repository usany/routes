import React from 'react';

interface BusData {
  routeName: string;
  predictTime1: number | null;
  locationNo1: number;
  stationNm1: string;
}

interface BusDataDisplayProps {
  fetchedData: BusData[];
  isLastStep: boolean;
  styles: any;
}

export default function BusDataDisplay({ fetchedData, isLastStep, styles }: BusDataDisplayProps) {
  return (
    <>
      {fetchedData.map((data: any, dataIndex: number) => {
        const routeName = data.routeName;
        const predictTime1 = data.predictTime1;
        const locationNo1 = data.locationNo1;
        const stationNm1 = data.stationNm1;
        
        return (
          <p key={dataIndex} style={styles.busSubtitle as React.CSSProperties}>
            Bus data: {routeName}
            <br />
            {predictTime1 ? `${predictTime1}분 (${locationNo1} 정거장) ${stationNm1}` : '대기'}
            {isLastStep && predictTime1 ? `(${stationNm1} ${locationNo1})` : ''}
          </p>
        );
      })}
    </>
  );
}
