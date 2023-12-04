import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ModalReceitas from "../../Components/ModalReceitas/ModalReceitas";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import axios from "axios";

export default function Receitas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const adicionarReceita = async (novaReceita) => {
    if (editingIndex !== null) {
      // Editar Receita existente
      const updatedReceitas = [...receitas];
      updatedReceitas[editingIndex] = novaReceita;
      setReceitas(updatedReceitas);


      const body = {
        NOME_RTC: novaReceita.nome,
        VALOR_RTC: novaReceita.valor,
        DESCRICAO: novaReceita.observacoes,
        DATA_RECEBIMENTO: novaReceita.dataRecebimento,
      };

      try {
        await axios.put(
          `https://localhost:44318/api/Receitas/atualizarreceita/${novaReceita.COD_RCT}`,
          body
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      // Adicionar nova Receita
      novaReceita.dataRecebimento.setUTCHours(
        novaReceita.dataRecebimento.getUTCHours() - 3
      );

      // Format the date as an ISO string
      const formattedDate = novaReceita.dataRecebimento.toISOString();

      const currencyString = novaReceita.valor;

      // Remove non-numeric characters and replace comma with dot
      const numericString = currencyString
        .replace(/[^\d.,]/g, "")
        .replace(",", ".");

      // Parse the string as a float
      const numericValue = parseFloat(numericString);

      const body = {
        NOME_RCT: novaReceita.nome,
        VALOR_RCT: numericValue,
        DESCRICAO: novaReceita.observacoes,
        DATA_RECEBIMENTO: formattedDate,
      };

      try {
        const response = await axios.post(
          "https://localhost:44318/api/Receitas/criarreceita",
          body
        );
      } catch (error) {
        console.log(error);
      }
    }

    calcularTotalReceitas();

    setModalVisible(false);
    await loadReceitas();
  };

  function handleModalOpen(index) {
    setSelectedIndex(index);
    setModalVisible(true);
  }

  const excluirReceita = async (index) => {
    const receitaId = receitas[index].coD_RCT;

    await excluirReceitaApi(receitaId);

    // Remove the expense from the state
    // setReceitas((prevReceitas) => prevReceitas.filter((_, i) => i !== index));
    calcularTotalReceitas();
  };

  const excluirReceitaApi = async (receitaId) => {
    try {
      await axios.delete(
        `https://localhost:44318/api/Receitas/removerreceita/${receitaId}`
      );
      console.log("Receita excluída com sucesso");

      // Optional: reload the expenses after deletion
      await loadReceitas();
    } catch (error) {
      console.error("Erro ao excluir Receita", error);
    }
  };

  useEffect(() => {
    calcularTotalReceitas();
  }, [receitas])

  const calcularTotalReceitas = () => {
    const total = receitas.reduce(
      (acc, receita) => acc + parseFloat(receita.valoR_RCT),
      0
    );
    console.log("Total de Receitas calculado:", total);
    setTotalReceitas(total);
  };

  const loadReceitas = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44318/api/Receitas/listarreceita"
      );
      if (response.status === 200) {
        setReceitas(response.data);
        calcularTotalReceitas();
        console.log(response.data);
      } else {
        console.error("Erro ao carregar Receitas", response);
      }
    } catch (error) {
      console.error("Erro ao carregar Receitas", error);
    }
  };

  useEffect(() => {
    loadReceitas();
  }, []);


  const navigation = useNavigation();

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return '';
    }
    return `R$ ${numericValue.toFixed(2)}`;
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={100}>
        <View style={styles.containerHeader}>
          <View>
            <View style={styles.rowarrow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="white"
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Text style={styles.mensagem}> Receitas</Text>
            </View>
          </View>
          <View>
            <Text style={styles.Valor}>Valor das Receitas</Text>
          </View>
          <View>
            <Text style={styles.Total}>R${totalReceitas.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.area1}>
          <Text style={styles.text}>Registre as Receitas e categorize.</Text>
        </View>
        <View style={styles.rowadd}>
          <Text style={styles.AdcText}>Adicionar</Text>
          <TouchableOpacity
            style={styles.AdcIcone}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
          </TouchableOpacity>
        </View>
        <ModalReceitas
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={adicionarReceita}
          onExcluir={excluirReceita}
          editingIndex={editingIndex}
          index={selectedIndex}
        />

        <FlatList
          data={receitas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setEditingIndex(index);
                handleModalOpen(index);
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.alinhalist}>
                  <Text style={styles.ItemTitulo}>{item.nomE_RCT}</Text>
                  <Text style={styles.itemText}> - {item.tipo} - </Text>
                  <Text style={[styles.itemText, styles.dataText]}>
                    {new Date(item.datA_RECEBIMENTO).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
                 <Text style={styles.itemValor}>{formatCurrency(item.valoR_RCT)}</Text>
                <Text style={styles.itemObs}>obs: {item.descricao}</Text>
                <TouchableOpacity
                  style={styles.excluirButton}
                  onPress={() => excluirReceita(index)}
                >
                  <Text style={styles.excluirButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          style={styles.flatlist}
        />
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerHeader: {
    backgroundColor: "#3FE78C",
    width: "100%",
  },
  backButton: {
    marginLeft: 16,
    marginTop: 5,
  },
  rowarrow: {
    flexDirection: "row",
    marginTop: 17,
    marginBottom: 20,
  },
  area1: {
    flexDirection: "row",
    marginBottom: "6%",
    marginTop: "3%",
  },
  text: {
    color: "#00000080",
    fontSize: 16,
    marginStart: 10,
  },
  mensagem: {
    fontSize: 24,
    color: "#fff",
  },
  Valor: {
    fontSize: 15,
    color: "#fff",
    paddingStart: "5%",
  },
  Total: {
    fontSize: 32,
    color: "#fff",
    paddingStart: "5%",
  },
  area2: {
    flexDirection: "row",
  },
  AdcText: {
    fontSize: 18,
    opacity: 0.5,
  },
  AdcIcone: {
    paddingStart: 5,
  },

  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 4,
    marginVertical: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  itemLabel: {
    fontSize: 14,
  },
  itemValor: {
    fontSize: 16,
    color: "#3FE78C",

    fontWeight: 500,
  },
  ItemTitulo: {
    fontSize: 18,
    color: "black",
    fontWeight: 600,
  },
  itemText: {
    fontSize: 16,
    color: "#00000080",

    fontWeight: 500,
  },
  itemObs: {
    fontSize: 14,
    color: "#00000080",
    fontWeight: 500,
    paddingLeft: 5,
    marginTop: 5,
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  alinhalist: {
    flexDirection: "row",
  },
  dataText: {
    marginLeft: "auto",
  },
  rowadd:{
    flexDirection: 'row',
    paddingStart: "60%"
  }
});