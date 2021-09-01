import React, { useState } from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View, SectionList, TouchableHighlight } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import KButton from '../../components/KButton'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '../../components/bottomsheet'
import SelectDropdown from 'react-native-select-dropdown'


const addresstype = ["Home", "Work", "Custom"]

class EditView extends React.Component {
    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <Text style={[Fontsize.small, { marginTop: 20 }]}>{this.props.label}</Text>
                <TextInput
                    style={[styles.input, Fontsize.small]}
                    keyboardType={this.props.type}
                    maxLength={20}
                    value={this.props.value}
                />
            </SafeAreaView>
        )
    }
}


class ManageAddress extends React.Component {
    state = {
        updatemodal: false
    }
    updateState = () => {
        const { updatemodal } = this.state;
        this.setState({ updatemodal: !updatemodal })
    }
    render() {
        let avatarLink = { uri: 'https://drive.google.com/thumbnail?id=1RHt9vhUZdUlzEJwO6du8JJRwsfCXSr3I' };
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'My Address', data: [
                                { icon: "home", label: 'My Order', key: "order", address: "Ghost district denver" }
                                , { icon: "building", label: 'Manage Address', key: "ManageAddress", address: "Ghost district denver" }
                                , { icon: "handshake-o", label: 'Wishlist', address: "Ghost district denver" }
                            ]
                        },
                    ]}
                    renderItem={({ item }) => <TouchableHighlight style={styles.listbutton} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => navigate(item.key)}>
                        <SafeAreaView style={styles.listitem}>
                            <Icon name={item.icon} size={25} style={styles.icon} />
                            <View>
                                <Text style={styles.item}>{item.label}</Text>
                                <Text style={Fontsize.mini}>{item.address}</Text>
                            </View>
                        </SafeAreaView>
                    </TouchableHighlight>}
                    renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <KButton name="Add New Address" click={this.updateState} />
                <BottomSheet visible={this.state.updatemodal} children={
                    <SafeAreaView style={styles.modal}>
                        <View style={styles.address}>
                        <Text style={Fontsize.small}>Select Address Type: </Text>
                        <SelectDropdown
                            buttonStyle={styles.typeselector}
                            data={addresstype}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                        </View>
                        <EditView label="Name" />
                        <EditView label="Address" />
                        <KButton name="Add" click={this.updateState} />
                    </SafeAreaView>

                } />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.primaryBack
    },
    input: {
        width: "100%",
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.lightdark,
        paddingHorizontal: 20
    },
    modal: {
        flex: 1,
        padding:10
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
        color: Colors.primary,
        width: screenWidth * 0.1
    },
    address:{
        flexDirection:"row",
        alignItems:"center"
    },
    typeselector:{
        borderRadius:10
    }

})

export default ManageAddress