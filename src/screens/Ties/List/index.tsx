import React, { useState, useEffect } from "react"
import { FlatList, View, ActivityIndicator, Alert } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { Container, Header, Body, Button, Text } from "native-base"
import Entypo from "react-native-vector-icons/Entypo"
import { Tie } from "../../../services/database/models"
import { TieCard } from "./components"
import { Tie1, Tie2, Tie3 } from "./TieImages"

const baseTies: Tie[] = [{
    id: 0,
    name: "Laço vermelho",
    description: "Laço de cor vermelha",
    category: { id: 0, name: "Laço" },
    image: Buffer.from(Tie1, "base64")
},
{
    id: 1,
    name: "Laço rosa",
    description: "Laço de cor rosa, pequeno",
    category: { id: 0, name: "Laço" },
    image: Buffer.from(Tie2, "base64")
},
{
    id: 2,
    name: "Laço azul",
    description: "Laço de cor azul, grande",
    category: { id: 0, name: "Laço" },
    image: Buffer.from(Tie3, "base64")
}
]

interface ListState {
    ties: Tie[]
    loaded: boolean
    page: number
}

interface TieListProps {
    navigation: NavigationProp<any, any>
}

export default class List extends React.PureComponent<TieListProps, ListState> {
    constructor(props: TieListProps) {
        super(props)
        const { navigation } = props

        this.state = {
            ties: [], loaded: false, page: 1
        }

        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: "row" }}>
                    <Button style={{ margin: 5 }} bordered icon onPress={() => navigation.navigate("TieCreate")}>
                        <Entypo name="plus" color="white" size={30} />
                    </Button>
                </View>
            ),
        });
    }

    async componentDidMount() {
        const { loaded } = this.state

        if (!loaded)
            await this.loadTies()
    }

    renderTieCard = (tie: Tie) => <TieCard tie={tie} />

    loadTies = async () => {
        const { page, ties } = this.state
        const delay = time => new Promise(res => setTimeout(res, time));

        if (page < 10) {
            this.setState({ loaded: false })
            delay(1000)
            this.setState({ ties: [...ties, ...baseTies], page: page + 1 })
            delay(200)
            this.setState({ loaded: true })
        }
    }

    renderFooter = () => {
        const { loaded } = this.state
        if (loaded) return null;

        return <View style={{ alignSelf: 'center', marginVertical: 20 }}>
            <ActivityIndicator size={30} color="red" />
        </View>
    }

    render() {
        const { ties } = this.state

        return <FlatList
            style={{}}
            contentContainerStyle={{}}
            data={ties}
            renderItem={(item) => this.renderTieCard(item.item)}
            keyExtractor={(item, index) => (item.id * index + (Math.random() * 1000)).toString()}
            onEndReached={this.loadTies}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
        />
    }
}