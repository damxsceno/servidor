import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import * as Print from 'expo-print';

const Tabela = () => {
  const [tableData, setTableData] = useState([
    ['30s', '60s', 'Umidade', 'Temperatura'],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);

  const handleChangeCell = (rowIndex, columnIndex, text) => {
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
              width: 90%;
              border-collapse: collapse;
              
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
            .tabela {
              text-align: center;
              align-items: center;
              margin-bottom: 60px;
            }
            .header-item {
              margin-right: 20px;
              text-align: justify;
            }
            .logo {
              max-width: 180px; /* Define o tamanho máximo da imagem */
              margin-bottom: 40px;
              margin-top: 40px;
            }
            .footer{
              width: 90%;
              position: absolute;
              bottom: 0;
              text-align: center;
            }

            .divider {
              border-top: 1px solid #000;
              margin-top: 10px;
              margin-bottom: 20px;
              witdh: 30%;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://i.imgur.com/daVpiSN.png" alt="Logo" class="logo" />
          </div>

          <div class="tabela">
          <table border="1" class="tabelaG">
    <tr>
        <td colspan="8">Resistência de Isolação Cabos MT - Megôhmetro em 5kV</td>
    </tr>
    <tr>
        <td rowspan="2">Fase</td>
        <td colspan="3">Conexões</td>
        <td colspan="2">Valores</td>
        <td rowspan="2">Umidade</td>
        <td rowspan="2">Temperatura</td>
    </tr>
    <tr>
        <td>Tensão</td>
        <td>Retorno</td>
        <td>Guard</td>
        <td>30s</td>
        <td>60s</td>
    </tr>
    <tr>
        <td>R</td>
        <td>Condutor</td>
        <td>Malha</td>
        <td>Terra</td>
        <td>${tableData[1][0]}</td>
        <td>${tableData[1][1]}</td>
        <td>${tableData[1][2]}</td>
        <td>${tableData[1][3]}</td>
    </tr>
    </tr>
    <tr>
        <td>S</td>
        <td>Condutor</td>
        <td>Malha</td>
        <td>Terra</td>
        <td>${tableData[2][0]}</td>
        <td>${tableData[2][1]}</td>
        <td>${tableData[2][2]}</td>
        <td>${tableData[2][3]}</td>
    </tr>
    </tr>
    <tr>
        <td>T</td>
        <td>Condutor</td>
        <td>Malha</td>
        <td>Terra</td>
        <td>${tableData[3][0]}</td>
        <td>${tableData[3][1]}</td>
        <td>${tableData[3][2]}</td>
        <td>${tableData[3][3]}</td>
    </tr>
    `;
    html += `
          </table>
          <div class="footer">
            <div class="divider"></div>
            <p>Email: contato@almeidaborges.eng.br | Telefone: +55 (12)98105 5000 | +55 (11)99245 8574</p>
          </div>
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
    <View style={styles.container}>
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cellValue, columnIndex) => (
            <TextInput
              key={columnIndex}
              style={styles.cell}
              value={cellValue}
              onChangeText={(text) => handleChangeCell(rowIndex, columnIndex, text)}
              editable={rowIndex !== 0} // Somente a primeira linha é editável
              placeholder={rowIndex === 0 ? cellValue : ''}
              keyboardType="decimal-pad"
            />
          ))}
        </View>
      ))}
      <Button title="Clique aqui para gerar o PDF" onPress={handleButtonClick} />
    </View>
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
});

export default Tabela;
