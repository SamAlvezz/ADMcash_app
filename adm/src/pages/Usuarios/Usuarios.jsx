import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native";


export default function Usuarios() {
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.ViewIMGname}>
        <Image style={styles.imagem} source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        }} />
        <Text style={styles.User}>Samuel</Text>
      </View >

      <SafeAreaView style={styles.ViewConta}>
        <View style={styles.Infos}>
          <Text style={styles.Conta}>Conta</Text>
          <Text style={styles.Nome}>Samuel</Text>
          <Text style={styles.Subsnome}>Nome de usuário</Text>
          <View style={styles.ViewSeparadora}></View>
          <Text style={styles.Email}>samuelalvesdiasdasilvasadds@gmail.com</Text>
          <Text style={styles.Subsemail}>Email de usuário</Text>
          <View style={styles.ViewSeparadora}></View>
        </View>
      </SafeAreaView>
      {/* caso for listar todos os usuarios cadastrados no celular em um tela(nao é prioridade)
      <View style={styles.usuarioscontainer}>
      </View>*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  ViewIMGname: {
    width: '100%',
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 40
  },

  imagem: {
    height: 100,
    width: 100,
  },
  User: {
    fontSize: 24,
    color: "black",
    fontWeight: 600,

  },
  ViewConta: {
    backgroundColor: '#F8FBFF',
    borderRadius: 14,
    width: '95%',
    height: 700,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,

  },
  Infos:{
    marginHorizontal: 6,
  },
  Conta: {
    color: '#3F96E7',
    fontSize: 20,
    fontWeight: 700,
    marginTop:20,
    marginBottom: 20

  },
  Nome: {
    fontSize: 18,
    fontWeight: 700
  },
  Subsnome: {
    color: '#949494',
    fontWeight: 600
  },

  Email: {
    fontSize: 15,
    fontWeight: 700,
  },
  Subsemail: {
    color: '#949494',
    fontWeight: 600
  },
  ViewSeparadora:{
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 8,
    width:'100%',
    paddingStart:5
  }

  /*usuarioscontainer: {
  display: flex*/


})