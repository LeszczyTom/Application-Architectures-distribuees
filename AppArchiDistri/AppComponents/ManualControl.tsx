import React from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import IconEn from 'react-native-vector-icons/Entypo';
import IconIo from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    Separator: {
        flex: 1
    },
    Buttons: {
        flexDirection: "row",
        marginTop: "10%",
    },
    Shuffle: {
        marginStart: 40,
        height: 65,
        textAlignVertical: "center"
    },
    Repeat: {
        marginEnd: 40,
        height: 65,
        textAlignVertical: "center"
    },
    Play: {
        width: 65,
        height: 65,
        borderRadius: 100,
        textAlign: "center",
        paddingStart: 3,
        textAlignVertical: "center",
        borderWidth: 3,
        borderColor: "#060515"
    },
    Pause: {
        width: 65,
        height: 65,
        borderRadius: 100,
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 3,
        borderColor: "#060515"
    },
    SkipBack: {
        height: 65,
        textAlignVertical: "center",
        paddingStart: 15
    },
    SkipForward: {
        height: 65,
        textAlignVertical: "center",
        paddingEnd: 15
    },
    PlayRound: {
        borderRadius: 100,
        padding: 1,
        marginEnd: 1
    }
})

function ManualControl() {
    const [playing, setPlaying] = React.useState(false)
    const [shuffle, setShuffle] = React.useState(false)
    const [repeat, setRepeat] = React.useState(false)

    return (
        <View style={styles.Content}>
            <View style={styles.Buttons}>
                <TouchableOpacity>
                    <IconEn name={"shuffle"} color={shuffle ? "grey" : "black"} size={30} style={styles.Shuffle} onPress={() => shuffle ? setShuffle(false) : setShuffle(true)}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity>
                    <IconIo name={"play-skip-back"} color="black" size={30} style={styles.SkipBack} onPress={() => ToastAndroid.show("precedent", ToastAndroid.SHORT)}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity onPress={() => playing ? setPlaying(false) : setPlaying(true)}>
                    <IconFa name={playing === true ? "pause" : "play"} color="black" size={30} style={playing === true ? styles.Pause : styles.Play}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity>
                    <IconIo name={"play-skip-forward"} color="black" size={30} style={styles.SkipForward} onPress={() => ToastAndroid.show("suivant", ToastAndroid.SHORT)}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity>
                    <IconFe name={"repeat"} color={repeat ? "grey" : "black"} size={30} style={styles.Repeat} onPress={() => repeat ? setRepeat(false) : setRepeat(true)}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ManualControl;
