import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container : (color)=>({
        flex : 1,
        padding : 15,
        backgroundColor : color,
    }),

    other_settings_area : {marginTop : 10},
    other_settings_title : { fontWeight: "bold", color: "#fff", fontSize: 15, textAlign: "center"}
});

export default styles;
