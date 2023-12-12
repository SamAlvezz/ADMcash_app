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
// Registre o locale pt-BR para o DatePicker
registerLocale("pt-BR", ptBR);

function ModalDespesas({ visible, onClose, onSave, onExcluir, index }) {
  const [nomeDespesa, setNomeDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [CategoriaDespesa, setCategoriaDespesa] = useState("Fixa");

  /* salvando despesa */
  const salvarDespesa = () => {
    const novaDespesa = {
      nome: nomeDespesa,
      valor: valorDespesa,
      observacoes: observacoes,
      dataValidade: selectedDate,
      categoria: CategoriaDespesa,
    };

    onSave(novaDespesa);
    setNomeDespesa("");
    setValorDespesa("");
    setObservacoes("");
    setSelectedDate(new Date());
    setCategoriaDespesa("Fixa");
    onClose();
  };
  /* excluindo */
  const excluirDespesa = () => {
    debugger;
    onExcluir(index);
    setNomeDespesa("");
    setValorDespesa("");
    setObservacoes("");
    setSelectedDate(new Date());
    setCategoriaDespesa("Fixa");
    onClose();
  };


  const handleValorChange = (text) => {
    setValorDespesa(text);
  };

  const fecharModal = () => {
    setNomeDespesa("");
    setValorDespesa("");
    setObservacoes("");
    setSelectedDate(new Date());
    setCategoriaDespesa("Fixa");
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

            <Text style={styles.preenchimentosdespesas}>Nome da Despesa</Text>
            <TextInput
              value={nomeDespesa}
              onChangeText={setNomeDespesa}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosdespesas}>Valor da Despesa</Text>
            <TextInput
              value={valorDespesa}
              onChangeText={(text) => handleValorChange(text)}
              placeholder="R$00,00"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosdespesas}>Observações</Text>
            <TextInput
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosdespesas}>Data de Validade</Text>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="pt-BR" // Defina o locale para 'pt-BR'
              customInput={<TextInput style={styles.input} />}
            />

           <Text style={styles.preenchimentosdespesas}>Categoria de Despesa</Text>
            <Picker
              selectedValue={CategoriaDespesa} // Change 'categoria' to 'CategoriaDespesa'
              onValueChange={(itemValue) => setCategoriaDespesa(itemValue)} // Change 'setCategoria' to 'setCategoriaDespesa'
              style={styles.input}
            >
              <Picker.Item label="Essencial" value="Essencial" />
              <Picker.Item label="Variável" value="Variável " />
              <Picker.Item label="Emergencial" value="Emergencial" />
            </Picker>
  
            <View style={styles.ViewBotoes}>
              {/*<TouchableOpacity
                style={styles.botaoexcluir}
                onPress={excluirDespesa}> 
                 <Text style={styles.txtexcluir}>Excluir</Text>                
                </TouchableOpacity>*/}

              <TouchableOpacity
                style={styles.botaosalvar}
                onPress={salvarDespesa}
              >
                <Text style={styles.txtsalvar}>Salvar</Text>
              </TouchableOpacity>
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
  preenchimentosdespesas: {
    fontSize: 20,
  },
  input: {
    marginBottom: 20,
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#f53656",
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
  botaoX: {
    alignSelf: 'flex-end'

  },

  txtx: {
    fontSize: 20,
    fontWeight: '700'
  }
});

export default ModalDespesas;













