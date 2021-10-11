import React, { useState, useEffect } from 'react'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, SectionList } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import APIkit from '../../../api/apikit';
import Snackbar from 'react-native-snackbar';
import EventItem from '../../../components/items/eventitem';
import { StandardStyles } from '../../../styles/standardstyles';
import Spinner from 'react-native-loading-spinner-overlay';
import Appointment from '../../../components/modalcontent/appointment';
import Modal from "react-native-modal";
import makePayment from '../../../module/payment';
import { useGlobalState } from '../../../store/state';
import ModalContent from '../../../components/modalcontent';
// LocaleConfig.locales['en'] = {
//     monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
//     monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
//     dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
//     dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
//     today: 'Aujourd\'hui'
// };
// LocaleConfig.defaultLocale = 'en';

const ScheduleAppointment = (props) => {
    const [event, setEvent] = useState([])
    const [date, setDate] = useState()
    const [isloading, setLoading] = useState()
    const [doctor, setDoctor] = useState(props.navigation.state.params.doctor)
    const [eventdate, setEventDate] = useState()
    const [markeddate, setMarkedDate] = useState()
    const [dailyevent, setDailyevent] = useState([])
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalmessage] = useState('')
    const [resultshow, setResultShow] = useState(false)
    const [eventdetail, setDetails] = useState()
    const [patient, setPatient] = useState([])
    const [selectedpatient, selectPatient] = useState()
    const [user] = useGlobalState('user')
    // const getEventDate = (month) => {
    //     console.log(month)
    //     var endday = new Date(month.year, month.month, 0).getDate();
    //     let buffer = []
    //     for (let index = new Date().getDate(); index < endday; index++) {
    //         console.log(month.year + "-"+month.month+"-"+index)
    //         // if(new Date()).getDay().in(eventdate))
    //         // {
    //         //     console.log("K")
    //         // }
    //         // eventdate.forEach(date=>{

    //         //     if(date===index) 
    //         //     console.log(month.year)
    //         //     // buffer.push(
    //         //     //     {
    //         //     //         {month.year} +"-" +{month.month} +"-" +index:{ marked: true },
    //         //     //     }
    //         //     // )
    //         // })
    //     }
    //     setMarkedDate(buffer)
    // }
    const getDateEvent = (date) => {
        setDailyevent([])
        let buffer = []
        for (let index = 0; index < event.length; index++) {
            if (event[index].date == new Date(date.dateString).getDay()) {
                buffer.push(event[index])
            }
        }
        setDailyevent(buffer)
    }
    const selectDate = (date) => {

        if (validate(date)) {
            getDateEvent(date)
            setDate(date)
        }
        else {
            Snackbar.show({
                text: 'Invalid Date.',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }
    const validate = (date) => {
        if (date.year < new Date().getFullYear())
            return false
        else if (date.year == new Date().getFullYear() && date.month < (new Date().getMonth() + 1))
            return false
        else if (date.month == (new Date().getMonth() + 1) && date.day < new Date().getDate())
            return false
        return true
    }

    const getDoctorEvent = () => {
        const payload =
        {
            'doctor_id': doctor.id
        }
        const onSuccess = (response) => {
            console.log(response.data)
            setEvent(response.data)

            setLoading(false)
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('customer.get.doctorevent', payload).then(onSuccess).catch(onFailed)
    }
    const checkEvent = (id) => {
        const onSuccess = (response) => {
            console.log(response.data)
            setLoading(false)
            setDetails(response.data)
            setModalShow(response.data.status)
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('customer.event.check', { event_id: id }).then(onSuccess).catch(onFailed)
    }

    const bookAppointment = (id, total_price) => {

        if (patient.length == 0) {
            Snackbar.show({
                text: 'No patient data. create patient on your profile page.',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        setModalShow(false)
        setLoading(true)
        const responseHandler = (result) => {
            setLoading(false)
            const data = JSON.parse(result);
            console.log(data.txStatus);
            if (data.txStatus == "SUCCESS") {
                createAppointment(total_price)
            }
        };
        const note = "Book Appointment event:" + id
        makePayment(total_price, note, user, responseHandler)
    }

    const getAddress = () => {
        const onSuccess = (response) => {
            setPatient(response.data)

            setLoading(false)
            console.log(patient)
        }
        const onFailed = (response) => {
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.patient.get').then(onSuccess).catch(onFailed)
    }

    const createAppointment = (price) => {
        const payload = {
            "event_id": eventdetail.id,
            'doctor_id': doctor.id,
            'patient': selectedpatient,
            'price': price,
            'pure_price': eventdetail.price,
            'date': date.dateString,
            'type': eventdetail.type
        }
        const onSuccess = (response) => {
            setLoading(false)
            console.log(response.data)
            setModalmessage(response.data.message)
            setResultShow(true)
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
            setModalmessage(response.message)
            setResultShow(true)
        }
        console.log(payload)
        setLoading(true)
        APIkit.post('customer.appointment.book', payload).then(onSuccess).catch(onFailed)
    }

    useEffect(() => {
        getDoctorEvent()
        getAddress()
        console.log("KILl")
    }, [])
    useEffect(() => {
        let buffer = []
        event.forEach(item => {
            if (buffer.indexOf(item.date) === -1) buffer.push(item.date)
        });
        setEventDate(buffer)
    }, [event]);
    useEffect(() => {
        if (patient !== undefined && patient.length !== 0)
            selectPatient(patient[0].id)
    }, [patient])
    return (
        <SafeAreaView style={[StandardStyles.container]}>
            <Spinner visible={isloading} />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <Appointment event={eventdetail} action={bookAppointment} type={selectPatient} patient={patient} />
            </Modal>
            <Modal
                testID={'modal'}
                isVisible={resultshow}
                onSwipeComplete={() => setResultShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => setResultShow(false)} message={modalmessage} />
            </Modal>
            <Calendar
                // Initially visible month. Default = Date()
                //     current='2021-09-01'
                //     // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                //     // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                //     // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => { selectDate(day) }}
                // onMonthChange={(month) => { getEventDate(month) }}
                // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                //     monthFormat='yyyy MM'
                // // Handler which gets executed when visible month changes in calendar. Default = undefined
                // onMonthChange={(month) => {console.log('month changed', month)}}
                //                 // Hide month navigation arrows. Default = false
                // hideArrows={true}
                // // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={(direction) => {<Arrow />}}
                // // Do not show days of other months in month page. Default = false
                // hideExtraDays={true}
                // // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                // // day from another month that is visible in calendar page. Default = false
                // disableMonthChange={true}
                // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                // firstDay={1}
                markedDates={markeddate}
            />
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Doctors', data: dailyevent
                    },
                ]}
                renderItem={({ item }) => <EventItem info={item} action={checkEvent} />}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})

export default ScheduleAppointment