import React from 'react';
import { View, StyleSheet, Image, Text, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MusicPlayer from "./MusicPlayer";

function ContenuPrincipal() {
    const [like, setLike] = React.useState(false);
    const styles = StyleSheet.create({
        container: {
            height: "95%",
        },
        Image: {
            width: "100%",
            height: "100%",
            resizeMode:"contain",
            position: 'absolute',
            top:0,
            borderRadius: 8
        },
        Premier: {
            marginEnd: "3%",
            marginStart: "3%",
            marginTop: "8%",
            height: "55%",
        },
        Second: {
            marginTop: "5%",
            width: "100%",
            height: "35%",
        },
        Artiste: {
            fontSize: 14,
            color: "#A7A1F8",
            marginStart: 5,
            fontWeight: "300",
            letterSpacing: 1
        },
        Titre: {
            fontSize: 25,
            color: "white",
            marginStart: 0,
            paddingStart: 2,
        },
        Troisieme: {
            flexDirection: "row",
            alignItems: "center",
            marginStart: "1%",
        },
        Separator: {
            flex: 1
        },
        BoutonLike: {
            marginEnd: "3%",
            paddingEnd: 2,
        }
    });

    const likeFun = () => {
        if(like) {
            setLike(false)
            ToastAndroid.show("Vous n'aimez plus", ToastAndroid.SHORT);
        }
        else {
            setLike(true)
            ToastAndroid.show("Vous aimez", ToastAndroid.SHORT);
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.Premier}>
                <Image
                    style={styles.Image}
                    source={require('../android/app/src/main/assets/Imgs/the-fratellis-chelsea-dagger-460x460.jpg')}
                />
            </View>
            <View style={styles.Second}>
                <View style={styles.Troisieme}>
                    <View>
                        <Text style={styles.Titre}> Chelsea Dagger </Text>
                        <Text style={styles.Artiste}> The Fratellis </Text>
                    </View>
                    <View style={styles.Separator}/>
                    <Icon style={styles.BoutonLike} name={like === false ? "hearto" : "heart"} size={25} color="#8a6ffe" onPress={() => likeFun()}/>
                </View>
                <MusicPlayer />
            </View>
        </View>
    );
}

export default ContenuPrincipal;
