import React from 'react'
import {Text, TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {inject, observer} from "mobx-react";
import * as NavigationService from "../../../../NavigationService";
import styles from "./styles";

const HowUsage = (props) => {
  return (
      <TouchableOpacity onPress={()=>{
          props.AppStore.resetStore();
          NavigationService.reset();
      }} style={styles.button}>
          <FontAwesome name={"question"} color={"#fff"} size={25}/>
          <Text style={styles.button_text}>NASIL KULLANILIR</Text>
      </TouchableOpacity>
  )
}

export default inject("AppStore")(observer(HowUsage));
