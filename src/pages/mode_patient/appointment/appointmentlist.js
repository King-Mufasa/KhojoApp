import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableHighlight, Platform } from 'react-native'
import Collapsible from 'react-native-collapsible';
import APIkit from '../../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import { StandardStyles } from '../../../styles/standardstyles';
import Accordion from 'react-native-collapsible/Accordion';
import Commonstyle from '../../../styles/comonview';
import Colors from '../../../styles/color';
import BadgeButton from '../../../components/badgebtn';
import Badge from '../../../components/util/badge'
import Label from '../../../components/label';
import config from '../../../config';
import Avatar from '../../../components/avatar';
import Moment from 'moment';
import SearchComponent from '../../../components/search';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from "react-native-modal";
import AppointmentFilter from '../../../components/modalcontent/appointmentfilter';
import moment from 'moment';
import Fontsize from '../../../styles/fontsize';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import KButton from '../../../components/KButton';
import RatingView from '../../../components/modalcontent/ratingview';
import axios from 'axios';
const SECTIONS = [
    {
        name: 'Loading',
        content: 'loading data...',
        status: 0
    },
];
const AppointmentList = (props) => {
    const [appointments, setAppointment] = useState(null)
    const [pastAppointments, setPastAppointments] = useState([])
    const [upcommingAppointments, setUpcommingAppointments] = useState([])
    const [fireAppointments, setFireAppointments] = useState([])
    const [activedAppointments, setActivedApponitments] = useState([])
    const [upcomming, setUpcomming] = useState(true)
    const [loading, setLoading] = useState(false)
    const [activeSections, setActiveSections] = useState([])
    const [filtershow, setFilterShow] = useState(false)
    const [ratingshow, setRatingShow] = useState(false)
    const [selected, setSelected] = useState()
    const navigate = (id) => {
        const { navigate } = props.navigation
        navigate("OrderDetail", { id: id })
    }
    const getAppointments = () => {
        const payload = { type: config.usertype, };
        const onSuccess = (data) => {
            setLoading(false)
            setAppointment(data.data)
            console.log(data.data)
        }
        const onFailue = (data) => {
            setLoading(false)
            console.log(data.data)
        }
        setLoading(true)
        APIkit.post('customer.appointment.history', payload).then(onSuccess).catch(onFailue)
    }

    const completeAppointment = (id, status) => {
        console.log(id)
    }
    const publishReview = (rating, review) => {
        setRatingShow(false)
        console.log(rating)
        console.log(review)
        const payload = {
            rating: rating,
            review: review,
            id: selected,
            type: 'appointment'
        }
        const onSuccess = (response) => {
            console.log(response.data)
            if (response.data.status == "success")
                getAppointments()
            else setLoading(false)
        }
        const onFailed = (response) => {
            console.log(response)
            setLoading(false)
        }
        setLoading(true)
        console.log(payload)
        APIkit.post('/customer.review.generate', payload).then(onSuccess).catch(onFailed)
    }
    const downloadPrescription = async (path) => {
        console.log(path)
        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    downloadFile();
                    console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    }
    const _renderSectionTitle = (section) => {
        return (
            <View>

            </View>
        );
    };
    const _renderContent = (section) => {
        return (
            <View style={[StandardStyles.commonlightview, { flexDirection: 'column', padding: 20 }]}>
                <View>
                    <Text style={{ color: Colors.lightdark }}>Doctor</Text>
                    <View style={styles.receiver}>
                        <Avatar image={section.doctor_image} />
                        <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                            <Text style={{ color: Colors.lightdark }}>Doctor Name</Text>
                            <Text>{section.doctor_name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: Colors.lightdark }}>{section.book_code}</Text>
                </View>
                {section.prescription && <TouchableHighlight onPress={() => { downloadPrescription(section.prescription) }} underlayColor={Colors.primaryBack}><View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }}><Icon name="file-medical" size={20} color={Colors.primary} /><Text style={{ alignSelf: 'center', color: Colors.primary }}>   Prescription</Text></View></TouchableHighlight>}
                <View>
                    <Text style={[styles.label, Fontsize.medium, { color: Colors.success, fontWeight: 'bold' }]}>₹ {section.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>{section.from}</Text>
                    <Divider orientation='vertical' width={1} />
                    <Text style={styles.label}>{section.to}</Text>
                </View>
                {section.status == 2 && <KButton name="Complete" type="success" click={() => { setRatingShow(true), setSelected(section.id) }} />}
            </View>
        );
    };
    const _renderHeader = (section) => {
        return (
            <View style={[styles.header, { display: section.book_code ? "flex" : "none" }]} >
                <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                    <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>{section.type == 0 ? "Clinic Visit" : section.type == 1 ? "Home Visit" : "Video Consultation"}</Text>
                    <Text>{moment(section.date).format('LL')}</Text>
                </View>

                <Badge status={section.status === undefined ? 0 : section.status} type="request" />
            </View>
        );
    };
    useEffect(() => {
        getAppointments()
    }, [])
    useEffect(() => {
        if (appointments !== undefined && appointments !== null && appointments.length !== 0) {
            let pastbuffer = []
            let upcommintbuffer = []
            let firebuffer = []
            appointments.forEach(appointment => {
                // let appointmentDate = (moment(new Date(appointment.date)).format("yyyy-MM-DD"))
                let today = moment(new Date()).format("yyyy-MM-DD")
                console.log(appointment.date)
                if (appointment.date === today) {
                    console.log(moment().format('HH:mm:ss'))
                    console.log(appointment.to)
                    if (appointment.to > moment().format('HH:mm:ss')) {
                        upcommintbuffer.push(appointment)
                        if (appointment.from < moment().format('HH:mm:ss'))
                            firebuffer.push(appointment.id)
                    }
                    else {
                        pastbuffer.push(appointment)

                    }
                }
                else if (appointment.date < today) {
                    pastbuffer.push(appointment)
                    console.log("KL" + appointment.date + "::" + today)
                }
                else {
                    upcommintbuffer.push(appointment)
                }
            });
            setUpcommingAppointments(upcommintbuffer)
            setPastAppointments(pastbuffer)
            setFireAppointments(firebuffer)
        }
    }, [appointments])
    return (
        <View style={[StandardStyles.container]}>
            <Modal
                testID={'modal'}
                isVisible={filtershow}
                onSwipeComplete={() => setFilterShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.filtermodal}>
                <AppointmentFilter />
            </Modal>
            <Modal
                testID={'modal'}
                isVisible={ratingshow}
                onSwipeComplete={() => setRatingShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.filtermodal}>
                <RatingView publish={publishReview} close={setRatingShow} />
            </Modal>
            <Spinner visible={loading} />
            {/* <SearchComponent placeholder="Search with Order Code" /> */}
            <View style={styles.filterLayout}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableHighlight underlayColor={Colors.white} style={[upcomming ? styles.filterActive : styles.filterDefault, { borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }]} onPress={() => { setUpcomming(true) }}>
                        <View style={styles.filterButton}>
                            <Text style={[upcomming ? styles.labelActive : styles.labelDefault]} >Upcomming</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={Colors.white} style={[!upcomming ? styles.filterActive : styles.filterDefault, { borderBottomRightRadius: 20, borderTopRightRadius: 20 }]} onPress={() => { setUpcomming(false) }}>
                        <View style={styles.filterButton}>
                            <Text style={[!upcomming ? styles.labelActive : styles.labelDefault]} >Past</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight underlayColor={Colors.primaryBack} style={styles.btnFilter} onPress={() => { setFilterShow(true) }}>
                    <Icon name='filter' size={15} color={Colors.primary} />
                </TouchableHighlight>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Accordion
                    sections={appointments != null ? upcomming ? upcommingAppointments : pastAppointments : SECTIONS}
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
    },
    btnFilter: {
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.white,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 10,
        margin: 10
    },
    filterLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20
    },
    filtermodal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    filterActive: {
        width: '40%',
        padding: 10,
        backgroundColor: Colors.lightblue,
        borderColor: Colors.primary,
        borderWidth: 1,
        alignItems: 'center'
    },
    filterDefault: {
        width: '40%',
        padding: 10,
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: Colors.white,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    labelActive: {
        color: Colors.primary,
        fontWeight: 'bold'
    },
    labelDefault: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    label:
    {
        color: Colors.primary,
        marginHorizontal: 5
    },
})

export default AppointmentList
