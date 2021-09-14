import React, { useState } from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View, SectionList, TouchableHighlight, Button } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import KButton from '../../components/KButton'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from '../../components/bottomsheet'
import SelectDropdown from 'react-native-select-dropdown'
import Modal from "react-native-modal";
import Address from '../../components/modalcontent/address'
import APIkit from '../../api/apikit'
import AwesomeLoading from 'react-native-awesome-loading'
import { useEffect } from 'react'

import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Images from '../../styles/images'
import Snackbar from 'react-native-snackbar';
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


const ManageAddress = (props) => {
    const [modalshow, setModalShow] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [type, setType] = useState(1)
    const [loading, setLoading] = useState()
    const [addresslist, setAddressList] = useState([])

    const [selectmapmode, setSelectMapmode] = useState(false)
    const [newaddress, setNewAddress] = useState({
        latitude: 52.882004,
        longitude: 64.582748,
    })
    const [draw, setDraw] = useState(false)
    const [location, setLocation] = useState({
        latitude: 52.882004,
        longitude: 64.582748,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const addAddress = () => {
        console.log(address)
        if (name == "" || address == "") {
            Snackbar.show({
                text: 'Please input valid Address.',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        setModalShow(false)
        setDraw(false)
        const payload = {
            "name": name,
            'address': address,
            'type': type,
            'latitude': newaddress.latitude,
            'longitude': newaddress.longitude
        }
        const onSuccess = (response) => {
            console.log(response)
            setLoading(false)
            setSelectMapmode(false)
            getAddress()
            setName("")
            setAddress("")
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        console.log(payload)
        setLoading(true)
        APIkit.post('customer.address.create', payload).then(onSuccess).catch(onFailed);
    }

    const getAddress = () => {
        const onSuccess = (response) => {
            console.log(response.data)
            setAddressList(response.data)
            console.log(addresslist)
            setLoading(false)
        }
        const onFailed = (response) => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.address.get').then(onSuccess).catch(onFailed)
    }
    const removeAddress = (id) => {
        const onSuccess = (response) => {
            getAddress()
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('customer.address.delete', { id, id }).then(onSuccess).catch(onFailed)
    }
    const newAddress = (position) => {
        setNewAddress({
            latitude: position.nativeEvent.coordinate.latitude,
            longitude: position.nativeEvent.coordinate.longitude
        })

        // setModalShow(true)
        setDraw(true)
    }

    function getCurrentLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(
                    // getRegionForCoordinates({
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }
                    // })
                )
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    const drawMark = () => {
        if (draw)
            return (
                <Marker
                    coordinate={newaddress}
                    title={name}
                    description={address}>
                    <Image source={Images.mark_default} style={{ width: 30, height: 30 }}
                        resizeMode="contain" />
                </Marker>
            )
        else
            return;
    }
    const drawCurrentAddress = () => {
        if (selectmapmode) {
            return (
                addresslist.map((address, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: parseFloat(address.latitude),
                            longitude: parseFloat(address.longitude)
                        }}
                        title={address.name}
                        description={address.address}
                    >
                        <Image source={address.type==1?Images.mark_home:address.type==2?Images.mark_office:Images.mark_custom} style={{ width: 30, height: 30 }}
                        resizeMode="contain" />
                    </Marker>
                ))
            )
        }
        else return
    }
    useEffect(() => {
        getAddress()
        getCurrentLocation()
    }, [])
    useEffect(() => {
        console.log(newaddress)
        console.log(addresslist)
        if (selectmapmode) {
            setModalShow(true)
        }
    }, [newaddress])
    return (
        <SafeAreaView style={styles.container}>
            <AwesomeLoading indicatorId={10} size={100} isActive={loading} text="loading" />
            <View style={{ flex: 1, display: selectmapmode ? 'flex' : 'none', width: "100%", height: '100%' }}>
                <MapView style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    region={
                        location
                    }
                    showsUserLocation={true}
                    onRegionChangeComplete={setLocation}
                    onLongPress={newAddress}
                >
                    {drawMark()}
                    {drawCurrentAddress()}
                </MapView>
                <View
                    style={{
                        position: 'absolute',//use absolute position to show button on top of the map
                        alignSelf: 'flex-start', //for align to right
                        margin: 10,
                        opacity: 0.8
                    }}
                >
                    <KButton name="Back" click={() => { setSelectMapmode(false) }} />
                </View>
            </View>
            <View style={{ padding: 20 }}>
                <Modal
                    testID={'modal'}
                    isVisible={modalshow}
                    onSwipeComplete={() => { setModalShow(false), setDraw(false) }}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.modal}>
                    <Address name={setName} type={setType} address={setAddress} action={addAddress} />
                </Modal>

                <View style={{ display: selectmapmode ? 'none' : 'flex' }}>
                    <SectionList
                        style={[styles.scrollView,]}
                        sections={[
                            {
                                title: '', data: addresslist
                            },
                        ]}
                        renderItem={({ item }) =>
                            <TouchableHighlight style={styles.listbutton} activeOpacity={0.6} underlayColor="#DDDDDD" >
                                <SafeAreaView style={styles.listitem}>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <Icon name={item.type == 1 ? 'home' : item.type == 2 ? 'building' : 'handshake-o'} size={25} style={styles.icon} />
                                        <View>
                                            <Text style={styles.item}>{item.name}</Text>
                                            <Text style={Fontsize.mini}>{item.address}</Text>
                                        </View>
                                    </View>
                                    <Icon name="trash-o" size={20} color={Colors.danger} onPress={() => { removeAddress(item.id) }} />
                                </SafeAreaView>
                            </TouchableHighlight>}
                        renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
                    <KButton name="Add New Address" click={() => { setSelectMapmode(true) }} />
                </View>


            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
    },
    input: {
        width: "100%",
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.lightdark,
        paddingHorizontal: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    listitem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    listbutton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblue,
        borderWidth: 1,
        marginTop: 10,
    },
    scrollView: {
        marginBottom: 20
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

})

export default ManageAddress