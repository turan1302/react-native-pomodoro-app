import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {inject, observer} from "mobx-react";
import styles from "./styles";

const AwakeScreen = (props) => {
    const [awake, setAwake] = useState("");

    useEffect(() => {
        let awakeStatus = props.AppStore.appStore.settings.awake;
        setAwake(awakeStatus);
    }, [props.AppStore.appStore]);

    const changeAwake = async (data) => {
        await props.AppStore.changeAwake(data);
        setAwake(data);
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons_area}>
                <TouchableOpacity onPress={()=>changeAwake(true)}>
                    <FontAwesome color={awake ? "#fff" : "#a2a2a2"} name={"check-circle"} size={40}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>changeAwake(false)} style={styles.right_button}>
                    <FontAwesome color={!awake ? "#fff" : "#a2a2a2"} name={"times-circle"} size={40}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.button_title}>Ekranı Uyanık Tut</Text>
        </View>
    )
}

export default inject("AppStore")(observer(AwakeScreen));
