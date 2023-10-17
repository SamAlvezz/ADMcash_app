import react from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";


export default function Usuarios() {
  return(
    <View style={styles.container}  >
<SafeAreaView  style={styles.containerHeader}>
        <View>
           <Text style={styles.mensagem}>Usuarios</Text>
        </View>,
        </SafeAreaView>
      <Text style={styles.text} >Pagina Usuarios</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 2000,
    width: 360,
    alignItems: "center",
    backgroundColor: "#FFF",

  },
  text: {
  
  },
  containerHeader:{ 
    flexDirection: 'row',
    backgroundColor: '#3FE78C',
    width: 360,
    height: 80,
    alignItems:'center',
    paddingStart: '20%'
    
},
mensagem: {
  width: 188,
  height: 27,
  flexShrink: 0,
  fontSize: 20,
  color: '#fff',
  textAlign:'center',
  
},
})