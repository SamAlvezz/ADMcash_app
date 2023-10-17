const styles = {
    containerInicio: {
        position: 'relative',
        width: 360,
        height: 800,
        backgroundColor: '#ffff',
        alignItems: "center",
        
    },
    imagem: {
        height: 225,
        width: 360,
        left: -10,
        top: 86,
    },
    containerPreco: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    titulo: {
        margin: 101,
        fontWeight: 'bold',
        fontSize: 40,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#09301B',
        flex: 1,
        fontFamily: '',
        Weight: 700,
        Width: 179,
        Height: 55,
        Top: 319,
        Left: 93,
    },
    subtitulo: {
        position: 'absolute',
        width: 232,
        height: 33,
        left: 68,
        top: 409,
        fontfamily: 'Nunito',
        fontstyle: 'normal',
        fontweight: 800,
        fontSize: 24,
        lineheight: 33,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#09301B',
    },
    textocash: {
        position: 'absolute',
        width: 285,
        height: 109,
        left: 38,
        top: 456,
        fontFamily: '',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        color: '#262323'
    },
    botaoCriar: {
        top: -165,
        position: 30,
        height: 48,
        width: 233,
        borderRadius: 4,
        alignSelf: 'center',
        color: '#3FE78C',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: '#3FE78C',
    },
    textoCriar: {
        fontSize: 20,
        color: 'white',
        fontFamily: '',
        fontStyle: 'normal'
    },
    botaoLogin: {
        top: -153,
        position: 30,
        height: 48,
        width: 233,
        borderRadius: 4,
        alignSelf: 'center',
        color: '#3FE78C',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        backgroundColor: '#FFFFFF',
    },
    textoLogin: {
        fontSize: 20,
        color: 'black',
        fontFamily: '',
        fontStyle: 'normal'
    }


}

export default styles;