import React from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';
import { HomeScreenStyles } from '../styles/HomeScreenStyles';


const HomeScreen = () => {
    return (
        <LinearGradient
            colors={['#2e7d32', '#388e3c', '#43a047']}
            style={HomeScreenStyles.container}
        >
            <Text style={HomeScreenStyles.title}>LeafHealth Tracker</Text>
            <Image
                source={require('../../assets/images/portada.png')}
                style={HomeScreenStyles.backgroundImage}
            />
            <View style={{marginBottom: 10}}>
                <TouchableOpacity style={HomeScreenStyles.button} onPress={''}>
                    <Text style={HomeScreenStyles.buttonText}>Capture or Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HomeScreenStyles.button} onPress={''}>
                    <Text style={HomeScreenStyles.buttonText}>User Manual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={HomeScreenStyles.button} onPress={''}>
                    <Text style={HomeScreenStyles.buttonText}>Plant List</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </LinearGradient>
    );
};

export default HomeScreen;
