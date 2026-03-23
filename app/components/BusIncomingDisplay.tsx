import { BusFront } from "lucide-react";

interface BusData {
  locationNo1: number;
  routeName: string;
}

interface BusIncomingDisplayProps {
  fetchedData: BusData[];
  styles: Record<string, any>;
}

export default function BusIncomingDisplay({ fetchedData, styles }: BusIncomingDisplayProps) {
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
}
