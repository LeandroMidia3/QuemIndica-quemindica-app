import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, globalStyles } from '../../assets/css/globalStyles';

export function CadastroUsuarioForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  const navigation = useNavigation();

    // useEffect(() => {

    // }, [listaPortifolio, foto]);

  return (
    
    <ScrollView style={styles.container}>

      {/* Header com logo e saudação */}
      <View style={styles.header}>
        <Image source={require('../../assets/image/logo.png')} style={[globalStyles.logo]} />
        {/* <Text style={styles.greeting}>Olá, Leandro!</Text> */}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor={colors.placeholdertext}
        value={nome}
        onChangeText={setNome}
      />

    <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.placeholdertext}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={50}
      />

      <TextInputMask
        type={'cel-phone'}
        style={styles.input}
        placeholder="Telefone — (99) 99999-9999"
        placeholderTextColor={colors.placeholdertext}
        keyboardType="phone-pad"
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        value={telefone}
        onChangeText={setTelefone}
        maxLength={15}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        placeholderTextColor={colors.placeholdertext}
        onChangeText={setSenha}
        secureTextEntry
      />

    <TextInput
        style={styles.input}
        placeholder="Confirma Senha"
        value={confirmaSenha}
        placeholderTextColor={colors.placeholdertext}
        onChangeText={setConfirmaSenha}
        secureTextEntry
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]}>
          <Text style={styles.buttonText}>Salvar Cadastro</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>
        Ao cadastrar-se, você concorda com os Termos de Uso e Política de Privacidade.
      </Text>

    </ScrollView> 

  );
}

const styles = StyleSheet.create({
categoryCard: {
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 10,
    width: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    paddingBottom: 40,
  },
    container2: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#392de9',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    padding: 10,
    marginBottom: 17,
    backgroundColor: '#F9F9F9',
    color: colors.text
  },
  photoButton: {
    backgroundColor: '#EEE',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  photoText: {
    color: '#555',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    marginRight: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancel: {
    backgroundColor: colors.btncancelar,
  },
  save: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
   preview: { 
    width: 200, 
    height: 200, 
    marginTop: 16, 
    borderRadius: 8 },
  fotoPrincipal:{
    alignItems: 'center',
   },
   fotoPortifolio: {
    padding: 16,
    elevation: 4,
   },
   placeholderText: {
      color: colors.Text
   },
   header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
});
