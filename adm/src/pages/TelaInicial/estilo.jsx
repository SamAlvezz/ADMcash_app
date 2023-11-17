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
        fontSize: 40,
        color: '#09301B',
        marginBottom: 30,
        
    },
    subtitulo: {
         
        fontstyle: 'normal',
        fontweight: 'bold',
        fontSize: 24,
        color: '#09301B',
    },
    textocash: {
        marginBottom: 50,
        marginTop: 15,
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        color: '#262323',
        maxWidth: 300
    },
    botaoCriar: {
        
        height: 48,
        width: 233,
        borderRadius: 4,
        color: '#3FE78C',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginBottom: 10,
        backgroundColor: '#3FE78C',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        paddingVertical: 7,
    },
    textoCriar: {
        fontSize: 20,
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
        fontSize: 20,
        color: 'black',
        
        
    }


}

export default styles;