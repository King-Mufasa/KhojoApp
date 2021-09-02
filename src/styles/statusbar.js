import React from 'react';
import { View, StatusBar } from 'react-native';
import { StyleSheet, Platform } from 'react-native';

import Color from '../styles/color'
import styles from './GeneralStatusBarColorStyles';

const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar]}>
        <StatusBar translucent backgroundColor={Color.primary} {...props} />
    </View>
    );

export default GeneralStatusBarColor;