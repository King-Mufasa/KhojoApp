import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import APIkit from '../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../../styles/images'
import Colors from '../../styles/color';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveToken } from '../../actions/token';
import { changCount } from '../../actions/count'
import { dispatch, useGlobalState } from '../../store/state';
import config from '../../config';


const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState('');
    const [errors, setError] = useState({ errors: null })
    const [password, setPassword] = useState({ password: '' })

    const [user] = useGlobalState('user');
    const { email, name, image, gender } = user;
    const onUsernameChange = email => {
        dispatch({
            email: email,
            type: 'setEmail'
        })
    }

    const onPasswordChange = password => {
        setPassword(password)
    }

    const navigate = () => {
        const { navigate } = props.navigation
        navigate("Home")
    }

    const onPressLogin = () => {
        const payload = { email, password };
        const onSuccess = ({ data }) => {
            setLoading(false)
            setAuth(true)
            setToken(data.data.token)
            dispatch(
                {
                    name: data.data.name,
                    type: 'setName'
                }
            )
            dispatch(
                {
                    image: {
                        uri: config.baseurl+data.data.image,
                    },
                    type: 'setImage'
                }
            )
            dispatch(
                {
                    gender: data.data.gender,
                    type: 'setGender'
                }
            )
            APIkit.defaults.headers.common["Authorization"] = 'Bearer ' + token
            navigate()
        }

        const onFailue = error => {
            console.log(error.response.data)
            setLoading(false)
            setAuth(false)
            setError(error.response.data)
        }

        setLoading(true)

        APIkit.post('login/', payload).then(onSuccess).catch(onFailue)
    }

    getNonFieldErrorMessage = () => {
        let message = null;
        if (errors.non_field_errors) {
            message = (
                <View style={styles.errorMessageContainerStyle}>
                    {errors.non_field_errors.map(item => (
                        <Text style={styles.errorMessageTextStyle} key={item}>{item}</Text>
                    ))}
                </View>
            )
        }
        return message
    }
    getErrorMessageByField = (field) => {
        // Checks for error message in specified field
        // Shows error message from backend
        let message = null;
        if (errors[field]) {
            message = (
                <View style={styles.errorMessageContainerStyle}>
                    {errors[field].map(item => (
                        <Text style={styles.errorMessageTextStyle} key={item}>
                            {item}
                        </Text>
                    ))}
                </View>
            );
        }
        return message;
    }
    useEffect(() => {
        setAuth(false)
        setLoading(false)
    }, []);
    return (
        <View style={styles.containerStyle}>
            <Spinner visible={loading} />
            {!auth ? <View>
                <View style={styles.logotypeContainer}>
                    <Image
                        source={Images.check}
                        style={styles.logotype}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    // value={state.email}
                    maxLength={256}
                    placeholder="Enter username..."
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    // onSubmitEditing={event =>
                    //     passwordInput.wrappedInstance.focus()
                    // }
                    onChangeText={onUsernameChange}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                />

                {getErrorMessageByField('username')}

                <TextInput
                    // ref={node => {
                    //     passwordInput = node;
                    // }}
                    style={styles.input}
                    // value={state.password}
                    maxLength={40}
                    placeholder="Enter password..."
                    onChangeText={onPasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    blurOnSubmit
                    onSubmitEditing={onPressLogin.bind(this)}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                />

                {getErrorMessageByField('password')}

                {getNonFieldErrorMessage()}

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={onPressLogin.bind(this)}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </View> : <View><Text>Successfully authorized!</Text></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        marginBottom: 32,
    },
    logotypeContainer: {
        alignItems: 'center',
    },
    logotype: {
        maxWidth: 280,
        maxHeight: 100,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6',
    },
    input: {
        height: 50,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 20,
    },
    loginButton: {
        borderColor: Colors.primary,
        borderWidth: 2,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    loginButtonText: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    errorMessageContainerStyle: {
        marginBottom: 8,
        backgroundColor: '#fee8e6',
        padding: 8,
        borderRadius: 4,
    },
    errorMessageTextStyle: {
        color: '#db2828',
        textAlign: 'center',
        fontSize: 12,
    },
})


export default Login;