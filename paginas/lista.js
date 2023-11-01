import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModelosScreen = ({ navigation }) => {
  const modelos = [
    { id: 1, nome: 'CABOS MT - RESISTÊNCIA DE ISOLAÇÃO' },
    { id: 2, nome: 'CABOS MT - RESISTÊNCIA OHMICA' },
    { id: 8, nome: 'CABOS BT CA - RESISTÊNCIA ISOLAÇÃO' },
    { id: 9, nome: 'CABOS BT CA - RESISTÊNCIA OHMICA' },
    { id: 3, nome: 'CHAVE SECCIONADORA - TESTES E VERIFICAÇÕES' },
    { id: 4, nome: 'DISJUNTOR - TESTES E VERIFICAÇÕES' },
    { id: 5, nome: 'TCs e TPs - TESTES E VERIFICAÇÕES' },
    { id: 6, nome: 'EQUIPOTENCIALIZAÇÃO A TERRA' },
    { id: 7, nome: 'INVERSORES - RESISTÊNCIA ISOLAMENTO' },
    { id: 10, nome: 'TTR TRANSFORMADOR - TESTES E VERIF.' },
    { id: 11, nome: 'TRANSFORMADOR - TESTES E VERIF.' },
    { id: 12, nome: 'RESISTENCIA DE MALHA DE ATERRAMENTO' },
    { id: 13, nome: 'POLARIDADE, TENSÃO EM VAZIO E CORRENTE EM CURTO' },
  ];

  const onPressModelo = (modelo) => {
    // Implemente a ação que deseja para cada modelo aqui, por exemplo, navegar para outra tela.
    if (modelo.id === 1) {
      // Navegue para a tela desejada quando o Modelo 1 for selecionado.
      navigation.navigate('Tabela');
    } else if (modelo.id === 5) {
      // Navegue para outra tela quando o Modelo 2 for selecionado.
      navigation.navigate('Tabela2');
    } else if (modelo.id === 11) {
      // Navegue para outra tela quando o Modelo 2 for selecionado.
      navigation.navigate('Tabela3');
    }
    // Adicione outros modelos e ações conforme necessário.
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={modelos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onPressModelo(item)}
          >
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  itemText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ModelosScreen;
