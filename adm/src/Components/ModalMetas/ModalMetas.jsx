import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios'; // Import axios for API calls
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

// Registre o locale pt-BR para o DatePicker
setDefaultLocale('pt-BR');

function ModalMetas({ visible, onClose, atualizarMetas }) {
  const [nomeMeta, setNomeMeta] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [dataAlcancarMeta, setDataAlcancarMeta] = useState(new Date());

  const salvarMeta = async () => {
    const novaMeta = {
      nome: nomeMeta,
      valor: valorMeta,
      dataAlcancarMeta: dataAlcancarMeta.toISOString(), // Convert Date to ISO string
    };

    // Make API call to create the new meta
    try {
      const response = await axios.post('/api/metas', novaMeta);
      if (response.status === 201) {
        // Meta created successfully
        setNomeMeta('');
        setValorMeta('');
        setDataAlcancarMeta(new Date());
        onClose();
        atualizarMetas(); // Update metas list
      } else {
        // Handle API error
        console.error('Error creating meta:', response.data);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  const handleNomeMetaChange = (text) => {
    setNomeMeta(text);
  };

  const handleValorChange = (text) => {
    if (text === '') return;
    // Remova todos os caracteres não numéricos
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedValue = numericValue
      ? `R$ ${Number(numericValue / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : '';
    setValorMeta(formattedValue);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.preenchimentosreceitas}>Nome da Meta</Text>
            <TextInput
              value={nomeMeta}
              onChangeText={handleNomeMetaChange}
              placeholder="Digite"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Valor da Meta</Text>
            <TextInput
              value={valorMeta}
              onChangeText={(text) => handleValorChange(text)}
              placeholder="R$00,00"
              style={styles.input}
              placeholderTextColor="gray"
            />

            <Text style={styles.preenchimentosreceitas}>Data para Alcançar</Text>
            <DatePicker
              selected={dataAlcancarMeta}
              onChange={(date) => setDataAlcancarMeta(date)}
              dateFormat="dd/MM/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="pt-BR" // Defina o locale para 'pt-BR'
              customInput={<TextInput style={styles.input} />}
            />

            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botaosalvar}
                onPress={salvarMeta}
              >
                <Text style={styles.txt}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botaosair} onPress={handleCloseModal}>
                <Text style={styles.txt}>Sair</Text>
              </TouchableOpacity>
            </View>

            </View>

          </View>
          </TouchableWithoutFeedback>
        
        
      
      
    </Modal>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(24, 24, 24, 0.6)',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '20%',
  },
  modalView: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
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
    borderRadius: 14,
  },
  botaosalvar: {
    width: 90,
    height: 45,
    backgroundColor: '#F9FFFC'},
});
export default ModalMetas;