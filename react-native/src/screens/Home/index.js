import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CircularProgress from 'react-native-circular-progress-indicator';
import CustomHeader from "../../components/Home/CustomHeader";
import { inject, observer } from "mobx-react";
import Sound from 'react-native-sound';
import soundData from "../../config/data/sound";
import KeepAwake from 'react-native-keep-awake';
import quotes from "../../config/data/quotes";
import Animated, { FadeInDown } from "react-native-reanimated";

const Home = (props) => {
    let appStore = props.AppStore.appStore;

    const getInitialTime = (selectedTime) => {
        switch (selectedTime) {
            case 'pomodoro':
                return appStore.pomodoro * 60;
            case 'break':
                return appStore.break * 60;
            case 'longBreak':
                return appStore.longBreak * 60;
            default:
                return appStore.pomodoro * 60;
        }
    };

    const [timeLeft, setTimeLeft] = useState(getInitialTime(appStore.selectedTime));
    const [timerRunning, setTimerRunning] = useState(false);
    const [progress, setProgress] = useState(100);
    const [selectedTime, setSelectedTime] = useState(appStore.selectedTime || 'pomodoro');
    const [sound, setSound] = useState(null);
    const [hasUpdated, setHasUpdated] = useState(false);

    const [uniqueKey, setUniqueKey] = useState(new Date().getTime());

    useEffect(() => {
        const unsubscribeFocus = props.navigation.addListener('focus', () => {
            setUniqueKey(new Date().getTime());
        });

        return () => {
            unsubscribeFocus();
        };
    }, [props.navigation]);

    useEffect(() => {
        if (appStore.settings.awake) {
            KeepAwake.activate();
        } else {
            KeepAwake.deactivate();
        }
    }, [appStore.settings.awake]);

    useEffect(() => {
        const notifySound = appStore.settings.notifySound;

        if (notifySound === null) {
            if (sound) {
                sound.release();
            }
            setSound(null);
        } else {
            const soundItem = soundData.find(item => item.sound === notifySound);

            if (soundItem) {
                if (sound) {
                    sound.release();
                }

                const timerSound = new Sound(soundItem.filePath, Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                        console.log("Error loading sound: ", error);
                    }
                });
                setSound(timerSound);
            }
        }

        return () => {
            if (sound) {
                sound.release();
            }
        };
    }, [appStore.settings.notifySound]);

    useEffect(() => {
        let timer;
        setHasUpdated(false);

        if (timerRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (timeLeft <= 0 && !hasUpdated) {
            setTimerRunning(false);
            if (sound) {
                props.AppStore.pomodoroCountUpdate(selectedTime);
                sound.play((success) => {
                    if (!success) {
                        console.log('Ses çalma başarısız oldu');
                    }
                });
            }
            setHasUpdated(true);
        }

        let maxTime = appStore.pomodoro * 60;
        if (selectedTime === 'break') {
            maxTime = appStore.break * 60;
        } else if (selectedTime === 'longBreak') {
            maxTime = appStore.longBreak * 60;
        }

        const newProgress = (timeLeft / maxTime) * 100;
        setProgress(newProgress);

        return () => clearInterval(timer);
    }, [timerRunning, timeLeft, selectedTime, appStore.pomodoro, appStore.break, appStore.longBreak]);

    const startTimer = () => {
        if (timeLeft > 0) {
            setTimerRunning(!timerRunning);
        } else {
            let newTime = appStore.pomodoro * 60;
            if (selectedTime === 'break') {
                newTime = appStore.break * 60;
            } else if (selectedTime === 'longBreak') {
                newTime = appStore.longBreak * 60;
            }
            setTimeLeft(newTime);
            setTimerRunning(true);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleTimeChange = async (timeType) => {
        await props.AppStore.changeSelectedTime(timeType);
        setSelectedTime(timeType);

        let newTime;
        if (timeType === 'pomodoro') {
            newTime = appStore.pomodoro * 60;
        } else if (timeType === 'break') {
            newTime = appStore.break * 60;
        } else if (timeType === 'longBreak') {
            newTime = appStore.longBreak * 60;
        }

        setTimeLeft(newTime);
        setProgress(timeLeft / newTime * 100);
    };

    const resetTime = () => {
        setTimerRunning(false);
        let newTime = appStore.pomodoro * 60;
        if (selectedTime === 'break') {
            newTime = appStore.break * 60;
        } else if (selectedTime === 'longBreak') {
            newTime = appStore.longBreak * 60;
        }
        setTimeLeft(newTime);
        setProgress(100);
    };

    const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)].quote;

    return (
        <View style={styles.container(appStore.settings.selectedColor)}>
            <ScrollView bounces showsVerticalScrollIndicator={false}>
                {(!timerRunning) && (
                    <CustomHeader key={`custom-header-${uniqueKey}`} />
                )}
                <View style={styles.page_area}>
                    <Animated.View entering={FadeInDown.duration(400).delay(200)} key={`time-type-${uniqueKey}`}>
                        <Text style={styles.time_type}>Tip: {appStore.selectedTime[0].toUpperCase() + appStore.selectedTime.slice(1)}</Text>
                        <Text style={styles.pomodoro_count}>Şu anda {appStore.settings.pomodoroCount}. Pomodorodasınız</Text>
                        <TouchableOpacity disabled={appStore.settings.pomodoroCount === appStore.settings.goalPomodoro} onPress={startTimer}>
                            <CircularProgress
                                value={progress}
                                title={formatTime(timeLeft)}
                                titleColor={"black"}
                                radius={120}
                                progressValueColor={"black"}
                                showProgressValue={false}
                                inActiveStrokeOpacity={0.5}
                                activeStrokeWidth={15}
                                inActiveStrokeWidth={20}
                                progressValueStyle={styles.progress_value_style}
                                activeStrokeSecondaryColor="white"
                                inActiveStrokeColor="black"
                                duration={1000}
                                dashedStrokeConfig={{
                                    count: 50,
                                }}
                            />
                        </TouchableOpacity>
                    </Animated.View>

                    {(appStore.settings.pomodoroCount === appStore.settings.goalPomodoro) ? (
                        <TouchableOpacity onPress={() => props.AppStore.resetPomodoroCount()}>
                            <Text style={styles.quote_design}>"{getRandomQuote()}"</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <Animated.View entering={FadeInDown.duration(400).delay(400)} style={styles.top_buttons_area} key={`time-buttons-${uniqueKey}`}>
                                <TouchableOpacity disabled={timerRunning} onPress={() => handleTimeChange('pomodoro')} style={styles.pomodoro_button}>
                                    <Text style={styles.pomodoro_button_text}>Pomodoro: {appStore.pomodoro} Dk.</Text>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={timerRunning} onPress={() => handleTimeChange('break')} style={styles.break_button}>
                                    <Text style={styles.break_button_text}>Kısa Mola: {appStore.break} Dk.</Text>
                                </TouchableOpacity>

                                <TouchableOpacity disabled={timerRunning} onPress={() => handleTimeChange('longBreak')} style={styles.long_break_button}>
                                    <Text style={styles.long_break_button_text}>Uzun Mola: {appStore.longBreak} Dk.</Text>
                                </TouchableOpacity>
                            </Animated.View>

                            {(!timerRunning) && (
                                <Animated.View entering={FadeInDown.duration(400).delay(600)} style={styles.reset_button_area} key={`reset-button-${uniqueKey}`}>
                                    <TouchableOpacity onPress={resetTime} style={styles.reset_button}>
                                        <Text style={styles.reset_button_text}>Sıfırla</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default inject("AppStore")(observer(Home));
