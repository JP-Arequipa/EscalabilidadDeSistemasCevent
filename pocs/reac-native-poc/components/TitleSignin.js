import { StyleSheet, Text, View } from "react-native";

export default function TitleSignin({ textIntro, textcontex }) {
  return (
    <View style={styles.view}>
      <Text style={styles.TitleText}>{textIntro}</Text>    
      <Text style={styles.TextForSignIn}>{textcontex}</Text>    
    </View>
  );
}

const styles = StyleSheet.create({
  TitleText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  view: {    
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  TextForSignIn: {
    color: 'white',
    fontSize: 13,    
    marginBottom: 20,
  },  
});
