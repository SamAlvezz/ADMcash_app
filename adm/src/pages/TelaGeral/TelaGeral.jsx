import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
import axios from "axios";

export default function TelaGeral() {
  const navigation = useNavigation();
  const currentDate = new Date();
  const [relatorio, setRelatorio] = useState({
    totalDespesas: 0,
    totalReceitas: 0,
    resultado: 0,
    percentualDepesas: 0,
    percentualReceitas: 0
  });

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function navigate(page) {
    navigation.navigate(page);
    navigation.navigate(page);
  }
  useFocusEffect(() => {
    BuscarRelatorio();
  });

  useEffect(() => {
    BuscarRelatorio();
  }, []);

  async function BuscarRelatorio() {
    const response = await axios.get("https://localhost:44318/api/Despesas/relatorio");
    if (response.status != 200) {
      alert("Erro, ao buscar relatório");
      return;
    }
    setRelatorio(response.data);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={100}>
          <SafeAreaView style={styles.containerHeader}>
            <View>
              <Text style={styles.mensagem}>Bem vindo(a)!</Text>
            </View>
          </SafeAreaView>

          <View style={styles.textview}>
            <Text style={styles.text}>
              Registre e acompanhe suas receitas e despesas.
            </Text>
            {/*por aqui button ajuda*/}
          </View>

          <SafeAreaView style={styles.ServicoView}>
            <Text style={styles.ServicotituloRec}>Receitas</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigate("Receitas")}
            >
              <Text style={styles.botaotext}>Gerenciar Receitas</Text>
            </TouchableOpacity>
            <View style={styles.textdinamico}>
              <Text style={styles.dinheiroRec}>R${relatorio.totalReceitas.toFixed(2)}</Text>
              <Text style={styles.porcentagemRec}>{relatorio.percentualReceitas}%</Text>
            </View>
          </SafeAreaView>

          <SafeAreaView style={styles.ServicoView}>
            <Text style={styles.ServicotituloDes}>Despesas</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigate("Despesas")}
            >
              <Text style={styles.botaotext}>Gerenciar Despesas</Text>
            </TouchableOpacity>

            <View style={styles.textdinamico}>
              <Text style={styles.dinheiroDes}>R$
                {relatorio.totalDespesas.toFixed(2)}
              </Text>
              <Text style={styles.porcentagemDes}>{relatorio.percentualDepesas}%</Text>
            </View>
          </SafeAreaView>

          <View style={styles.ResultadoView}>
            <Text style={styles.Resultadotext}>Resultado:</Text>
            <View style={styles.textdinamico}>
              <Text style={relatorio.resultado < 0 ? styles.dinheiroDes : styles.dinheiroRec}>R${(relatorio.resultado).toFixed(2)}</Text>
              <Text style={styles.Rendatotaltext}>{relatorio.percentualDepesas}% de sua renda total</Text>
            </View>
          </View>

          <View style={styles.containerdata}>
            <Text style={styles.Data}>{formattedDate}</Text>
          </View>
        </Animatable.View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerHeader: {
    backgroundColor: "#3FE78C",
    width: '100%',
    height: 100,
    alignItems: "center",
    justifyContent: 'center'
  },
  mensagem: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 600
  },
  textview: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: "12%",
    marginTop: "10%",
  },
  text: {
    color: "#00000080",
    fontSize: 16,
    marginHorizontal: 7
  },
  ServicoView: {
    marginBottom: "5%",
    width: '95%',
    height: 140,
    borderRadius: 10,
    backgroundColor: "#fafffd",
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    marginLeft: 10
  },
  ServicotituloRec: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: "4%",
    marginTop: "3%",
    marginHorizontal: 11,
    color: "#3FE78C",
  },
  ServicotituloDes: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: "4%",
    marginTop: "3%",
    marginHorizontal: 11,
    color: "#FD5252",
  },
  botao: {
    borderRadius: 14,
    backgroundColor: "#3FE78C",
    justifyContent: "center",
    marginBottom: "5%",
    marginHorizontal: 10,
    width: '60%'
  },
  botaotext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    paddingStart: "8%",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 14,
    paddingVertical: 7,

  },

  dinheiroRec: {
    fontSize: 17,
    fontWeight: 700,
    marginHorizontal: 11,
    overflow: "hidden",
    maxWidth: 250,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#3FE78C",
  },

  dinheiroDes: {
    color: "#FD5252",
    fontSize: 17,
    fontWeight: 700,
    marginHorizontal: 11,
    overflow: "hidden",
    maxWidth: 250,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"

  },
  porcentagemRec: {
    fontSize: 17,
    fontWeight: 700,
    marginEnd: 6,
    color: "#3FE78C",

  },
  porcentagemDes: {
    color: "#FD5252",
    fontSize: 17,
    fontWeight: 700,
    marginEnd: 6
  },
  textdinamico: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 5
  },

  ResultadoView: {
    backgroundColor: "#fafffd",
    marginBottom: "5%",
    width: '95%',
    height: 130,
    borderRadius: 10,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    marginLeft: 10
  },

  Resultadotext: {
    fontSize: 20,
    fontWeight: 600,
    marginHorizontal: 11,
    marginBottom: "3%",
    marginTop: "5%",
    color: "#8c8b8b",

  },
  DinheiroRes: {
    color: "#3FE746F5",
    fontSize: 19,
    fontWeight: 600,
    marginStart: 10,
    marginTop: 3
  },
  Rendatotaltext: {
    color: "#8c8b8b",
    fontSize: 15,
    fontWeight: 700,
    maxWidth: 90,
    marginTop: -20,

  },
  Data: {
    color: "#0076f0",
    fontSize: 20,
    fontWeight: 600,
    marginTop: "3%",
  },
  containerdata: {
    marginTop: "4%",
    marginBottom: 100,
    alignItems: 'center'
  },
});
