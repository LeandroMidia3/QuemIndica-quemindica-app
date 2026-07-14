import React, { useState } from 'react';
import {View, Text,  TextInput,  TouchableOpacity,  StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/css/globalStyles';

export function ModalAvaliacao({ handleClose, onSave }) {
  const [comentario, setComentario] = useState('');
  const [estrelas, setEstrelas] = useState(0);

  const handleSave = () => {
    onSave({ comentario, estrelas });
    setComentario('');
    setEstrelas(0);
    handleClose();
  };

  return (

      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Avalie este Perfil</Text>

          {/* Estrelas */}
          <View style={styles.stars}>
            {[1,2,3,4,5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setEstrelas(star)}>
                <Icon
                  name={star <= estrelas ? "star" : "star-border"}
                  size={32}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Campo de comentário */}
          <TextInput
            style={styles.input}
            placeholder="Escreva seu comentário..."
            value={comentario}
            onChangeText={setComentario}
            multiline
            placeholderTextColor={colors.placeholdertext}
          />

          {/* Botões */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={handleClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cancel: {
    backgroundColor: colors.btncancelar,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 10
  },
  save: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
