import React from 'react'
import { StyleSheet, Text, TouchableOpacity,} from 'react-native'

 export default function CustomButton({onPress, title}) {
    return(
        <TouchableOpacity  
        onPress={onPress}
         style={styles.botaocriarContaLogin}>
        <Text style={styles.txt}>{title}</Text>
        </TouchableOpacity>
    );
 }; 

 const styles = StyleSheet.create({
    botaocriarContaLogin:{ 
        height: 48,
        width: 233,
        borderRadius: 4,
        color: '#3FE78C',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        backgroundColor: '#3FE78C',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        paddingVertical: 7,
        alignSelf: 'center',
        marginBottom: 100,
        

    },
    txt:{
        fontSize: 20,
        color: 'white',
 }})
