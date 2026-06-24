import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home} from '../home';
import {Password } from '../passwords';
import {Login } from '../login';
import {Favoritos } from '../favoritos';
import { Busca } from '../busca';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CadastroForm } from '../cadastroProfissional';
import { PerfilProfissional } from '../perfil';
import { CadastroUsuarioForm } from '../cadastroUsuario';
import { VisualizarCadastro } from '../visualizarCadastro';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";

import { colors } from '../../assets/css/globalStyles';

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

//  export type RootStackParamList = {
//    Tabs: undefined;
//    CadastroForm: undefined;
//    PerfilProfissional: undefined;
//  };

export function TabRoutes(){

    return(

        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) =>{
                        if(focused){
                            return <Icon name="home" size={size} color={color} />
                        }

                        return <Icon name="home" size={size} color={color} />
                    }
                }}
                >   
            </Tab.Screen>
            
            <Tab.Screen 
                name="Buscar" 
                component={Busca}
                options={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) =>{
                        if(focused){
                            return <Icon name="find-in-page" size={size} color={color} />
                        }

                        return <Icon name="find-in-page" size={size} color={color} />
                    }
                }}>
            </Tab.Screen>

            <Tab.Screen 
                name="Favoritos" 
                component={Favoritos}
                options={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) =>{
                        if(focused){
                            return <Icon name="favorite" size={size} color={color} />
                        }

                        return <Icon name="favorite" size={size} color={color} />
                    }
                }}>
            </Tab.Screen>

            <Tab.Screen 
                name="Perfil" 
                component={Login}
                options={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarIcon: ({focused, size, color}) =>{
                        if(focused){
                            return <Icon name="person" size={size} color={color} />
                        }

                        return <Icon name="person" size={size} color={color} />
                    }
                }}>
            </Tab.Screen>



        </Tab.Navigator>
    )
}


export function Routes() {
  return (
    <Stack.Navigator>
      {/* Abas principais */}
      <Stack.Screen 
        name="Tabs" 
        component={TabRoutes} 
        options={{ headerShown: false }} 
      />

      {/* Tela extra fora do rodapé */}
      <Stack.Screen 
        name="CadastroForm" 
        component={CadastroForm} 
        options={{ 
            title: 'Detalhes do Perfil', 
            headerTintColor: '#FFF', 
            headerStyle: { 
                    backgroundColor: colors.background
                } 
            } } 
      />

      <Stack.Screen 
        name="PerfilProfissional" 
        component={PerfilProfissional} 
        options={{ 
            title: 'Perfil do Profissional', 
            headerTintColor: '#FFF', 
            headerStyle: { 
                    backgroundColor: colors.background
                } 
            } } 
      />

      <Stack.Screen 
        name="CadastroUsuarioForm" 
        component={CadastroUsuarioForm} 
        options={{ 
            title: 'Perfil do Profissional', 
            headerTintColor: '#FFF', 
            headerStyle: { 
                    backgroundColor: colors.background
                } 
            } } 
      />

    <Stack.Screen 
        name="VisualizarCadastro" 
        component={VisualizarCadastro} 
        options={{ 
            title: 'Perfil', 
            headerTintColor: '#FFF', 
            headerStyle: { 
                    backgroundColor: colors.background
                } 
            } } 
      />

      

    </Stack.Navigator>
  );
}


