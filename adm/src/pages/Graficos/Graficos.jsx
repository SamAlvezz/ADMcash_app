import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get('window').width;

const data = [
  { name: 'Receitas', population: 50, color: '#1abc9c' },
  { name: 'Despesas', population: 30, color: '#e74c3c' },
  { name: 'Investimentos', population: 20, color: '#3498db' },
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
        <Text style={styles.textHeader}>Gráficos</Text>
      </SafeAreaView>
      <Text style={styles.text}>Outubro 2023</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        //coordenadas x e y 
        center={[8, 10]}
        />
        {data.map((item, index) => (
          <View key={index} style={styles.dataTextContainer}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.dataText}>{item.name}</Text>
          </View>
        ))}      
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
    width: 100,
    height: 27,
    fontSize: 17,
    color: '#3F96E7',
    textAlign: 'center',
    marginTop: 5, 
    marginRight: 25,
    fontWeight: 600,
  },
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: '#3FE78C',
    width: 360,
    height: 80,
    alignItems: 'center',
    paddingLeft: '20%',
  },
  textHeader: {
    width: 188,
    height: 27,
    flexShrink: 0,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 750,
  },
  dataTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  dataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: "left"
  },
});

