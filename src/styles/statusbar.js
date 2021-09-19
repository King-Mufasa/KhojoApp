import React from 'react';
import { View, StatusBar } from 'react-native';
import { StyleSheet, Platform } from 'react-native';
import { useGlobalState } from '../store/state';

import Color from '../styles/color'
import styles from './GeneralStatusBarColorStyles';


const GeneralStatusBarColor = ({ backgroundColor, ...props }) => {
    const [doctormode] = useGlobalState('doctormode')
    return (
        <View style={[styles.statusBar]}>
            <StatusBar translucent backgroundColor={doctormode ? Color.doctor_primary : Color.primary} {...props} />
        </View>
    );
}

export default GeneralStatusBarColor;