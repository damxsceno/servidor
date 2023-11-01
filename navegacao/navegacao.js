import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import ListScreen from '../paginas/home';
import AddElementScreen from '../paginas/adicionar';
import Tabela from '../paginas/CabosMT_Isolação';
import ModelosScreen from '../paginas/lista';
import Tabela2 from '../paginas/TcsTps'; 
import Tabela3 from '../paginas/Trafo';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="AddElement" component={AddElementScreen} />
        <Stack.Screen name="Tabela" component={Tabela} />
        <Stack.Screen name="ModelosScreen" component={ModelosScreen} />
        <Stack.Screen name="Tabela2" component={Tabela2} />
        <Stack.Screen name="Tabela3" component={Tabela3} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default AppNavigator;
