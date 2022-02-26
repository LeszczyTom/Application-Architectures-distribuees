import React from 'react';
import { View } from 'react-native';
import NavBar from "./NavBar";
function Voix(props: any) {
    return (
        <View>
            <NavBar setViewVisible={props.setViewVisible}/>
        </View>
    );
}

export default Voix;
