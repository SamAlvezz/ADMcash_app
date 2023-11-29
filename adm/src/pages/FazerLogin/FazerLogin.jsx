import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomButton from "../../Components/BotaoContinuar/BotaoContinuar";
import { useNavigation } from "@react-navigation/native";
import styles from "./estiloLogin";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

export default function FazerLogin() {
  const [input, setInput] = useState("");
  const [limpar, setLimpar] = useState("");
  const [hidePass, setHidepass] = useState(true);
  const navigation = useNavigation();

  const clearInput = () => {
    setInput("");
  };
  const clearInput2 = () => {
    setLimpar("");
  };

  function navigate(page) {
    navigation.navigate(page);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={100}>
        <View style={styles.containerHeader}>
          <Text style={styles.messagem}>Bem vindo novamente!</Text>
        </View>
        <View style={styles.ViewDosEspaces}>
          <View>
            <Text style={styles.titulo}>Qual o seu Email?</Text>
          </View>
          <View style={styles.containerEmail}>
            <TextInput
              placeholder="Digite  seu email"
              style={styles.input}
              value={limpar}
              onChangeText={(texto) => setLimpar(texto)}
            />
            <TouchableOpacity style={styles.x2} onPress={clearInput2}>
              <Ionicons name="close" color="" size={16}></Ionicons>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.titulo}>Senha</Text>
          </View>
          <View style={styles.containerSenha}>
            <TextInput
              placeholder="Digite sua senha"
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
              secureTextEntry={hidePass}
            />

            <TouchableOpacity
              style={styles.mostrar}
              onPress={() => setHidepass(!hidePass)}
            >
              {hidePass ? (
                <Ionicons name="eye" color="" size={16}></Ionicons>
              ) : (
                <Ionicons name="eye" color="" size={16}></Ionicons>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.x} onPress={clearInput}>
              <Ionicons name="close" color="" size={16}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaotexto}>Recuperar senha</Text>
          </TouchableOpacity>

        </View>
        <View>
          <CustomButton onPress={() =>
            navigation.navigate("Menu")} title={"Fazer Login"} />
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
}
