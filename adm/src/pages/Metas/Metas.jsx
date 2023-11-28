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
          <Text style={styles.text}>Metas</Text>
        </View>
        ,
      </SafeAreaView>

      <Text style={styles.text}></Text>

      <SafeAreaView style={styles.MetasView}>
        <View style={styles.textdinamico}>
          <Text style={styles.titulo}>POP 100</Text>
          <Text style={styles.dataBaterMeta}>15/11/24</Text>
        </View>

        <View style={styles.textdinamico}>
          <Text style={styles.ValordaMeta}>Valor da meta:</Text>
          <Text style={styles.DinheirodaMeta}>R$15.390,00</Text>
        </View>

      </SafeAreaView>
      <SafeAreaView style={styles.area2}>
        <Text style={styles.text1}>Adicionar</Text>
        <TouchableOpacity style={styles.text2}>
          <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 600
  },
  botaotext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    fontFamyli: "Nunito",
  },

  textdinamico: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },

  containerHeader: {
    width: '100%',
    flexDirection: "row",
    backgroundColor: "#3FE78C",
    height: 100,
    alignItems: "center",
    justifyContent: 'center'
  },

  MetasView: {
    width: '95%',
    height: 126,
    backgroundColor: "#F6FBFF",
    marginBottom: "5%",
    borderRadius: 14,
    marginTop: '10%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    padding: 1

  },

  botao: {
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
    marginBottom: "4%",
    marginTop: "3%",
    marginHorizontal: 7
  },

  dataBaterMeta: {
    color: '#F82B2B',
    fontSize: 15,
    fontWeight: 600,
    marginTop: 8,
    marginEnd: 5
  },

  ValordaMeta: {
    color: "#000",
    fontSize: 15,
    fontWeight: 700,
    marginHorizontal: 7
  },
  DinheirodaMeta: {
    marginEnd: 5,
    overflow: "hidden",
    maxWidth: 250,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 700
  },
  mensagem: {
    fontWeight: 600,
    height: 27,
    fontSize: 26,
    color: "#fff",
    textAlign: "center",

  },
  area2: {
    marginTop: '10%',
    flexDirection: "row",

  },
  text1: {
    opacity: 0.5,
    fontSize: 18,
    flexDirection: "row",
    paddingStart: '55%',
  },
  text2: {
    paddingLeft: "4%",
  },

});
