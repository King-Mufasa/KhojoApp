import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Category from '../category'
import Images from '../../styles/images'
type Props = {
  onPress: () => any;
};

const SelectPrescription: React.FC<Props> = props => (
  <View style={styles.content}>
    <Category click={props.camera} name="Camera" icon={Images.ico_camera}/>
    <Category click={props.gallery} name="Gallery" icon={Images.ico_gallery}/>
  </View>
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection:'row'
  },
  contentTitle: {
    textAlign:'center',
    fontSize: 20,
    marginBottom: 12,
  },
});

export default SelectPrescription;