import React from 'react';
import Video from 'react-native-video';
import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Slider from '@react-native-community/slider'
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import IconEn from 'react-native-vector-icons/Entypo';
import IconIo from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

function VlcPlayer() {

    const styles = StyleSheet.create({
        audio: {
            width: 0,
            height: 0
        },
        Container: {
            flexDirection: "column",
            marginTop: "8%",
        },
        Slider: {
            flex: 1,
        },
        CurrenTime: {
            marginStart: "4%",
            color: "#A7A1F8",
            fontSize: 12
        },
        Duration: {
            marginEnd: "4%",
            color: "#A7A1F8",
            fontSize: 12
        },
        Timer: {
            flexDirection: "row",
        },
        Buttons: {
            flexDirection: "row",
            marginTop: "10%",
        },
        Separator: {
            flex: 1
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
    });

    const [playing, setPlaying] = React.useState(false)
    const [shuffle, setShuffle] = React.useState(false)
    const [repeat, setRepeat] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)

    let videoRef: any

    const makeToast = (msg: string) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    const playResumeSound = () => {
        playing ? setPlaying(false) : setPlaying(true)
    }

    const toMinuteAndSecond = (d: any) => {
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
        if(s < 10) return m + ":0" + s
        return m + ":" + s
    }

    const onLoad = (soundInfos: any) => {
        setDuration(soundInfos.duration)
        setCurrentTime(soundInfos.currentTime)
    }

    const onProgress = (timeInfo: any) => {
        setCurrentTime(timeInfo.currentTime)
    }
//https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
    return (
        <View style={styles.Container}>
            <Video source={{uri: "http://localhost:8080"}}
                   style={styles.audio}
                   playInBackground={true}
                   paused={!playing}
                   repeat={repeat}
                   ref={ref => (videoRef = ref)}
                   onProgress={timeInfo => onProgress(timeInfo)}
                   onLoad={soundInfos => onLoad(soundInfos)}
                   onSeek={obj => setCurrentTime(obj.currentTime)}
                   onEnd={() => setPlaying(false)}
            />

            <View style={styles.Timer}>
                <Text style={styles.CurrenTime}>{toMinuteAndSecond(currentTime)}</Text>
                <Slider
                    style={styles.Slider}
                    thumbTintColor={"white"}
                    maximumTrackTintColor={"black"}
                    minimumTrackTintColor={"#a64cfe"}
                    value={currentTime}
                    maximumValue={duration}
                    onValueChange={(sec) => videoRef.seek(sec, 50)}
                    step={0.5}
                />
                <Text style={styles.Duration}>{toMinuteAndSecond(duration)}</Text>
            </View>

            <View style={styles.Buttons}>
                <TouchableOpacity>
                    <IconEn name={"shuffle"} color={shuffle ? "#a64cfe" : "#C2C2FF"} size={30} style={styles.Shuffle} onPress={() => shuffle ? setShuffle(false) : setShuffle(true)}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity>
                    <IconIo name={"play-skip-back"} color="#C2C2FF" size={30} style={styles.SkipBack} onPress={() => makeToast("precedent")}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity onPress={() => playResumeSound()}>
                    <LinearGradient colors={['#a244ff', '#bb7afb']} style={styles.PlayRound}>
                        <IconFa name={playing === true ? "pause" : "play"} color="#C2C2FF" size={30} style={playing === true ? styles.Pause : styles.Play}/>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity>
                    <IconIo name={"play-skip-forward"} color="#C2C2FF" size={30} style={styles.SkipForward} onPress={() => makeToast("suivant")}/>
                </TouchableOpacity>
                <View style={styles.Separator}/>
                <TouchableOpacity>
                    <IconFe name={"repeat"} color={repeat ? "#a64cfe" : "#C2C2FF"} size={30} style={styles.Repeat} onPress={() => repeat ? setRepeat(false) : setRepeat(true)}/>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default VlcPlayer;
