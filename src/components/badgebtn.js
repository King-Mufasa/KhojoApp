import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import { useGlobalState } from '../store/state';
import Colors from '../styles/color';
import Color from '../styles/color'
import Fontsize from '../styles/fontsize';

const BadgeButton = (props) => {
    const doctormode = useGlobalState('doctormode')
    return (
        <TouchableHighlight
            style={[styles.button, props.style,]}
            onPress={(props.click)}
            underlayColor={props.underlayColor?props.underlayColor:Color.primaryBack}>
            <Text style={[styles.submitText, Fontsize.mini,
            {
                color: doctormode ? Color.doctor_primary : Color.primary,
                backgroundColor: props.type == "success" ?
                    Colors.success : props.type == "danger" ?
                        Color.danger : Color.lightblue
            }]}>{props.name}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        backgroundColor: "transparent"
    },
    submitText: {
        padding: 3,

        textAlign: 'center',
        backgroundColor: Color.lightblue,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    }
})


export default BadgeButton;