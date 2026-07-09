import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, ImageSourcePropType, Modal, Alert } from 'react-native';
import { colors } from '../../assets/css/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ModalAvaliacao } from '../../components/modalAvaliacao';
import { Avaliacao } from '../../model/Avaliacao';
import { Profissional } from '../../model/Profissional';
import { Usuario } from '../../model/Usuario';
import { Perfil } from '../../components/enum/Perfil';
import { Status } from '../../components/enum/Status';
import { Portifolio } from '../../model/Portifolio';
import { useUserStore } from '../../utils/userStore';
import { useFocusEffect, RouteProp, useRoute} from '@react-navigation/native';
import useStorege from '../../hooks/useStorege';
import { ObterProfissionalCard, ObterPerfil } from '../../api/ProfissionalController';
import { ObterFavorito, FavoritarProfissional } from '../../api/UsuarioController';
import { ProfissionalCard } from '../../modelUtils/ProfissionalCard';
import { RequestResponse } from '../../modelUtils/RequestResponse';
import { RootStackParamList } from "../routes/types";
import { ProfissionalPerfil } from '../../modelUtils/ProfissionalPerfil';
import { BASE_URL } from '@env'; 
import { openWhatsApp } from '../../utils/utils';
import { Favorito } from '../../model/Favorito';


const sizeImageButton = 20;



//MOCK INICIO

const usuario: Usuario = {
    id: 1,
    nome: "Maria Thereza",
    email: '',
    dataCadastro: new Date(),
    perfil: Perfil.Profissional,
    senha: "senhaSegura",
    status: Status.Ativo,
  };

  const listaPortfolio: Portifolio[] = [
     {id: 1, uri: "https://media.istockphoto.com/id/672022974/pt/foto/fresh-grilled-dorade-rose.jpg?s=1024x1024&w=is&k=20&c=oDcTXprCLWbRudU4i7eSLdvFsdaH9VmvFdcVNKq_NUk="},
     {id: 2, uri: "https://media.istockphoto.com/id/1140296796/pt/foto/baked-dorado-with-vegetables-and-green-sauce-view-from-above.jpg?s=612x612&w=0&k=20&c=ztvlqHXYuX5fDsi_sRzBR-j1ogbv5OYBiVmPj53ssLY="},
     {id: 3, uri: "https://media.istockphoto.com/id/916448498/pt/foto/grilled-seabream-on-carrot-onion-and-celery-stalks.jpg?s=612x612&w=0&k=20&c=59YdcFiiwaOc55FiJWF2zEM9XG0RKXIZKc-libAk03o="},
     {id: 4, uri: "https://media.istockphoto.com/id/953091918/pt/foto/whole-grilled-dorado-with-lemon-slices-on-table.jpg?s=612x612&w=0&k=20&c=AiVZMe3-JWOPVP21zop7WOdUO8015LWUovTXuUbFIUE="},
     {id: 5, uri: "https://media.istockphoto.com/id/892159736/pt/foto/festive-table-decoration.jpg?s=612x612&w=0&k=20&c=LSV8Q19cG-qQZfUoOB9OENePe9BV7sKQpwuM5ubrkOg="},
];

const profissional: Profissional = {
  id: 1,
  usuario: usuario,
  categorias: [],
  descricao: "Mais de 10 anos de experiência combinando várias viagens estudando divérsas culinárias mundiais",
  uriImagemPrincipal: "https://media.istockphoto.com/id/1252338682/pt/foto/female-chef-is-preparing-a-flamb%C3%A9-specialty.jpg?s=612x612&w=0&k=20&c=98zSrE1RIcKycUAvbZsKmOw1QjAIPZmF0JqrqwTYa1w=",
  imagemPortifolios: listaPortfolio,
  telefone: "(73) 98458-6635",
  disponibilidadeInicio: "08:00",
  disponibilidadeFim: "18:00",
  avaliacaoMedia: 5,
  profissao: "Cozinheira",
  servico: "Culinária Japonesa, Comida Brasileira, Doces e Salgados",
  rua: "Rua de Cima",
  numero: "5",
  bairro: "Centro",
  // cep: "45500-000",
  estado: "Bahia",
  cidade: "Itacaré",
  latitude: "",
};

  const avaliacao1_1 : Avaliacao = { 
    id: 1, 
    estrelas: 5, 
    comentario: "ótimo serviço e bom atendimento", 
    dataAvaliacao: new Date(), 
    tempo: "5 meses", 
    usuario: { id: 1, nome: "Leandro", email: '', dataCadastro: new Date(), perfil: Perfil.Cliente, senha: "", status: Status.Ativo },
    profissional: profissional,
  };

  const avaliacao1_2 : Avaliacao = { 
    id: 2, 
    estrelas: 3, 
    comentario: "Não teve muito atenção, mas o serviço foi muito bom", 
    dataAvaliacao: new Date(), 
    tempo: "20 dias", 
    usuario: { id: 1, nome: "Leandro", email: "", dataCadastro: new Date(), perfil: Perfil.Cliente, senha: "", status: Status.Ativo },
    profissional: profissional,
  };

  //MOCK FIM


export function PerfilProfissional() {


  const [modalVisible, setModalVisible] = useState(false);
  const { setExisteUsuario } = useUserStore();
  const { getUsuario }  = useStorege();
  type PerfilProfissionalRouteProp = RouteProp<RootStackParamList, 'PerfilProfissional'>;
  
  const [favorito, setFavorito] = useState<Favorito>({
    idusuario: 0,
    idprofissional: 0
  });

  type ItemServico = {
    id: number;
    nome: string ;
  };

  const [portifolio, setPortifolio] = useState<Portifolio[]>([]);

  
  const [servicos, setServicos] = useState<ItemServico[]>([]);

  function ajustaServicos(param: string): string[] {
    const servicosSplit = param.split(',');

    const listaFinal: ItemServico[] = [];
    servicosSplit.forEach((element, ind) => {
      const item: ItemServico = {
        id: ind,
        nome: element.trim(),
      };
      listaFinal.push(item);
    });

    setServicos(listaFinal);

    return servicosSplit;
  }


  const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
  const listaAvaliacoes: Avaliacao[] = [avaliacao1_1, avaliacao1_2];



  const [profissionalAtual, setProfissionalAtual] = useState<ProfissionalPerfil>();

  const [coracao, setCoracao] = useState(false);
  async function favoritarCoracao(){
    console.log("favoritarCoracao: " + JSON.stringify(favorito));
    const responseFavorito: RequestResponse = await FavoritarProfissional(favorito);
    if(responseFavorito.sucess){
      setCoracao(true);
      console.log("true");
    }else{
      console.log("false");
      setCoracao(false);
    }
  }



const route = useRoute<PerfilProfissionalRouteProp>();
const { id } = route.params;

useEffect(() => {
  setPortifolio(listaPortfolio);
  setAvaliacao(listaAvaliacoes);
  // ajustaServicos(profissionalAtual.servico);

}, [coracao, favorito]);

  function modalAvaliar() {
      setModalVisible(true);
  }

  function salvarAvaliacao(item: any) {
      console.log(item);

      let avaliadorTeste: Avaliacao = avaliacao1_1;
      setAvaliacao((prev) => [...prev, avaliadorTeste]);

      setModalVisible(true);
  }

  

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

        const obterProfissional = async () => {
          try {
              const response: RequestResponse = await ObterPerfil(id);
              if (response.sucess) {
                  const objeto: ProfissionalPerfil = response.objeto;
                  objeto.servicos = ajustaServicos(objeto.servico);
                  setProfissionalAtual(objeto);       
                  
                  const usuarioStorege = await getUsuario("@usuario");
                  const verificaFavorito: Favorito = {idusuario: usuarioStorege?.id || 0, idprofissional: objeto?.id || 0};
                  setFavorito(verificaFavorito);
                  const responseFavorito: RequestResponse = await ObterFavorito(verificaFavorito);
                  if(responseFavorito.sucess){
                    setCoracao(true);
                    console.log("true");
                  }else{
                    console.log("false");
                    setCoracao(false);
                  }
                  
                }else{
                  console.log("Erro API: " + response.message);
                }
            } catch (error) {
              console.log("Erro ao obterProfissioaisCard: ", error);
            }
        }
        obterProfissional();

  
      }, [])
    );



  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
          <Image 
              source={{uri: `${BASE_URL}/imagens/${profissionalAtual?.uriImagemPrincipal}`}} 
              style={styles.avatar} resizeMode='cover'/>
        <View style={styles.info}>
          <Text style={styles.nome}>{profissionalAtual?.nome}</Text>
          <Text style={styles.profissao}>{profissionalAtual?.categorias}</Text>
          <Text style={styles.local}>{profissionalAtual?.bairro} - {profissionalAtual?.cidade} - {profissionalAtual?.estado}</Text>
          <View style={styles.starHeader}>
              {Array.from({ length: profissionalAtual?.avaliacaoMedia || 0 }).map((_, i) => (
                <Text key={i}><Icon name="star" size={20} color="#FFD700" /></Text>
              ))}
          </View>
        </View>
          
      </View>

      {/* Botões de ação */}
      <View style={[styles.actions, styles.sombraBottom]}>
        <TouchableOpacity style={[styles.button, styles.whatsapp]} onPress={() => openWhatsApp(profissionalAtual?.telefone || "")}>          
          <Text style={styles.buttonText}><Icon name="whatsapp" size={sizeImageButton} color="#FFF" />   Mensagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.favorito]} onPress={favoritarCoracao}>
          {/* <Text style={styles.buttonText}>Adicionar aos Favoritos</Text> */}
          {coracao &&
              <Text style={styles.buttonText}><Icon name="heart" size={sizeImageButton} color="#FFF" />   Favoritar</Text>
          }
          {!coracao &&
              <Text style={styles.buttonText}><Icon name="heart-o" size={sizeImageButton} color="#FFF" />   Favoritar</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Sobre mim */}
      <View style={[styles.sombraBottom]}>
        <Text style={styles.sectionTitle}>Sobre Mim</Text>
        <Text style={styles.text}>
          {profissionalAtual?.descricao}
        </Text>
      </View>

      {/* Portfólio */}
      {/* <View style={styles.sombraBottom}>
        <Text style={styles.sectionTitle}>Portfólio</Text>
        <FlatList
          data={portifolio}
          horizontal
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Image source={{uri: item.uri}} style={styles.portfolioImage} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}

      {/* Serviços */}
      <View style={styles.sombraBottom}>
        <Text style={styles.sectionTitle}>Serviços</Text>
        {servicos.map((s) => (
          <Text key={s.id} style={styles.text}>• {s.nome}</Text>
        ))}
      </View>

      {/* Avaliações */}
      <View style={styles.avaliacao}>
        <Text style={styles.sectionTitle}>Avaliações</Text>
        <TouchableOpacity style={styles.btnavaliacao} onPress={modalAvaliar}><Icon name="pencil-square-o" size={sizeImageButton} color="#fff" /></TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalAvaliacao onSave={(data: any) => salvarAvaliacao(data)} handleClose={() => setModalVisible(false)} ></ModalAvaliacao>
      </Modal>

      {avaliacao.map((a) => (
        <View key={a.id} style={styles.review}>

          <Text style={styles.reviewNome}>{a.usuario.nome} – 
          
          {Array.from({ length: a.estrelas }).map((_, o) => (
            <Text key={o}><Icon name="star" size={20} color="#FFD700" /></Text>
          ))}

            {/* {a.estrelas} */}
          </Text>

          <Text style={styles.text}>{a.comentario}</Text>
          <Text style={styles.reviewTempo}>{a.tempo}</Text>
        </View>
      ))}

      <Text style={styles.note}>
        Ao avaliar, você ajuda outros usuários a escolherem os melhores profissionais.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor:'#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15},
  info: { flex: 1, width: '50%' },
  nome: { fontSize: 20, fontWeight: 'bold', color: '#0a4c96f7' },
  profissao: { fontSize: 16, color: '#0a4c96f7' },
  local: { fontSize: 14, color: '#0a4c96f7' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  button: { flex: 1, padding: 12, borderRadius: 6, alignItems: 'center', marginHorizontal: 4 },
  whatsapp: { backgroundColor: colors.btnwhatsapp },
  favorito: { backgroundColor: '#0a4c96f7' },
  addService: { backgroundColor: '#0a4c96f7', marginTop: 12 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 8, color: '#0a4c96f7' },
  text: { fontSize: 14, color: '#0a4c96f7', marginBottom: 6 },
  portfolioImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  review: { marginBottom: 12 },
  reviewNome: { fontWeight: 'bold', color: '#0a4c96f7' },
  reviewTempo: { fontSize: 12, color: '#0a4c96f7' },
  note: { fontSize: 12, color: '#0a4c96f7', marginTop: 16, textAlign: 'center', paddingBottom: 80 },
  starHeader: { flexDirection: 'row', alignItems: 'flex-start', paddingTop: 20 },
  sombraBottom: {backgroundColor: '#fff',borderBottomWidth: 2, borderBottomColor: '#ccc', paddingBottom: 8,},
  btnavaliacao: { fontSize: 13, marginTop: 10, marginBottom: 8, color: '#fff', backgroundColor: '#0a4c96f7', padding: 8, alignItems: 'center', borderRadius: 5,  },
  avaliacao:{flexDirection: 'row', justifyContent: 'space-between',},
  avatar: {
    width: 190,
    height: 160,
    borderRadius: 20,
    marginRight: 12,
  }
});
