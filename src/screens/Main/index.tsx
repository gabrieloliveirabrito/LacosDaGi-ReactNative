import React from "react"
import { Button, Container, Footer, H1, Text, View } from "native-base"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

import MCI from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

export default function Main() {
    const navigation = useNavigation()
    const toTies = () => navigation.navigate("TieList")

    return <Container>
        <View style={styles.header}>
            <H1 style={styles.headerText}>Laços da GI</H1>
            <Text style={{ color: "white", textAlign: "center" }}>Para começar a gerenciar o sistema, selecione uma opção abaixo</Text>
        </View>

        <Container style={styles.container}>
            <Button hasText iconLeft full style={styles.navigateButton} onPress={toTies}>
                <MCI name="bow-tie" color="white" size={30} />
                <Text>Laços</Text>
            </Button>
            <Button hasText iconLeft full style={styles.navigateButton}>
                <FontAwesome name="user" color="white" size={30} />
                <Text>Clientes</Text>
            </Button>
            <Button hasText iconLeft full style={styles.navigateButton}>
                <FontAwesome name="shopping-cart" color="white" size={30} />
                <Text>Vendas</Text>
            </Button>
            <Button hasText iconLeft full style={styles.navigateButton}>
                <MCI name="file-document" color="white" size={30} />
                <Text>Relatórios</Text>
            </Button>
        </Container>

        <Footer style={styles.footer}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Desenvolvido por Gabriel Oliveira Brito</Text>
        </Footer>
    </Container>
}