import React, {useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import {observer, inject} from "mobx-react";
import Modal from "react-native-modal";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const GoalPomodoro = (props) => {
    const [goalPomodoro, setGoalPomodoro] = useState("");
    const [isVisibleGoalPomodoroModal, setIsVisibleGoalPomodoroModal] = useState(false);

    const {windowDimensions, position} = props;


    useEffect(() => {
        let goalPomodoroQty = props.AppStore.appStore.settings.goalPomodoro;
        setGoalPomodoro(goalPomodoroQty);

    }, [props.AppStore.appStore]);

    const changeGoalPomodoro = async () => {
        await props.AppStore.changeGoalPomodoro(goalPomodoro);
        setIsVisibleGoalPomodoroModal(false);
    }


    return (
        <>
            <TouchableOpacity onPress={() => {
                setIsVisibleGoalPomodoroModal(true);
            }} style={styles.button}>
                <Text style={styles.button_first_text}>{goalPomodoro}</Text>
                <Text style={styles.button_second_text}>GÜNLÜK HEDEF</Text>
            </TouchableOpacity>

            <Modal isVisible={isVisibleGoalPomodoroModal}>
                <View style={styles.modalContent(position)}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisibleGoalPomodoroModal(false)}>
                        <FontAwesome name={"times-circle"} color={"#000"} size={30}/>
                    </TouchableOpacity>

                    <View style={styles.modal_container}>
                        <Text style={styles.modal_title}>Hedef Pomodoro Sayısını Değiştir</Text>
                        <View style={styles.modal_content}>
                            <View style={styles.qty_buttons_area}>
                                <TouchableOpacity onPress={() => setGoalPomodoro(goalPomodoro + 1)}
                                                  style={styles.qty_buttons_design}>
                                    <AntDesign name={"plus"} color={"#000"} size={20}/>
                                </TouchableOpacity>
                                <Text style={styles.qty_text}>{goalPomodoro}</Text>
                                <TouchableOpacity onPress={() => {
                                    if ((goalPomodoro - 1) > 0) {
                                        setGoalPomodoro(goalPomodoro - 1)
                                    }
                                }}
                                                  style={styles.qty_buttons_design}>
                                    <AntDesign name={"minus"} color={"#000"} size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.check_button_area}>
                        <TouchableOpacity onPress={changeGoalPomodoro} style={styles.check_button_design}>
                            <Text style={styles.check_button_text}>Onayla</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default inject("AppStore")(observer(GoalPomodoro));
