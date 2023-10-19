import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get('window').width;

const data = [
  { name: 'A', population: 50, color: '#1abc9c' },
  { name: 'B', population: 30, color: '#3498db' },
  { name: 'C', population: 20, color: '#e74c3c' },
];

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

export default function Graficos() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerHeader}>
        <Text style={styles.textgraficos}>Gráficos</Text>
      </SafeAreaView>
      <Text style={styles.text}>Janeiro 2023</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        center={[10, 50]}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 2000,
    width: 360,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    width: 188,
    height: 27,
    fontSize: 17,
    color: '#3F96E7',
    textAlign: 'center'
  },
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: '#3FE78C',
    width: 360,
    height: 80,
    alignItems: 'center',
    paddingLeft: '20%',
  },
  textgraficos: {
    width: 188,
    height: 27,
    flexShrink: 0,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
