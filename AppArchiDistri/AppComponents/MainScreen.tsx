import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from "./TopBar";
import SongInfos from "./SongInfos";
import PlayerControl from "./PlayerControl";
import StreamPlayer from "./StreamPlayer";

const styles = StyleSheet.create({
    Content: {
        backgroundColor: "white",
        height: "100%"
    }
})

function MainScreen(props: any) {
    return (
        <View style={styles.Content}>
            <TopBar/>
            <SongInfos/>
            <PlayerControl/>
            <StreamPlayer/>
        </View>
    );
}

export default MainScreen;
