import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, Image } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import StandardStyles from '../../../styles/standardstyles'
import Label from '../../../components/label'
import KButton from '../../../components/KButton'
import Images from '../../../styles/images'
import { screenWidth } from '../../../module/IntroSlider/src/themes'
import Colors from '../../../styles/color'
import APIkit from '../../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay'
import AwesomeLoading from 'react-native-awesome-loading';
import { dispatch, useGlobalState } from '../../../store/state'
import Snackbar from 'react-native-snackbar'
const Register = (props) => {
    const [token, setToken] = useState("")
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [emailVaild, setEmailValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [confirmValid, setConfirmValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const [user] = useGlobalState('user');

    const saveTokenToDatabase = (token) => {
        setToken(token)
    }



    const emailValidate = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
            setEmail(email)
            setEmailValid(false)
            return
        }
        else {
            setEmail(email)
            console.log("Email is Correct");
            setEmailValid(true)
        }
    }

    const nameValidate = (name) => {
        setNameValid(name.length > 3)
        setName(name)
    }
    const passwordValidate = (password) => {
        setPasswordValid(password.length > 5)
        setPassword(password)
    }
    const confirmValidate = (confirm) => {
        setConfirmValid(confirm == password)
        setConfirm(confirm)
    }

    const register = () => {
        const payload = { email: email, name: name, password: password, token: token, phone: user.phone }
        console.log(payload)
        const onSuccess = (data) => {
            setLoading(false)
            const { navigate } = props.navigation
            dispatch(
                {
                    name: name,
                    type: 'setName'
                }
            )
            dispatch(
                {
                    email: email,
                    type: 'setEmail'
                }
            )
            dispatch(
                {
                    id:data.data.data.id,
                    type:'setId'
                }
            )
            APIkit.defaults.headers.common["Authorization"] = 'Bearer ' + data.data.data.token
            navigate('Home')
        }
        const onFailed = (data) => {
            setLoading(false)
            console.log(data)
            Snackbar.show({
                text: "Error while register",
                duration: Snackbar.LENGTH_SHORT,
            });
        }
        setLoading(true)
        APIkit.post('register', payload).then(onSuccess).catch(onFailed)
    }

    useEffect(() => {
        console.log(user.phone)
        messaging()
            .getToken()
            .then(token => {
                return saveTokenToDatabase(token);
            });

        return messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        })
    }, [])
    return (
        <View style={StandardStyles.container}>
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <View style={styles.container}>
                <Image source={{ uri: Images.default_symbol }} style={styles.logo} />
                <Label size="small" name="Email" />
                <TextInput onChangeText={emailValidate} style={[StandardStyles.input, { borderColor: emailVaild ? Colors.success : email.length == 0 ? Colors.lightgrey : Colors.danger }]} textContentType="emailAddress" />
                <Label size="small" name="Name" />
                <TextInput onChangeText={nameValidate} style={[StandardStyles.input, { borderColor: nameValid ? Colors.success : name.length == 0 ? Colors.lightgrey : Colors.danger }]} textContentType="name" />
                <Label size="small" name="Password" />
                <TextInput onChangeText={passwordValidate} style={[StandardStyles.input, { borderColor: passwordValid ? Colors.success : password.length == 0 ? Colors.lightgrey : Colors.danger }]} textContentType="password" secureTextEntry />
                <Label size="small" name="ConfirmPassword" />
                <TextInput onChangeText={confirmValidate} style={[StandardStyles.input, { borderColor: confirmValid ? Colors.success : confirm.length == 0 ? Colors.lightgrey : Colors.danger }]} textContentType="password" secureTextEntry />
                <KButton name="Register" click={register} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignContent: "center",
    },
    logo: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        alignSelf: 'center'
    }
})


export default Register