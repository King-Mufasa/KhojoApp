import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from "../styles/color"
import Fontsize from '../styles/fontsize';



class Rating extends React.Component {
    // state = {
    //     backgroud: Color.success
    // }
    // constructor(){
    //     if(this.props.rating<4){
    //         this.setState({backgroud:Color.warning})
    //     }
    //     else if(this.props.rating<3){
    //         this.setState({backgroud:Color.danger})
    //     }
    //     else if(this.props.rating>=4){
    //         this.setState({backgroud:Color.success})
    //     }
    // }
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
         backgroundColor: Color.danger, 
         borderRadius: 5, 
         paddingHorizontal: 8, 
         width: 50,
         flexDirection:'row',
         alignItems:'center'
        }
})

export default Rating