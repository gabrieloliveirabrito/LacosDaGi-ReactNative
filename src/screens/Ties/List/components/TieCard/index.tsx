import React from "react"
import { Image } from "react-native"
import { Card, CardItem, Left, Right, Thumbnail, Body, Text, Button } from "native-base"
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"

import { Tie } from "../../../../../services/database/models"
import { useNavigation } from "@react-navigation/native"

interface TieCardProps {
    tie: Tie
}

export default function TieCard(props: TieCardProps) {
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
            {tie.image && <Image source={{ uri: 'data:image/png;base64,' + tie.image.toString("base64") }} style={{ height: 200, width: null, flex: 1 }} resizeMode="center" />}
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