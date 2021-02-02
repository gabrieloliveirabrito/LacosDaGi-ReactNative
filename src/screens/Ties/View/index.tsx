import React, { useState, useEffect } from "react"
import { Image } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Tie } from "../../../services/database/models"
import { Container, Spinner, Text } from "native-base"
import { getDatabase } from "../../../services/database"

type TieParams = {
    Detail: {
        id: number
    }
}

export default function TieView() {
    const route = useRoute<RouteProp<TieParams, 'Detail'>>()
    const tieId = route.params.id

    const [loaded, setLoaded] = useState(false)
    const [tie, setTie] = useState<Tie | undefined>(undefined)

    useEffect(() => {
        if (!loaded) {
            async function load() {
                var db = await getDatabase()
                var conn = await db.open()

                const tie = await conn.getRepository(Tie).findOne({ where: [{ id: tieId }] })
                await db.close()

                setTie(tie)
                setLoaded(true)
            }

            load()
        }
    }, [tieId])

    function render() {
        if (loaded) {
            if (!tie)
                return <Text>Nenhum laço foi encontrado!</Text>
            else
                return tie.image && <Image source={{ uri: 'data:image/png;base64,' + tie.image.toString("base64") }} style={{ height: 200, width: null, flex: 1 }} resizeMode="center" />
        } else {
            return <Spinner />
        }
    }

    return <Container>
        {render()}
    </Container>
}