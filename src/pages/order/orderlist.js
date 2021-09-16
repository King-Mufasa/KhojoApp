import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text,ScrollView } from 'react-native'
import Collapsible from 'react-native-collapsible';
import APIkit from '../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import StandardStyles from '../../styles/standardstyles';
import Accordion from 'react-native-collapsible/Accordion';
import Commonstyle from '../../styles/comonview';
import Colors from '../../styles/color';
import BadgeButton from '../../components/badgebtn';
import Badge from '../../components/util/badge'
import Label from '../../components/label';
import config from '../../config';
import Avatar from '../../components/avatar';
import Moment from 'moment';
import SearchComponent from '../../components/search';

const SECTIONS = [
    {
        name: 'Loading',
        content: 'loading data...',
    },
];
const OrderList = (props) => {
    const [orders, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const navigate = (id) =>{
        const {navigate} = props.navigation
        navigate("OrderDetail",{id:id})
    }
    const getMyRequest = () => {
        const payload = { type: config.usertype, };
        const onSuccess = (data) => {
            setLoading(false)
            setOrder(data.data)
            console.log(orders)
        }
        const onFailue = (data) => {
            setLoading(false)
            console.log(data.data)
        }
        setLoading(true)
        APIkit.post('customer.getOrder/', payload).then(onSuccess).catch(onFailue)
    }
    const _renderSectionTitle = (section) => {
        return (
            <View>

            </View>
        );
    };
    const _renderContent = (section) => {
        return (
            <View style={[StandardStyles.commonlightview, { flexDirection: 'column' }]}>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Pharmacy</Text>
                    <View style={styles.receiver}>
                        <Avatar image={section.receiver_image} />
                        <View style={{flexDirection:'column', alignSelf:'center'}}>
                            <Text style={{ color: Colors.lightdark }}>Receiver Name</Text>
                            <Text>{section.receiver_name}</Text>
                            <Text style={{ color: Colors.lightdark }}>Contact Info</Text>
                            <Text>{section.receiver_phone}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Order Code</Text>
                    <Text>{section.order_code}</Text>
                </View>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Request Sent</Text>
                    <Text>{Moment(section.created_at).format('LL')}</Text>
                </View>
                <View>
                    <BadgeButton name="Details" click={()=>{navigate(section.id)}}/>
                </View>
            </View>
        );
    };
    const _renderHeader = (section) => {
        console.log(section.order_code)
        return (
            <View style={[styles.header,{display:section.receiver_name?"flex":"none"}]} >
                <View>
                    <Text style={{ color: Colors.lightdark }}>Order Code</Text>
                    <Text>{section.order_code}</Text>
                </View>
                <Badge status={section.status===undefined?0:section.status} />
            </View>
        );
    };
    useEffect(() => {
        getMyRequest()
    }, [])
    return (
        <View style={StandardStyles.container}>
            <Spinner visible={loading} />
            <SearchComponent placeholder="Search with Order Code"/>
            <Label name="My Orders" />
            <ScrollView showsVerticalScrollIndicator={false}>
            <Accordion
                sections={orders != null ? orders : SECTIONS}
                activeSections={activeSections}
                renderSectionTitle={_renderSectionTitle}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={setActiveSections}
                underlayColor={Colors.primaryBack}
            />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10,
    },
    receiver: {
        flexDirection: 'row'
    }
})

export default OrderList
