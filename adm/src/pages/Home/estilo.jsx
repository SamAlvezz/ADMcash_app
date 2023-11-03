const styles = {
    containerInicio: {
        position: 'relative',
        flex:1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        overflow: 'hidden'

            
    },
    imagem: {
        height: 300,
        width: 295,
        resizeMode:"contain",
    },
   
    titulo: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#09301B',
        marginVertical: 20,
    },
    subtitulo: {
        marginBottom: 10,     
        fontstyle: 'normal',
        fontweight: 'bold',
        fontSize: 24,
        color: '#09301B',
    },
    textocash: {
        marginBottom: 30,
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        color: '#262323'
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
    },
    textoLogin: {
        fontSize: 20,
        color: 'black',
        
    }


}

export default styles;