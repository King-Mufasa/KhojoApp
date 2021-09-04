import React,{useEffect} from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/color';

const HomeButton = (props) => {
    return (
        <TouchableHighlight style={{marginStart:20, alignSelf:'center'}}  underlayColor={Colors.white} onPress={()=>{props.click.navigate('HomeScreen')}}>
            <Icon name='home' color={Colors.lightdark} size={25}/>
        </TouchableHighlight>
    )
}

export default HomeButton