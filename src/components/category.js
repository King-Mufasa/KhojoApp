import React from 'react'
import { TouchableHighlight, StyleSheet, Text, Image,View } from 'react-native'
import { screenWidth } from '../module/IntroSlider/src/themes'
import Colors from '../styles/color'
import Fontsize from '../styles/fontsize'

const Category = (props) => {
    return (
        <TouchableHighlight onPress={props.click} underlayColor={Colors.primaryBack} style={{alignContent:'center',alignItems:'center'}}>
            <View style={[styles.container,props.style]}>
                <Image source={props.icon} style={styles.icon} />
                <View style={{alignSelf:'center',justifyContent:'space-between'}}>
                    <Text style={[Fontsize.small, styles.name]}>{props.name}</Text>
                    <Text style={[styles.desc,{display:props.desc?'flex':'none'}]}>{props.desc}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    container: {
        width:screenWidth*0.5,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    name: {
        fontWeight: 'bold',
        alignSelf:'center',
    },
    desc: {
        color: Colors.lightdark
    },
    icon: {
        resizeMode:'contain',
        alignSelf: 'center',
        margin: 10,
        width: screenWidth * 0.07,
        height: screenWidth * 0.07,
    }
})

export default Category