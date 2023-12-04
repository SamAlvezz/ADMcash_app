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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
          `https://localhost:44318/api/Receitas/atualizarreceita/${novaReceita.COD_RTC}`,
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
        NOME_RTC: novaReceita.nome,
        VALOR_RTC: numericValue,
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
    const receitaId = Receitas[index].coD_RTC;

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
      (acc, receita) => acc + parseFloat(receita.valoR_RTC),
      0
    );
    console.log("Total de Receitas calculado:", total);
    setTotalReceitas(total);
  };

  AsyncStorage.setItem('totalReceitas', totalReceitas.toString())
    .catch(error => {
      console.error('Erro ao salvar totalReceitas no AsyncStorage:', error);
    });

  const loadReceitas = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44318/api/Receitas/listarreceita"
      );
      if (response.status === 200) {
        setReceitas(response.data);
        calcularTotalReceitas(); // Movido para cá
        console.log(response.data);
      } else {
        console.error("Erro ao carregar Receitas", response);
      }
    } catch (error) {
      console.error("Erro ao carregar Receitas", error);
    }
  };

  const loadTotalReceitas = async () => {
    // Recupere o total do AsyncStorage ao montar o componente
    try {
      const savedTotal = await AsyncStorage.getItem('totalReceitas');
      if (savedTotal !== null) {
        setTotalReceitas(parseFloat(savedTotal));
      }
    } catch (error) {
      console.error('Erro ao carregar totalReceitas do AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadReceitas();
    loadTotalReceitas();
  }, []);


  const navigation = useNavigation();

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

          <Text style={styles.AdcText}>Adicionar</Text>
          <TouchableOpacity
            style={styles.AdcIcone}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
          </TouchableOpacity>

        <ModalReceitas
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={adicionarReceita}
          onExcluir={excluirReceita}
          editingIndex={editingIndex}
          index={selectedIndex}
        />

        <FlatList
          data={Receitas}
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
                  <Text style={styles.ItemTitulo}>{item.nomE_RTC}</Text>
                  <Text style={styles.itemText}> - {item.tipo} - </Text>
                  <Text style={[styles.itemText, styles.dataText]}>
                    {new Date(item.datA_RECEBIMENTO).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
                <Text style={styles.itemValor}>R$ {item.valoR_RTC},00</Text>
                <Text style={styles.itemObs}>obs: {item.DESCRICAO}</Text>
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
    paddingStart: "40%",
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
    color: "#FC6B6B",

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
});