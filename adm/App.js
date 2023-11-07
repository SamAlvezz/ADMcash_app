import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/Home/Home";
import CriarConta from "./src/pages/CriarConta/CriarConta";
import FazerLogin from "./src/pages/FazerLogin/FazerLogin";
import BotaoContinuar from "./src/Components/BotaoContinuar/BotaoContinuar";
import Menu from "./src/pages/Navigator/TabNavigator";
import Despesas from "./src/pages/Despesas/Despesas";
import Receitas from "./src/pages/Receitas/Receita"
import ModalDespesas from "./src/Components/ModalDespesas/ModalDespesas";
import ModalReceitas from "./src/Components/ModalReceitas/ModalReceitas";

import { StyleSheet, Text, View } from "react-native";

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
        <Stack.Screen name="Home" component={Home}options={{
          title: "",
          headerTransparent: true,
          headerShown: false
        }}
        ></Stack.Screen>
        <Stack.Screen name="CriarConta" component={CriarConta} options={{
          title: "",
          headerTransparent: true,
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen name="FazerLogin" component={FazerLogin} options={{
          title: "",
          headerTransparent: true,
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen name="BotaoContinuar" component={BotaoContinuar}  ></Stack.Screen>
        <Stack.Screen name="Menu" component={Menu} options={{
          title: "",
          headerTransparent: true,
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen name="Receitas" component={Receitas}></Stack.Screen>
        <Stack.Screen name="Despesas" component={Despesas}></Stack.Screen>
        <Stack.Screen name="ModalDespesas" component={ModalDespesas}></Stack.Screen>
        <Stack.Screen name="ModalReceitas" component={ModalReceitas}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
