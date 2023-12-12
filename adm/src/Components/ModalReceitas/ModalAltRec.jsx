import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { useEffect } from "react";
import axios from "axios";
// Registre o locale pt-BR para o DatePicker
registerLocale("pt-BR", ptBR);

function ModalAltReceitas({ visible, onClose, onSave, onExcluir, index, receita }) {
  const [receitaModal, setReceitaModal] = useState(
    {
        "coD_RCT": 0,
        "nomE_RCT": "",
        "valoR_RCT": 0,
        "descricao": "",
        "datA_RECEBIMENTO": ""
    });

  useEffect(() => {
    if (receita) {
      setReceitaModal({
        ...receita,
        datA_RECEBIMENTO: new Date(receita.datA_RECEBIMENTO),
      });
    }
  }, [receita])

  async function salvarReceita() {
    const response = await axios.put("https://localhost:44318/api/receitas/alterarreceita", receitaModal)
    if(response.status !== 200){
      alert("Erro ao alterar receita");
      return
    }

    onClose();
  }

  const fecharModal = () => {
    onClose();
  };
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.centeredView}>
        <ScrollView pagingEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.modalView}>
          <TouchableOpacity
              style={styles.botaoX}
              onPress={fecharModal} 
            >
              <Text style={styles.txtx}>x</Text>
            </TouchableOpacity>
            <Text style={styles.preenchimentosreceitas}>Nome da Receita</Text>
            
            <TextInput
              value={receitaModal.nomE_RCT}
              onChangeText={(novoNome) => {
                setReceitaModal({
                  ...receitaModal,
                  nomE_RCT: novoNome,
                });
              }}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Valor da Receita</Text>
            <TextInput
              value={receitaModal.valoR_RCT}
              onChangeText={(novoValor) => {
                setReceitaModal({
                  ...receitaModal,
                  valoR_RCT: novoValor,
                });
              }}
              placeholder="R$00,00"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Observações</Text>
            <TextInput
              value={receitaModal.descricao}
              onChangeText={(novaDesc) => {
                setReceitaModal({
                  ...receitaModal,
                  descricao: novaDesc,
                });
              }}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Data de Recebimento</Text>
            <DatePicker
              selected={receitaModal.datA_RECEBIMENTO}
              onChange={(novaData) => {
                setReceitaModal({
                  ...receitaModal,
                  datA_RECEBIMENTO: novaData,
                });
              }}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="pt-BR"
              customInput={<TextInput style={styles.input} />}
            />

            {/* <Text style={styles.preenchimentosdespesas}>Tipo de Despesa</Text>
            <Picker
              selectedValue={tipoDespesa}
              onValueChange={(itemValue) => setTipoDespesa(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Fixa" value="Fixa" />
              <Picker.Item label="Variável" value="Variável" />
              <Picker.Item label="Adicional" value="Adicional" />
              <Picker.Item label="Emergencial" value="Emergencial" />
            </Picker> */}
            <View style={styles.ViewBotoes}>
              {/*<TouchableOpacity
                style={styles.botaoexcluir}
                onPress={excluirDespesa}> 
                 <Text style={styles.txtexcluir}>Excluir</Text>                
                </TouchableOpacity>*/}
              {
                <TouchableOpacity
                  style={styles.botaosalvar}
                  onPress={salvarReceita}
                >
                  <Text style={styles.txtsalvar}>Salvar</Text>
                </TouchableOpacity>}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    flex: 1,
    justifyContent: "center",
    paddingVertical: "20%",
  },
  modalView: {
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 30,
  },
  preenchimentosreceitas: {
    fontSize: 20,
  },
  input: {
    marginBottom: 20,
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#3FE78C",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    borderRadius: 14,
  },

  ViewBotoes: {
    //flexDirection: "row",
    //justifyContent: "space-between",
    //paddingHorizontal: 25,
  },
  botaosalvar: {
    width: 90,
    height: 45,
    backgroundColor: "#F9FFFC",
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "5%",
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
  },
  /* botaoexcluir: {
     width: 90,
     height: 45,
     backgroundColor: "#F9FFFC",
     alignItems: "center",
     borderRadius: 14,
     justifyContent: "center",
     alignSelf: "center",
     marginTop: "5%",
     padding: 12,
     borderBottomWidth: 2,
     borderBottomColor: "#E0E0E0",
   },
   txtexcluir: {
     fontSize: 16,
     textAlign: "center",
     fontWeight: 600,
     color: "#E73F3F",
   },*/
  txtsalvar: {
    color: "#1a800d",
    fontSize: 17,
    textAlign: "center",
    fontWeight: 700,
  },

  botaoX:{
    alignSelf:'flex-end'
    
      },
    
      txtx:{
    fontSize: 20,
    fontWeight: '700'
      }
});

export default ModalAltReceitas;
