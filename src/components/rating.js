import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from "../styles/color"
import Fontsize from '../styles/fontsize';



class Rating extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={[Fontsize.mini,{color:Color.white}]}>{this.props.rating}</Text>
                <Icon name="star" size={10} style={{ color: Color.white, marginStart:5 }} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
         backgroundColor: Color.success, 
         borderRadius: 5, 
         paddingHorizontal: 8, 
         flexDirection:'row',
         alignSelf:'baseline',
         alignItems:'center'
        }
})

export default Rating