import React from 'react';
import NavBar from "./NavBar";
import { View, StyleSheet } from 'react-native';
import Principal from "./Principal";

function Manuel(props: any) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#272A56",
            height: "100%"
        }
    });

    return (
        <View style={styles.container}>
            <NavBar setViewVisible={props.setViewVisible}/>
            <Principal/>
        </View>
    );
}

export default Manuel;
