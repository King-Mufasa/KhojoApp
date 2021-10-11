import React, { useState } from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../module/IntroSlider/src/themes';
import Colors from '../../styles/color'

const ToggleCart = (props) => {
    const [toggle, setToggle] = useState(props.toggle)
    return (
        <TouchableHighlight
            style={[styles.contianer, props.style, {backgroundColor: toggle?Colors.danger:Colors.primary}]}
            onPress={()=>{props.click(),setToggle(!toggle)}}
            underlayColor={Colors.lightblue}>
            <Icon name={toggle?"minus":"cart-plus"} size={20} color={Colors.white}/>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    contianer: {
        padding: 5,
        borderRadius:200,
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    icon: {
        color:Colors.white
    }
})

export default ToggleCart