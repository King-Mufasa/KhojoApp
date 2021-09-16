import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
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
const ServiceList = ({navigation}) => {
    const [requests, setRequests] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const [filter, setFilter] = useState('')
    const navigate = (id) =>{
        const {navigate} = navigation
        navigate("OrderDetail",{id:id})
    }
    const getMyRequest = () => {
        const payload = { search: filter };
        const onSuccess = (data) => {
            console.log(data.data)
            setLoading(false)
            setRequests(data.data)
        }
        const onFailue = (data) => {
            setLoading(false)
            console.log(data.data)
        }
        setLoading(true)
        APIkit.post('customer.service.request.get', payload).then(onSuccess).catch(onFailue)
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
                    <Text style={{ color: Colors.lightdark }}>{section.title}</Text>
                    <View style={styles.receiver}>
                        <Avatar image={section.image} />
                        <View style={{flexDirection:'column', alignSelf:'center'}}>
                            <Text style={{ color: Colors.lightdark }}>Note:</Text>
                            <Text>{section.note}</Text>

                        </View>
                    </View>
                </View>
                {section.order_code?<View >
                    <Text style={{ color: Colors.lightdark }}>Order Code</Text>
                    <Text>{section.order_code}</Text>
                </View>:<></>}
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
        return (
            <View style={[styles.header,{display:section.request_code?"flex":"none"}]} >
                <View>
                    <Text style={{ color: Colors.lightdark }}>Request Code</Text>
                    <Text>{section.request_code}</Text>
                </View>
                <Badge status={section.status===undefined?0:section.status} type="request"/>
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
            <Label name="My Requests" />
            <ScrollView showsVerticalScrollIndicator={false}>
            <Accordion
                sections={requests != null ? requests : SECTIONS}
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

export default ServiceList
