import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomButton from "../../Components/BotaoContinuar/BotaoContinuar";
import { useNavigation } from "@react-navigation/native";
import styles from "./estilo";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';

const CriarConta = () => {
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hidePassConfirm, setHidePassConfirm] = useState(true);
  const navigation = useNavigation();

  const clearInput = () => setInput("");
  const clearInput1 = () => setInput1("");
  const clearInput2 = () => setInput2("");
  const clearInput3 = () => setInput3("");

  const navigate = (page) => {
    navigation.navigate(page);
  };
/*Aqui esta tentando criar a conta ao apertar botao CriarConta la embaixo,
 com informações do usuario postas nos inputs*/

  const CadastrarConta = async () => {
    try {
      const response = await axios.post('URLdaAPI', { /* colocar URLdaAPI */
       nome: input, 
        email: input1,       /* ajustar conforme banco de dados */
        senha: input3, 
       
      });

      if (response.status === 200) { /* resposta positiva, navegar pra tela geral */
        navigate("TelaGeral");
      } else
      {
        console.error('Erro na API:', response.data); /* erros */
        alert('Erro no cadastro. Verifique suas informações e tente novamente.');
      }
    } 
    catch (error) {
      console.error('Erro na requisição:', error);
      
      alert('Erro na requisição. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500}>
        <SafeAreaView style={styles.containerHeader}>
          <Text style={styles.messagem}>  Crie sua Conta!   </Text>
        </SafeAreaView>
        <SafeAreaView>
          <Text style={styles.titulo}>Qual o seu Nome?</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.containerNome}>
          <TextInput
            placeholder="Digite seu Nome"
            style={styles.input}
            value={input}
            onChangeText={(texto) => setInput(texto)}
          />
          <TouchableOpacity style={styles.x2} onPress={clearInput}>
            <Ionicons name="close" color="" size={16}></Ionicons>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView>
          <Text style={styles.titulo}>Qual o seu Email?</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.containerEmail}>
          <TextInput
            placeholder="Digite seu email"
            style={styles.input}
            value={input1}
            onChangeText={(texto) => setInput1(texto)}
          />
          <TouchableOpacity style={styles.x2} onPress={clearInput1}>
            <Ionicons name="close" color="" size={16}></Ionicons>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView>
          <Text style={styles.titulo}>Senha</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.containerSenha}>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            value={input2}
            onChangeText={(texto) => setInput2(texto)}
            secureTextEntry={hidePass}
          />

          <TouchableOpacity
            style={styles.mostrar}
            onPress={() => setHidePass(!hidePass)}
          >
            {hidePass ? (
              <Ionicons name="eye" color="" size={16}></Ionicons>
            ) : (
              <Ionicons name="eye" color="" size={16}></Ionicons>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.x} onPress={clearInput2}>
            <Ionicons name="close" color="" size={16}></Ionicons>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView>
          <Text style={styles.titulo}>Confirme sua senha</Text>
        </SafeAreaView>

        <SafeAreaView style={styles.containerConfirmar}>
          <TextInput
            placeholder="Digite novamente"
            style={styles.input}
            value={input3}
            onChangeText={(texto) => setInput3(texto)}
            secureTextEntry={hidePassConfirm}
          />
          <TouchableOpacity
            style={styles.mostrar}
            onPress={() => setHidePassConfirm(!hidePassConfirm)}
          >
            {hidePassConfirm ? (
              <Ionicons name="eye" color="" size={16}></Ionicons>
            ) : (
              <Ionicons name="eye" color="" size={16}></Ionicons>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.x2} onPress={clearInput3}>
            <Ionicons name="close" color="" size={16}></Ionicons>
          </TouchableOpacity>
        </SafeAreaView>

        <View>
        <CustomButton onPress={CadastrarConta} title={"Criar Conta"} /> /*botao */
        </View>
      </Animatable.View>
    </View>
  );
};

export default CriarConta;

