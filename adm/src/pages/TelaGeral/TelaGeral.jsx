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
        <SafeAreaView style={styles.textview}>
          <Text style={styles.text}>
            Registre e acompanhe suas receitas e despesas.
          </Text>
          {/*por aqui */}
        </SafeAreaView>
        <SafeAreaView style={styles.ServicoView}>
          <Text style={styles.Servicotitulo}>Receitas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigate("Receitas")}
          >
            <Text style={styles.botaotext}>Gerenciar Receitas</Text>
          </TouchableOpacity>
          <SafeAreaView style={styles.textdinamico}>
            <Text style={styles.dinheiroRec}>R$11.400,00</Text>
            <Text style={styles.porcentagemRec}>100%</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.ServicoView}>
          <Text style={styles.Servicotitulo}>Despesas</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigate("Despesas")}
          >
            <Text style={styles.botaotext}>Gerenciar Despesas</Text>
          </TouchableOpacity>

          <SafeAreaView style={styles.textdinamico}>
            <Text style={styles.dinheiroDes}>R$-6.6000000000000000000000000000000000000000000000000000000000000000teste,00</Text>
            <Text style={styles.porcentagemDes}>59%</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.ResultadoView}>
          <SafeAreaView >
            <Text style={styles.Resultadotext}>Resultado</Text>
            <Text style={styles.DinheiroRes}>R$3.590,00</Text>
          </SafeAreaView>
          <SafeAreaView >
            <Text style={styles.Rendatotaltext}>62% de sua renda total</Text>
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.containerdata}>
          <Text style={styles.Data}>{formattedDate}</Text>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}
{/*a fazer: ajeitar menu de baixo e estilizar resultado*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
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
    fontSize: 26,
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
  },
  ServicoView: {
    backgroundColor: "#f0fff0",
    marginBottom: "5%",
    width: '95%',
    height: 126,
    borderRadius: 10
  },

  botao: {
    borderRadius: 14,
    backgroundColor: "#3FE78C",
    justifyContent: "center",
    marginBottom: "5%",
    marginHorizontal: 10
  },
  botaotext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    paddingStart: "2%",
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderRadius: 14,
    paddingVertical: 7,

  },
  Servicotitulo: {
    color: "#3F96E7",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: "4%",
    marginTop: "3%",
    marginHorizontal: 11
  },
  dinheiroRec: {
    color: "#3FE746F5",
    fontSize: 15,
    fontWeight: 700,
    marginHorizontal: 11,
    overflow: "hidden",
    maxWidth: 150,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  dinheiroDes: {
    color: "#FD5252",
    fontSize: 15,
    fontWeight: 700,
    marginHorizontal: 11,
    overflow: "hidden",
    maxWidth: 150,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"

  },
  porcentagemRec: {
    color: "#3FE746F5",
    fontSize: 15,
    fontWeight: 700,
  },
  porcentagemDes: {
    color: "#FD5252",
    fontSize: 15,
    fontWeight: 700,
  },
  textdinamico: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 10
  },

  ResultadoView: {
    justifyContent: "center",
    backgroundColor: "#f0fff0",
    marginBottom: "5%",
    width: '95%',
    height: 100,
    borderRadius: 10
  },
  Resultadotext: {
    fontSize: 15,
    fontWeight: 700,
    marginStart: 10
  },
  DinheiroRes: {
    color: "#000",
    fontSize: 15,
    fontWeight: 700,
    marginStart: 10
  },
  Rendatotaltext: {
    color: "#000",
    fontSize: 15,
    fontWeight: 700,
    marginStart: 10
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
