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
  Picker
} from "react-native";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

// Registre o locale pt-BR para o DatePicker
registerLocale("pt-BR", ptBR);

function ModalDespesas({ visible, onClose, onSave }) {
  const [nomeDespesa, setNomeDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tipoDespesa, setTipoDespesa] = useState("Fixa");

  const dataFormatada = selectedDate.toLocaleDateString("pt-BR");

  const salvarDespesa = () => {
    const novaDespesa = {
      nome: nomeDespesa,
      valor: valorDespesa,
      observacoes: observacoes,
      dataValidade: dataFormatada,
      tipo: tipoDespesa,
    };

    onSave(novaDespesa);
    setNomeDespesa("");
    setValorDespesa("");
    setObservacoes("");
    setSelectedDate(new Date());
    setTipoDespesa("Fixa");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
            onChangeText={setValorDespesa}
            placeholder="R$00,00"
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

          <Text style={styles.preenchimentosdespesas}>Tipo de Despesa</Text>
          <Picker
            selectedValue={tipoDespesa}
            onValueChange={(itemValue) => setTipoDespesa(itemValue)
            }
            style={styles.input}
          >
            <Picker.Item label="Fixa" value="Fixa" />
            <Picker.Item label="Adicional" value="Fixa" />
            <Picker.Item label="Variável" value="Variável" />
            <Picker.Item label="Extra" value="Variável" />
          </Picker>
          <TouchableOpacity style={styles.botaosalvar} onPress={salvarDespesa}>
            <Text style={styles.txt}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    height: 800,
    width: 360,
    alignItems: "center",
  },
  modalView: {
    marginTop: "10%",
    width: 332,
    height: 600,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
  },
  preenchimentosdespesas: {
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
  botaosalvar: {
    width: 160,
    height: 45,
    backgroundColor: "#3FE78C",
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "15%",
  },
  txt: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ModalDespesas;
