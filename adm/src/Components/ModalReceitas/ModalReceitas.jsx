import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

// Registre o locale pt-BR para o DatePicker
registerLocale('pt-BR', ptBR);

function ModalReceitas({ visible, onClose, onSave }) {
  const [nomeReceita, setNomeReceita] = useState('');
  const [valorReceita, setValorReceita] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  const salvarReceita = () => {
    const novaReceita = {
      nome: nomeReceita,
      valor: valorReceita,
      observacoes: observacoes,
      dataRecebimento: selectedDate,
    };

    onSave(novaReceita);
    setNomeReceita('');
    setValorReceita('');
    setObservacoes('');
    setSelectedDate(new Date());
    onClose();
  };

  const excluirReceita = () => {
    debugger;
    onExcluir(index);
    setNomeReceita("");
    setValorReceita("");
    setObservacoes("");
    setSelectedDate(new Date());
    onClose();
  };

  const handleValorChange = (text) => {
    if (text == "") return;
    // Remova todos os caracteres não numéricos
    const numericValue = text.replace(/[^0-9]/g, "");
    const formattedValue = numericValue
      ? `R$ ${Number(numericValue / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
      : "";
      setValorReceita(formattedValue);
    };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.preenchimentosreceitas}>Nome da Receita</Text>
          <TextInput
            value={nomeReceita}
            onChangeText={setNomeReceita}
            placeholder="Digite"
            style={styles.input}
            placeholderTextColor="gray"
          />

          <Text style={styles.preenchimentosreceitas}>Valor da Receita</Text>
          <TextInput
            value={valorReceita}
            onChangeText={(text) => handleValorChange(text)}
            placeholder="R$00,00"
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

          <Text style={styles.preenchimentosreceitas}>Data de Recebimento</Text>
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

          <TouchableOpacity style={styles.botaosalvar} onPress={salvarReceita}>
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
    width: '100%',
    borderWidth: 1,
    borderColor: '#3FE78C',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    borderRadius: 14
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
  txt: {
    color: "#1a800d",
    fontSize: 17,
    textAlign: "center",
    fontWeight: 700,
  },
});

export default ModalReceitas;