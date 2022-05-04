/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Button
} from 'react-native';

import Voix from "./Components/Voix";
import Manuel from "./Components/Manuel";
import MainScreen from "./AppComponents/MainScreen";

const App = () => {

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#272A56",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      color: "red",
      width: "50%",
    },
    separator: {
      marginVertical: 20,
      borderBottomWidth: 0,
    }
  });

  const [viewVisible, setViewVisible] = React.useState(0);

  const Menu = () => {
    return (
        <View style={styles.container}>
          <View style={styles.button}>
            <Button title={"Voix"} onPress={() => setViewVisible(1)}/>
            <View style={styles.separator} />
            <Button title={"Manuel"} onPress={() => setViewVisible(2)}/>
            <View style={styles.separator} />
            <Button title={"Final"} onPress={() => setViewVisible(3)}/>
          </View>
        </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} hidden={false} />
      {viewVisible === 0 ? <Menu /> : <></>}
      {viewVisible === 1 ? <Voix setViewVisible={setViewVisible}/> : <></>}
      {viewVisible === 2 ? <Manuel setViewVisible={setViewVisible}/> : <></>}
      {viewVisible === 3 ? <MainScreen setViewVisible={setViewVisible}/> : <></>}
    </SafeAreaView>
  );
};

export default App;
