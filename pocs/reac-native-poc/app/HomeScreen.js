import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gamer Zone</Text>
      <Image 
        source={{ uri: 'https://i.pinimg.com/736x/2c/69/8d/2c698dc8ada77204dd9aed02e2208759.jpg' }} 
        style={styles.image}  resizeMode="cover" />
      <View>
        <TouchableOpacity style={styles.ButtomStyle}> 
          <Text style={styles.textButtom}>Create Event</Text>
        </TouchableOpacity>
        <Text style={styles.textstyle} >Este es un texto de ejemplo para dar una description</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#171A1F',
  },
  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',    
  },
    marginTop: 20,
  image: {
    width: '80%', 
    height: 250, 
    borderRadius: 10, 
    marginTop: 20, 
  },
  textButtom: {
    color: 'white', 
    fontSize: 25,
    textAlign: 'center',   
  },
  textstyle: {
    marginTop: 10,
    color: 'white', 
    fontSize: 25,
    textAlign: 'center',   
  },
  ButtomStyle: {
    marginTop: 20,
    backgroundColor: "#000000",
    height: 60,
    width: 380,    
    borderRadius: 20,
    justifyContent: "center",
  }
});
