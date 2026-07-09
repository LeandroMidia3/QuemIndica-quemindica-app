import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { CardItem } from '../../components/cards/cardItem';
import { colors, globalStyles } from '../../assets/css/globalStyles';
import { Avaliacao } from '../../model/Avaliacao';
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


//MOCK INICIO
const categorias = [
  {
    id: '1',
    nome: 'Professora',
    foto: 'https://cdn-icons-png.flaticon.com/512/5369/5369664.png',
  },
   {
     id: '2',
     nome: 'Eletricista',
     foto: 'https://cdn-icons-png.flaticon.com/512/307/307943.png',
   },
   {
     id: '3',
     nome: 'Pedreiro',
     foto: 'https://cdn-icons-png.flaticon.com/512/9321/9321656.png',
   },
   {
     id: '4',
     nome: 'Cozinheiro',
     foto: 'https://cdn-icons-png.flaticon.com/512/1830/1830839.png',
   },
   {
     id: '5',
     nome: 'Advogado',
     foto: 'https://cdn-icons-png.flaticon.com/512/2710/2710029.png',
   },
    {
      id: '6',
      nome: 'Soldador',
      foto: 'https://cdn-icons-png.flaticon.com/512/4530/4530960.png',
    },
    {
      id: '7',
      nome: 'Programador',
      foto: 'https://cdn-icons-png.flaticon.com/512/1995/1995515.png',
    },
    {
      id: 8,
      nome: 'Bombeiro',
      'foto': 'https://cdn-icons-png.flaticon.com/512/4532/4532490.png',
    },
];

const listaPortfolio: Portifolio[] = [
  {id: 1, uri: "https://media.istockphoto.com/id/672022974/pt/foto/fresh-grilled-dorade-rose.jpg?s=1024x1024&w=is&k=20&c=oDcTXprCLWbRudU4i7eSLdvFsdaH9VmvFdcVNKq_NUk="},
  {id: 2, uri: "https://media.istockphoto.com/id/1140296796/pt/foto/baked-dorado-with-vegetables-and-green-sauce-view-from-above.jpg?s=612x612&w=0&k=20&c=ztvlqHXYuX5fDsi_sRzBR-j1ogbv5OYBiVmPj53ssLY="},
  {id: 3, uri: "https://media.istockphoto.com/id/916448498/pt/foto/grilled-seabream-on-carrot-onion-and-celery-stalks.jpg?s=612x612&w=0&k=20&c=59YdcFiiwaOc55FiJWF2zEM9XG0RKXIZKc-libAk03o="},
  {id: 4, uri: "https://media.istockphoto.com/id/953091918/pt/foto/whole-grilled-dorado-with-lemon-slices-on-table.jpg?s=612x612&w=0&k=20&c=AiVZMe3-JWOPVP21zop7WOdUO8015LWUovTXuUbFIUE="},
  {id: 5, uri: "https://media.istockphoto.com/id/892159736/pt/foto/festive-table-decoration.jpg?s=612x612&w=0&k=20&c=LSV8Q19cG-qQZfUoOB9OENePe9BV7sKQpwuM5ubrkOg="},
];



export function Home() {

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
      {/* Header com logo e saudação */}
      <View style={styles.header}>
        <Image source={require('../../assets/image/logo.png')} style={globalStyles.logo} />
        {/* <Text style={styles.greeting}>Olá, Leandro!</Text> */}
      </View>

    <View style={styles.subheader}>
      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Quem você procura hoje?"
          placeholderTextColor={colors.placeholdertext}
        />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Categorias Populares</Text>
        <FlatList
          data={categorias}
          keyExtractor={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryCard}>
              <Image source={{uri: item.foto}} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

       {/* Mais Indicados da Semana */}
      <View style={styles.flatlist}>
        <Text style={styles.sectionTitle}>Mais Indicados da Semana</Text>
        <FlatList 
            style={{height: '70%'}}
            data={listaProfissionalCard}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => <CardItem item={ item } remover={false}  />}
        /> 
      </View>

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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subcontainer:{
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%'
  },
  logo: {
    width: 300,
    height: 120,
    marginTop: 50
  },
  greeting: {
    fontSize: 16,
    color: '#FFF',
  },
  searchContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    fontSize: 14,
    color: colors.text
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: colors.text,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    // sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profissao: {
    fontSize: 14,
    color: '#555',
  },
  rating: {
    fontSize: 14,
    color: '#FF7043',
    marginVertical: 4,
  },
  flatlist: {
    // backgroundColor: 'red',
    width: '100%',
    marginTop: 15,
    marginBottom: 50,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 8,
    width: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },

});
