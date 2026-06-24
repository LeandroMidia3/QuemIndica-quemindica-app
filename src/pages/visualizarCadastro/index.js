import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors, globalStyles } from '../../assets/css/globalStyles';
import { useNavigation } from '@react-navigation/native';

export function VisualizarCadastro() {

    const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Image source={require('../../assets/image/logo.png')} style={[globalStyles.logo]} />
        {/* <Text style={styles.greeting}>Olá, Leandro!</Text> */}
      </View>

      {/* <Text style={styles.name}>João Silva</Text>
      <Text style={styles.email}>joao.silva@email.com</Text> */}

      <View style={styles.infoCard}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>João Silva</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>joao.silva@email.com</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.value}>(11) 98765-4321</Text>
      </View>

      <TouchableOpacity style={styles.buttonGray} onPress={() => navigation.navigate('CadastroUsuarioForm')}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRed} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
   header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
    marginTop: 5,
  },
  buttonGray: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonRed: {
    width: '100%',
    backgroundColor: '#e63946',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
