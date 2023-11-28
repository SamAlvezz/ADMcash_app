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

function ModalReceitas({ visible, onClose, onSave, onExcluir, editingIndex }) {
  const [nomereceita, setNomereceita] = useState("");
  const [valorreceita, setValorreceita] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tiporeceita, setTiporeceita] = useState("Fixa");

/* salvando receita */
  const salvarreceita = () => {
    const novareceita = {
      nome: nomereceita,
      valor: valorreceita,
      observacoes: observacoes,
<<<<<<< HEAD
      dataRecebimento: selectedDate,
      tipo: tipoReceita,
=======
      dataValidade: selectedDate,
      tipo: tiporeceita,
>>>>>>> 28cd285cd20ef8e0bea0656bede5d8b2d2af9827
    };

    onSave(novareceita);
    setNomereceita("");
    setValorreceita("");
    setObservacoes("");
    setSelectedDate(new Date());
    setTiporeceita("Fixa");
    onClose();
  };
/* excluindo */
  const excluirreceita = () => {
    onExcluir({
      nome: nomereceita,
      dataValidade: selectedDate,
    });
    onExcluir(editingIndex);
    setNomereceita("");
    setValorreceita("");
    setObservacoes("");
    setSelectedDate(new Date());
    setTiporeceita("Fixa");
    onClose();
  };


  const handleValorChange = (text) => {
    if(text == "") return;
    // Remova todos os caracteres não numéricos
    const numericValue = text.replace(/[^0-9]/g, "");
    // Adicione um sinal de menos no início, se ainda não estiver presente
    const formattedValue = numericValue
      ? `R$ ${Number(numericValue / 100).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "";

    setValorreceita(formattedValue);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.centeredView}>
        <ScrollView pagingEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.modalView}>
            <Text style={styles.preenchimentosreceitas}>Nome da Receita</Text>
            <TextInput
              value={nomereceita}
              onChangeText={setNomereceita}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Valor da Receita</Text>
            <TextInput
              value={valorreceita}
              onChangeText={(text) => handleValorChange(text)}
              placeholder="R$00,00"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Observações</Text>
            <TextInput
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Data da Receita</Text>
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

            
            <View style={styles.ViewBotoes}>
              <TouchableOpacity
                style={styles.botaoexcluir}
                onPress={excluirreceita}
              >
                <Text style={styles.txtexcluir}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaosalvar}
                onPress={salvarreceita}
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
  },
  modalView: {
    marginTop: "25%",
    marginBottom: "10%",
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
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
  botaoexcluir: {
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
  },
  txtsalvar: {
    color: "#3FE78C",
    fontSize: 16,
    textAlign: "center",
    fontWeight: 600,
  },
});

export default ModalReceitas;
