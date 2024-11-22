import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { inject, observer } from "mobx-react";
import soundData from "../../../config/data/sound"; // Verinizi import ediyoruz
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Sound from 'react-native-sound';
import styles from "./styles";
import Animated, {FadeInDown} from "react-native-reanimated";

const SoundSettings = (props) => {
    const [sound, setSound] = useState(props.AppStore.appStore.settings.notifySound);
    const [soundInstance, setSoundInstance] = useState(null);

    useEffect(() => {
        const notifySound = props.AppStore.appStore.settings.notifySound;
        setSound(notifySound);

        if (notifySound) {
            loadAndPlaySound(notifySound);
        }

        return () => {
            if (soundInstance) {
                soundInstance.release();
            }
        };
    }, [props.AppStore.appStore.settings.notifySound]);

    const loadAndPlaySound = (soundFile) => {
        const soundItem = soundData.find(item => item.sound === soundFile);

        if (soundItem) {
            const loadedSound = new Sound(soundItem.filePath, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log("Error loading sound: ", error);
                } else {
                    console.log("Sound loaded successfully");
                    loadedSound.play((success) => {
                        if (!success) {
                            console.log("Sound playback failed");
                        } else {
                            console.log("Sound playback started successfully");
                        }
                    });
                }
            });
            setSoundInstance(loadedSound);
        } else {
            console.log("Ses dosyası bulunamadı!"); // Hata durumunda log ekleyelim
        }
    };

    const changeSound = async (newSound) => {
        if (newSound === null) {
            await props.AppStore.changeSound(null);
            setSound(null);
        } else {
            await props.AppStore.changeSound(newSound);
            setSound(newSound);
            loadAndPlaySound(newSound);
        }
    };

    return (
        <Animated.View entering={FadeInDown.duration(400).delay(600)} style={styles.container}>
            <Text style={styles.container_title}>
                Bildirim Sesleri
            </Text>
            <View style={styles.buttons_area}>
                <TouchableOpacity onPress={() => changeSound(null)} style={styles.no_sound_button}>
                    <FontAwesome color={(sound === null) ? "#fff" : "#a2a2a2"} name={(sound === null) ? "check-circle" : "times-circle"} size={23} />
                    <Text style={styles.no_sound_button_text}>Ses Yok</Text>
                </TouchableOpacity>

                {soundData.map((item, index) => (
                    <TouchableOpacity onPress={() => changeSound(item.sound)} key={index} style={styles.sound_buttons_area(index)}>
                        <FontAwesome color={(sound === item.sound) ? "#fff" : "#a2a2a2"} name={(sound === item.sound) ? "check-circle" : "times-circle"} size={23} />
                        <Text style={styles.sound_buttons_text}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Animated.View>
    );
};

export default inject("AppStore")(observer(SoundSettings));
