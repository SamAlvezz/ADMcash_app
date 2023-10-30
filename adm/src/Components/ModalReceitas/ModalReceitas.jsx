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
  const [nomeInvestimento, setNomeInvestimento] = useState('');
  const [valorInvestimento, setValorInvestimento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tipoInvestimento, setTipoInvestimento] = useState('Fixa');

  const salvarInvestimento = () => {
    const novaDespesa = {
      nome: nomeInvestimento,
      valor: valorInvestimento,
      observacoes: observacoes,
      dataValidade: selectedDate,
      tipo: tipoInvestimento,
    };

    onSave(novaDespesa);
    setNomeInvestimento('');
    setValorInvestimento('');
    setObservacoes('');
    setSelectedDate(new Date());
    setTipoInvestimento('Fixa');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.preenchimentosinvestimento}>Nome do Investimento</Text>
          <TextInput
            value={nomeInvestimento}
            onChangeText={setNomeInvestimento}
            placeholder="Digite"
            style={styles.input}
            placeholderTextColor="gray"
          />

          <Text style={styles.preenchimentosinvestimento}>Valor do Investimento</Text>
          <TextInput
            value={valorInvestimento}
            onChangeText={setValorInvestimento}
            placeholder="R$00,00"
            style={styles.input}
            placeholderTextColor="gray"
          />

          <Text style={styles.preenchimentosinvestimento}>Observações</Text>
          <TextInput
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Digite"
            style={styles.input}
            placeholderTextColor="gray"
          />

          <Text style={styles.preenchimentosinvestimento}>Data de Validade</Text>
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

          <Text style={styles.preenchimentosdespesas}>Tipo de Investimento</Text>
          <TextInput
            value={tipoInvestimento}
            onChangeText={setTipoInvestimento}
            placeholder="Digite"
            style={styles.input}
            placeholderTextColor="gray"
          />

          <TouchableOpacity style={styles.botaosalvar} onPress={salvarInvestimento}>
            <Text style={styles.txt}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(24, 24, 24, 0.6)',
    height: 800,
    width: 360,
    alignItems: 'center',
  },
  modalView: {
    marginTop: '10%',
    width: 332,
    height: 800,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  preenchimentosinvestimento: {
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
    width: 160,
    height: 45,
    backgroundColor: '#3FE78C',
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    alignSelf: 'center'

  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ModalReceitas;