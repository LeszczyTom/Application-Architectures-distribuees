import React from 'react';
import { View, StyleSheet, Text, ToastAndroid, Button } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import Slider from '@react-native-community/slider'

function MusicPlayer() {
    const [currentTime, setCurrentTime] = React.useState(0)
    const [playing, setPlaying] = React.useState(false)
    const [duration, setDuration] = React.useState(0)
    const styles = StyleSheet.create({
        Container: {
            flexDirection: "column",
            marginTop: "5%"
        },
        Slider: {
            flex: 1,
        },
        CurrenTime: {
            marginStart: "3%",
            color: "#A7A1F8",
            fontSize: 12
        },
        Duration: {
            marginEnd: "3%",
            color: "#A7A1F8",
            fontSize: 12
        },
        Timer: {
            flexDirection: "row",
            marginBottom: "5%"
        }
    })

    const getInfo = async () => {
        try {
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            setDuration(info.duration)
            setCurrentTime(info.currentTime)
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }

    const playSound = () => {
        try {
            SoundPlayer.playUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
            ToastAndroid.show("Lecture", ToastAndroid.SHORT);
            setPlaying(true)
        }catch (Exception) {
            console.log(Exception)
            setPlaying(false)
        }
    }

    const stopSound = () => {
        try {
            SoundPlayer.stop()
            setPlaying(false)
            setCurrentTime(0)
        }catch (Exception) {
            console.log(Exception)
            setPlaying(false)
        }
    }

    const resumeSound = () => {
        try {
            SoundPlayer.resume()
            setPlaying(true)
        }catch (Exception) {
            console.log(Exception)
            setPlaying(false)
        }
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

            <Button title={"Jouer son"} onPress={() => playSound()}/>
            <Button title={"Resume"} onPress={() => resumeSound()}/>
            <Button title={"Pause"} onPress={() => pauseSound()}/>
            <Button title={"Stop"} onPress={() => stopSound()}/>
        </View>
    );
}

export default MusicPlayer;
