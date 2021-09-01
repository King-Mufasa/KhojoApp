import React from 'react'
import { SafeAreaView, Image, StyleSheet, Text, View, SectionList, TouchableHighlight, TextInput,FlatList, ImageStore } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes'
import { Divider, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../styles/images'
import SearchComponent from '../../components/search'




class SelectSpeciality extends React.Component {

    render() {
        const { navigate } = this.props.navigation
        return (
            <SafeAreaView style={styles.container}>
                <SearchComponent />
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Select Speciality', data: [
                                { icon: "first-order", label: 'My Order', key: "order" }
                                , { icon: "address-book", label: 'Manage Address', key: "ManageAddress" }
                            ]
                        },
                    ]}
                    renderItem={({ item }) =>
                        <TouchableHighlight style={styles.listbutton} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => navigate(item.key)}>
                            <SafeAreaView style={styles.listitem}>
                                <Icon name={Images.icon} size={25} style={styles.icon} />
                                <Text style={styles.item}>{item.label}</Text>
                            </SafeAreaView>
                        </TouchableHighlight>}
                    renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack
    },
    avatar: {
        width: screenWidth * 0.15,
        height: screenWidth * 0.15,
        borderRadius: 5,
        margin: 15,
        resizeMode: "contain"
    },
    profileinfo: {
        flex: 8
    },
    name: {
        fontWeight: 'bold'
    },
    edit: {
        flex: 2,
        height: 30
    },

    
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    listitem: {
        flexDirection: "row",
        alignItems: "center",

    },
    listbutton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblue,
        borderWidth: 1,
        marginTop: 10
    },
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    icon: {
        width: screenWidth * 0.1
    }



})

export default SelectSpeciality