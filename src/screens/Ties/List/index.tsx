import React, { PureComponent } from "react"
import { FlatList, View, ActivityIndicator, Alert } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Container, Header, Body, Button, Text, Spinner as NBSpinner } from "native-base"
import Spinner from "react-native-loading-spinner-overlay"

import Entypo from "react-native-vector-icons/Entypo"
import { Tie } from "services/database/models"
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

interface ListProps {
    navigation: NavigationProp<any, any>
}

interface ListState {
    loaded: boolean
    ties: Tie[]
    page: number
}

const defaultState = {
    loaded: false,
    ties: [],
    page: 1
}

export default class List extends React.Component<ListProps, ListState> {
    constructor(props: any) {
        super(props)

        this.state = defaultState
    }

    componentDidMount() {
        const { navigation } = this.props
        const { loaded } = this.state

        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: "row" }}>
                    <Button style={{ backgroundColor: "transparent", borderWidth: 0, elevation: 0 }} bordered icon onPress={() => navigation.navigate("TieCreate")}>
                        <Entypo name="arrow-left" color="white" size={30} />
                    </Button>
                    <Button style={{ backgroundColor: "transparent", borderWidth: 0, elevation: 0 }} bordered icon onPress={() => navigation.navigate("TieCreate")}>
                        <Entypo name="arrow-right" color="white" size={30} />
                    </Button>
                </View>
            ),
        });

        if (!loaded)
            this.loadTies()
    }

    clear = () => {
        this.setState(defaultState)
    }

    loadTies = async () => {
        const { loaded, page } = this.state

        if (page < 30) {
            const delay = time => new Promise(res => setTimeout(res, time));
            console.log(loaded, page)

            await delay(200)
            this.setState(prev => ({ loaded: true, ties: [...prev.ties, ...baseTies], page: prev.page + 1 }))
            console.log("Carregado")
        }
    }

    renderTieCard = (tie: Tie) => {
        return <TieCard tie={tie} navigation={this.props.navigation} />
    }

    renderList = () => {
        const { loaded, ties } = this.state

        if (loaded) {
            if (ties.length == 0)
                return <Text>Nenhum laço cadastrado</Text>
            else
                return <FlatList
                    style={{}}
                    data={ties}
                    renderItem={(item) => this.renderTieCard(item.item)}
                    keyExtractor={(item, index) => (item.id * index + (Math.random() * 1000)).toString()}
                    onEndReached={this.loadTies}
                    onEndReachedThreshold={0.5}
                />
        } else return null
    }

    shouldComponentUpdate(_: ListProps, nextState: ListState) {
        if (nextState.loaded !== this.state.loaded || nextState.page !== this.state.page)
            return true
        return false
    }

    render() {
        const { loaded, ties } = this.state

        return <Container>
            <Spinner
                animation="fade"
                visible={!loaded}
                textContent={'Carregando laços...'}
                textStyle={{ color: "white" }}
                customIndicator={<NBSpinner color="white" size={50} />}
            />
            {this.renderList()}
        </Container>
    }
}