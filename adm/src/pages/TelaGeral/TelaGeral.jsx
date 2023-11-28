import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TelaGeral() {
  const navigation = useNavigation();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function navigate(page) {
    navigation.navigate(page);
    navigation.navigate(page);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
          <Text style={styles.Servicotitulo}>Receitas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigate("Receitas")}
          >
            <Text style={styles.botaotext}>Gerenciar Receitas</Text>
          </TouchableOpacity>
          <View style={styles.textdinamico}>
            <Text style={styles.dinheiroRec}>R$5.600,00</Text>
            <Text style={styles.porcentagemRec}>100%</Text>
          </View>
        </SafeAreaView>

        <SafeAreaView style={styles.ServicoView}>
          <Text style={styles.Servicotitulo}>Despesas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigate("Despesas")}
          >
            <Text style={styles.botaotext}>Gerenciar Despesas</Text>
          </TouchableOpacity>

          <View style={styles.textdinamico}>
            <Text style={styles.dinheiroDes}>
              R$-2.437,00
            </Text>
            <Text style={styles.porcentagemDes}>43%</Text>
          </View>
        </SafeAreaView>

        <View style={styles.ResultadoView}>
          <Text style={styles.Resultadotext}>Resultado:</Text>
          <View style={styles.textdinamico}>
            <Text style={styles.DinheiroRes}>R$3.590,00</Text>
            <Text style={styles.Rendatotaltext}>62% de sua renda total</Text>
          </View>
        </View>

        <View style={styles.containerdata}>
          <Text style={styles.Data}>{formattedDate}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#FFF",
    backgroundColor: '#F9FFFC'
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
    marginHorizontal: 3
  },
  ServicoView: {
    marginBottom: "5%",
    width: '95%',
    height: 140,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
  },
  Servicotitulo: {
    color: "#3F96E7",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: "4%",
    marginTop: "3%",
    marginHorizontal: 11
  },

  botao: {
    borderRadius: 14,
    backgroundColor: "#3FE78C",
    justifyContent: "center",
    marginBottom: "5%",
    marginHorizontal: 10,
    width: '54%'
  },
  botaotext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    paddingStart: "8%",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 14,
    paddingVertical: 7,

  },

  dinheiroRec: {
    color: "#3FE746F5",
    fontSize: 17,
    fontWeight: 700,
    marginHorizontal: 11,
    overflow: "hidden",
    maxWidth: 250,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
    color: "#3FE746F5",
    fontSize: 17,
    fontWeight: 700,
    marginEnd: 6
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
    backgroundColor: "#fff",
    marginBottom: "5%",
    width: '95%',
    height: 130,
    borderRadius: 10,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    
   
  },

  Resultadotext: {
    fontSize: 20,
    fontWeight: 700,
    marginHorizontal: 11,
    marginBottom: "3%",
    marginTop: "5%",
    color: "#3F96E7"

  },
  DinheiroRes: {
    color: "#3FE746F5",
    fontSize: 19,
    fontWeight: 700,
    marginStart: 10,
    marginTop: 3
  },
  Rendatotaltext: {
    color: "#3F96E7",
    fontSize: 15,
    fontWeight: 700,
    maxWidth: 90,
    marginTop: -20,
  
  },
  Data: {
    color: "#3F96E7",
    fontSize: 20,
    fontWeight: 700,
    marginTop: "3%",
  },
  containerdata: {
    marginTop: "4%",
    marginBottom: 100
  },
});
