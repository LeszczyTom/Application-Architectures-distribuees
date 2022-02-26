import React from 'react';
import { View, Button } from 'react-native';

function NavBar(props: any) {
    return (
        <View>
            <Button title={"ee"} onPress={() => props.setViewVisible(0)}/>
        </View>
    );
}

export default NavBar;
