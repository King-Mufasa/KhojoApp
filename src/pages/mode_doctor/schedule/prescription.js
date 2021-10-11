import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, TextInput, ScrollView, SectionList } from 'react-native'
import PatientDetail from '../../../components/patient/patientdetail'
import { StandardStyles } from '../../../styles/standardstyles'
import Images from '../../../styles/images'
import Fontsize from '../../../styles/fontsize'
import Colors from '../../../styles/color'
import Label from '../../../components/label'
import KButton from '../../../components/KButton'
import Modal from "react-native-modal";
import AddMedicine from '../../../components/modalcontent/newmedicine'
import Icon from 'react-native-vector-icons/FontAwesome'
import AddTest from '../../../components/modalcontent/newtest'
import { LogBox } from 'react-native';
import AwesomeLoading from 'react-native-awesome-loading'
import APIkit from '../../../api/apikit'
import Snackbar from 'react-native-snackbar'
import ModalContent from '../../../components/modalcontent'
const PrescriptionCreator = ({ navigation }) => {

    const [medicines, setMedicines] = useState([])
    const [tests, setTests] = useState([])
    const [diagnosis, setDiagnosis] = useState("")
    const [note, setNote] = useState("")
    const [mmodalshow, setMModalShow] = useState(false)
    const [tmodalshow, setTModalShow] = useState(false)
    const [appointmentid, setAppointmentId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [resultshow, setResultshow] = useState(false)
    const [resultmessage, setResultMessage] = useState("")

    const removeMedecine = (index) => {
        console.log(index)
        let buffer = medicines
        buffer.splice(index, 1);
        setMedicines(buffer)
    }

    const publishPrescription = () => {
        if (diagnosis.length === 0) {
            Snackbar.show({
                text: 'Please input all detail information',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        const payload = {
            id: appointmentid,
            diagnosis: diagnosis,
            medicines: JSON.stringify(medicines),
            tests: JSON.stringify(tests),
            note: note
        }
        const onSuccess = (response) => {
            console.log(response.data)
            setLoading(false)
            setResultMessage("Prescription published successfully.")
            setResultshow(true)
        }
        const onFailed = (response) => {
            console.log(response)
            setResultMessage("Failed to Publish prescription")
            setResultshow(true)
            setLoading(false)
        }
        setLoading(true)
        console.log(payload)
        APIkit.post('doctor.prescription.publish/', payload).then(onSuccess).catch(onFailed)
    }
    useEffect(() => {
        if (navigation.state.params !== undefined && navigation.state.params.id !== null)
            setAppointmentId(navigation.state.params.id)
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    return (
        <View style={StandardStyles.container}>
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <Modal
                testID={'modal'}
                isVisible={mmodalshow}
                onSwipeComplete={() => { setMModalShow(false) }}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <AddMedicine setmedicine={setMedicines} medicine={medicines} close={() => { setMModalShow(false) }} />
            </Modal>
            <Modal
                testID={'modal'}
                isVisible={tmodalshow}
                onSwipeComplete={() => { setTModalShow(false) }}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <AddTest settest={setTests} medicine={tests} close={() => { setTModalShow(false) }} />
            </Modal>
            <Modal
                testID={'modal'}
                isVisible={resultshow}
                onSwipeComplete={() => setResultshow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => setResultshow(false)} message={resultmessage} />
            </Modal>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={{ uri: Images.default_symbol }} style={styles.symbol} />
                    <Text style={[Fontsize.large, styles.title]}>Prescription</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Label name="Manual Diagnosis" />
                <View style={styles.rightblock}>
                    <TextInput multiline={true} value={diagnosis} onChangeText={setDiagnosis} />
                </View>
                <Label name="Medicines Prescribed" />
                <View style={styles.leftblock}>
                    <SectionList
                        scrollEnabled={false}
                        style={[styles.scrollView,]}
                        sections={[
                            {
                                title: '', data: medicines
                            },
                        ]}
                        renderItem={({ item, index }) =>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text style={[Fontsize.mini, { width: "30%" }]}>{item.name ? item.name : ""}</Text>
                                <Text style={[Fontsize.mini, { width: "20%" }]}>{item.quantity ? item.quantity : ""}</Text>
                                <Text style={[Fontsize.mini, { width: "15%" }]}>{item.doses ? item.doses : ""}</Text>
                                <Text style={[Fontsize.mini, { width: "20%" }]}>{item.remarks ? item.remarks : ""}</Text>
                                <View style={{ width: "15%", alignItems: 'center' }}><Icon name="trash-o" size={20} color={Colors.danger} onPress={() => { removeMedecine(index) }} /></View>
                            </View>
                        }
                        renderSectionHeader={({ section }) =>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "30%" }]}>Medicine Name</Text>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "20%" }]}>Quantity</Text>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "15%" }]}>Doses</Text>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "20%" }]}>Remarks</Text>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "15%" }]}>Action</Text>
                            </View>}
                        keyExtractor={(item, index) => index}
                    />
                    <KButton name="+" style={styles.addbtn} click={() => { setMModalShow(true) }} />
                </View>
                <Label name="Test Prescribed" />
                <View style={styles.rightblock}>
                    <SectionList
                        scrollEnabled={false}
                        style={[styles.scrollView,]}
                        sections={[
                            {
                                title: '', data: tests
                            },
                        ]}
                        renderItem={({ item, index }) =>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text style={[Fontsize.mini, { width: "45%" }]}>{item.name ? item.name : ""}</Text>
                                <Text style={[Fontsize.mini, { width: "40%" }]}>{item.remarks ? item.remarks : ""}</Text>
                                <View style={{ width: "15%", alignItems: 'center' }}><Icon name="trash-o" size={20} color={Colors.danger} onPress={() => { removeMedecine(index) }} /></View>
                            </View>
                        }
                        renderSectionHeader={({ section }) =>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "45%" }]}>Medicine Name</Text>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "40%" }]}>Remarks</Text>
                                <Text style={[styles.sectionHeader, Fontsize.mini, { width: "15%" }]}>Action</Text>
                            </View>}
                        keyExtractor={(item, index) => index}
                    />
                    <KButton name="+" style={styles.addbtn} click={() => { setTModalShow(true) }} />
                </View>
                <Label name="Doctor's Notes" />
                <View style={styles.leftblock}>
                    <TextInput multiline={true} value={note} onChangeText={setNote} />
                </View>
            </ScrollView>
            <KButton name="Save" style={{ marginHorizontal: 10 }} click={publishPrescription} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        flexDirection: 'row',
        width: '100%',
    },
    title: {
        color: Colors.doctor_primary,
        alignSelf: 'center',
        textAlign: 'center',
        width: '60%',
        fontWeight: 'bold'
    },
    symbol: {
        width: 80,
        height: 80
    },
    rightblock: {
        margin: 10,
        padding: 5,
        borderRadius: 15,
        borderColor: Colors.lightdark,
        borderWidth: 1,
        borderLeftWidth: 0,
        paddingStart: 20
    },
    leftblock: {
        margin: 10,
        padding: 5,
        borderRadius: 15,
        borderColor: Colors.lightdark,
        borderWidth: 1,
        borderRightWidth: 0,
        paddingStart: 20
    },
    input: {

    },
    addbtn: {
        width: '30%',
        alignSelf: 'center'
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    sectionHeader: {
        fontWeight: 'bold',
        color: Colors.lightdark
    }
})


export default PrescriptionCreator