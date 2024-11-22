import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container : { marginTop: 15 },
    container_title : { fontWeight: "bold", color: "#fff", fontSize: 15, textAlign: "center" },

    buttons_area : {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    no_sound_button : {
        flex: 1,
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        padding: 15,
        alignItems: "center",
        borderRadius: 5
    },
    no_sound_button_text : { fontWeight: "bold", color: "white" },

    sound_buttons_area : (index)=>({
        flex: 1,
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        padding: 15,
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: (index === 0) ? 10 : null
    }),
    sound_buttons_text : { fontWeight: "bold", color: "white" }
});

export default styles;
