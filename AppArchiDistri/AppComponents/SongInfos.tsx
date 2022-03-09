import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
    Content: {
        height: "70%",
        alignItems: "center",
        backgroundColor: "white",
    },
    Separator: {
        flex: 1
    },
    Image: {
        marginTop: "5%",
        borderRadius: 1000,
        height: "70%",
        resizeMode: "contain",
        width: "85%",
    },
    Title: {
        marginTop: 8,
        fontSize: 30,
        color: "black"
    },
    Artist: {
        fontSize: 22,
        color: "black",
        marginTop: 1
    }
})


function SongInfos() {
    return (
        <View style={styles.Content}>
            <Image
                style={styles.Image}
                source={require('../android/app/src/main/assets/Imgs/the-fratellis-chelsea-dagger-460x460.jpg')}
            />
            <Text style={styles.Title}>Chelsea Dagger</Text>
            <Text style={styles.Artist}>The Fratellis - Costello Music</Text>
        </View>
    );
}

export default SongInfos;
