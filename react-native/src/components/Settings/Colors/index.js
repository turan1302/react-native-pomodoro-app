import React, {useEffect, useState} from 'react'
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import colors from "../../../config/data/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {inject, observer} from "mobx-react";
import styles from "./styles";
import Animated, {FadeInDown} from "react-native-reanimated";

const Colors = (props) => {
    const [color, setColor] = useState("");
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
    const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

    const handleResize = () => {
        setWindowDimensions(Dimensions.get("window"));
    };

    useEffect(() => {
        let windowListener = Dimensions.addEventListener("change", handleResize);

        return () => {
            windowListener?.remove;
        };
    }, []);

    useEffect(() => {
        let selectedColor = props.AppStore.appStore.settings.selectedColor;
        setColor(selectedColor);

    }, [props.AppStore.appStore]);


    const changeColor = async (color)=>{
        await props.AppStore.changeColor(color);
        setColor(color);
    }

    return (
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.container}>
            <Text style={styles.title}>Renk Temaları</Text>
            <View style={styles.colors_area}>
                {colors.map((item, index) => (
                    <TouchableOpacity onPress={()=>changeColor(item.color)} key={index} style={styles.color_button(item,position)}>
                        <FontAwesome style={styles.color_button_check(color,item,position)} color={"#fff"} name={"check-circle"} size={23}/>
                    </TouchableOpacity>
                ))}
            </View>
        </Animated.View>
    )
}

export default inject("AppStore")(observer(Colors));
