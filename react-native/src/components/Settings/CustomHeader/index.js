import React from 'react'
import {TouchableOpacity, View} from "react-native";
import styles from "./styles";

import * as NavigationService from "../../../NavigationService";
import Entypo from "react-native-vector-icons/Entypo";

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>NavigationService.back()}>
        <Entypo name={"chevron-small-left"} size={25} color={"#fff"}/>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader
