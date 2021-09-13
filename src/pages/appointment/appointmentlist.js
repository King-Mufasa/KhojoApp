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
const AppointmentList = (props) => {
    const [appointments, setAppointment] = useState(null)
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
            setAppointment(data.data)
            console.log(appointments)
        }
        const onFailue = (data) => {
            setLoading(false)
            console.log(data.data)
        }
        setLoading(true)
        APIkit.post('customer.appointment.history', payload).then(onSuccess).catch(onFailue)
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
                    <Text style={{ color: Colors.lightdark }}>Doctor</Text>
                    <View style={styles.receiver}>
                        <Avatar image={section.doctor_image} />
                        <View style={{flexDirection:'column', alignSelf:'center'}}>
                            <Text style={{ color: Colors.lightdark }}>Doctor Name</Text>
                            <Text>{section.doctor_name}</Text>

                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Type</Text>
                    <Text>{section.type==0?"Clinic Visit":section.type==1?"Home Visit":"Video Consultation"}</Text>
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
            <View style={[styles.header,{display:section.book_code?"flex":"none"}]} >
                <View>
                    <Text style={{ color: Colors.lightdark }}>Appointment Code</Text>
                    <Text>{section.book_code}</Text>
                </View>
                <Badge status={section.status} type="request"/>
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
            <Label name="My Appointments" />
            <ScrollView showsVerticalScrollIndicator={false}>
            <Accordion
                sections={appointments != null ? appointments : SECTIONS}
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

export default AppointmentList
