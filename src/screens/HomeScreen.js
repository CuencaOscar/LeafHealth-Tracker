import React from 'react';
import { Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';
import { homeScreenStyles } from '../styles/homeScreenStyles';
import { homeScreenTexts } from '../resources/textResources';
import ButtonList from '../components/ButtonList';


const HomeScreen = () => {
    const buttonData = [
        {
            title: homeScreenTexts.captureUploadButton,
            onPress: () => {
                console.log('ImageUpload Screen')
            },
        },
        {
            title: homeScreenTexts.userManualButton,
            onPress: () => {
                console.log('User Manual Screen')
            },
        },
        {
            title: homeScreenTexts.plantListButton,
            onPress: () => {
                console.log('Plant List Screen')
            },
        },
    ];
    return (
        <LinearGradient
            colors={['#2e7d32', '#388e3c', '#43a047']}
            style={homeScreenStyles.container}
        >
            <Text style={homeScreenStyles.title}>{homeScreenTexts.title}</Text>
            <Image
                source={require('../../assets/images/portada.png')}
                style={homeScreenStyles.backgroundImage}
            />
            <ButtonList buttons={buttonData} />
            <Footer />
        </LinearGradient>
    );
};

export default HomeScreen;
