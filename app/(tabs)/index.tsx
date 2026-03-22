import Button from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageContainer}>경희대 서울캠퍼스</Text>
        <Text>어디로 떠나볼까요?</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme='primary' label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  // grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, maxWidth: 672, margin: '0 auto' },
  // cardBase: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, borderRadius: 8, transition: 'background-color 0.2s', textDecoration: 'none', color: 'inherit' },
  contentWrapper: { textAlign: 'center', width: '100%' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 32, margin: 0 },
  subtitle: { fontSize: 18, color: '#4b5563', marginBottom: 32, margin: 0 },
  cardsContainer: { display: 'flex', flexDirection: 'column', gap: 24 },
  cardBlue: { backgroundColor: '#dbeafe' },
  cardGreen: { backgroundColor: '#dcfce7' },
  cardYellow: { backgroundColor: '#fef08a' },
  cardPurple: { backgroundColor: '#f3e8ff' },
  iconBase: { width: 48, height: 48, marginBottom: 8 },
  iconBlue: { color: '#2563eb' },
  iconGreen: { color: '#16a34a' },
  iconYellow: { color: '#ca8a04' },
  iconPurple: { color: '#9333ea' },
  cardText: { fontWeight: 500 },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
