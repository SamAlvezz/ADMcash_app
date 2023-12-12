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
import ModalDespesas from "../../Components/ModalDespesas/ModalDespesas";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import ModalAltDespesas from "../../Components/ModalDespesas/ModalAltDesp";

export default function Despesas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAltVisible, setModalAltVisible] = useState(false)
  const [despesas, setDespesas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [filtroVisivel, setFiltroVisivel] = useState(false);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const adicionarDespesa = async (novaDespesa) => {
    if (editingIndex !== null) {
      // Editar despesa existente
      const updatedDespesas = [...despesas];
      updatedDespesas[editingIndex] = novaDespesa;
      setDespesas(updatedDespesas);


      const body = {
        NOME_DESP: novaDespesa.nome,
        VALOR_DESP: novaDespesa.valor,
        DESCRICAO: novaDespesa.observacoes,
        DATA_VENCIMENTO: novaDespesa.dataValidade,
        CATEGORIA: novaDespesa.categoria
      };

      try {
        let response;

        if (editingIndex !== null) {
          // Se estiver editando, utiliza o método PUT
          response = await axios.put(
            'https://localhost:44318/api/Despesas/alterardespesa',
            body
          );
        } else {
          // Se for uma nova despesa, utiliza o método POST
          response = await axios.post(
            `https://localhost:44318/api/Despesas/criardespesa/${novaDespesa.COD_DESP}`,
            body
          );
        }

        console.log("Resposta da API:", response.data);

        calcularTotalDespesas();

        setModalVisible(false);
        await loadDespesas();
        setEditingIndex(null); // Reseta o índice de edição
        setSelectedIndex(null); // Reseta o índice selecionado na FlatList
      } catch (error) {
        console.log("Erro ao adicionar/atualizar despesa", error);
      }

      calcularTotalDespesas();

      setModalVisible(false);
      await loadDespesas();
      setEditingIndex(null); // Reseta o índice de edição
    };


    // Format the date as an ISO string
    const formattedDate = novaDespesa.dataValidade.toISOString();

    const currencyString = novaDespesa.valor;

    // Remove non-numeric characters and replace comma with dot
    const numericString = currencyString
      .replace(/[^\d.,]/g, "")
      .replace(",", ".");

    // Parse the string as a float
    const numericValue = parseFloat(numericString);

    const body = {
      NOME_DESP: novaDespesa.nome,
      VALOR_DESP: numericValue,
      DESCRICAO: novaDespesa.observacoes,
      DATA_VENCIMENTO: formattedDate,
      CATEGORIA: novaDespesa.categoria
    };

    try {
      const response = await axios.post(
        "https://localhost:44318/api/Despesas/criardespesa",
        body
      );
    } catch (error) {
      console.log(error);
    }


    calcularTotalDespesas();

    setModalVisible(false);
    await loadDespesas();
  };

  function handleModalOpen(index) {
    setSelectedIndex(index);
    setModalVisible(true);
  }

  //--------------------------------------------------------------------------------------------------------------------

  const MudarDespesa = async (AlterarDespesa) => {
    if (editingIndex !== null) {
      // Editar despesa existente
      const updatedDespesas = [...despesas];
      updatedDespesas[editingIndex] = AlterarDespesa;
      setDespesas(updatedDespesas);


      const body = {
        NOME_DESP: AlterarDespesa.nome,
        VALOR_DESP: AlterarDespesa.valor,
        DESCRICAO: AlterarDespesa.observacoes,
        DATA_VENCIMENTO: AlterarDespesa.dataValidade,
      };

      try {
        let response;

        if (editingIndex !== null) {
          // Se estiver editando, utiliza o método PUT
          response = await axios.put(
            'https://localhost:44318/api/Despesas/alterardespesa',
            body
          );
        } else {
          // Se for uma nova despesa, utiliza o método POST
          response = await axios.post(
            `https://localhost:44318/api/Despesas/alterardespesa/${AlterarDespesa}`,
            body
          );
        }

        console.log("Resposta da API:", response.data);

        calcularTotalDespesas();

        setModalAltVisible(false);
        await loadDespesas();
        setEditingIndex(null); // Reseta o índice de edição
        setSelectedIndex(null); // Reseta o índice selecionado na FlatList
      } catch (error) {
        console.log("Erro ao adicionar/atualizar despesa", error);
      }

      calcularTotalDespesas();

      setModalAltVisible(false);
      await loadDespesas();
      setEditingIndex(null); // Reseta o índice de edição
    };


    // Format the date as an ISO string
    const formattedDate = AlterarDespesa.dataValidade.toISOString();

    const currencyString = AlterarDespesa.valor;

    // Remove non-numeric characters and replace comma with dot
    const numericString = currencyString
      .replace(/[^\d.,]/g, "")
      .replace(",", ".");

    // Parse the string as a float
    const numericValue = parseFloat(numericString);

    const body = {
      NOME_DESP: AlterarDespesa.nome,
      VALOR_DESP: numericValue,
      DESCRICAO: AlterarDespesa.observacoes,
      DATA_VENCIMENTO: formattedDate,
    };

    try {
      const response = await axios.post(
        "https://localhost:44318/api/Despesas/alterardespesa",
        body
      );
    } catch (error) {
      console.log(error);
    }


    calcularTotalDespesas();

    setModalVisible(false);
    await loadDespesas();
  };

  function handleModalOpen(index) {
    setSelectedIndex(index);
    setModalVisible(true);
  }

  //-----------------------------------------------------------------------------------------------------------------------------------

  const excluirDespesa = async (index) => {
    const despesaId = despesas[index].coD_DESP;

    await excluirDespesaApi(despesaId);

    // Remove the expense from the state
    // setDespesas((prevDespesas) => prevDespesas.filter((_, i) => i !== index));
    calcularTotalDespesas();
  };

  const excluirDespesaApi = async (despesaId) => {
    try {
      await axios.delete(
        `https://localhost:44318/api/Despesas/removerdespesa/${despesaId}`
      );
      console.log("Despesa excluída com sucesso");

      // Optional: reload the expenses after deletion
      await loadDespesas();
    } catch (error) {
      console.error("Erro ao excluir despesa", error);
    }
  };

  useEffect(() => {
    calcularTotalDespesas();
  }, [despesas])

  const calcularTotalDespesas = () => {
    const total = despesas.reduce(
      (acc, despesa) => acc + parseFloat(despesa.valoR_DESP),
      0
    );
    console.log("Total de despesas calculado:", total);
    setTotalDespesas(total);
  };


  const loadDespesas = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44318/api/Despesas/listardespesa"
      );
      if (response.status === 200) {
        setDespesas(response.data);
        calcularTotalDespesas();
        console.log(response.data);
      } else {
        console.error("Erro ao carregar despesas", response);
      }
    } catch (error) {
      console.error("Erro ao carregar despesas", error);
    }
  };


  useEffect(() => {
    loadDespesas();
  }, []);

  const toggleFiltros = () => {
    setFiltroVisivel(!filtroVisivel);
  };
  const [despesaSelecionada, setDespesaSelecionada] = useState();
  function handleModalAlterar(item) {
    setDespesaSelecionada(item);
    setModalAltVisible(true);
  }

  async function handleCloseModalAlterar() {
    setModalAltVisible(false);
    await loadDespesas();
  }

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
              <Text style={styles.mensagem}> Despesas</Text>
            </View>
          </View>
          <View>
            <Text style={styles.Valor}>Valor das despesas</Text>
          </View>
          <View>
            <Text style={styles.Total}>R$-{totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
        </View>

        <View style={styles.area1}>
          <Text style={styles.text}>Registre as despesas e categorize</Text>
        </View>
        <View style={styles.area2}>
          <View style={styles.filterIcon}>
            <TouchableOpacity onPress={toggleFiltros}>
              <AntDesign name="filter" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.JuntADC}>
            <Text style={styles.AdcText}>Adicionar</Text>
            <TouchableOpacity
              style={styles.AdcIcone}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
            </TouchableOpacity>
          </View>
        </View>
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
              title="Emergencial"
              checked={selectedFilter === "Emergencial"}
              onPress={() => setSelectedFilter("Emergencial")}
            />
          </View>
        )}

        <ModalDespesas
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={adicionarDespesa}
          onExcluir={excluirDespesa}
          editingIndex={editingIndex}
          index={selectedIndex}
        />

        <FlatList
          data={despesas}

          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <View style={styles.alinhalist}>
                <Text style={styles.ItemTitulo}>{item.nomE_DESP}</Text>
                {item.categoria}
                <Text style={[styles.itemText, styles.dataText]}>
                  {new Date(item.datA_VENCIMENTO).toLocaleDateString("pt-BR")}
                </Text>
              </View>
              <Text style={styles.itemValor}>{
                parseFloat(item.valoR_DESP).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }</Text>
              <Text style={styles.itemObs}>obs: {item.descricao}</Text>
              <View style={styles.Viewbotoes}>

                <TouchableOpacity
                  style={styles.AltButton}
                  onPress={() => { handleModalAlterar(item) }}
                >
                  <Text style={styles.excluirButtonText}>Alterar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.excluirButton}
                  onPress={() => excluirDespesa(index)}
                >
                  <Text style={styles.excluirButtonText}>Excluir</Text>
                </TouchableOpacity>

              </View>
            </View>

          )}
          style={styles.flatlist}
        />
      </Animatable.View>

      <ModalAltDespesas
        visible={modalAltVisible}
        onClose={handleCloseModalAlterar}
        onSave={MudarDespesa}
        onExcluir={excluirDespesa}
        editingIndex={editingIndex}
        index={selectedIndex}
        despesa={despesaSelecionada}
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerHeader: {
    backgroundColor: "#E73F3F",
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

  area2: {
    flexDirection: 'row'
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  AdcText: {
    fontSize: 18,
    opacity: 0.5,
  },
  AdcIcone: {
    paddingStart: 5,
  },
  filtroButton: {
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

  JuntADC: {
    flexDirection:'row',
    marginHorizontal: 14
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 4,
    marginVertical: 8,
    padding: 16,
    borderBottomWidth: 2,
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
    marginLeft: 30,
    maxWidth: '50%'
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

  excluirButtonText: {
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 15,
    color: '#5e5e5e'


  },
  AltButton: {
    width: 55,
    alignItems: 'center'

  },
  Viewbotoes: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  }
});
