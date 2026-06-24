import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profissional } from '../../model/Favorito';
import Icon from 'react-native-vector-icons/FontAwesome';

type CardItemProps = {
  item: Profissional,
  remover: boolean
};

const sizeImageButton = 20;

export function CardItem({ item, remover }: CardItemProps) {
  return (

   <View style={styles.card}>
      <Image source={item.foto} style={styles.avatar} />
      <View style={styles.info}>
        <View>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.profissao}>{item.profissao} | {item.bairro}</Text>
          <Text style={styles.rating}>⭐⭐⭐⭐⭐ {item.rating}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.whatsapp, styles.buttons]}>
            <Icon name="whatsapp" size={sizeImageButton} color="#FFF" />
          </TouchableOpacity>
          {remover && (
          <TouchableOpacity style={[styles.remover, styles.buttons]}>
            <Icon name="trash" size={sizeImageButton} color="#FFF" />
          </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.verPerfil, styles.buttons, { marginLeft: 'auto' }]}>
            {/* <Text style={styles.buttonText}>Ver Perfil</Text> */}
            <Icon name="user" size={sizeImageButton} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#392de9',
  },
  subheader: {
    flex: 1,
    backgroundColor: '#e8e4e4fa',
    //  marginBottom: 16,
     padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // texto à esquerda, botões à direita
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
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
  actions: {
  flexDirection: 'row',
  marginTop: 8,
  marginLeft: 12,
  justifyContent: 'flex-end', // joga todos para a direita
  alignItems: 'center',
  },
  whatsapp: {
    backgroundColor: '#25D366',
  },
  buttons: {
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 6,
    borderRadius: 5,
    marginRight: 10,
    padding: 10,    
  },
  remover: {
    backgroundColor: '#E74C3C',
  },
  verPerfil: {
    backgroundColor: '#FF7043',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});
