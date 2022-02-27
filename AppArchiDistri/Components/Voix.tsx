import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavBar from "./NavBar";
import ContenuPrincipal from "./ContenuPrincipal";

function Voix(props: any) {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#272A56",
            height: "100%"
        }
    });

    return (
        <View style={styles.container}>
            <NavBar setViewVisible={props.setViewVisible}/>
            <ContenuPrincipal/>
        </View>
    );
}

export default Voix;
