import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../../assets/css/globalStyles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecuperarSenha } from "../../api/UsuarioController";
import { ModalMensagem } from '../../components/modalMensagem';
import LoadingModal from '../../components/modalPreloader';
import {EmailForm} from "../../modelUtils/EmailForm";



const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
});

export function EsqueciSenha() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [typer, setTyper] = useState("error");

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<EmailForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<EmailForm> = async (data) => {
    console.log('Dados enviados:', data);
    setModalVisible(false);

    setLoading(true);
    const response = await RecuperarSenha(data);
    setLoading(false);

    if(response.sucess){
        setTyper("success");
        setModalVisible(true);
        setModalMessage("Foi enviado um email com uma nova senha, por favor logue novamente e troque a senha.");
    }else{
        setTyper("error");
        setModalVisible(true);
        setModalMessage("Houve um erro ao enviar o email para troca de senha, por favor tente mais tarde.");
    }

     console.log("SubmitHandler: " + JSON.stringify(response));
      
  };


  function fecharModal(){
    setModalVisible(false);
    navigation.goBack();
  }
  


  
  return (
    
    <ScrollView style={styles.container}>

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalMensagem handleClose={() => fecharModal()} type={typer} message={modalMessage} ></ModalMensagem>
      </Modal>

      {/* Header com logo e saudação */}
      <View style={styles.header}>
        <Image source={require('../../assets/image/logo.png')} style={[globalStyles.logo]} />
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.placeholdertext}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              maxLength={50}
            />
            <View style={styles.msgErro}>{errors.email && <Text style={styles.textErro}>{errors.email.message}</Text>}</View>
          </>
        )}
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Enviar nova senha</Text>
        </TouchableOpacity>
      </View>


<LoadingModal visible={loading} />
    </ScrollView> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    paddingBottom: 40,
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
   placeholderText: {
      color: colors.text
   },
   header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#F9F9F9',
    color: colors.text,
    marginBottom: 5,
  },
  textErro: {
  color: colors.formerro,
  },
  msgErro: {
    marginBottom: 12,
  }
});
