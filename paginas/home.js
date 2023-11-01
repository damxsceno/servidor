import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'; 


const ListScreen = ({navigation}) => {
  const [listData, setListData] = useState();

  // useEffect hook to fetch data (replace the API URL with your backend endpoint)
  useFocusEffect(
    
    useCallback(() => {
      const fetchData = async () => {
        // Check network connectivity
        let isConnected;
        
        await NetInfo.fetch().then((state) => {
          isConnected = state.isConnected  
        });

        if (isConnected) {
          // Fetch the latest data from the server and update the list
          // Replace 'YOUR_BACKEND_API_URL' with your actual backend API 
          console.log ("oi")
          const response = await axios.get('http://192.168.15.102:5000/api/elements').then((res)=> {
            console.log (res)
            return res
          });
          console.log (response)
          const data = response.data;
          setListData(data);

          // Save the data locally for future offline use
          AsyncStorage.setItem('listData', JSON.stringify(data));
        } else {
          // Device is offline, load the data from local storage
          const storedData = await AsyncStorage.getItem('listData');
          if (storedData) {
            setListData(JSON.parse(storedData));
          }
        }
      };

      fetchData();
    }, [])
  );

  const handleDeleteElement = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.15.102:5000/api/elements/${id}`);

      if (response.status === 200) {
        // Elemento excluído com sucesso
        console.log('Element deleted successfully!');

        // Atualize a lista de elementos após a exclusão
        const updatedListData = listData.filter((item) => item._id !== id);
        setListData(updatedListData);
      } else {
        // Houve um erro ao excluir o elemento
        console.error('Error deleting element:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting element:', error);
    }
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity onPress={() => navigation.navigate('ModelosScreen')}>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDeleteElement(item._id)}>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      { (listData) ? (
        <FlatList data={listData} keyExtractor={(item) => item._id.toString()} renderItem={renderItem} />
      ): null}
      <Button style={styles.adicionar}
        title="ADICIONAR TESTE"
        onPress={() => navigation.navigate('AddElement')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },

  item: {
    fontSize: 18,
    paddingVertical: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  deleteButton: {
    color: 'red',
    fontSize: 18
  },

  adicionar:{
    marginVertical: 30
  }
});

export default ListScreen;