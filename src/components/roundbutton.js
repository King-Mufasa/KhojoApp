import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Color from '../styles/color'
import Fontsize from '../styles/fontsize';

const RoundButton = (props) => {
    return (
        <TouchableHighlight
            style={[styles.button,props.style]}
            onPress={(props.click)}
            underlayColor={Color.white}>
            <Text style={[styles.submitText,Fontsize.small]}>{props.name}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        
    },
    submitText: {
        fontSize:20,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        textAlign: 'center',
        backgroundColor: Color.primary,
        borderRadius:200,
        paddingHorizontal:20,
        paddingVertical:10,
        borderWidth: 1,
        borderColor: '#fff'
    }
})


export default RoundButton;