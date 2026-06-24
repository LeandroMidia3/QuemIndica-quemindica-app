import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from '../assets/css/globalStyles';

type HeaderProps = {
  title?: string;
  mensagem?: string;
};

export function Header({ title = "App", mensagem }: HeaderProps) {
  return (

    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.submensagem}>
        <Text style={styles.mensagem}>{mensagem}</Text>
      </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
header: {
    // flex: 1,
    // width: '100%',
    backgroundColor: colors.background,
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 15,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    // paddingBottom: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: 'bold',
  },
  submensagem: {
    backgroundColor: colors.background,
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    // paddingBottom: 15
  },
  mensagem: {
    fontSize: 15,
    color: "#FFF",
    // fontWeight: 'bold',
  }

});
