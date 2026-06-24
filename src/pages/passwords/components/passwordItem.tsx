import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

type PasswordItemProps = {
  data: string; // cada item da lista é uma string
  removePassword: () => void; // função que remove a senha
};

export function PasswordItem({ data, removePassword }: PasswordItemProps) {
  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      <Text style={styles.text}>{data}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
  },
});
