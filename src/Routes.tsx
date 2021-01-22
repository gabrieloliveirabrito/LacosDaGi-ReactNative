import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider } from "native-base"

import { Main, Ties } from "./screens"

import getTheme from '../native-base-theme/components';
import defaultTheme from 'native-base/src/theme/variables/material'
import material from '../native-base-theme/variables/material'
import variables from '../native-base-theme/variables/variables'

const Stack = createStackNavigator()

export default function Routes() {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#7d397d" }, headerTintColor: "white" }}>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="TieList" component={Ties.List} options={{ title: "Gerenciar laços" }} />
            <Stack.Screen name="TieCreate" component={Ties.Create} options={{ title: "Cadastrar laço" }} />
            <Stack.Screen name="TieView" component={Ties.View} options={{ title: "Informações do laço" }} />
        </Stack.Navigator>
    </NavigationContainer>
}