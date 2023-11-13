import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { PieChart } from 'react-native-svg-charts'
import { ScrollView } from "react-native";
 
export default function Graficos() {
  const data = [50, 10, 10, 30];
  const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg: {
      fill: '#' + ((Math.random() * 0xffffff) << 0)
      .toString(16) + '000000'.slice(0, 6)
    }
  }));

  const Label = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      const percentage = ((data.value / data.total) * 100).toFixed(2); 
      return (

        <React.Fragment key={`label-${index}`}>
          <Text
            x={pieCentroid[0]}
            y={pieCentroid[1] + 10} 
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={14}
          >
            {data.label}
          </Text>
          <Text
            x={pieCentroid[0]}
            y={pieCentroid[1] + 30} 
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={12}
          >
            {`${percentage}%`}
          </Text>
        </React.Fragment>
      );
    });
  };
  

  const textData = [
    { label: 'Fixas', value: 50 },
    { label: "Variáveis", value: 10 },
    { label: "Adicionais", value: 10 },
    { label: "Resultado", value: 30}
  ];
 
  return (
    <ScrollView>
    <SafeAreaView>
      <SafeAreaView style={styles.containerHeader}>
        <Text style={styles.textHeader}>Gráficos</Text>
      </SafeAreaView>
      <Text style={styles.textdataatual}>Outubro de 2023</Text>
      <PieChart style={{ marginTop: 50, height: 150 }} data={pieData}>
        <Label />
      </PieChart>

      <FlatList
  data={textData}
  keyExtractor={(item) => item.label}
  renderItem={({ item }) => (
    <View style={styles.DatatextContainer}>
      <Text style={styles.DatatextLabel}>{item.label}</Text>
      <Text style={styles.DatatextValue}>{item.value}</Text>
    </View>
  )}
/>
        
    </SafeAreaView>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    backgroundColor: "#FFF",
 
  },
  textdataatual: {
    color: "#3F96E7",
    fontSize: 20,
    fontWeight: 700,
    marginTop: "3%",
    alignSelf:'center'
  },
  textHeader: {
    fontSize: 26,
    color: "#fff",
    fontWeight: 600
  },
  containerHeader: {
    backgroundColor: '#3FE78C',
    width: '100%',
    height: 80,
    justifyContent:'center',
    alignItems: 'center',
  },

    DatatextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
  
    DatatextLabel: {
      fontSize: 15,
    },
  
    DatatextValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
