import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Calendar from './Calendar'

export default function App() {
  return (
    <ScrollView>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{
          marginTop: 150,
          fontWeight: "bold",
          fontSize: 25,
          marginBottom: 20,
        }}>Yash's Calendar (Groww)</Text>

        <Calendar />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
