import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    button : {
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    button_first_text : {fontWeight: "400", color: "#fff", fontSize: 25},
    button_second_text : {marginTop: 5, color: "#fff", fontSize: 15, fontWeight: "400"},


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

    qty_buttons_area : {flexDirection: "row", justifyContent: "center", alignItems: "center"},
    qty_buttons_design : {backgroundColor: "#ccc", padding: 10, borderRadius: 10},
    qty_text : {marginHorizontal: 20, fontWeight: "bold"},

    check_button_area : {marginTop: 50, flexDirection: "row", alignItems: "center", paddingHorizontal: 20},
    check_button_design : {
        backgroundColor: "#ccc",
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        marginLeft: 10,
    },
    check_button_text : {fontWeight: "bold", color: "#2f2f2f"}
});

export default styles;
