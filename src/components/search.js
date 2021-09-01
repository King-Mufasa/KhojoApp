import React from 'react'
import {StyleSheet, Text, View, TextInput, Image} from 'react-native'
import Colors from '../styles/color';
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes'
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchComponent extends React.Component {
    render() {
        const navigate = this.props.nav
        return (
            <View style={styles.searchview}>
                <View style={styles.searchcontainer}>
                    <Icon name={'search'} size={25} style={styles.icon} />
                    <TextInput placeholder="Search Doctor, Specialities, Clinics, Hospitals" />
                    <Image source={this.props.url} style={styles.avatar} />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    searchview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        padding: 20
    },
    searchcontainer: {
        backgroundColor: Colors.secondary,
        width: "100%",
        borderRadius: 10,
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 15
    },
    icon: {
        width: screenWidth * 0.1
    }
})

export default SearchComponent