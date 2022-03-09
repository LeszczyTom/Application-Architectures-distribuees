import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-voice/voice';

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

    const _onSpeechStart = () => {
        console.log('onSpeechStart');
        setText('');
    };
    const _onSpeechEnd = () => {
        console.log('onSpeechEnd');
    };
    const _onSpeechResults = (event: any) => {
        console.log('onSpeechResults');
        setText(event.value[0]);
    };
    const _onSpeechError = (event: any) => {
        console.log('_onSpeechError');
        console.log(event.error);
    };

    const _onRecordVoice = () => {
        if (isRecord) {
            Voice.stop();
        } else {
            Voice.start('fr-FR');
        }
        setIsRecord(!isRecord);
    };

    React.useEffect(() => {
        Voice.onSpeechStart = _onSpeechStart;
        Voice.onSpeechEnd = _onSpeechEnd;
        Voice.onSpeechResults = _onSpeechResults;
        Voice.onSpeechError = _onSpeechError;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    return (
        <View style={styles.Content}>
            <Text style={{fontSize: 20}}> {voiceLabel} </Text>
            <View style={styles.Separator}/>
            <TouchableOpacity>
                <IconFa name={"microphone"} color="black" size={30} style={styles.Microphone} onPress={_onRecordVoice}/>
            </TouchableOpacity>
        </View>
    );
}

export default VoiceControl;
