import React from 'react';
import { View, StyleSheet, ToastAndroid, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

function NavBar(props: any) {

    const styles = StyleSheet.create({
        NavBar: {
            width: "100%",
            height: "5%",
            marginTop: 5,
            flexDirection: "row"
        },
        Retour: {
            marginStart: 10
        },
        Menu: {
            marginEnd: 10
        },
        Texte: {
            textAlign: "center",
            fontSize: 15,
            color: "#C2C2FF",
            textAlignVertical: "center",
            flex: 1
        }
    });

    const showToast = () => {
        ToastAndroid.show("Ouverture du menu", ToastAndroid.SHORT);
    };

    return (
        <View style={styles.NavBar}>
            <Icon style={styles.Retour} name="west" size={35} color="#C2C2FF" onPress={() => props.setViewVisible(0)}/>
            <Text style={styles.Texte}> Chill evening playlist </Text>
            <Icon style={styles.Menu} name="menu" size={35} color="#C2C2FF" onPress={() => showToast()}/>
        </View>
    );
}

export default NavBar;
