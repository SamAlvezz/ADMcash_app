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
  const [tipoReceita, setTipoReceita] = useState('Fixa');

  const salvarReceita = () => {
    const novaReceita = {
      nome: nomeReceita,
      valor: valorReceita,
      observacoes: observacoes,
      dataValidade: selectedDate,
      tipo: tipoReceita,
    };

    onSave(novaReceita);
    setNomeReceita('');
    setValorReceita('');
    setObservacoes('');
    setSelectedDate(new Date());
    setTipoReceita('Fixa');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.preenchimentosinvestimento}>Nome da Receita</Text>
          <TextInput
            value={nomeReceita}
            onChangeText={setNomeReceita}
            placeholder="Digite"
            style={styles.input}
            placeholderTextColor="gray"
          />

          <Text style={styles.preenchimentosinvestimento}>Valor da Receita</Text>
          <TextInput
            value={valorReceita}
            onChangeText={setValorReceita}
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

          <Text style={styles.preenchimentosinvestimento}>Data de Rencebimento</Text>
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

          <Text style={styles.preenchimentosreceitas}>Tipo de Receitas</Text>
          <TextInput
            value={tipoReceita}
            onChangeText={setTipoReceita}
            placeholder="Digite"
            style={styles.input}
            placeholderTextColor="gray"
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