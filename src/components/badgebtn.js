import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Color from '../styles/color'
import Fontsize from '../styles/fontsize';

const BadgeButton = (props) => {
    return (
        <TouchableHighlight
            style={[styles.button,props.style]}
            onPress={(props.click)}
            underlayColor={Color.white}>
            <Text style={[styles.submitText,Fontsize.mini]}>{props.name}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        backgroundColor:"transparent"
    },
    submitText: {
        padding:3,
        color:Color.primary,
        textAlign: 'center',
        backgroundColor: Color.lightblue,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
})


export default BadgeButton;