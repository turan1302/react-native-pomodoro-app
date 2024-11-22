import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {inject, observer} from "mobx-react";
import Modal from "react-native-modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Animated, {FadeInDown} from "react-native-reanimated";

const Period = (props) => {

    const {position} = props;

    const [pomodoro, setPomodoro] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [longBreakTime, setLongBreakTime] = useState(0);

    const [isVisiblePomodoroModal, setIsVisiblePomodoroModal] = useState(false);
    const [isVisibleBreakModal, setIsVisibleBreakModal] = useState(false);
    const [isVisibleLongBreakModal, setIsVisibleLongBreakModal] = useState(false);


    useEffect(() => {
        let appStore = props.AppStore.appStore;
        setPomodoro(appStore.pomodoro);
        setBreakTime(appStore.break);
        setLongBreakTime(appStore.longBreak);
    }, [props.AppStore.appStore]);


    const changePomodoro = async () => {
        await props.AppStore.changePomodoro(pomodoro);
        setIsVisiblePomodoroModal(false);
    }

    const resetPomodoro = async () => {
        await props.AppStore.changePomodoro(25);
        setIsVisiblePomodoroModal(false);
    }

    const changeBreak = async () => {
        await props.AppStore.changeBreak(breakTime);
        setIsVisibleBreakModal(false);
    }

    const resetBreak = async () => {
        await props.AppStore.changeBreak(5);
        setIsVisibleBreakModal(false);
    }

    const changeLongBreak = async () => {
        await props.AppStore.changeLongBreak(longBreakTime);
        setIsVisibleLongBreakModal(false);
    }

    const resetLongBreak = async () => {
        await props.AppStore.changeLongBreak(15);
        setIsVisibleLongBreakModal(false);
    }

    return (
        <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.container}>
            <Text style={styles.title}>Süre</Text>
            <View style={styles.buttons_area}>
                <TouchableOpacity onPress={() => {
                    setIsVisiblePomodoroModal(true);
                }} style={styles.first_button}>
                    <Text style={styles.button_first_text}>{pomodoro}</Text>
                    <Text style={styles.button_second_text}>POMODORO</Text>
                </TouchableOpacity>
                <Modal isVisible={isVisiblePomodoroModal}>
                    <View style={styles.modalContent(position)}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisiblePomodoroModal(false)}>
                            <FontAwesome name={"times-circle"} color={"#000"} size={30}/>
                        </TouchableOpacity>

                        <View style={styles.modal_container}>
                            <Text style={styles.modal_title}>Pomodoro Süresini Değiştir</Text>
                            <View style={styles.modal_content}>
                                <View style={styles.time_buttons_area}>
                                    <TouchableOpacity onPress={() => setPomodoro(pomodoro + 1)}
                                                      style={styles.time_button_design}>
                                        <AntDesign name={"plus"} color={"#000"} size={20}/>
                                    </TouchableOpacity>
                                    <Text style={styles.time_title}>{pomodoro}</Text>
                                    <TouchableOpacity onPress={() =>{
                                        if ((pomodoro-1)>0){
                                            setPomodoro(pomodoro - 1)
                                        }
                                    }}
                                                      style={styles.time_button_design}>
                                        <AntDesign name={"minus"} color={"#000"} size={20}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tab_buttons_area}>
                            <TouchableOpacity onPress={resetPomodoro} style={styles.reset_button}>
                                <Text style={styles.reset_button_text}>Sıfırla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={changePomodoro} style={styles.change_button}>
                                <Text style={styles.change_button_text}>Onayla</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => {
                    setIsVisibleBreakModal(true);
                }} style={styles.second_button}>
                    <Text style={styles.button_first_text}>{breakTime}</Text>
                    <Text style={styles.button_second_text}>MOLA</Text>
                </TouchableOpacity>
                <Modal isVisible={isVisibleBreakModal}>
                    <View style={styles.modalContent(position)}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisibleBreakModal(false)}>
                            <FontAwesome name={"times-circle"} color={"#000"} size={30}/>
                        </TouchableOpacity>

                        <View style={styles.modal_container}>
                            <Text style={styles.modal_title}>Mola Süresini Değiştir</Text>
                            <View style={styles.modal_content}>
                                <View style={styles.time_buttons_area}>
                                    <TouchableOpacity onPress={() => setBreakTime(breakTime + 1)}
                                                      style={styles.time_button_design}>
                                        <AntDesign name={"plus"} color={"#000"} size={20}/>
                                    </TouchableOpacity>
                                    <Text style={styles.time_title}>{breakTime}</Text>
                                    <TouchableOpacity onPress={() => {
                                        if ((breakTime-1)>0) {
                                            setBreakTime(breakTime - 1);
                                        }
                                    }} style={styles.time_button_design}>
                                        <AntDesign name={"minus"} color={"#000"} size={20}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tab_buttons_area}>
                            <TouchableOpacity onPress={resetBreak} style={styles.reset_button}>
                                <Text style={styles.reset_button_text}>Sıfırla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={changeBreak} style={styles.change_button}>
                                <Text style={styles.change_button_text}>Onayla</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => {
                    setIsVisibleLongBreakModal(true);
                }} style={styles.third_button}>
                    <Text style={styles.button_first_text}>{longBreakTime}</Text>
                    <Text style={styles.button_second_text}>UZUN MOLA</Text>
                </TouchableOpacity>
                <Modal isVisible={isVisibleLongBreakModal}>
                    <View style={styles.modalContent(position)}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisibleLongBreakModal(false)}>
                            <FontAwesome name={"times-circle"} color={"#000"} size={30}/>
                        </TouchableOpacity>

                        <View style={styles.modal_container}>
                            <Text style={styles.modal_title}>Uzun Mola Süresini Değiştir</Text>
                            <View style={styles.modal_content}>
                                <View style={styles.time_buttons_area}>
                                    <TouchableOpacity onPress={() => setLongBreakTime(longBreakTime + 1)}
                                                      style={styles.time_button_design}>
                                        <AntDesign name={"plus"} color={"#000"} size={20}/>
                                    </TouchableOpacity>
                                    <Text style={styles.time_title}>{longBreakTime}</Text>
                                    <TouchableOpacity onPress={() => {
                                        if ((longBreakTime-1)>0) {
                                            setLongBreakTime(longBreakTime - 1);
                                        }
                                    }} style={styles.time_button_design}>
                                        <AntDesign name={"minus"} color={"#000"} size={20}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.tab_buttons_area}>
                            <TouchableOpacity onPress={resetLongBreak} style={styles.reset_button}>
                                <Text style={styles.reset_button_text}>Sıfırla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={changeLongBreak} style={styles.change_button}>
                                <Text style={styles.change_button_text}>Onayla</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </Animated.View>
    )
}

export default inject("AppStore")(observer(Period));
