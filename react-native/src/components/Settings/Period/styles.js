import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop : 10,
    },
    title : {fontWeight: "bold", color: "#fff", fontSize: 15},

    buttons_area : {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    first_button : {flex: 1, backgroundColor: "rgba(128, 128, 128, 0.3)", padding: 15,alignItems : "center",borderRadius : 5},
    second_button : {flex: 1, backgroundColor: "rgba(128, 128, 128, 0.3)", padding: 15,marginHorizontal : 15,borderRadius : 5},
    third_button : {flex: 1, backgroundColor: "rgba(128, 128, 128, 0.3)", padding: 15,borderRadius : 5},

    button_first_text : {fontWeight : "400",color : "#fff",fontSize : 25,textAlign : "center"},
    button_second_text : {textAlign : "center",fontWeight : "bold",color : "#fff"},


    modalContent : (position)=>({
        flex: (position==="LANDSCAPE") ? 1 : 0.5,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    }),
    closeButton: {
        position: "absolute",
        top: 0,
        right: 3,
    },

    modal_container : {
        marginTop : 20
    },
    modal_title : {fontWeight : "bold",color : "#000",fontSize : 15},
    modal_content : {marginTop : 20},

    time_buttons_area : {flexDirection : "row",justifyContent : "center",alignItems : "center"},
    time_button_design : {backgroundColor : "#ccc",padding : 10,borderRadius : 10},
    time_title : {marginHorizontal : 20,fontWeight : "bold"},

    tab_buttons_area : {marginTop : 50,flexDirection : "row",alignItems : "center",paddingHorizontal : 20},
    reset_button : {
        backgroundColor: "#ccc",
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    reset_button_text : { fontWeight: "bold", color: "#2f2f2f" },
    change_button : {
        backgroundColor: "#ccc",
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        marginLeft: 10,
    },
    change_button_text : { fontWeight: "bold", color: "#2f2f2f" }
});

export default styles;
