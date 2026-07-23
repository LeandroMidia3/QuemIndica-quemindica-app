import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../../assets/css/globalStyles';
import { Usuario } from '../../model/Usuario';
import { Perfil } from '../../components/enum/Perfil';
import { Status } from '../../components/enum/Status';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SalvarUsuario, UpdateUsuario } from "../../api/UsuarioController";
import { formatarData } from "../../utils/utils";
import { UsuarioSave } from '../../modelUtils/UsuarioSave';
import { ModalMensagem } from '../../components/modalMensagem';
import { RequestResponse } from '../../modelUtils/RequestResponse';
import useStorege from '../../hooks/useStorege';
import { useUserStore } from '../../utils/userStore';
import LoadingModal from '../../components/modalPreloader';
import { SenhaForm } from '../../modelUtils/SenhaForm';
import { AlterarNovaSenha } from "../../api/UsuarioController";

const schema = Yup.object().shape({
  senhaAtual: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
  senhaNova: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
  senhaConfirma: Yup.string().required('Confirmação de senha é obrigatória').min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
});

export function AlterarSenha() {

  const navigation = useNavigation();

  const[usuario, setUsuario] = useState<Usuario>();
  const[validaSenha, setValidaSenha] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { saveUsuario, getUsuario }  = useStorege();
  const { setExisteUsuario } = useUserStore();
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [typer, setTyper] = useState("error");

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<SenhaForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SenhaForm> = async (data) => {

    const senhaForm: SenhaForm = {
            id: usuario?.id,
            senhaAtual: data.senhaAtual,
            senhaNova: data.senhaNova,
            senhaConfirma: data.senhaConfirma
          };
    console.log('Dados enviados:', senhaForm);

     data.id = usuario?.id;

     setValidaSenha(false);

     if(data.senhaNova != data.senhaConfirma){
       setValidaSenha(true);
       return;
     }

     console.log("SUBMIT USUARIO: " + JSON.stringify(senhaForm));

          setLoading(true);
          const response = await AlterarNovaSenha(senhaForm);
          setLoading(false);

          console.log("SUBMIT response: " + JSON.stringify(response));
    
           if(response.sucess){
               setModalMessage(response.message);
               setTyper("success");
               setModalVisible(true);            
           }else{
             setModalMessage(response.message);
               setTyper("error");
               setModalVisible(true);
           }
    
  };

  async function salvaUsuarioApi(item: Usuario) {
    const usuarioSave: UsuarioSave = { nome: item.nome, senha: item.senha, email: item.email, dataCadastro: formatarData(item.dataCadastro), perfil: item.perfil, status: item.status };

    let response: RequestResponse = {} as RequestResponse;

    setLoading(true);
    if(usuario != undefined && usuario.id != undefined && usuario.id > 0){
      console.log("Atualizando usuario: " + JSON.stringify(usuarioSave));
      response = await UpdateUsuario(usuario.id, usuarioSave);
    }else{
      console.log("Salvando usuario: " + JSON.stringify(usuarioSave));
      response = await SalvarUsuario(usuarioSave);
    }
    setLoading(false);

     if(response.sucess){
       usuarioSave.id = response.id;
       saveUsuario("@usuario", usuarioSave);
       setExisteUsuario(true);
       navigation.goBack();
     }else{
       setModalVisible(true);
       setModalMessage(response.message);
       setLoading(false);
     }

  }


    useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const usuarioStorege = await getUsuario("@usuario");
        if (usuarioStorege) {
          setUsuario(usuarioStorege);
          console.log("usuario JSON: " + JSON.stringify(usuarioStorege));
        }else{
          console.log("Erro ao obter usuário do storage: " + usuario);
        }
      } catch (error) {
        console.log("Erro ao obter usuário do storage:", error);
      }
    };

    verificarUsuario();
  }, []);

   useEffect(() => {
    // if (usuario) {
    //   console.log("usuario atualizado:", JSON.stringify(usuario));
    // }
  }, [usuario]); // esse só observa mudanças, não altera o estado

function fecharModal(){
    setModalVisible(false);
    if(typer === "success"){
        navigation.goBack();
    }
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

    <View>
        <View style={styles.infoCard}>
            <Text style={styles.value}>{usuario?.nome}</Text>
        </View>
    
        <View style={styles.infoCard}>
            <Text style={styles.value}>{usuario?.email}</Text>
        </View>
    </View>

      <Controller
        control={control}
        name="senhaAtual"
        render={({ field: { onChange, value } }) => (
          <>
          <TextInput
            style={styles.input}
            placeholder="Senha atual"
            value={value}
            placeholderTextColor={colors.placeholdertext}
            onChangeText={onChange}
            secureTextEntry
          />
            <View style={styles.msgErro}>{errors.senhaAtual && <Text style={styles.textErro}>{errors.senhaAtual.message}</Text>}</View>
          </>
        )}
      />

      <Controller
        control={control}
        name="senhaNova"
        render={({ field: { onChange, value } }) => (
          <>
          <TextInput
            style={styles.input}
            placeholder="Senha nova"
            value={value}
            placeholderTextColor={colors.placeholdertext}
            onChangeText={onChange}
            secureTextEntry
            />
            <View style={styles.msgErro}>{errors.senhaNova && <Text style={styles.textErro}>{errors.senhaNova.message}</Text>}</View>
            <View style={styles.msgErro}>{validaSenha && <Text style={styles.textErro}>As senhas estão diferente</Text>}</View>
          </>
        )}
      />

      <Controller
        control={control}
        name="senhaConfirma"
        render={({ field: { onChange, value } }) => (
          <>
          <TextInput
            style={styles.input}
            placeholder="Confirma Senha"
            value={value}
            placeholderTextColor={colors.placeholdertext}
            onChangeText={onChange}
            secureTextEntry
            />
            <View style={styles.msgErro}>{errors.senhaConfirma && <Text style={styles.textErro}>{errors.senhaConfirma.message}</Text>}</View>
            <View style={styles.msgErro}>{validaSenha && <Text style={styles.textErro}>As senhas estão diferente</Text>}</View>
          </>
        )}
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>
        Ao cadastrar-se, você concorda com os Termos de Uso e Política de Privacidade.
      </Text>
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
  },
    infoCard: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  value: {
    color: '#555',
    marginTop: 5,
  },
});
