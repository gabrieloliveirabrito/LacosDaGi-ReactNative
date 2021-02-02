import React from "react"
import { Card, CardItem, Left, Right, Thumbnail, Body, Text, Button } from "native-base"
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import FastImage from "react-native-fast-image"

import { Tie } from "services/database/models"
import { useNavigation, NavigationProp } from "@react-navigation/native"

interface TieCardProps {
    tie: Tie
    navigation: NavigationProp<any, any>
}

export default class TieCard extends React.PureComponent<TieCardProps>
{
    render() {
        const { tie, navigation } = this.props

        return <Card>
            <CardItem bordered>
                <Left>
                    <Body>
                        <Text>{tie.name}</Text>
                        <Text note>{tie.description}</Text>
                    </Body>
                </Left>

                <Right>
                    <Text note>{tie.category.name}</Text>
                </Right>
            </CardItem>
            <CardItem bordered cardBody button onPress={() => navigation.navigate("TieView", { id: tie.id })}>
                {tie.image && <FastImage source={{ uri: 'data:image/png;base64,' + tie.image.toString("base64") }} style={{ height: 100, width: null, flex: 1 }} resizeMode={FastImage.resizeMode.center} />}
            </CardItem>
            <CardItem bordered>
                <Left>
                    <Button transparent>
                        <Entypo name="edit" />
                        <Text>Editar</Text>
                    </Button>
                </Left>
                <Body>
                    <Button transparent>
                        <Ionicons name="remove-circle" color="darkred" />
                        <Text style={{ color: "darkred" }}>Deletar</Text>
                    </Button>
                </Body>
                <Right>
                    <Text>#{tie.id}</Text>
                </Right>
            </CardItem>
        </Card>
    }
}

export function TieCardF(props: TieCardProps) {
    const { tie } = props
    const navigation = useNavigation()

    return <Card>
        <CardItem>
            <Left>
                <Body>
                    <Text>{tie.name}</Text>
                    <Text note>{tie.description}</Text>
                </Body>
            </Left>

            <Right>
                <Text note>{tie.category.name}</Text>
            </Right>
        </CardItem>
        <CardItem cardBody button onPress={() => navigation.navigate("TieView", { id: tie.id })}>
            {tie.image && <FastImage source={{ uri: 'data:image/png;base64,' + tie.image.toString("base64") }} style={{ height: 200, width: null, flex: 1 }} resizeMode={FastImage.resizeMode.center} />}
        </CardItem>
        <CardItem>
            <Left>
                <Button transparent>
                    <Entypo name="edit" />
                    <Text>Editar</Text>
                </Button>
            </Left>
            <Body>
                <Button transparent>
                    <Ionicons name="remove-circle" color="darkred" />
                    <Text style={{ color: "darkred" }}>Deletar</Text>
                </Button>
            </Body>
            <Right>
                <Text>#{tie.id}</Text>
            </Right>
        </CardItem>
    </Card>
}