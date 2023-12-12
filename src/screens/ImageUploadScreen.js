import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GreenLeavesSvgAndroid, GreenLeavesSvgiOS } from '../../assets/svg/GreenLeaves';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { imageUploadScreenTexts } from '../resources/textResources';
import ButtonList from '../components/ButtonList';

const ImageUploadScreen = () => {
  const insets = useSafeAreaInsets();

  console.log('Los datos que tengo son: ', insets)

  const buttonImageUploadScreen = [
    {
      title: imageUploadScreenTexts.takePhotoButton,
      onPress: () => {
        console.log('Take')
      },
    },
    {
      title: imageUploadScreenTexts.uploadFromGalerryButton,
      onPress: () => {
        console.log('Load')
      },
    },
  ];

  return (
    <LinearGradient
      colors={['#2e7d32', '#388e3c', '#43a047']}
      style={styles.container}
    >
      <View style={{ top: insets.top }}>
        <Text style={styles.titleText}>{imageUploadScreenTexts.title}</Text>
        <View style={styles.svgContainer}>
          <View style={styles.shadowContainer}>
            {Platform.OS === 'android' ? (
              <>
                <GreenLeavesSvgAndroid />
                <GreenLeavesSvgiOS />
              </>
            ) : (
              <GreenLeavesSvgiOS />
            )}
          </View>
          <View style={{ flex: 0.5, marginBottom: 10, justifyContent: 'flex-end' }}>
            <ButtonList buttons={buttonImageUploadScreen} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  titleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
  },
  svgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowContainer: {
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default ImageUploadScreen;
