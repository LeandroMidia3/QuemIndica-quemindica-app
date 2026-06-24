import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../../assets/css/globalStyles';
import type { RootStackParamList } from "../routes/types";
import type { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Tabs'>;

export function Login() {

  const navigation = useNavigation<NavigationProp>();
  
  return (

    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/image/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.placeholdertext}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.placeholdertext}
        secureTextEntry
      />

      {/* Botões */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('VisualizarCadastro')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('CadastroForm')}>
        <Text style={styles.buttonText}>Criar conta</Text>
      </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuarioForm')}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>
      {/* Link de recuperação */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
  },
  input: {
    width: '100%',
    color: colors.text,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonPrimary: {
    width: '100%',
    backgroundColor: '#FF7043', // laranja
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSecondary: {
    width: '100%',
    backgroundColor: '#4A90E2', // azul
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#F2F2F2',
    marginTop: 20,
    fontSize: 14,
  },
});
