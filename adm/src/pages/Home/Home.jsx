import React from 'react';
import { Text } from 'react-native';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import styles from './estilo';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home({ home }) {

    const navigation = useNavigation();

    function navigate(page) {
        navigation.navigate(page);
    }

    return (
        <View style={styles.containerInicio}>
            <Image style={styles.imagem} source={{ uri: "https://thumbs.dreamstime.com/b/design-can-be-used-as-logo-icon-complement-to-money-house-126215433.jpg" }} />

            <Text style={styles.titulo}>ADMcash</Text>
            <Text style={styles.subtitulo}>Faça seu orçamento!</Text>
            <Text style={styles.textocash}>Não perca tempo e faça seu orçamento doméstico apenas com o celular!</Text>

            <Pressable style={styles.botaoCriar} onPress={() => navigate("CriarConta")}>
                <Text style={styles.textoCriar}>Criar uma Conta</Text>
            </Pressable>
            <Pressable style={styles.botaoLogin}  onPress={() => navigate("FazerLogin")}>
                <Text style={styles.textoLogin}>Fazer Login</Text>
            </Pressable>
        </View>

    );
}

;

export default Home;