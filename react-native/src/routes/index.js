import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import OnBoard from "../screens/OnBoard";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

import {navigationRef} from "../../src/NavigationService";
import {inject,observer} from "mobx-react";

const Routes = (props) => {
    let appStore = props.AppStore.appStore;
    const [onBoard,setOnBoard] = useState(appStore.onBoard);


    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={({route, navigation}) => {
                return {
                    headerShown: false
                }
            }} initialRouteName={(onBoard) ? "OnBoard" : "Home"}>

                <Stack.Screen name={"OnBoard"} component={OnBoard}/>
                <Stack.Screen name={"Home"} component={Home} options={{
                    gestureEnabled : true,
                }}/>
                <Stack.Screen name={"Settings"} component={Settings}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default inject("AppStore")(observer(Routes));
