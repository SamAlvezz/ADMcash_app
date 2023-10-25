
import react, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalDespesas from "../../Components/ModalDespesas/ModalDespesas";
import { FlatList } from "react-native-gesture-handler";

export default function Despesas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [despesas, setDespesas] = useState([]);

  const adicionarDespesa = (novaDespesa) => {
    setDespesas([...despesas, novaDespesa]);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerHeader}>
        <View>
          <Text style={styles.mensagem}>Despesas</Text>
        </View>
        <View>
          <Text style={styles.Valor}>Valor das despesas</Text>
        </View>
        <View>
          <Text style={styles.Total}>R$6.610,00</Text>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.area1}>
        <Text style={styles.text}>
          Registre as despesas e categorize.
        </Text>
      </SafeAreaView>

      <SafeAreaView style={styles.area2} >
        <Text style={styles.text1}>Adicionar</Text>
        <TouchableOpacity style={styles.text2}>
          <AntDesign name="pluscircle" onPress={() => setModalVisible(true)} size={20} color={"#3F96E7"} />
        </TouchableOpacity>
      </SafeAreaView>

      <ModalDespesas
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={adicionarDespesa}
      />

<FlatList
  data={despesas}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>Nome:</Text>
      <Text style={styles.itemText}>{item.nome}</Text>

      <Text style={styles.itemLabel}>Valor:</Text>
      <Text style={styles.itemText}>R${item.valor}</Text>

      <Text style={styles.itemLabel}>Observações:</Text>
      <Text style={styles.itemText}>{item.observacoes}</Text>

      <Text style={styles.itemLabel}>Data de Validade:</Text>
      <Text style={styles.itemText}>
        {new Date(item.dataValidade).toLocaleDateString('pt-BR')}
      </Text>

      <Text style={styles.itemLabel}>Tipo:</Text>
      <Text style={styles.itemText}>{item.tipo}</Text>
    </View>
  )}
  style={styles.flatlist}
/>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 800,
    width: 360,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  containerHeader: {
    fontSize: 13,
    backgroundColor: "#3FE78C",
    width: 360,
    height: 167,
    paddingStart: "10%",

  },
  mensagem: {
    fontSize: 24,
    color: "#fff",
    marginTop: '7%',
    marginBottom: '7%',
    fontFamyli: "Nunito",
  },
  Valor: {
    fontSize: 15,
    color: "#fff",
    fontFamyli: "Nunito",

  },
  Total: {
    fontSize: 32,
    color: "#fff",
    fontFamyli: "Nunito",
  },
  area1: {
    width: 277,
    height: 20,
    flexDirection: "row",

    alignItems: "center",
    marginBottom: "6%",
    marginTop: "3%",
  },
  text: {
    textAlign: "center",
    color: "#00000080",
    fontSize: 16
  },
  area2: {
    flexDirection: 'row',
    paddingStart: "40%"
  },
  text1: {
    opacity: 0.5,
    fontSize: 18,
    fontFamyli: "Nunito",
    flexDirection: 'row',
    paddingLeft: "10%",

  },
  text2: {
    paddingLeft: "15%",
  },
  flatlist: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    marginVertical: 8,
    padding: 16,
  },
  itemLabel: {
    fontSize: 14,
    color: '#555555',
    fontFamily: 'Nunito-Bold',
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Nunito-Regular',
    marginBottom: 12,
  },
})