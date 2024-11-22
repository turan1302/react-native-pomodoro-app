import React from 'react'
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as NavigationService from "../../../NavigationService";

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>NavigationService.navigate("Settings")}>
        <Ionicons name={"list"} size={25} color={"#fff"}/>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader
