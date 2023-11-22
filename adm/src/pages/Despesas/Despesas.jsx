import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import ModalDespesas from "../../Components/ModalDespesas/ModalDespesas";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';

export default function Despesas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [despesas, setDespesas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  const adicionarDespesa = async (novaDespesa) => {
    if (editingIndex !== null) {
      // Editar despesa existente
      const updatedDespesas = [...despesas];
      updatedDespesas[editingIndex] = novaDespesa;
      setDespesas(updatedDespesas);
    } else {
      // Adicionar nova despesa
      const updatedDespesas = [...despesas, novaDespesa];
      setDespesas(updatedDespesas);
    }

    try {
      await AsyncStorage.setItem("despesas", JSON.stringify(despesas));
    } catch (error) {
      console.error("Erro ao salvar despesas no AsyncStorage: ", error);
    }

    setModalVisible(false);
    calcularTotalDespesas();
  };
   
  const excluirDespesa = (index) => {
    const updatedDespesas = [...despesas];
    updatedDespesas.splice(index, 1);
    setDespesas(updatedDespesas)};

  const calcularTotalDespesas = () => {
    const total = despesas.reduce((acc, despesa) => acc + parseFloat(despesa.valor), 0);
    setTotalDespesas(total);
  };

  useEffect(() => {
    const loadDespesas = async () => {
      try {
        const savedDespesas = await AsyncStorage.getItem("despesas");
        if (savedDespesas !== null) {
          setDespesas(JSON.parse(savedDespesas));
        }
      } catch (error) {
        console.error("Erro ao carregar despesas do AsyncStorage: ", error);
      }
      calcularTotalDespesas();
    };

    loadDespesas();
  }, []);

  const toggleFiltros = () => {
    setFiltroVisivel(!filtroVisivel);
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
          <Text style={styles.Total}>R${totalDespesas.toFixed(2)}</Text>
        </View>
      </SafeAreaView>


      <SafeAreaView style={styles.area1}>
        <Text style={styles.text}>
          Registre as despesas e categorize.
        </Text>
      </SafeAreaView>
      <SafeAreaView style={styles.area2}>
        <View style={styles.filterIcon}>
          <TouchableOpacity onPress={toggleFiltros}>
            <AntDesign name="filter" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.AdcText}>Adicionar</Text>
        <TouchableOpacity style={styles.AdcIcone} onPress={() => setModalVisible(true)}>
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

      <ModalDespesas
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={adicionarDespesa}
        onExcluir={(index) => excluirDespesa(index)}
        editingIndex={editingIndex}
      />

      <FlatList
        data={despesas.filter(item => selectedFilter === "Todos" || item.tipo === selectedFilter)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {
            setEditingIndex(index);
            setModalVisible(true);
          }}>
            <View style={styles.itemContainer}>
              <View style={styles.alinhalist}>
                <Text style={styles.ItemTitulo}>{item.nome}</Text>
                <Text style={styles.itemText}> - {item.tipo} - </Text>
                <Text style={[styles.itemText, styles.dataText]}>
                  {new Date(item.dataValidade).toLocaleDateString('pt-BR')}
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
    backgroundColor: "#E73F3F",
    width: '100%'
  },
  area1: {

    flexDirection: "row",
    marginBottom: "6%",
    marginTop: "3%",
  },
  text: {
    color: "#00000080",
    fontSize: 16,
    marginStart: 10
  },
  mensagem: {
    fontSize: 24,
    color: "#fff",
    marginTop: '7%',
    marginBottom: '7%',
    paddingStart: '5%',
  },
  Valor: {
    fontSize: 15,
    color: "#fff",
    paddingStart: '5%',
  },
  Total: {
    fontSize: 32,
    color: "#fff",
    paddingStart: '5%',
  },
  area2: {
    flexDirection: "row",

  },
  AdcText: {
    fontSize: 18,
    opacity: 0.5,
    paddingStart: '40%'
  },
  AdcIcone: {
    paddingStart: 5
  },
  filtroButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
    padding: 8,
  },
  filtroButtonText: {
    color: "#FC6B6B"
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

    fontWeight: 500
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
    marginTop: 5
  },
  filtrosContainer: {
    maxWidth: '50%',
    marginLeft: 30,
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  filterIcon: {
    paddingStart: '8%',
  },
  alinhalist: {
    flexDirection: 'row',
  },
  dataText: {
    marginLeft: 'auto',
  }
});
