import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: (color) => ({
        flex: 1,
        padding: 15,
        backgroundColor: color,
    }),
    page_area: {alignItems: "center", marginTop: 70},

    time_type: {
        color: "#000",
        fontWeight: "bold",
        fontSize : 20,
        textAlign : "center"
    },

    pomodoro_count : {
        color: "#000",
        fontWeight: "bold",
        fontSize : 20,
        marginBottom : 20,
        textAlign : "center"
    },

    progress_value_style: {fontWeight: '100', color: 'white'},

    quote_design : {marginTop : 22,fontWeight : "bold",fontSize : 20,textAlign : "center"},

    top_buttons_area: {marginTop: 50, flexDirection: "row", justifyContent: "center"},

    pomodoro_button: {backgroundColor: "#ccc", padding: 10, flex: 1, borderRadius: 5},
    pomodoro_button_text: {fontSize: 15, fontWeight: "bold", textAlign: "center"},

    break_button: {backgroundColor: "#ccc", padding: 10, marginHorizontal: 10, flex: 1, borderRadius: 5},
    break_button_text: {fontSize: 15, fontWeight: "bold", textAlign: "center"},

    long_break_button: {backgroundColor: "#ccc", padding: 10, flex: 1, borderRadius: 5},
    long_break_button_text: {fontSize: 15, fontWeight: "bold", textAlign: "center"},

    reset_button_area: {marginVertical: 30, flexDirection: "row"},
    reset_button: {backgroundColor: "#ccc", padding: 10, alignSelf: "center", borderRadius: 5},
    reset_button_text: {fontSize: 15, fontWeight: "bold", textAlign: "center"}
});

export default styles;
