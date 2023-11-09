import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Receitas() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerHeader}>
        <View>
          <Text style={styles.mensagem}>Receitas</Text>
        </View>
        <View>
          <Text style={styles.Valor}>Valor das Receitas</Text>
        </View>
        <View>
          <Text style={styles.Total}>R$6.610,00</Text>
        </View>
      </SafeAreaView>
      <Text style={styles.text1}>
        Registre as receitas e categorize.
      </Text>

      <SafeAreaView style={styles.AdcView} >
        <Text style={styles.textAdc}>Adicionar</Text>
        <TouchableOpacity >
          <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
        </TouchableOpacity>


      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerHeader: {
    fontSize: 13,
    backgroundColor: "#3FE78C",
    width: '100%'
  },

  mensagem: {
    fontSize: 24,
    color: "#fff",
    marginTop: '7%',
    marginBottom: '7%',
  },
  Valor: {
    fontSize: 15,
    color: "#fff",
  },

  Total: {
    fontSize: 32,
    color: "#fff",
  },

  text1: {
    fontSize: 13,
    flexDirection: 'row',
  },
  AdcView: {
    flexDirection: 'row',

  },

  textAdc: {
    color: "#00000080",
    fontSize: 16
  },

})