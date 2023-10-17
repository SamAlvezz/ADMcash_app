import react from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function Metas() {
  return (
    <View style={styles.container} texto={"Metas"}>
      <SafeAreaView style={styles.containerHeader}>
        <View>
          <Text style={styles.mensagem}>Metas</Text>
        </View>
        ,
      </SafeAreaView>

      <Text style={styles.text}></Text>

      <SafeAreaView style={styles.Servico}>
        <Text style={styles.titulo}>Progresso</Text>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaotext}>6.300 R$</Text>
        </TouchableOpacity>

        <SafeAreaView style={styles.textdinamico}>
          <Text style={styles.dinheiro}>Valor da meta: R$15,390 </Text>

          <Text style={styles.porcentagem}></Text>
        </SafeAreaView>
        <SafeAreaView style={styles.area2}>
          <Text style={styles.text1}>Adicionar</Text>
          <TouchableOpacity style={styles.text2}>
            <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
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

  text: {},

  botaotext: {
    color: "#fff",

    fontSize: 13,

    fontWeight: 700,

    fontFamyli: "Nunito",

    paddingStart: "2%",
  },

  textdinamico: {
    flexDirection: "row",
  },

  dinheiro: {
    color: "#000",

    fontSize: 15,

    fontWeight: 700,

    fontFamyli: "Nunito",
  },

  porcentagem: {
    color: "#3FE746F5",

    fontSize: 15,

    fontWeight: 700,

    fontFamyli: "Nunito",

    paddingStart: "33%",
  },

  containerHeader: {
    flexDirection: "row",

    backgroundColor: "#3FE78C",

    width: 360,

    height: 80,

    alignItems: "center",

    paddingStart: "20%",
  },

  Servico: {
    width: 334,

    height: 126,

    backgroundColor: "#97BEA9",

    paddingStart: "4%",

    marginBottom: "5%",

    borderRadius: 14,

    marginTop: '10%'
  },

  botao: {
    width: 206,

    height: 31,

    borderRadius: 14,

    backgroundColor: "#3FE78C",

    justifyContent: "center",

    marginBottom: "5%",
  },

  titulo: {
    color: "#000",

    fontSize: 15,

    fontWeight: 700,

    fontFamyli: "Nunito",

    marginBottom: "4%",

    marginTop: "3%",
  },

  mensagem: {
    width: 188,

    height: 27,

    flexShrink: 0,

    fontSize: 20,

    color: "#fff",

    textAlign: "center",
  },
  area2: {
    marginTop: '10%',
    flexDirection: "row",
    paddingStart: "60%",
  },
  text1: {
    opacity: 0.5,
    fontSize: 18,
    fontFamyli: "Nunito",
    flexDirection: "row",
    paddingLeft: "10%",
  },
  text2: {
    paddingLeft: "4%",
  },
});
