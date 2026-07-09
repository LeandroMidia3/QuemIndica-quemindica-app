import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Profissional } from '../../model/Profissional';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../pages/routes/types";
import { colors } from '../../assets/css/globalStyles';
import { ProfissionalCard } from '../../modelUtils/ProfissionalCard';
import { BASE_URL } from '@env'; 
import { formataTelefone } from '../../utils/utils';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Tabs'>;

type CardItemProps = {
  item: ProfissionalCard,
  remover: boolean
};

const sizeImageButton = 20;


export function CardItem({ item, remover }: CardItemProps) {

 const navigation = useNavigation<NavigationProp>();



 const openWhatsApp = () => {
  const phoneNumber = formataTelefone(item.telefone);
  const message = 'Olá, vi seu nome no QuemIndica e fiquei interessado no seu serviço, como podemos proceder?!';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    console.log('Não foi possível abrir o WhatsApp');
  });
};

  return (

   <View style={styles.card}>
      <Image source={{uri: `${BASE_URL}/imagens/${item?.uriImagemPrincipal}?t=${Date.now()}`}} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.profissao}>{item.categorias} | {item.cidade}</Text>

          <Text style={[styles.row, styles.rating]}>
              {Array.from({ length: item.avaliacaoMedia }).map((_, i) => (
                <Text key={i}><Icon name="star" size={17} color="#FFD700" /></Text>
              ))}
              {/* <Text style={{paddingLeft: 50}}>{item.avaliacaoMedia}</Text> */}
          </Text>

        {/* <Text style={styles.rating}>⭐⭐⭐⭐⭐ {item.rating}</Text> */}

        <View style={styles.actions}>

          <TouchableOpacity style={[styles.whatsapp, styles.buttons]} onPress={openWhatsApp}>
            <Icon name="whatsapp" size={sizeImageButton} color="#FFF" />
          </TouchableOpacity>

          {remover && (
          <TouchableOpacity style={[styles.remover, styles.buttons]}>
            <Icon name="heart-o" size={sizeImageButton} color="#FFF" />
          </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.verPerfil, styles.buttons]} onPress={() => navigation.navigate('PerfilProfissional')}>
            {/* <Text style={styles.buttonText}>Ver Perfil</Text> */}
            <Icon name="user" size={sizeImageButton} color="#FFF" />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  whatsapp: {
    backgroundColor: colors.btnwhatsapp,
  },
  buttons: {
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 6,
    marginRight: 10,
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
