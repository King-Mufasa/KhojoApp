import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
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
// const _renderHeader = (requests) => {
//     return (
//         <View style={StandardStyles.commonview}>
//             <Text style={styles.headerText}>{requests.request_id}</Text>
//         </View>
//     );
// };

const _renderContent = (requests) => {
    return (
        <View style={styles.content}>
            <Text>{requests.content}</Text>
        </View>
    );
};

const SECTIONS = [
    {
        name: 'Loading',
        content: 'loading data...',
    },
];
const RequestList = () => {
    const [requests, setRequest] = useState(null)
    const [loading, setLoading] = useState(false)
    const [activeSections, setActiveSections] = useState([])

    const getMyRequest = () => {
        const payload = { type: config.usertype, };
        const onSuccess = (data) => {
            setLoading(false)
            console.log(data.data)
            data.data
            setRequest(data.data)
        }
        const onFailue = (data) => {
            setLoading(false)
            console.log(data.data)
        }
        setLoading(true)
        APIkit.post('customer.getRequest/', payload).then(onSuccess).catch(onFailue)
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
                    <View style={styles.pharmacy}>
                        <Avatar image={section.pharmacy_image} />
                        <View style={{flexDirection:'column', alignSelf:'center'}}>
                            <Text style={{ color: Colors.lightdark }}>Pharmacy Name</Text>
                            <Text>{section.pharmacy_name}</Text>
                            <Text style={{ color: Colors.lightdark }}>Contact Info</Text>
                            <Text>{section.pharmacy_phone}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Request id</Text>
                    <Text>{section.request_id}</Text>
                </View>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Request Sent</Text>
                    <Text>{Moment(section.created_at).format('LL')}</Text>
                </View>
            </View>
        );
    };
    const _renderHeader = (section) => {
        return (
            <View style={[styles.header,{display:section.pharmacy_name?"flex":"none"}]} >
                <View>
                    <Text style={{ color: Colors.lightdark }}>Request id</Text>
                    <Text>{section.request_id}</Text>
                </View>
                <Badge status={section.status} />
            </View>
        );
    };
    useEffect(() => {
        getMyRequest()
    }, [])
    return (
        <View style={StandardStyles.container}>
            <Spinner visible={loading} />
            <SearchComponent placeholder="Search with Request Id"/>
            <Label name="My Requests" />
            <Accordion
                sections={requests != null ? requests : SECTIONS}
                activeSections={activeSections}
                renderSectionTitle={_renderSectionTitle}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={setActiveSections}
                underlayColor={Colors.primaryBack}
            />
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
        margin: 10
    },
    pharmacy: {
        flexDirection: 'row'
    }
})

export default RequestList
