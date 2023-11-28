import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { PieChart } from 'react-native-svg-charts'
import { ScrollView } from "react-native";

export default function Graficos() {
  const data = [31, 6, 6, 0, 56];
  const colors = ['#F82B2B', '#FC9F6B', '#FCED6B', '#BC6BFC', '#3FE78C'];
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
    { label: "Fixas", value: '31%' },
    { label: "Variáveis", value: '6%' },
    { label: "Extras", value: '6%' },
    { label: "Adicionais", value: '0%' },
    { label: "Resultado", value: '56%' }
  ];

  const pieChartProps = {
    style: {
      marginTop: 50,
      marginBottom: 25,
      height: 200
    },
    data: pieData,
    innerRadius: '65%',
    outerRadius: '100%',
    labelRadius: '80%',
    padAngle: 0.02,
    animate: true,
    animationDuration: 500

  };
  /* os pedaços do gráfico são compostos pelos valores das categorias de despesas:
  Fixas(vermelho), Variaveis(laranja), Extras(amarelo), Adicionais(roxo) e o Resultado(verde)
  
  A operação: o valor da Receita total no sistema menos o valor total de Despesas no sistema,
  dai mostrar o valor e porcentagem 
  no Resultado(verde).
  
  ex: Receitas (valortotal) será sempre 100%,
    - Despesas (valortotal // soma de todas as categorias) 43%
      Resultado (valor) 56% 
  
  Mas no gráfico continuará mostrando apenas as categorias de despesas e o resultado
  */
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Gráficos</Text>
          </View>
          <Text style={styles.textdataatual}>Outubro de 2023</Text>
          <PieChart {...pieChartProps}>
            <Label />
          </PieChart>
        </View>
      </SafeAreaView>

      <View style={styles.subcontainer2}>
        <View style={styles.ViewReceitaGraf}>
          <Text style={styles.ReceitaGrafText}>Receitas</Text>
          <View style={styles.ViewReceitaGraf}>
            <Text style={styles.ReceitaGrafvalor}>R$ 5.600,00</Text>
            <Text style={styles.ReceitaGrafvalor}>100%</Text>
          </View>
        </View>
        <FlatList
          data={textData}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <View style={styles.DatatextContainer}>
              {/* lógica para personalizar especificamente
               o Resultado após verificação */}
              {item.label === 'Resultado' && (
                <Text style={[styles.DatatextLabel, { color: 'black', fontSize: 17 }]}>{item.label}</Text>
              )}
              {item.label !== 'Resultado' && (
                <Text style={styles.DatatextLabel}>{item.label}</Text>
              )}

              {item.label === 'Resultado' && (
                <Text style={[styles.DatatextValue, { color: '#3FE746', fontSize: 17 }]}>{item.value}</Text>
              )}
              {item.label !== 'Resultado' && (
                <Text style={styles.DatatextValue}>{item.value}</Text>
              )}
            </View>
          )}
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            backgroundColor: '#fafffe',
            borderRadius: 10,
            elevation: 3
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: 'column'
    // height: '100%',
    // marginBottom: 70 
  },
  subcontainer: {
    backgroundColor: '#FFF',
    height: '50%'
  },

  subcontainer2: {
    backgroundColor: '#FFF',
    height: '50%'
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

    //borderBottomWidth: 1,
    //borderBottomColor: '#ccc',
  },

  DatatextLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8c8b8b',
    paddingStart: 20
  },

  DatatextValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8c8b8b',

  },
  ReceitaGrafText: {
    fontSize: 15,
    fontWeight: '700',
    paddingStart: '6%',
    marginTop: 10
  },
  ReceitaGrafvalor: {
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 6
  },
  ViewReceitaGraf: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 6,
    marginTop: 10
  }
});
