import React, { useEffect, useCallback, useState } from 'react';
import 'react-native-gesture-handler';
import {
    StatusBar,
} from 'react-native';

import SplashScreen from "react-native-splash-screen"
import { getDatabase } from "./services/database"
import Routes from './Routes';


function App() {
    const [loaded, setLoaded] = useState<boolean>(false)


    useEffect(() => {
        async function load() {
            var db = await getDatabase()
            await db.close()

            setLoaded(true)
            SplashScreen.hide();
        }

        load()
    }, [])

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7d397d" />
            {loaded && <Routes />}
        </>
    );
}

export default App