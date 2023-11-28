const styles = {
    containerInicio: {
        
        flex:1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        overflow: 'hidden',
            
    },
    imagem: {
        height: 290,
        width: 295,
        resizeMode:"contain",
        marginTop: 28
    },
   
    titulo: {
        fontWeight: 'bold',
        fontSize: 43,
        color: '#09301B',
        marginBottom: 30,
        
    },
    subtitulo: {
         
        fontstyle: 'normal',
        fontweight: 'bold',
        fontSize: 26,
        color: '#09301B',
    },
    textocash: {
        marginBottom: 50,
        marginTop: 15,
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        color: '#262323',
        maxWidth: 300
    },
    botaoCriar: {
        
        height: 48,
        width: 233,
        borderRadius: 10,
        color: '#3FE78C',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginBottom: 10,
        backgroundColor: '#3FE78C',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        paddingVertical: 7,
    },
    textoCriar: {
        fontSize: 22,
        color: 'white',
       
    },
    botaoLogin: {
        
        height: 48,
        width: 233,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 40
    },
    textoLogin: {
        fontSize: 22,
        color: 'black',
        
        
    }


}

export default styles;