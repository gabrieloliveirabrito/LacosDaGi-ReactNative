import React, { useEffect, useCallback, useState } from 'react';
import 'react-native-gesture-handler';
import {
    StatusBar,
} from 'react-native';

import SplashScreen from "react-native-splash-screen"
import FlashMessage from "react-native-flash-message"
import SweetAlert from "react-native-sweet-alert"

import { getDatabase } from "./services/database"
import Routes from './Routes';


function App() {
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        async function load() {
            try {
                var db = await getDatabase()
                await db.close()

                setLoaded(true)
                SplashScreen.hide();
            }
            catch (error) {
                console.error(error)

                SweetAlert.showAlertWithOptions({
                    title: "Erro",
                    subTitle: "Houve um erro ao carregar o app. Tentar novamente?",
                    style: "error",
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                }, cb => cb == "accepted" && load())
            }
        }
        load()
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#6d387d" />
            {loaded && <Routes />}
            <FlashMessage position="top" />
        </>
    );
}

export default App