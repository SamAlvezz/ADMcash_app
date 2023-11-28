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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
import axios from "axios";

export default function Receita() {
  const [modalVisible, setModalVisible] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [totalReceita, setTotalReceita] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  const adicionarReceita = async (novaReceita) => {
    if (editingIndex !== null) {
      // Editar receita existente
      const updatedReceitas = [...receitas];
      updatedReceitas[editingIndex] = novaReceita;
      setReceitas(updatedReceitas);

      const body = {
        NOME_DESP: novaReceita.nome,
        VALOR_DESP: novaReceita.valor,
        DESCRICAO: novaReceita.observacoes,
        DATA_RECEBIMENTO: novaReceita.dataRecebimento,
      };

      // await axios.post();
    } else {
      // Adicionar nova despesa
    }
    novaReceita.dataValidade.setUTCHours(
      novaReceita.dataValidade.getUTCHours() - 3
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
      NOME_DESP: novaReceita.nome,
      VALOR_DESP: numericValue,
      DESCRICAO: novaReceita.observacoes,
      DATA_RECEBIMENTO: formattedDate,
    };

    try {
      const response = await axios.post(
        "https://localhost:44318/api/receitas/criarreceita",
        body
      );
    } catch (error) {
      console.log(error);
    }

    setModalVisible(false);
    calcularTotalReceitas();
  };

  const excluirReceita = (index) => {
    const updatedReceitas = [...receitas];
    updatedReceitas.splice(index, 1);
    setDespesas(updatedReceitas);
  };

  const calcularTotalReceita = () => {
    const total = receitas.reduce(
      (acc, receita) => acc + parseFloat(receita.valor),
      0
    );
    setTotalReceita(total);
  };

  useEffect(() => {
    const loadReceita = async () => {
      try {
        //pegar do back

        const response = await axios.get(
          "https://localhost:44318/api/receitas/listarreceita"
        );
        if (response.status === 200) {
          setReceitas(response.data);
          return;
        }
        console.error("Erro ao carregar receitas", response);
      } catch (error) {
        console.error("Erro ao carregar receitas", error);
      }
      calcularTotalReceita();
    };

    loadReceita();
  }, []);

  const toggleFiltros = () => {
    setFiltroVisivel(!filtroVisivel);
  };

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
          <Text style={styles.Total}>R${totalReceita.toFixed(2)}</Text>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.area1}>
        <Text style={styles.text}>Registre as suas Receitas aqui.</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.area2}>
        <View style={styles.filterIcon}>
          <TouchableOpacity onPress={toggleFiltros}>
            <AntDesign name="filter" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.AdcText}>Adicionar</Text>
        <TouchableOpacity
          style={styles.AdcIcone}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
        </TouchableOpacity>
      </SafeAreaView>
      {filtroVisivel && (
        <View style={styles.filtrosContainer}>
          <CheckBox
            title="Todos"
            checked={selectedFilter === "Todos"}
            onPress={() => setSelectedFilter("Todos")}
          />
          <CheckBox
            title="Fixa"
            checked={selectedFilter === "Fixa"}
            onPress={() => setSelectedFilter("Fixa")}
          />
          <CheckBox
            title="Adicional"
            checked={selectedFilter === "Adicional"}
            onPress={() => setSelectedFilter("Adicional")}
          />
          <CheckBox
            title="Variável"
            checked={selectedFilter === "Variável"}
            onPress={() => setSelectedFilter("Variável")}
          />
          <CheckBox
            title="Extra"
            checked={selectedFilter === "Extra"}
            onPress={() => setSelectedFilter("Extra")}
          />
        </View>
      )}

      <ModalReceitas
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={adicionarReceita}
        onExcluir={(index) => excluirReceita(index)}
        editingIndex={editingIndex}
      />

      <FlatList
        data={receitas.filter(
          (item) => selectedFilter === "Todos" || item.tipo === selectedFilter
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setEditingIndex(index);
              setModalVisible(true);
            }}
          >
            <View style={styles.itemContainer}>
              <View style={styles.alinhalist}>
                <Text style={styles.ItemTitulo}>{item.nomE_RCT}</Text>
                <Text style={[styles.itemText, styles.dataText]}>
                  {new Date(item.datA_RECEBIMENTO).toLocaleDateString("pt-BR")}
                </Text>
              </View>

              <Text style={styles.itemValor}>{item.valor}</Text>

              <Text style={styles.itemObs}>obs: {item.observacoes}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.flatlist}
      />
    </View>
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
    marginTop: "7%",
    marginBottom: "7%",
    paddingStart: "5%",
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
  filtroButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#EDEDED",
    padding: 8,
  },
  filtroButtonText: {
    color: "#FC6B6B",
  },
  filterText: {
    color: "#00000080",
    fontSize: 16,
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
  filtrosContainer: {
    maxWidth: "50%",
    marginLeft: 30,
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  filterIcon: {
    paddingStart: "8%",
  },
  alinhalist: {
    flexDirection: "row",
  },
  dataText: {
    marginLeft: "auto",
  },
});
