import React from "react"
import { View, Button, Text } from "native-base"
import Entypo from "react-native-vector-icons/Entypo"

interface HeaderControlsProps {
    page: number;
    pages: number;

    onPageChange: (page: number) => void;
}

export default function HeaderControls(props: HeaderControlsProps) {
    const { page, pages, onPageChange } = props
    const canBack = page > 1
    const canForward = page < pages

    function goBack() {
        if (page > 1)
            onPageChange(page - 1)
    }

    function goForward() {
        if (page < pages)
            onPageChange(page + 1)
    }

    return <View style={{ flexDirection: "row" }}>
        <Button disabled={!canBack} style={{ backgroundColor: "transparent", borderWidth: 0, elevation: 0 }} bordered icon onPress={goBack}>
            <Entypo name="arrow-left" color={canBack ? "white" : "gray"} size={30} />
        </Button>
        <Button disabled={!canForward} style={{ backgroundColor: "transparent", borderWidth: 0, elevation: 0 }} bordered icon onPress={goForward}>
            <Entypo name="arrow-right" color={canForward ? "white" : "gray"} size={30} />
        </Button>
    </View>
}