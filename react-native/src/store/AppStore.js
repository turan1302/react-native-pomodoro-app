import {action, makeAutoObservable} from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AppStore {

    appStore = {
        onBoard: true,
        selectedTime: "pomodoro",
        pomodoro: 25,
        break: 5,
        longBreak: 20,
        settings: {
            selectedColor: "#5b9688",
            notifySound: "bell.mp3",
            awake: true,

            goalPomodoro: 4,
            pomodoroCount: 0,
            breakStatus: false,
            pomodoroStatus: false,
        }
    }

    asyncKey = "appStore";

    constructor() {
        makeAutoObservable(this, {
            appStore: true,
            getDatas: action,
            changeSelectedTime: action,
            changeOnBoard: action,
            changePomodoro: action,
            changeBreak: action,
            changeLongBreak: action,

            changeColor: action,
            changeSound: action,
            changeAwake: action,

            changeGoalPomodoro: action,
            pomodoroCountUpdate: action,

            resetStore: action,

            updateAppStore: action,
        });

        this.getDatas();
    }

    getDatas = async () => {
        try {
            const appStateData = await AsyncStorage.getItem(this.asyncKey);

            if (appStateData) {
                const parsedData = JSON.parse(appStateData);
                this.updateAppStore(parsedData);
            } else {
                this.updateAppStore(this.appStore);
            }
        } catch (e) {
            console.log("Error retrieving data:", e);
        }
    }

    changeSelectedTime = async (selectedTime) => {
        try {
            this.appStore.selectedTime = selectedTime;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changeOnBoard = async (onBoard) => {
        try {
            this.appStore.onBoard = onBoard;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changePomodoro = async (pomodoro) => {
        try {
            this.appStore.pomodoro = pomodoro;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changeBreak = async (breakTime) => {
        try {
            this.appStore.break = breakTime;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changeLongBreak = async (longBreak) => {
        try {
            this.appStore.longBreak = longBreak;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }


    // settings kısımları
    changeColor = async (color) => {
        try {
            this.appStore.settings.selectedColor = color;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changeSound = async (sound) => {
        try {
            this.appStore.settings.notifySound = sound;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changeAwake = async (data) => {
        try {
            this.appStore.settings.awake = data;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    changeGoalPomodoro = async (data) => {
        try {
            this.appStore.settings.goalPomodoro = data;
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));
            this.getDatas();
        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    pomodoroCountUpdate = async (key) => {
        try {
            // Durumu ayarlayın
            if (key === "pomodoro") {
                this.appStore.settings.pomodoroStatus = true;
            } else if (key === "break") {
                this.appStore.settings.breakStatus = true;
            }

            console.log("Before check - Pomodoro Status: ", this.appStore.settings.pomodoroStatus);
            console.log("Before check - Break Status: ", this.appStore.settings.breakStatus);

            if (this.appStore.settings.pomodoroStatus && this.appStore.settings.breakStatus) {
                console.log("Both statuses are true. Increasing pomodoro count...");
                this.appStore.settings.pomodoroCount += 1;

                console.log("Resetting statuses...");
                this.appStore.settings.pomodoroStatus = false;
                this.appStore.settings.breakStatus = false;
            }

            console.log("After reset - Pomodoro Status: ", this.appStore.settings.pomodoroStatus);
            console.log("After reset - Break Status: ", this.appStore.settings.breakStatus);

            console.log("Saving appStore to AsyncStorage...");
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));

            console.log("Calling getDatas...");
            this.getDatas();

        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    resetPomodoroCount = async () => {
        try {
            this.appStore.settings.pomodoroCount = 0;

            this.appStore.settings.pomodoroStatus = false;
            this.appStore.settings.breakStatus = false;

            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(this.appStore));

            this.getDatas();

        } catch (e) {
            console.log("Error saving token:", e);
        }
    }

    resetStore = async ()=>{
        try{
            let newAppStore = {
                onBoard: true,
                selectedTime: "pomodoro",
                pomodoro: 25,
                break: 5,
                longBreak: 20,
                settings: {
                    selectedColor: "#5b9688",
                    notifySound: "bell.mp3",
                    awake: true,

                    goalPomodoro: 4,
                    pomodoroCount: 0,
                    breakStatus: false,
                    pomodoroStatus: false,
                }
            }

            await AsyncStorage.removeItem(this.asyncKey);
            await AsyncStorage.setItem(this.asyncKey, JSON.stringify(newAppStore));
        }catch (e) {
            console.log("Error saving token:", e);
        }
    }

    updateAppStore = (newState) => {
        this.appStore = {...this.appStore, ...newState};
    }
}

export default new AppStore();
