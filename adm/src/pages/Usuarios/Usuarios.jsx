import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";


export default function Usuarios() {
  return (

    <SafeAreaView style={styles.container}  >
      <SafeAreaView style={styles.containerHeader}>
        <image style={styles.imagem} source={{
          uri: ""
        }} />
        <View style={styles.ViewUser}>
          <Text style={styles.User}>Usuário tal</Text>
          <Text style={styles.email}>usuario@gmail.com</Text>
        </View>
        {/* caso for listar todos os usuarios cadastrados no celular em um tela(nao é prioridade)
      <View style={styles.usuarioscontainer}>
      </View>*/}
      </SafeAreaView >
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  containerHeader: {
    backgroundColor: "#3FE78C",
    width: '100%',
    height: 100,
    alignItems: "center",
    justifyContent: 'center'
  },
  ViewUser: {
    marginLeft: 30


  },
  User: {
    fontSize: 24,
    color: "#fff",
    fontWeight: 600,

  },
  email: {
    fontSize: 17,
    color: "#fff",
    fontWeight: 400,
  },

  /*usuarioscontainer: {
  display: flex*/


})