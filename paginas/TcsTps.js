import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import * as Print from 'expo-print';

const Tabela2 = () => {
  const [tableData, setTableData] = useState([
    ['TC - Transformador de Corrente'],
    ['30s', '60s', 'Umidade', 'Temperatura'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['TP - Transformador de Potencial'],
    ['30s', '60s', 'Umidade', 'Temperatura'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);

  const handleChangeCell = (rowIndex, columnIndex, text) => {
    // Impedir que as células nas primeiras duas linhas e as linhas com rótulos "30s 60s Umidade Temperatura" sejam editadas
    if (rowIndex === 0 || rowIndex === 5 || rowIndex === 1 || rowIndex === 6) {
      return;
    }

    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][columnIndex] = text;
    setTableData(updatedTableData);
  };

  const handleButtonClick = async () => {
    try {
      const pdfUri = await generatePDF();
      Alert.alert('PDF criado!', 'Clique em Visualizar para ver o PDF.', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Visualizar',
          onPress: () => viewPDF(pdfUri),
        },
      ]);
    } catch (error) {
      console.error('Erro ao criar PDF:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o PDF.');
    }
  };

  const generateHTML = () => {
    let html = `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 40px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f2f2f2;
            }
            .header {
              text-align: center;
              align-items: center;
              margin-bottom: 60px;
            }
            .header-item {
              margin-right: 20px;
              text-align: justify;
            }
            .logo {
              max-width: 180px;
              margin-bottom: 40px;
            }
            .footer{
              width: 100%;
              position: absolute;
              bottom: 0;
              text-align: center;
            }
            .divider {
              border-top: 1px solid #000;
              margin-top: 10px;
              margin-bottom: 20px;
              witdh: 100%;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://i.imgur.com/daVpiSN.png" alt="Logo" class="logo" />
          </div>

          <table border="1" class="tabelaG">
            <tr>
              <td colspan="8">TC – Transformador de Corrente</td>
            </tr>
            <tr>
              <td colspan="3">Pontos de ensaios / Conexões </td>
              <td colspan="2">Valores GΩ </td>
              <td rowspan="2">Umidade (%) </td>
              <td rowspan="2">Temperatura (°C) </td>
            </tr>
            <tr>
              <td>Linha</td>
              <td>Retorno</td>
              <td>Guard</td>
              <td>30s</td>
              <td>60s</td>
            </tr>
            <tr>
              <td>TC A</td>
              <td>Terra</td>
              <td></td>
              <td>${tableData[2][0]}</td>
              <td>${tableData[2][1]}</td>
              <td>${tableData[2][2]}</td>
              <td>${tableData[2][3]}</td>
            </tr>
            <tr>
              <td>TC B</td>
              <td>Terra</td>
              <td></td>
              <td>${tableData[3][0]}</td>
              <td>${tableData[3][1]}</td>
              <td>${tableData[3][2]}</td>
              <td>${tableData[3][3]}</td>
            </tr>
            <tr>
              <td>TC C</td>
              <td>Terra</td>
              <td></td>
              <td>${tableData[4][0]}</td>
              <td>${tableData[4][1]}</td>
              <td>${tableData[4][2]}</td>
              <td>${tableData[4][3]}</td>
            </tr>
          </table>
          
          <table border="1" class="tabelaG">
            <tr>
              <td colspan="8">TP – Transformador de Potencial </td>
            </tr>
            <tr>
              <td colspan="3">Pontos de ensaios / Conexões </td>
              <td colspan="2">Valores GΩ </td>
              <td rowspan="2">Umidade (%) </td>
              <td rowspan="2">Temperatura (°C) </td>
            </tr>
            <tr>
              <td>Linha</td>
              <td>Retorno</td>
              <td>Guard</td>
              <td>30s</td>
              <td>60s</td>
            </tr>
            <tr>
              <td>TP A – H1 </td>
              <td>X1 ou X2</td>
              <td></td>
              <td>${tableData[7][0]}</td>
              <td>${tableData[7][1]}</td>
              <td>${tableData[7][2]}</td>
              <td>${tableData[7][3]}</td>
            </tr>
            <tr>
              <td>TP B – H2</td>
              <td>X1 ou X2</td>
              <td></td>
              <td>${tableData[8][0]}</td>
              <td>${tableData[8][1]}</td>
              <td>${tableData[8][2]}</td>
              <td>${tableData[8][3]}</td>
            </tr>
            <tr>
              <td>TP C – H3</td>
              <td>X1 ou X2</td>
              <td></td>
              <td>${tableData[9][0]}</td>
              <td>${tableData[9][1]}</td>
              <td>${tableData[9][2]}</td>
              <td>${tableData[9][3]}</td>
            </tr>
            <tr>
              <td>TP D - H4</td>
              <td>X1 ou X2</td>
              <td></td>
              <td>${tableData[10][0]}</td>
              <td>${tableData[10][1]}</td>
              <td>${tableData[10][2]}</td>
              <td>${tableData[10][3]}</td>
            </tr>
          </table>
          
          <div class="footer">
            <div class="divider"></div>
            <p>Email: contato@almeidaborges.eng.br | Telefone: +55 (12)98105 5000 | +55 (11)99245 8574</p>
          </div>
        </body>
      </html>
    `;
    return html;
  };

  const generatePDF = async () => {
    const htmlContent = generateHTML();
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    return uri;
  };

  const viewPDF = async (uri) => {
    if (uri) {
      try {
        await Print.printAsync({ uri });
      } catch (error) {
        console.error('Erro ao visualizar o PDF:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao visualizar o PDF.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cellValue, columnIndex) => (
            <TextInput
              key={columnIndex}
              style={[
                styles.cell,
                (rowIndex === 0 || rowIndex === 5 || rowIndex === 1 || rowIndex === 6) ? styles.nonEditableCell : null
              ]}
              value={cellValue}
              onChangeText={(text) => handleChangeCell(rowIndex, columnIndex, text)}
              editable={!((rowIndex === 0 || rowIndex === 5 || rowIndex === 1 || rowIndex === 6))}
              placeholder={(rowIndex === 0 || rowIndex === 5 || rowIndex === 1 || rowIndex === 6) ? cellValue : ''}
              keyboardType="decimal-pad"
            />
          ))}
        </View>
      ))}
      <Button style={styles.botao} title="Gerar PDF" onPress={handleButtonClick} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  nonEditableCell: {
    backgroundColor: '#f2f2f2', // Cor de fundo para células não editáveis
  },
  botao:{
    padding: 100,
  }
});

export default Tabela2;
