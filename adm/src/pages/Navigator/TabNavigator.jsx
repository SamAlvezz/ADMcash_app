import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TelaGeral from "../TelaGeral/TelaGeral";
import Metas from "../Metas/Metas";
import Graficos from "../Graficos/Graficos";
import Usuarios from "../Usuarios/Usuarios";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

function Menu() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#3FE78C",
          borderTopWidth: 0,       
          elevation: 0,
          height: 60,
          width: 360,
          
        },
      }}
    >
      <Tab.Screen
        name="TelaGeral"
        component={TelaGeral}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={"#0000ff"} />;
            }
            return (
              <Ionicons name="home-outline" size={size} color={"#0000ff"} />
            );
          },
        }}
      />
      <Tab.Screen name="Metas" component={Metas}
       options={{
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          if (focused) {
            return <MaterialCommunityIcons name="clipboard-list" size={size} color={"#0000ff"} />
          }
          return (
            <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={"#0000ff"} />
          );
        },
      }}/>
      <Tab.Screen
        name="Graficos"
        component={Graficos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="pie-chart" size={size} color={"#0000ff"} />
              );
            }
            return (
              <Ionicons
                name="pie-chart-outline"
                size={size}
                color={"#0000ff"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="person-circle" size={size} color={"#0000ff"} />
              );
            }
            return (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={"#0000ff"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Menu;
