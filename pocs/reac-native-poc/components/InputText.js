import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function InputText({ inputText, secure = false }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}   
        placeholder={inputText}
        placeholderTextColor="#66676C"
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    marginVertical: 10,
  },
  input: {
    height: 65,
    width: 400,
    borderColor: 'gray',
    borderRadius: 20,
    backgroundColor: '#262A34',
    marginStart: 35,
    color: '#ffff',
    paddingHorizontal: 10,    
  },
});
