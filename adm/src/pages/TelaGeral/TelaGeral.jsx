import react from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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
            <Text style={styles.mensagem}>Bem vindo ao Home</Text>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.area1}>
          <Text style={styles.text}>
            Registre e organize suas receitas, Investimentos e despesas da casa.
          </Text>
          <TouchableOpacity style={styles.ajuda}>
            <Ionicons name="ios-help-circle-outline" size={20} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.Servico}>
          <Text style={styles.titulo}>Receitas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigate("Receitas")}
          >
            <Text style={styles.botaotext}>Gerenciar Receitas</Text>
          </TouchableOpacity>
          <SafeAreaView style={styles.textdinamico}>
            <Text style={styles.dinheiro}>R$ 11.200,00</Text>
            <Text style={styles.porcentagem}>100%</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.Servico}>
          <Text style={styles.titulo}>Investimentos</Text>
          <TouchableOpacity style={styles.botao}>
            <Text
              style={styles.botaotext}
              onPress={() => navigate("Investimentos")}
            >
              Gerenciar investimentos
            </Text>
          </TouchableOpacity>
          <SafeAreaView style={styles.textdinamico}>
            <Text style={styles.dinheiro}>R$ R$ 1.000,00</Text>
            <Text style={styles.porcentagem}>9%</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.Servico}>
          <Text style={styles.titulo}>Despesas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigate("Despesas")}
          >
            <Text style={styles.botaotext}>Gerenciar Despesas</Text>
          </TouchableOpacity>

          <SafeAreaView style={styles.textdinamico}>
            <Text style={styles.dinheiro}>R$ R$ 6.610,00</Text>
            <Text style={styles.porcentagem}>59%</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.final}>
          <SafeAreaView style={styles.alinha1}>
            <Text style={styles.titulo1}>Resultado</Text>
            <Text style={styles.titulo2}>32% de sua </Text>
          </SafeAreaView>
          <SafeAreaView style={styles.alinha}>
            <Text style={styles.titulo1}>R$ 3.590,00</Text>
            <Text style={styles.titulo3}> renda total</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.containerdata}>
          <Text style={styles.Data}>{formattedDate}</Text>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 800,
    width: 360,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    textAlign: "center",
    color: "#00000080",
  },
  containerHeader: {
    fontSize: 13,
    flexDirection: "row",
    backgroundColor: "#3FE78C",
    width: 360,
    height: 80,
    alignItems: "center",
    paddingStart: "20%",
  },
  mensagem: {
    width: 188,
    height: 27,
    flexShrink: 0,
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  area1: {
    width: 277,
    height: 37,
    flexDirection: "row",
    paddingStart: "7%",
    alignItems: "center",
    marginBottom: "6%",
    marginTop: "6%",
  },
  ajuda: {
    width: 15,
    height: 15,
    marginTop: "6%",
    paddingStart: "10%",
  },
  Servico: {
    width: 334,
    height: 126,
    backgroundColor: "#f0fff0",
    paddingStart: "4%",
    marginBottom: "5%",
  },
  titulo: {
    color: "#3F96E7",
    fontSize: 15,
    fontWeight: 700,
    fontFamyli: "Nunito",
    marginBottom: "4%",
    marginTop: "3%",
  },
  dinheiro: {
    color: "#3F96E7",
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
  botao: {
    width: 206,
    height: 31,
    borderRadius: 14,
    backgroundColor: "#3FE78C",
    justifyContent: "center",
    marginBottom: "5%",
  },
  botaotext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    fontFamyli: "Nunito",
    paddingStart: "2%",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 14,
    paddingVertical: 7,
    
   
  
  },
  textdinamico: {
    flexDirection: "row",
  },
  alinha1: {
    flexDirection: "row",
    paddingStart: "7%",
    marginBottom: "3%",
  },
  alinha: {
    flexDirection: "row",
    paddingStart: "7%",
  },
  final: {
    width: 360,
    height: 96,
    backgroundColor: "#E2FFEE",
    justifyContent: "center",
  },
  titulo1: {
    fontSize: 15,
    fontWeight: 700,
    fontFamyli: "Nunito",
  },
  titulo2: {
    paddingStart: "37%",
    color: "#000",
    fontSize: 15,
    fontWeight: 700,
    fontFamyli: "Nunito",
  },
  titulo3: {
    paddingStart: "33%",
    color: "#000",
    fontSize: 15,
    fontWeight: 700,
    fontFamyli: "Nunito",
  },
  Data: {
    color: "#3F96E7",
    fontSize: 20,
    fontWeight: 700,
    fontFamyli: "Nunito",
    marginTop: "3%",
  },
  containerdata: {
    paddingStart: "4%",
    marginTop: "4%",
    width: 334,
    height: 100,
  },
});
