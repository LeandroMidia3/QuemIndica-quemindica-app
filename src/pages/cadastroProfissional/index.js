import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, globalStyles } from '../../assets/css/globalStyles';

export function CadastroForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [servicos, setServicos] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  const [sobre, setSobre] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('08:00');
  const [horarioFim, setHorarioFim] = useState('18:00');

  const [foto, setFoto] = useState(null);
  const[listaPortifolio, setListaPortifolio] = useState([]);

  const [open, setOpen] = useState(false);
  const [listaCategoria, setListaCategoria] = useState([
    {label: 'Eletricistas', value: 1},
    {label: 'Encanadores', value: 2},
    {label: 'Pintores', value: 3},
    {label: 'Costureiras', value: 5},
    {label: 'Jardineiros', value: 6},
    {label: 'Pedreiros', value: 7},
    {label: 'Manicures', value: 8},
    {label: 'Fotógrafos', value: 9},
    {label: 'Limpeza residencial', value: 10},
    {label: 'Jardinagem', value: 11},
    {label: 'Paisagismo', value: 12},
    {label: 'Pintura', value: 13},
    {label: 'Gesseiro', value: 14},
    {label: 'Carpintaria', value: 15},
    {label: 'Chaveiro', value: 16},
    {label: 'Dedetização', value: 17},
    {label: 'Cabeleireiro', value: 18},
    {label: 'Yoga', value: 19},
    {label: 'Idiomas', value: 20},
  ]);


  
  const navigation = useNavigation();

  const escolherImagem = () => {

    try{
        launchImageLibrary(
            { mediaType: 'photo', includeBase64: true }, // includeBase64 pega os bytes
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    const asset = response.assets[0];
                    setFoto(asset); // guarda a imagem para pré-visualização
                }
            }
        );
    }catch(error){
        alert("REACT ERRO: " + error);
    }

  };

  const escolherImagemPortifolio = () => {

    try{
        launchImageLibrary(
            { mediaType: 'photo', includeBase64: true }, // includeBase64 pega os bytes
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    const asset = response.assets[0];
                    setListaPortifolio((prev) => [...prev, asset]);
                }
            }
        );
    }catch(error){
        alert("REACT ERRO: " + error);
    }

  };


    // useEffect(() => {

    //     setListaPortifolio(listaPortifolio);
    // }, [listaPortifolio, foto]);

  const formItems = [
    { key: 'logo', render: () => (
      <View style={styles.header}>
              <Image source={require('../../assets/image/logo.png')} style={[globalStyles.logo]} />
              {/* <Text style={styles.greeting}>Olá, Leandro!</Text> */}
            </View>
    )},
    { key: 'foto', render: () => (
    <View style={styles.container}>
    <TouchableOpacity style={styles.photoButton} onPress={escolherImagem}>
        <Text style={styles.photoText}>Adicionar Foto Principal</Text>
    </TouchableOpacity>

    {foto && 
        <View style={styles.fotoPrincipal}>
            {foto &&
            <Image
            source={{ uri: foto.uri }}
            style={styles.preview}
            />
    }
        </View>
    }
    
    </View>
    )},
    { key: 'nome', render: () => (
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor={colors.placeholdertext}
        value={nome}
        onChangeText={setNome}
        maxLength={100}
      />
    )},
    { key: 'email', render: () => (
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
    )},
    { key: 'categoria', render: () => (
      <DropDownPicker
        open={open}
        value={categorias}
        items={listaCategoria}
        setOpen={setOpen}
        setValue={setCategorias}
        setItems={setListaCategoria}
        style={styles.input}
        placeholderTextColor={colors.placeholdertext}
        multiple={true}
        min={1}
        max={5}
        translation={{
          PLACEHOLDER: "Selecione uma ou mais Categorias",
          SEARCH_PLACEHOLDER: "Digite para buscar...",
          SELECTED_ITEMS_COUNT_TEXT: "{count} Categorias selecionadas",
          NOTHING_SELECTED: "Nenhuma Categorias selecionada",
          ITEM_SELECTED: "Uma Categorias foi selecionada",
          ITEM_UNSELECTED: "Uma Categorias foi desmarcada"
        }}
        dropDownContainerStyle={{ maxHeight: 300 }}
        searchable={true}
        listMode="SCROLLVIEW"
      />
    )},
    { key: 'servicos', render: () => (
      <TextInput
        style={styles.input}
        placeholder="Serviços Oferecidos, separe por vírgula cada serviço. Ex: Reforma de Roupa, Vestidos Sob Medida, etc"
        placeholderTextColor={colors.placeholdertext}
        value={servicos}
        onChangeText={setServicos}
        multiline
        numberOfLines={4}
        maxLength={400}
      />
    )},
    { key: 'portfolio', render: () => (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoButton} onPress={escolherImagemPortifolio}>
        <Text style={styles.photoText}>Adicionar Imagem ao Portfólio</Text>
      </TouchableOpacity>

  {listaPortifolio.length > 0 && 
    <FlatList
      style={styles.container}
      data={listaPortifolio}
      renderItem={({ item }) => 
            <View style={styles.fotoPortifolio}>
                 <Image
                    source={{ uri: item.uri }}
                    style={styles.preview}
                 />
             </View>    
        }
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
    />
}

    </View>


    )},
    { key: 'telefone', render: () => (
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
    )},
    { key: 'endereco', render: () => (
      <TextInput
        style={styles.input}
        placeholder="Endereço — Digite seu endereço"
        value={endereco}
        placeholderTextColor={colors.placeholdertext}
        onChangeText={setEndereco}
      />
    )},
    { key: 'sobre', render: () => (
      <TextInput
        style={styles.input}
        placeholder="Sobre Mim — Fale um pouco sobre sua experiência e habilidades."
        value={sobre}
        placeholderTextColor={colors.placeholdertext}
        onChangeText={setSobre}
        multiline
        numberOfLines={4}
        maxLength={400}
      />
    )},
    { key: 'horario', render: () => (
      <View>
        <Text style={styles.sectionTitle}>Horário de Atendimento</Text>
        <View style={styles.row}>
          <TextInputMask
            placeholder="Das"
            type={'datetime'}
            options={{ format: 'HH:mm' }}
            value={horarioInicio}
            placeholderTextColor={colors.placeholdertext}
            onChangeText={setHorarioInicio}
            style={[styles.input, styles.timeInput]}
            maxLength={5}
          />
          <TextInputMask
            placeholder="Até"
            type={'datetime'}
            options={{ format: 'HH:mm' }}
            value={horarioFim}
            placeholderTextColor={colors.placeholdertext}
            onChangeText={setHorarioFim}
            style={[styles.input, styles.timeInput]}
            maxLength={5}
          />
        </View>
      </View>
    )},
    { key: 'senha', render: () => (
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        placeholderTextColor={colors.placeholdertext}
        onChangeText={setSenha}
        secureTextEntry
      />
    )},
    { key: 'confirmaSenha', render: () => (
      <TextInput
        style={styles.input}
        placeholder="Confirma Senha"
        value={confirmaSenha}
        placeholderTextColor={colors.placeholdertext}
        onChangeText={setConfirmaSenha}
        secureTextEntry
      />
    )},
    { key: 'botoes', render: () => (
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.save]}>
          <Text style={styles.buttonText}>Salvar Cadastro</Text>
        </TouchableOpacity>
      </View>
    )},
    { key: 'termos', render: () => (
      <Text style={styles.terms}>
        Ao cadastrar-se, você concorda com os Termos de Uso e Política de Privacidade.
      </Text>
    )},
  ];

  return (




    <FlatList
      style={styles.container}
      data={formItems}
      renderItem={({ item }) => item.render()}
      keyExtractor={(item) => item.key}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 300 }}
      keyboardDismissMode="on-drag"
    />




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
