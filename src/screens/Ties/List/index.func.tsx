import React, { useState, useEffect, useCallback, useMemo } from "react"
import { FlatList, View, ActivityIndicator, Alert, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Container, Header, Body, Button, Text, Spinner as NBSpinner } from "native-base"
import Spinner from "react-native-loading-spinner-overlay"

import Entypo from "react-native-vector-icons/Entypo"
import { Tie } from "services/database/models"
import { TieCard, HeaderControls } from "./components"
import TieData, { Tie1, Tie2, Tie3 } from "./TieData"

const perPage = 10

interface TieListData {
    ties: Tie[]
    loaded: boolean
    initialized: boolean
    page: number,
    pages: number
}

const DefaultTieListData: TieListData = { ties: [], loaded: false, initialized: false, page: 1, pages: 0 }

export default function List() {
    const navigation = useNavigation()
    const [data, setData] = useState<TieListData>(DefaultTieListData)

    const delay = time => new Promise(res => setTimeout(res, time));
    useEffect(() => {
        setData(prev => ({ ...prev, initialized: true, loaded: false }))
    }, [])

    useEffect(() => {
        const { page, pages, loaded } = data
        navigation.setOptions({
            title: loaded ? `Gerenciar laços - ${page}/${pages}` : 'Carregando..',
            headerRight: () => <HeaderControls page={page} pages={pages} onPageChange={onPageChanged} />
        });
    }, [data])

    useEffect(() => {
        const { loaded, page } = data
        const ties = TieData.slice(perPage * (page - 1), page * perPage)

        console.log("Loaded", loaded, "Page", page)

        if (!loaded) {
            setData(prev => ({ ...prev, loaded: false }))
            delay(1000)
            setData(prev => ({
                ...prev,
                loaded: true,
                ties,
                pages: Math.ceil(TieData.length / perPage)
            }))
        }
    }, [data, data.loaded, data.page])

    function onPageChanged(page: number) {
        setData(prev => ({
            ...prev,
            page,
            loaded: false
        }))
    }

    async function loadTies() {
        const { page } = data
        const ties = TieData.slice(perPage * (page - 1), page * perPage);

        setData(prev => ({
            ...prev,
            loaded: true,
            ties,
            page: prev.page,
            pages: Math.ceil(TieData.length / perPage)
        }))

        console.log("Total", TieData.length, "Ties", ties.length, "pages", Math.ceil(TieData.length / perPage))
    }

    function renderTieCard(tie: Tie, index: number) {
        tie.id = (index + 1) + ((data.page - 1) * perPage);
        return <TieCard key={index} tie={tie} navigation={navigation} />
    }

    function renderList() {
        const { loaded, ties, page } = data
        if (!loaded)
            return <ActivityIndicator size={40} color="red" />;
        else if (ties.length == 0)
            return <Text>Nenhum laço cadastrado!</Text>
        else
            return <FlatList
                data={data.ties}
                renderItem={data => renderTieCard(data.item, data.index)}
                keyExtractor={(tie, index) => ((index + 1) + ((data.page - 1) * perPage)).toString()}
            />
    }

    return <Container>
        <Spinner
            animation="fade"
            visible={!data.loaded}
            textContent={'Carregando laços...'}
            textStyle={{ color: "white" }}
            customIndicator={<NBSpinner color="white" size={50} />}
        />
        {renderList()}
    </Container>
}