import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container : {marginTop: 15},
    title : {fontWeight: "bold", color: "#fff", fontSize: 15, textAlign: "center"},

    colors_area : {
        marginTop: 10,
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 5,
        justifyContent: "space-around",
        overflow : "hidden"
    },
    color_button : (item,position)=>({
        backgroundColor: item.color,
        padding: 25,
        marginHorizontal: 11.2,
        marginVertical: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignSelf: "center",
        width : (position==="PORTRAIT") ? "10%" : "15%",
    }),
    color_button_check : (color,item,position)=>({display : (color===item.color) ? "flex" : "none",overflow : "visible",position : "absolute",right : (position==="PORTRAIT") ? 15 : 42,zIndex : 1})
});

export default styles;
