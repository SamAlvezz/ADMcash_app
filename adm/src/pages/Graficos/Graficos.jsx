import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { ScrollView } from "react-native";
import Labels from "./Labels";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";


export default function Graficos() {

  const [relatorio, setRelatorio] = useState({
    totalDespesas: 0,
    totalReceitas: 0,
    resultado: 0,
    percentualDepesas: 0,
    percentualReceitas: 0,
    despesas: []
  });
  const [grafico, setGrafico] = useState([]);

  const randomGreenishColor = () => {
    const greenishHex = '456789ABCDEF'; // Dígitos hexadecimais correspondentes a tons de verde
    const letters = '0123456789ABCDEF';
    let color = '#';

    const getRandomHex = (allowedChars) => {
      const hex = allowedChars[Math.floor(Math.random() * allowedChars.length)];
      return hex;
    };

    // Adiciona 6 dígitos hexadecimais à cor, favorecendo tons de verde
    for (let i = 0; i < 6; i++) {
      color += getRandomHex(greenishHex);
    }

    // Adiciona opacidade (por exemplo, 80%, ajustável conforme necessário)
    color += 'CC';

    return color;
  };

  const pieData = grafico.map((item, index) => {
    const corAleatoria = randomGreenishColor();
    return {
      value: item.value,
      key: `${index}-${item.name}`,
      svg: {
        fill: corAleatoria,
      },
      color: corAleatoria,
      name: item.name,
      label: item.label
    };
  });

  async function BuscarRelatorio() {
    const response = await axios.get("https://localhost:44318/api/Despesas/relatorio");
    if (response.status != 200) {
      alert("Erro, ao buscar relatório");
      return;
    }
    setRelatorio(response.data);
  }
  function calcularGrafico() {
    let itensGrafico = [];


    relatorio.despesas.forEach((despesa, index) => {
      const valorDespesaFormatado = despesa.valoR_DESP.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const percentageDespesa = Number(((despesa.valoR_DESP * 100) / relatorio.totalDespesas).toFixed(1));
      const despesasObject = {
        key: index,
        name: despesa.nomE_DESP,
        label: `R$ ${valorDespesaFormatado} - ${percentageDespesa}%`,
        value: percentageDespesa
      };

      itensGrafico.push(despesasObject);
    });

    setGrafico(itensGrafico);
  }

  useEffect(() => {
    BuscarRelatorio();
  }, []);

  useEffect(() => {
    calcularGrafico();
  }, [relatorio]);

  const pieChartProps = {
    style: {
      marginTop: 50,
      marginBottom: 25,
      height: 200,
    },
    data: pieData,
    innerRadius: "65%",
    outerRadius: "100%",
    labelRadius: "80%",
    padAngle: 0.02,
    animate: true,
    animationDuration: 500,
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Gráficos</Text>
          </View>
          <Text style={styles.textdataatual}>{formattedDate}</Text>
          <PieChart {...pieChartProps}>
          </PieChart>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.subcontainer2}>
        <View style={styles.ViewReceitaGraf}>
          <Text style={[styles.ReceitaGrafText, { color: "#FD5252" }]}>Despesas</Text>
          <View style={styles.ViewReceitaGraf}>
          <Text style={[styles.ReceitaGrafvalor, { color: "#FD5252" }]}>R$ {relatorio.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>

          </View>
        </View>
        <View style={styles.alinhaSquare}>
          <Labels data={pieData} styles={styles}></Labels>
        </View>
        <View style={styles.ViewReceitaGraf}>
          <Text style={[styles.ReceitaGrafText, { color: "#3FE78C" }]}>Receitas</Text>
          <View style={styles.ViewReceitaGraf}>
            <Text style={[styles.ReceitaGrafvalor, { color: "#3FE78C" }]}>R$ {relatorio.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
        </View>
        <SafeAreaView style={styles.container}>
        <View style={styles.ViewReceitaGraf}>
        <Text style={[styles.ReceitaGrafText, styles.balancoText, { color: relatorio.resultado > 0 ? "#3FE78C" : "#FD5252" }]}>Balanço</Text>
          <View style={styles.ViewReceitaGraf}>
            <Text style={[styles.ReceitaGrafvalor, { color: relatorio.resultado > 0 ? "#3FE78C" : "#FD5252" }]}>R$ {relatorio.resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
        </View>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
  },
  subcontainer: {
    backgroundColor: "#FFF",
    height: "50%",
  },

  subcontainer2: {
    backgroundColor: "#FFF",
    height: "50%",
  },

  textdataatual: {
    color: "#3F96E7",
    fontSize: 20,
    fontWeight: 700,
    marginTop: "3%",
    alignSelf: "center",
  },
  textHeader: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 600,
  },
  containerHeader: {
    backgroundColor: "#3FE78C",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  DatatextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    //borderBottomWidth: 1,
    //borderBottomColor: '#ccc',
  },

  DatatextLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8c8b8b",
  },

  DatatextValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8c8b8b",
  },
  ReceitaGrafText: {
    fontSize: 17,
    fontWeight: "700",
    paddingStart: "6%",
    marginTop: 10,
  },
  ReceitaGrafvalor: {
    fontSize: 17,
    fontWeight: "700",
    marginHorizontal: 10
   
  },
  ViewReceitaGraf: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 6,
    marginTop: 10,
  },
  colorSquaresContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 53,
  },

  colorSquare: {
    width: 20,
    height: 20,
    marginVertical: 9,
    borderRadius: 4,
    marginStart: 10,
  },
  alinhaSquare: {
    flexDirection: "row",
  },
  flatListItem: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15
  },
  flatListItemLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  balancoText:{
    paddingStart: "6%",
marginBottom: 100

  }
});