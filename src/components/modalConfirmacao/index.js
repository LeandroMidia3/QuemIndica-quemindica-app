import {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import useStorege from '../../hooks/useStorege'
import { colors } from '../../assets/css/globalStyles';

export function ModalConfirmacao({mensagem, handleClose, handleConfirmacao}) {

    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.content}>

            <Text style={styles.title}>{mensagem}</Text>

            <View style={styles.buttonArea}>
                <TouchableOpacity style={[styles.button]} onPress={handleClose}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleConfirmacao}>
                    <Text style={styles.buttonTextSave}>Confirma</Text>
                </TouchableOpacity>
            </View>

        </View>
  
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(24,24,24,0.6)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: "#FFF",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8
  },
  text: {
    color: "#FFF",
    textAlign: "center"
  },
  buttonArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8

  },
   buttonSave: {
    backgroundColor: colors.secondary,
    borderRadius: 8
  },
  buttonTextSave: {
    color: "#FFF",
    fontWeight: "bold",
  },



});
