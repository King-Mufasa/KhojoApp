import { StyleSheet, View } from 'react-native'
import { screenWidth } from '../module/IntroSlider/src/themes'
import Colors from '../styles/color'
const StandardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
        paddingHorizontal: 10,
    },
    commonview:{
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
    commonlightview:{
        padding: 10,
        backgroundColor: Colors.primaryBack,
        borderRadius: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        marginHorizontal:10,
        marginBottom:10
    },
    input:{
        width: screenWidth*0.85,
        marginTop:5,
        marginBottom:5,
        backgroundColor: 'white',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        borderColor: Colors.lightgrey,
        borderWidth: 1,
        paddingHorizontal:20
    }
})
export default StandardStyles