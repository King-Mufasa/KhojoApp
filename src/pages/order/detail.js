import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, SectionList, Text } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import APIkit from '../../api/apikit'
import OrderItem from '../../components/items/orderitems'
import Colors from '../../styles/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import StandardStyles from '../../styles/standardstyles';
import OfferBadge from '../../components/util/offer';
import Label from '../../components/label';
import BadgeButton from '../../components/badgebtn';
import Badge from '../../components/util/badge'
import KButton from '../../components/KButton';
import RNPgReactNativeSdk from 'react-native-pg-react-native-sdk';
import { useGlobalState } from '../../store/state';
import makePayment from '../../module/payment';
import AwesomeLoading from 'react-native-awesome-loading';
import SelectDropdown from 'react-native-select-dropdown'
import { screenWidth } from '../../module/IntroSlider/src/themes';
import Snackbar from 'react-native-snackbar';
import Modal from "react-native-modal";
import ModalContent from '../../components/modalcontent';
const OrderDetail = (props) => {
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState([])
    const [items, setItems] = useState({})
    const [id, setId] = useState(props.navigation.state.params.id)
    const [user] = useGlobalState('user')
    const [address, setAddress] = useState([])
    const [orderaddress, setOrderAddress] = useState(null)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalmessage] = useState("")
    const getDetail = () => {
        const payload = { id }
        setLoading(true)
        const onSuccess = (data) => {
            setOrder(data.data[0])
            setItems(data.data)
            setLoading(false)
        }
        const onFailed = (data) => {
            console.log(data)
            setLoading(false)
        }
        APIkit.post("customer.order.details", payload).then(onSuccess).catch(onFailed)
    }
    const getInvoice = () => {
        const payload = {  }
        setLoading(true)
        const onSuccess = (response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        }
        const onFailed = (data) => {
            console.log(data)
            setLoading(false)
        }
        console.log(APIkit.defaults.headers)
        // APIkit.get("customer.order.invoice/" + order.order_code).then(onSuccess).catch(onFailed)
    }
    const getAddress = () => {
        const onSuccess = (response) => {
            setAddress(response.data)
            console.log(address)
            setLoading(false)
        }
        const onFailed = (response) => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.address.get').then(onSuccess).catch(onFailed)
    }
    const acceptOrder = () => {
        if(orderaddress == null){
            Snackbar.show({
                text: 'Please select delivery address',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        setLoading(true)
        const responseHandler = (result) => {
            setLoading(false)
            const data = JSON.parse(result);
            console.log(data.txStatus);
            if(data.txStatus == "SUCCESS"){
                updateOrder(12)
            }
          };
        const note = 'Order accept:' + order.order_code
        makePayment(order.total_price,note,user,responseHandler)
    }
    const updateOrder = (status) =>{
        
        const payload={
            'address':orderaddress,
            'id':order.id,
            'status':status
        }
        console.log(payload)
        const onSuccess = (response)=>{
            console.log(response.data)
            setLoading(false)
            order.status=status
            setModalmessage(response.data.message)
            setModalShow(true)
        }
        const onFailed = (response)=>{
            console.log(response)
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.order.update',payload).then(onSuccess).catch(onFailed)
    }
    useEffect(() => {
        console.log(user)
        getDetail()
        getAddress()
    }, [])
    return (
        <View style={[StandardStyles.container, { paddingTop: 10 }]}>
            {/* <Spinner visible={loading} /> */}
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <Modal
                    testID={'modal'}
                    isVisible={modalshow}
                    onSwipeComplete={() => setModalShow(false)}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.view}>
                    <ModalContent onPress={() => setModalShow(false)} message={modalmessage} />
                </Modal>
            <View style={[StandardStyles.commonlightview, styles.detail_header]}>
                <View style={styles.info}>
                    <Label name="Order Code" size='medium' />
                    <Text>{order ? order.order_code : ""}</Text>
                </View>
                <View style={styles.info}>
                    <Label name="Status" size='medium' />
                    <Text>{order.status == 11 ? "Pending" :order.status == -1?"Rejected":"Accepted"}
                    </Text>
                </View>
                <View style={styles.info}>
                    <Label name="Price" size='medium' />
                    <Text style={{ color: Colors.success }} ><Icon name='inr' /> {order != null ? order.total_price : "0"}</Text>
                </View>
                <View style={[styles.offer, { display: order == null ? "none" : order.actived_offer != null ? "flex" : "none" }]}>
                    <View style={{ flexDirection: 'row', marginStart: 10 }}>
                        <OfferBadge
                            name={order != null ? order.name : ""} />
                        <Text>  -{order != null ? order.discount : ""}%</Text>
                    </View>
                    <Text style={styles.old_price} ><Icon name='inr' /> {order != null ? order.old_price : "0"}</Text>
                </View>
                <View style={[styles.info, {
                    paddingHorizontal: 10, paddingTop: 20,
                    display:
                            order.status == 0 || order.status == 11 ? 'flex' : 'none',
                            flexDirection:'column'
                }]}>
                    <SelectDropdown
                        defaultValueByIndex={0}
                        buttonStyle={styles.typeselector}
                        data={address}
                        onSelect={(selectedItem, index) => {
                            setOrderAddress(index+1)
                        }}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            // props.type(selectedItem)
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return (
                                <View style={styles.addressselect}>
                                    <View style={{flexDirection:'row'}}>
                                    {selectedItem ? (
                                        <Icon
                                            name={selectedItem.type == 1 ? 'home' : selectedItem.type == 2 ? 'building' : 'handshake-o'}
                                            size={25}
                                            style={styles.icon}
                                        />
                                    ) : (
                                        <Icon name="home" size={25} style={styles.icon}/>
                                    )}
                                    <Text style={styles.dropdown3BtnTxt}>
                                        {selectedItem ? selectedItem.name : "Select Address"}
                                    </Text>
                                    </View>
                                    <Icon name="chevron-down" color={Colors.primary} size={18} />
                                </View>
                            )
                        }}
                        renderCustomizedRowChild={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return (
                                <View style={styles.addresstype}>
                                    <Icon name={item.type == 1 ? 'home' : item.type == 2 ? 'building' : 'handshake-o'} size={25} style={styles.icon} />
                                    <Text >{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                    <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <KButton name='Reject' type="danger" style={{
                       
                    }} click={()=>{updateOrder(-1)}}/>
                    <KButton name='Accept' type="success" style={{
                        
                    }}  click={acceptOrder}/>
                    </View>

                    {/* <KButton name='Invoice' style={{
                        display:
                            order.status == 0 || order.status == 11 ? 'flex' : 'none'
                    }} click={getInvoice} /> */}
                    

                </View>
            </View>
            <SectionList
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Items', data: items
                    },
                ]}
                renderItem={({ item }) => <OrderItem info={item} />}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    offer: {
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    old_price: {
        textDecorationLine: 'line-through',
        color: Colors.danger
    },
    detail_header: {
        padding: 10,
        flexDirection: 'column'
    },
    info: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10
    },
    address: {
        flexDirection: "row",
        alignItems: "center"
    },
    typeselector: {
        width: '100%',
        borderRadius: 10
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    },
    addressselect:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignContent:'center'
    },
    addresstype:{
        flexDirection:'row',
        paddingHorizontal:20
    }
})
export default OrderDetail