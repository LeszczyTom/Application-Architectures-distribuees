import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    Separator: {
        flex: 1
    },
    Content: {
        height: "8%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: "white",
    },
    LikeBtn: {
        padding: 1,
        marginEnd: 25,
        marginStart: 25
    }
})

function TopBar() {
    const [like, setLike] = React.useState(false)

    return (
        <View style={styles.Content}>
            <ADIcon style={styles.LikeBtn} name={like === false ? "hearto" : "heart"} size={35} color="white" />
            <View style={styles.Separator}></View>
            <Text style={{fontSize: 22, color: "black"}}> Now Playing </Text>
            <View style={styles.Separator}></View>
            <ADIcon style={styles.LikeBtn} name={like === false ? "hearto" : "heart"} size={35} color="black" onPress={() => {like ? setLike(false) : setLike(true)}}/>
        </View>
    );
}

export default TopBar;
