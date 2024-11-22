import React, {useEffect, useState} from 'react'
import {Dimensions, ScrollView, Text, View} from "react-native";
import styles from "./styles";
import CustomHeader from "../../components/Settings/CustomHeader";
import Period from "../../components/Settings/Period";
import Colors from "../../components/Settings/Colors";
import {inject, observer} from "mobx-react";
import SoundSettings from "../../components/Settings/SoundSettings";
import AwakeScreen from "../../components/Settings/Other/AwakeScreen";
import GoalPomodoro from "../../components/Settings/Other/GoalPomodoro";
import HowUsage from "../../components/Settings/Other/HowUsage";
import Animated, {FadeInDown} from "react-native-reanimated";

const Settings = (props) => {
    let appStore = props.AppStore.appStore;

    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
    const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

    const handleResize = () => {
        setWindowDimensions(Dimensions.get("window"));
    };

    useEffect(() => {
        const windowListener = Dimensions.addEventListener("change", handleResize);
        return () => {
            windowListener?.remove();
        };
    }, []);

    return (
        <View style={styles.container(appStore.settings.selectedColor)}>
            <ScrollView showsVerticalScrollIndicator={false} bounces>
                <CustomHeader/>
                <Period windowDimensions={windowDimensions} position={position}/>
                <Colors/>
                <SoundSettings/>
                <Animated.View entering={FadeInDown.duration(400).delay(800)} style={styles.other_settings_area}>
                    <Text style={styles.other_settings_title}>Diğer Ayarlar</Text>
                    <AwakeScreen/>
                    <GoalPomodoro position={position} windowDimensions={windowDimensions}/>
                    <HowUsage/>
                </Animated.View>
            </ScrollView>
        </View>
    )
}

export default inject("AppStore")(observer(Settings));
