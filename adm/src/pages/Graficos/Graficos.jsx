import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { PieChart } from 'react-native-svg-charts'
import { ScrollView } from "react-native";

export default function Graficos() {
  const data = [50, 10, 10, 30];
  const colors = ['#F82B2B', '#BC6BFC', '#FC9F6B', '#3FE78C'];
  const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg: {
      fill: colors[index % colors.length]
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
    { label: 'Fixas', value: '50%' },
    { label: "Variáveis", value: '10%' },
    { label: "Adicionais", value: '10%' },
    { label: "Resultado", value: '30%' }
  ];
  const pieChartProps = {
    style: { marginTop: 50, marginBottom: 25, height: 200 },
    data: pieData,
    innerRadius: '65%',
    outerRadius: '100%',
    labelRadius: '80%',
    padAngle: 0.02,
    animate: true,
    animationDuration: 500

  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        
        <SafeAreaView style={styles.containerHeader}>
          <Text style={styles.textHeader}>Gráficos</Text>
        </SafeAreaView>
        <Text style={styles.textdataatual}>Outubro de 2023</Text>
        <PieChart {...pieChartProps}>
          <Label />
        </PieChart>
        <SafeAreaView style={styles.ViewReceitaGraf}>
          <Text style={styles.ReceitaGrafText}>Receitas</Text>
          <View style={styles.ViewReceitaGraf}>
          <Text style={styles.ReceitaGrafvalor}>R$ 5.600,00</Text>
          <Text style={styles.ReceitaGrafvalor}>100%</Text>
          </View>
        </SafeAreaView>
        <FlatList 
          data={textData}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.DatatextContainer}>
              <Text style={styles.DatatextLabel}>{item.label}</Text>
              <Text style={styles.DatatextValue}>{item.value}</Text>
            </View>
          )}
          style={{ marginVertical: 10, marginHorizontal: 20, backgroundColor: '#F5F5F5', borderRadius: 10, elevation: 3}}
        />

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
 
  textdataatual: {
    color: "#3F96E7",
    fontSize: 20,
    fontWeight: 700,
    marginTop: "3%",
    alignSelf: 'center'
  },
  textHeader: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 600
  },
  containerHeader: {
    backgroundColor: '#3FE78C',
    width: '100%',
    height: 100,
    justifyContent: 'center',
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
  ReceitaGrafText:{
    fontSize: 16,
    fontWeight: '700',
    paddingStart: '6%'
  },
  ReceitaGrafvalor:{
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 6
  },
  ViewReceitaGraf:{
    flexDirection:'row',
    justifyContent:"space-between",
    marginHorizontal: 6
  }
});
