import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

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
    Video: {
        height: 0,
        width: 0
    }
})

function StreamPlayer(props: any) {
    const [playing, setPlaying] = React.useState(false)

    return (
        <Video source={{uri: "http://mscp2.live-streams.nl:8270/vosfm.mp3"}}
               style={styles.Video}
               playInBackground={true}
               paused={!playing}
               onEnd={() => setPlaying(false)}
        />
    );
}

export default StreamPlayer;
