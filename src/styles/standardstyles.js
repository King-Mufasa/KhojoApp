import { StyleSheet, View } from 'react-native'
import Colors from '../styles/color'
const StandardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
        paddingHorizontal: 10
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
    }
})
export default StandardStyles