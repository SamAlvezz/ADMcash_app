import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { Modal } from 'react-native';
import { Picker } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import DatePicker from 'react-native-datepicker';


function ModalDespesas({ visible, onClose, onSave }) {

  

  const [nomeDespesa, setNomeDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [tipoDespesa, setTipoDespesa] = useState('Fixa');
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const salvarDespesa = () => {

    const novaDespesa = {
      nome: nomeDespesa,
      valor: valorDespesa,
      observacoes: observacoes,
      dataValidade: dataValidade,
      tipo: tipoDespesa,

    };
    

    // Chame a função onSave e forneça a nova despesa como argumento

    onSave(novaDespesa);

    // Limpe os campos do formulário

    setNomeDespesa('');
    setValorDespesa('');
    setObservacoes('');
    setDataValidade('');
    setTipoDespesa('Fixa');

    // Feche o modal
    onClose();

  };

  return (

    <Modal visible={visible} animationType="slide"
    >

      {/* Essa view é o plano de fundo do modal */}
      <View style={style.centeredView}>

        {/* Modal é tudo isso aqui */}
        <View style={style.modalView}>
          <Text style={style.preenchimentosdespesas}>Nome da Despesa</Text>
          <TextInput value={nomeDespesa} onChangeText={setNomeDespesa}
            placeholder="Digite" style={style.input} placeholderTextColor="gray" />

         

          <Text style={style.preenchimentosdespesas}>Valor da Despesa</Text>
          <TextInput value={valorDespesa} onChangeText={setValorDespesa}
            placeholder="R$00,00" style={style.input} placeholderTextColor="gray" />

          <Text style={style.preenchimentosdespesas}>Observações</Text>
          <TextInput value={observacoes} onChangeText={setObservacoes}
            placeholder="Digite" style={style.input} placeholderTextColor="gray" />

          <Text style={style.preenchimentosdespesas}>Data de Validade</Text>
          <TextInput
        style={style.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Digite algo..."
      />
      <DatePicker
        style={style.datePicker}
        date={selectedDate}
        mode="date"
        placeholder="Selecione a data"
        format="DD-MM-YYYY"
        minDate="01-01-2000"
        maxDate="31-12-2030"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateInput: {
            borderWidth: 0,
          },
          dateText: {
            fontSize: 18,
          },
          placeholderText: {
            fontSize: 18,
          },
          
        }}
        onDateChange={handleDateChange}
      />
       <Button title="Salvar" onPress={() => console.log('Data de Vencimento:', selectedDate)} />
       <Text style={style.preenchimentosdespesas}>Tipo de Despesa</Text>
          <Picker style={style.Picker}
            selectedValue={tipoDespesa}
            onValueChange={(itemValue) => setTipoDespesa(itemValue)}>

            <Picker.Item label="Fixas" value="Fixa" />
            <Picker.Item label="Variáveis" value="Variáveis" />
            <Picker.Item label="Extras" value="Extras" />
            <Picker.Item label="Adicionais" value="Adicionais" />
          </Picker>

          {/* Adicione aqui um componente de seleção de data */}

          
          <TouchableOpacity title="Salvar" style ={style.botaosalvar}onPress={salvarDespesa} >
          <Text style={style.txt}>Salvar</Text>
          </TouchableOpacity>
        </View>
        {/* Até aqui */}

      </View>
    </Modal>

  );

}

export default ModalDespesas;
const style = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    height: 800,
    width: 360,
    alignItems: 'center',
  },
  modalView: {
    marginTop: '25%',
    width: 332,
    height: 600,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20, // Adicione padding para dar espaço aos elementos dentro do modal
  },
  preenchimentosdespesas: {
    fontSize: 20
  },
  input: {
    marginBottom: 20, 
    height: 100,
    width: 300, // Defina a largura desejada, se necessário
    borderWidth: 1,
    borderColor: '#3FE78C',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,},
  Picker: {
    marginBottom: 20, 
    height: 100,
    width: 300, // Defina a largura desejada, se necessário
    borderWidth: 1,
    borderColor: '#3FE78C',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    
  },
  botaosalvar: {
    width: 160,
        height: 45,
        backgroundColor: '#3FE78C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14
  },
  txt: {
    fontSize: 15,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 'normal'
  },
  datePicker: {
    width: 300,
    marginBottom: 20,
  },
});

