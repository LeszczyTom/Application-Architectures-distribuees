import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const Menu = () => {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title={"Voix"}/>
                <View style={styles.separator} />
                <Button title={"Manuel"}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    },
});

export default Menu;