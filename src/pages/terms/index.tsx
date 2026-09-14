import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export function TermosDeUso() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Termos de Uso</Text>

      <Text style={styles.section}>
        1. OBJETO{"\n"}
        Este aplicativo conecta usuários a profissionais de diversas áreas, permitindo consulta a informações de contato e localização. O aplicativo não é empregador nem responsável pela execução dos serviços contratados.
      </Text>

      <Text style={styles.section}>
        2. CADASTRO DE PROFISSIONAIS{"\n"}
        - Profissionais devem fornecer informações verdadeiras e atualizadas.{"\n"}
        - Profissões regulamentadas exigem comprovação de registro em conselho competente (ex.: OAB, CREA).{"\n"}
        - O aplicativo poderá suspender ou excluir cadastros que não cumpram requisitos legais.
      </Text>

      <Text style={styles.section}>
        3. RESPONSABILIDADE{"\n"}
        O aplicativo não se responsabiliza pela qualidade, prazos ou resultados dos serviços prestados. Usuários contratam diretamente os profissionais, assumindo responsabilidade pela negociação.
      </Text>

      <Text style={styles.section}>
        4. USO DO APLICATIVO{"\n"}
        É proibido fornecer informações falsas, ofensivas ou ilegais. O usuário concorda em não utilizar o aplicativo para fins ilícitos.
      </Text>

      <Text style={styles.section}>
        5. LIMITAÇÃO DE RESPONSABILIDADE{"\n"}
        O aplicativo atua apenas como intermediador de informações, não garantindo a veracidade ou competência dos profissionais cadastrados.
      </Text>

      <Text style={styles.section}>
        6. ALTERAÇÕES{"\n"}
        Os Termos de Uso podem ser atualizados a qualquer momento, sendo responsabilidade do usuário consultá-los regularmente.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
});
