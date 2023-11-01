import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddElementScreen = ({navigation}) => {
  const [elementName, setElementName] = useState('');

  const handleAddElement = async () => {
    try {
      const response = await fetch('http://192.168.15.102:5000/api/elements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: elementName }),
      });

      if (response.ok) {
        // Data was successfully added to the server
        // You may want to show a success message to the administrator
        console.log('Element added successfully!');
        // Reset the input field after successful addition
        setElementName('');
        navigation.navigate('List');

      } else {
        // There was an error adding the data
        // Handle the error accordingly (e.g., show an error message)
        console.error('Error adding element:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding element:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Element Name"
        value={elementName}
        onChangeText={(text) => setElementName(text)}
      />
      <Button title="Add Element" onPress={handleAddElement} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
  },
});

export default AddElementScreen;