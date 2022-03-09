import React from 'react';
import { StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import ManualControl from "./ManualControl";
import VoiceControl from "./VoiceControl";

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
})

function PlayerControl() {
    const [view, setView] = React.useState(false)

    return (
        <GestureRecognizer style={styles.Content}
            onSwipeLeft={() => view ? setView(false) : setView(true)}
            onSwipeRight={() => view ? setView(false) : setView(true)}>
            {view ? <ManualControl/> : <VoiceControl/>}
        </GestureRecognizer>
    );
}

export default PlayerControl;
