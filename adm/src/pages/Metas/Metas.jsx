import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Progress from 'react-native-progress';
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from 'react-native';
import ModalMetas from "../../Components/ModalMetas/ModalMetas";

const progressPercentage = 15200 / 20400; // Calculate progress percentage
export default function Metas() {
  const screenWidth = Dimensions.get('window').width;
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} texto={"Metas"}>
      <View style={styles.containerHeader}>
        <View>
          <Text style={styles.text}>Metas</Text>
        </View>
      </View>
      <View style={styles.area2}>
        <Text style={styles.text1}>Adicionar</Text>
        <TouchableOpacity style={styles.text2} onPress={handleOpenModal}>
          <AntDesign name="pluscircle" size={20} color={"#3F96E7"} />
        </TouchableOpacity>
      </View>
      <View style={styles.MetasView}>
        <View style={styles.textdinamico}>
          <Text style={styles.titulo}>Carro</Text>
          <Text style={styles.dataBaterMeta}>15/11/24</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.Progresso}>Progresso:</Text>
          <Text style={styles.ValorPosto}>R$15.200,00</Text>
        </View>
        <View style={{ marginLeft: 6 }}>
          <Progress.Bar
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progressPercentage}
            width={330} //Galaxy a12
            height={15}
            borderRadius={8}
            color='#3FE78C'
          />
        </View>
        <View style={styles.textdinamico}>
          <Text style={styles.ValordaMeta}>Valor da meta:</Text>
          <Text style={styles.DinheirodaMeta}>R$20.400,00</Text>
        </View>

        {modalVisible && (
          <ModalMetas
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={(novaMeta) => {
              // Handle saving the new meta here
              console.log('novaMeta:', novaMeta);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 600
  },

  botaotext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    fontFamyli: "Nunito",
  },

  textdinamico: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: 4
  },

  containerHeader: {
    width: '100%',
    flexDirection: "row",
    backgroundColor: "#3FE78C",
    height: 100,
    alignItems: "center",
    justifyContent: 'center'
  },

  MetasView: {
    width: '95%',
    height: 140,
    backgroundColor: "#f7feff",
    marginBottom: "5%",
    borderRadius: 14,
    marginTop: '10%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    padding: 1

  },

  botao: {
    height: 31,
    borderRadius: 14,
    backgroundColor: "#3FE78C",
    justifyContent: "center",
    marginBottom: "5%",
  },

  titulo: {
    color: "#000",
    fontSize: 20,
    fontWeight: 700,
    marginBottom: "4%",
    marginTop: "3%",
    marginHorizontal: 7
  },

  dataBaterMeta: {
    color: '#F82B2B',
    fontSize: 17,
    fontWeight: 700,
    marginTop: 8,
    marginEnd: 5
  },

  ValordaMeta: {
    fontSize: 15,
    fontWeight: 700,
    marginHorizontal: 7,
    fontSize: 16
  },
  DinheirodaMeta: {
    marginEnd: 5,
    overflow: "hidden",
    maxWidth: 250,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 700,
    fontSize: 16
  },

  row: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: 5

  },

  ValorPosto: {
    color: '#3FE78C',
    fontSize: 17,
    fontWeight: 700

  },
  Progresso: {
    fontWeight: 700,
    fontSize: 17,
    marginHorizontal: 7,
    marginBottom: 4
  },
  mensagem: {
    fontWeight: 600,
    height: 27,
    fontSize: 26,
    color: "#fff",
    textAlign: "center",

  },
  area2: {
    marginTop: '10%',
    flexDirection: "row",
    paddingStart: "20%",


  },
  text1: {
    opacity: 0.5,
    fontSize: 18,
    flexDirection: "row",
    paddingStart: '55%',
  },
  text2: {
    paddingLeft: "4%",
  },

});
