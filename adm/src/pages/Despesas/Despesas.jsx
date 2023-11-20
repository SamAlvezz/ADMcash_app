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

  const adicionarDespesa = async (novaDespesa) => {
    const updatedDespesas = [...despesas, novaDespesa];
    setDespesas(updatedDespesas);

    try {
      await AsyncStorage.setItem("despesas", JSON.stringify(updatedDespesas));
    } catch (error) {
      console.error("Erro ao salvar despesas no AsyncStorage: ", error);
    }
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
          <Text style={styles.Total}>R$6.610,00</Text>
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
      />

      <FlatList
        data={despesas.filter(item => selectedFilter === "Todos" || item.tipo === selectedFilter)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <SafeAreaView style={styles.alinhalist}>
              <Text style={styles.itemText2}>{item.nome} </Text>
              <Text style={styles.itemText}> - {item.tipo} - </Text>
              <Text style={styles.itemText}>
                {new Date(item.dataValidade).toLocaleDateString('pt-BR')}
              </Text>

              <Text style={styles.itemText1}>{item.valor}</Text>

            </SafeAreaView>


            <Text style={styles.itemText}>{item.observacoes}</Text>
          </View>
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
    padding: 16
  },
  itemLabel: {
    fontSize: 14,

  },
  itemText1: {
    fontSize: 16,
    color: "#FC6B6B",
    marginBottom: 12,
  },
  itemText2: {
    fontSize: 16,
    color: "#00000080",
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#00000080",
    marginBottom: 12,
  },
  filtrosContainer: {
    // Estilos para o contêiner de filtros quando estiver visível
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  filterIcon: {
    paddingStart: '8%', // Ajuste a margem esquerda aqui para posicionar o ícone do filtro
  },
  alinhalist: {
    flexDirection: 'row',
  }
});
