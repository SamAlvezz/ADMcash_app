import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Modal } from 'react-native';
import { Picker } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


function ModalDespesas({ visible, onClose, onSave }) {

  const [nomeDespesa, setNomeDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [tipoDespesa, setTipoDespesa] = useState('Fixa');

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

    <Modal visible={visible} animationType="fade">

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

          {/* Adicione aqui um componente de seleção de data */}

          <Text style={style.preenchimentosdespesas}>Tipo de Despesa</Text>

          <Picker style={style.Picker}
            selectedValue={tipoDespesa}
            onValueChange={(itemValue) => setTipoDespesa(itemValue)}>

            <Picker.Item label="Fixas" value="Fixa" />
            <Picker.Item label="Variáveis" value="Variáveis" />
            <Picker.Item label="Extras" value="Extras" />
            <Picker.Item label="Adicionais" value="Adicionais" />
          </Picker>

          <Button title="Salvar" onPress={salvarDespesa} />
        </View>
        {/* Até aqui */}

      </View>
    </Modal>

  );

}

export default ModalDespesas;
const style = StyleSheet.create({

  preenchimentosdespesas: {
    color: "#949494",
    fontSize: 15,
    fontWeight: 600,
    fontFamyli: "Nunito",
    flexDirection: "row",
    paddingStart: "2%",
    flexDirection: "row",
    paddingStart: "7%",
    alignItems: "center",
    margin: "5%",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 24, 24, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',

  },
  input: {
    opacity: 0.5,
    borderBottomWidth: 1,
    borderColor: '#9effb8',
    fontSize: 18,
    color: 'black',

    Picker: {
      margin: "20px 0",

    },
    x2: {
      opacity: 0.5,
      paddingStart: "5%",

    },
  }
})

