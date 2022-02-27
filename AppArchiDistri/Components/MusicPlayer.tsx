import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import Slider from '@react-native-community/slider'
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import IconEn from 'react-native-vector-icons/Entypo';
import IconIo from 'react-native-vector-icons/Ionicons';

import LinearGradient from 'react-native-linear-gradient';

function MusicPlayer() {
    const [currentTime, setCurrentTime] = React.useState(0)
    const [playing, setPlaying] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [duration, setDuration] = React.useState(0)
    const [shuffle, setShuffle] = React.useState(false)
    const [repeat, setRepeat] = React.useState(false)

    const styles = StyleSheet.create({
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
    })

    const makeToast = (msg: string) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    const getInfo = async () => {
        try {
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            setDuration(info.duration)
            setCurrentTime(info.currentTime)
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }

    const loadURL = () => {
        try {
            SoundPlayer.loadUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
            setLoaded(true)
        }catch (Exception) {
            console.log(Exception)
            setLoaded(false)
        }
    }

    const playResumeSound = () => {
        if(!loaded) loadURL()
        if(playing) pauseSound()
        else playSound()
    }

    const playSound = () => {
        try {
            SoundPlayer.resume()
            setPlaying(true)
        }catch (Exception) {
            console.log(Exception)
            setPlaying(false)
        }
    }

    const shuffleButton = () => {
        if(shuffle) setShuffle(false)
        else setShuffle(true)
        makeToast("shuffle")
    }

    const repeatButton = () => {
        if(repeat) setRepeat(false)
        else setRepeat(true)
        makeToast("repeat")
    }

    const pauseSound = () => {
        try {
            SoundPlayer.pause()
            setPlaying(false)
        }catch (Exception) {
            console.log(Exception)
            setPlaying(false)
        }
    }

    const toMinuteAndSecond = (d: any) => {
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
        if(s < 10) return m + ":0" + s
        return m + ":" + s
    }

    const onTimeChange = (sec: number) => {
        setCurrentTime(sec)
        try {
            SoundPlayer.seek(sec)
        }catch (Exception) {
            console.log(Exception)
            setPlaying(false)
        }
    }


    React.useEffect(() => {
        if(!loaded) loadURL()
        let interval: any;
        if(playing) interval = setInterval(() => getInfo(), 500)
        return () => {
            clearInterval(interval)
        };
    })

    return (
        <View style={styles.Container}>
            <View style={styles.Timer}>
                <Text style={styles.CurrenTime}>{toMinuteAndSecond(currentTime)}</Text>
                <Slider
                    style={styles.Slider}
                    thumbTintColor={"white"}
                    maximumTrackTintColor={"black"}
                    minimumTrackTintColor={"#a64cfe"}
                    value={currentTime}
                    maximumValue={duration}
                    onValueChange={(sec) => onTimeChange(sec)}
                    step={0.5}
                />
                <Text style={styles.Duration}>{toMinuteAndSecond(duration)}</Text>
            </View>
            <View style={styles.Buttons}>
                <TouchableOpacity>
                    <IconEn name={"shuffle"} color={shuffle ? "#a64cfe" : "#C2C2FF"} size={30} style={styles.Shuffle} onPress={() => shuffleButton()}/>
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
                    <IconFe name={"repeat"} color={repeat ? "#a64cfe" : "#C2C2FF"} size={30} style={styles.Repeat} onPress={() => repeatButton()}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MusicPlayer;
