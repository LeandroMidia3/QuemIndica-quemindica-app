import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export function PoliticaPrivacidade() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidade</Text>

      <Text style={styles.section}>
        1. COLETA DE DADOS{"\n"}
        Coletamos informações fornecidas pelos profissionais (nome, telefone, cidade, profissão, registro profissional quando aplicável) e pelos usuários (dados de acesso e uso do app).
      </Text>

      <Text style={styles.section}>
        2. FINALIDADE{"\n"}
        Os dados são utilizados para exibir informações de contato dos profissionais, melhorar a experiência de uso do aplicativo e cumprir obrigações legais.
      </Text>

      <Text style={styles.section}>
        3. CONSENTIMENTO{"\n"}
        Ao se cadastrar, o profissional autoriza o uso de seus dados conforme esta política. O usuário autoriza o uso de dados de navegação para fins de melhoria do serviço.
      </Text>

      <Text style={styles.section}>
        4. COMPARTILHAMENTO{"\n"}
        Não compartilhamos dados com terceiros, exceto quando exigido por lei ou para cumprimento de obrigações regulatórias.
      </Text>

      <Text style={styles.section}>
        5. DIREITOS DO TITULAR{"\n"}
        Nos termos da LGPD, o usuário e o profissional podem solicitar acesso, correção ou exclusão de seus dados, além de revogar consentimento a qualquer momento.
      </Text>

      <Text style={styles.section}>
        6. SEGURANÇA{"\n"}
        Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados.
      </Text>

      <Text style={styles.section}>
        7. CONTATO{"\n"}
        Para dúvidas ou solicitações relacionadas à privacidade, entre em contato pelo e-mail: leandro.oliveira.developer@gmail.com
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
});
