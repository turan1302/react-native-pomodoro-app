import React from 'react'
import {Image, View} from "react-native";
import {OnboardFlow} from 'react-native-onboard';
import {inject,observer} from "mobx-react";
import styles from "./styles";

const OnBoard = (props) => {
    const {navigation} = props;

    const setOnBoard = async ()=>{
        await props.AppStore.changeOnBoard(false);
        navigation.navigate("Home");
    }

    const pages = [
        {
            title: 'Pomodoro ile Tanış!',
            subtitle: 'Pomodoro, odaklanmanı artıracak ve daha verimli çalışmanı sağlayacak basit ama güçlü bir zaman yönetimi tekniğidir. Hedeflerinize ulaşmak için sadece 25 dakikalık odaklanmış çalışma periyotlarıyla başlayalım.',
            primaryButtonTitle: "Devam",
            titleStyle : styles.title,
            imageComponent : <Image style={styles.image} source={require("../../assets/onboard/1.png")}/>
        },
        {
            title: 'Pomodoro Tekniği Nasıl Çalışır?',
            subtitle: 'Pomodoro tekniği, 25 dakika boyunca tam odaklanmış bir şekilde çalışmanı sağlar. Çalışma süresi sonunda 5 dakikalık kısa bir ara verirsin. Her 4 Pomodoro döngüsünün ardından daha uzun bir ara (15-30 dakika) alırsın. Bu döngü, odaklanmanı artırırken tükenmişlikten kaçınmanı sağlar.',
            primaryButtonTitle: "Başlayalım",
            titleStyle : styles.title,
            imageComponent : <Image style={styles.second_image} source={require("../../assets/onboard/2.png")}/>
        },
    ];

    return (
        <View style={{flex: 1}}>
            <OnboardFlow
                pages={pages}
                type={'inline'}
                onDone={setOnBoard}
                paginationColor={"#000"}
                paginationSelectedColor={"#000"}
            />
        </View>
    )
}

export default inject("AppStore")(observer(OnBoard));
