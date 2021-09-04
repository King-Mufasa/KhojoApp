import React from 'react'
import { SafeAreaView, Image, Text, View, StyleSheet,ImageBackground} from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes'
import Rating from '../rating'
import Icon from 'react-native-vector-icons/FontAwesome';
import KButton from '../KButton'
import config from '../../config'
import Images from '../../styles/images'

const BundleItem = (props) => {
    return (
        <ImageBackground source={{ uri: (props.info.image? config.baseurl + props.info.image: config.baseurl + 'assets/images/default_bundle.jpg' )}}  imageStyle={{ borderRadius: 10}} style={styles.bundle}>
            <ImageBackground style={styles.bundleinfo} >
                <View style={styles.name}>
                    <Text style={[Fontsize.medium, styles.text,{textAlign:'center'}]}>{props.info.name}</Text>
                    {props.info.rating > 0 && <Rating rating={props.info.rating} />}
                </View>
                <Text style={styles.text}>{props.info.description}</Text>
                <Text style={styles.text}>Including {props.info.count} Tests</Text>
                <View style={styles.budget}>
                    <Text style={styles.text}>Rate:  </Text>
                    <Text style={styles.text}><Icon name="inr" /> {props.info.rate}</Text>
                </View>
            </ImageBackground>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    bundle: {
        width:screenWidth*0.6,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    avatar: {
        margin: 5,
        width: screenWidth*0.3,
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20
    },
    fakeavatar: {
        margin: 5,
        width: screenWidth*0.3,
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20,
        resizeMode: "center"
    },
    bundleinfo: {
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        borderRadius:10,
        padding:20,
        alignSelf:'center'
    },
    budget: {
        flexDirection: 'row'
    },
    name:{
    },
    text: {
        marginTop: 5,
        color: Colors.white
    },
})

export default BundleItem