import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';
import { SvgCss } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';

const styles = StyleSheet.create({
    Content: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    Separator: {
        flex: 1
    },
    Microphone: {
        width: 65,
        height: 65,
        borderRadius: 100,
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 3,
        borderColor: "black",
        marginBottom: 20
    }
})

function VoiceControl() {
    const [isRecord, setIsRecord] = React.useState<boolean>(false);
    const [text, setText] = React.useState<string>('');
    const voiceLabel = text
        ? text
        : isRecord
            ? 'Dites quelque chose ...'
            : '';

    const _onRecordVoice = () => {
        if (isRecord) {
            Voice.stop();
        } else {
            Voice.start('fr-FR');
        }
        setIsRecord(!isRecord);
    };

    React.useEffect(() => {
        Voice.onSpeechStart = () => setText('')
        Voice.onSpeechEnd = () => setTimeout(() => {setIsRecord(false)
            offset.value = 1
            opacity.value = 1}, 200)
        Voice.onSpeechResults = (event: any) => setText(event.value[0])
        Voice.onSpeechError = (event: any) => {
            console.log(event.error)
            setIsRecord(false)
            offset.value = 1
            opacity.value = 1
        }

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const buttonPressed = () => {
        _onRecordVoice()
        offset.value = 1.2
        opacity.value = 0
    }
    const offset = useSharedValue(1);
    const opacity = useSharedValue(1);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(offset.value, {
                        duration: 250,
                        easing: Easing.linear}),
                }
            ],
            opacity: withTiming(opacity.value, {
                duration: 500,
                easing: Easing.linear}),
        };
    });


    const xml = `
        <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" stroke-width="1" stroke="black"/>
        </svg>
    `;

    return (
        <View style={styles.Content}>


            <Text style={{fontSize: 20}}> {voiceLabel} </Text>
            <View style={styles.Separator}/>
            <Animated.View style={[animatedStyles]}>
                <TouchableOpacity>
                    <IconFa name={"microphone"} color="black" size={30} style={styles.Microphone} onPress={buttonPressed}/>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default VoiceControl;
