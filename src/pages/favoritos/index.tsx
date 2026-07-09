import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../header'; 
import { CardItem } from '../../components/cards/cardItem';
import { colors } from '../../assets/css/globalStyles';
import { Profissional } from '../../model/Profissional';
import { Usuario } from '../../model/Usuario';
import { Perfil } from '../../components/enum/Perfil';
import { Status } from '../../components/enum/Status';
import { Portifolio } from '../../model/Portifolio';
import { useUserStore } from '../../utils/userStore';
import { useFocusEffect } from '@react-navigation/native';
import useStorege from '../../hooks/useStorege';
import { ObterProfissionalCard } from '../../api/ProfissionalController';
import { ProfissionalCard } from '../../modelUtils/ProfissionalCard';
import { RequestResponse } from '../../modelUtils/RequestResponse';
 

export function Favoritos() {

  const { setExisteUsuario } = useUserStore();
 const { getUsuario }  = useStorege();
 const [listaProfissionalCard, setListaProfissionalCard] = useState<ProfissionalCard[]>([]);

  useFocusEffect(
    useCallback(() => {
      const verificarUsuario = async () => {
        try {
          const usuarioStorege = await getUsuario("@usuario");
          if (usuarioStorege) {
            console.log("usuarioStorege: " + JSON.stringify(usuarioStorege));
            setExisteUsuario(true);              
            }else{
              console.log("Não achou usuario no storage");
              setExisteUsuario(false);
            }
        } catch (error) {
          console.log("Erro ao obter usuário do storage:", error);
        }
      };
      verificarUsuario();


      const obterProfissioaisCard = async () => {
        try {
          const response: RequestResponse = await ObterProfissionalCard();

          if (response.sucess) {

            const listaObjeto: ProfissionalCard[] = response.objeto;
            setListaProfissionalCard(listaObjeto);

            console.log("listaObjeto: " + JSON.stringify(listaObjeto))
                         
            }else{
              console.log("Erro API: " + response.message);
            }
        } catch (error) {
          console.log("Erro ao obterProfissioaisCard: ", error);
        }
      };
      obterProfissioaisCard();

    }, [])
  );
  
  return (
    <View style={styles.container}>
        
        <Header title="Meus Favoritos" mensagem="Aqui estão os profissionais que você mais confia" />
        
        <View style={styles.subheader}>
            <FlatList 
                data={listaProfissionalCard}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => <CardItem item={ item } remover={true}  />}
            /> 
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  subheader: {
    flex: 1,
    backgroundColor: '#e8e4e4fa',
    //  marginBottom: 16,
     padding: 16,
  },
});
