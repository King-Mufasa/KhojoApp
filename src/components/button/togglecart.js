import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'

const ToggleCart = (props) => {
    return (
        <TouchableHighlight
            style={[styles.contianer, props.style]}
            onPress={(props.click)}
            underlayColor={Colors.lightblue}>
            <Icon name="cart-plus" size={25} color={Colors.white}/>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    contianer: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius:200,
        alignSelf:'baseline'
    },
    icon: {
        color:Colors.white
    }
})

export default ToggleCart