import React from 'react'
import {SafeAreaView} from "react-native";
import Routes from "./src/routes";
import {Provider} from "mobx-react";
import Store from "./src/store";

const App = () => {

  return (
      <Provider {...Store}>
          <SafeAreaView style={{flex : 1}}>
              <Routes/>
          </SafeAreaView>
      </Provider>
  )
}

export default App;
