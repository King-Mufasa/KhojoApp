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
const OrderDetail = (props) => {
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState([])
    const [items, setItems] = useState({})
    const [id, setId] = useState(props.navigation.state.params.id)
    const getDetail = () => {
        const payload = { id }
        console.log(payload)
        setLoading(true)
        const onSuccess = (data) => {
            console.log(data.data)
            setOrder(data.data[0])
            setItems(data.data)
            console.log(order)
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
        console.log(payload)
        setLoading(true)
        const onSuccess = (response) => {
            console.log(response.data)
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
    const acceptOrder = () => {
        const payload = {id}
        setLoading(true)
        const onSuccess = (response) =>{

        }
        const onFailed = (data) =>{

        }
        APIkit.post("customer.order.accept")
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <View style={[StandardStyles.container, { paddingTop: 10 }]}>
            <Spinner visible={loading} />
            <View style={[StandardStyles.commonlightview, styles.detail_header]}>
                <View style={styles.info}>
                    <Label name="Order Code" size='medium' />
                    <Text>{order ? order.order_code : ""}</Text>
                </View>
                <View style={styles.info}>
                    <Label name="Status" size='medium' />
                    <Text>{order.status == 11 ? "Pending" : "Accepted"}
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
                }]}>
                    <KButton name='Accept' type="success" style={{
                        display:
                            order.status == 0 || order.status == 11 ? 'flex' : 'none'
                    }} />
                    {/* <KButton name='Invoice' style={{
                        display:
                            order.status == 0 || order.status == 11 ? 'flex' : 'none'
                    }} click={getInvoice} /> */}
                    <KButton name='Reject' type="danger" style={{
                        display:
                            order.status == 0 || order.status == 11 ? 'flex' : 'none'
                    }} />

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
    }
})
export default OrderDetail