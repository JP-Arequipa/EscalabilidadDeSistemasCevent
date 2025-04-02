import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'; 
import TitleSignin from "../components/TitleSignin";
import ButtomApp from "../components/ButtomApp";
import InputText from "../components/InputText";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TitleSignin 
          textIntro="Welcome Back" 
          textcontex="Please sign in to your account"
        />  
        <InputText inputText="Enter your email"/>
        <InputText inputText="Enter your password" secure={true} />
        <View style={styles.signin}>
          <ButtomApp 
            buttonText="Sign In" 
            color="#5566FF" 
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View>
          <ButtomApp buttonText="Sign In with Google" color="#1B78F2" icon="google" />
          <ButtomApp buttonText="Sign In with Facebook" color="#3A569B" icon="facebook-square"/>
          <ButtomApp buttonText="Sign In with Apple" color="#000000" icon="apple1" />          
        </View>
      </View>
      <View style={styles.centeredContent}>
        <StatusBar style="light" />            
        <View style={styles.textContainer}> 
          <Text style={styles.textAccount}>You don't have account?</Text>          
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}> 
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171A1F",
  },
  titleContainer: {
    paddingTop: 50,
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",   
  },
  signin: {
    marginTop: 40,
    marginBottom: 240
  },
  textContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',  
  },
  textAccount: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    marginEnd: 10,
  },
  signUpText: {
    color: 'red', 
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
});
