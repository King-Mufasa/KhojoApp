import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from "../styles/color"
import Fontsize from '../styles/fontsize';



class Rating extends React.Component {

    render() {
        return (
            <View style={[ styles.container]}>
                <Text style={[Fontsize.small, { color: Color.white }, styles.rating]}>{this.props.rating}</Text>
                <Icon name="star" size={10} style={{ color: Color.white, marginStart: 5 }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingTop:0,
        paddingHorizontal:8,
        backgroundColor: Color.success,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems:'center',
        alignSelf:'baseline'
    },
    rating: {
    }
})

export default Rating