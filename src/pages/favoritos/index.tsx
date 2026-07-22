import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../header'; 
import { CardItem } from '../../components/cards/cardItem';
import { colors } from '../../assets/css/globalStyles';
import { useUserStore } from '../../utils/userStore';
import { useFocusEffect } from '@react-navigation/native';
import useStorege from '../../hooks/useStorege';
import { ObterProfissionalCard, ObterByFavoritosByUsuario } from '../../api/ProfissionalController';
import { ProfissionalCard } from '../../modelUtils/ProfissionalCard';
import { RequestResponse } from '../../modelUtils/RequestResponse';
import { FavoritarProfissional } from '../../api/UsuarioController';
import { Favorito } from '../../model/Favorito';
import LoadingModal from '../../components/modalPreloader';
 

export function Favoritos() {

  const { setExisteUsuario } = useUserStore();
 const { getUsuario }  = useStorege();
 const [listaProfissionalCard, setListaProfissionalCard] = useState<ProfissionalCard[]>([]);
 const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const verificarUsuario = async () => {
        try {
          const usuarioStorege = await getUsuario("@usuario");
          if (usuarioStorege) {
            console.log("usuarioStorege: " + JSON.stringify(usuarioStorege));
            setExisteUsuario(true);              
            obterProfissioaisCard();
            }else{
              console.log("Não achou usuario no storage");
              setExisteUsuario(false);
            }
        } catch (error) {
          console.log("Erro ao obter usuário do storage:", error);
        }
      };
      verificarUsuario();


    }, [])
  );

    const obterProfissioaisCard = async () => {
        try {

          setListaProfissionalCard([]);
          const usuarioStorege = await getUsuario("@usuario");

          setLoading(true);
          const response: RequestResponse = await ObterByFavoritosByUsuario(usuarioStorege?.id || 0);
          setLoading(false);

          if (response.sucess) {
            const listaObjeto: ProfissionalCard[] = response.objeto;
            setListaProfissionalCard(listaObjeto);
            }else{
              console.log("Erro API: " + response.message);
            }
        } catch (error) {
          console.log("Erro ao obterProfissioaisCard: ", error);
          setLoading(false);
        }
      };


  async function favoritarCoracao(idProfissional: number){
    const usuarioStorege = await getUsuario("@usuario");
    const favorito: Favorito = {idusuario: usuarioStorege?.id || 0, idprofissional: idProfissional};

    console.log("favorito: " + JSON.stringify(favorito));


    const responseFavorito: RequestResponse = await FavoritarProfissional(favorito);

    console.log("responseFavorito: " + JSON.stringify(responseFavorito));

    obterProfissioaisCard();
  }
  
  return (
    <View style={styles.container}>
        
        <Header title="Meus Favoritos" mensagem="Aqui estão os profissionais que você mais confia" />
        
        <View style={styles.subheader}>
            <FlatList 
                data={listaProfissionalCard}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => <CardItem item={ item } remover={true}  
                onHandlerFavoritar={(id) => { favoritarCoracao(id)}} 
                />}
            /> 
        </View>
        <LoadingModal visible={loading} />
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
