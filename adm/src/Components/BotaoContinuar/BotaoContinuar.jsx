import React from 'react'
import { StyleSheet, Text, TouchableOpacity,} from 'react-native'

 export default function CustomButton({onPress, title}) {
    return(
        <TouchableOpacity  
        onPress={onPress}
         style={styles.container}>
        <Text style={styles.txt}>{title}</Text>
        </TouchableOpacity>
    );
 }; 

 const styles = StyleSheet.create({
    container:{ 
        width: 360,
        height: 64,
        backgroundColor: '#3FE78C',
        justifyContent: 'center',
        alignItems: 'center',
      
        
        
    },
    txt:{
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'nunito',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 'normal'}
 })
