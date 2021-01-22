import React, { useState, useEffect } from "react"
import { Image } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Tie } from "../../../services/database/models"

type TieParams = {
    Detail: {
        id: number
    }
}

export default function TieView() {
    const route = useRoute<RouteProp<TieParams, 'Detail'>>()
    const tieId = route.params.id

    const [tie, setTie] = useState<Tie | undefined>(undefined)
    useEffect(() => {

    }, [tieId])

    return tie && tie.image && <Image source={{ uri: 'data:image/png;base64,' + tie.image.toString("base64") }} style={{ height: 200, width: null, flex: 1 }} resizeMode="center" />
}