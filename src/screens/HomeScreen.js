import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';


const HomeScreen = () => {
    return (
        <LinearGradient
            colors={['#2e7d32', '#388e3c', '#43a047']}
            style={styles.container}
        >
            <Text style={styles.title}>LeafHealth Tracker</Text>
            <Image
                source={require('../../assets/images/portada.png')}
                style={styles.backgroundImage}
            />
            <View>
                <TouchableOpacity style={styles.button} onPress={''}>
                    <Text style={styles.buttonText}>Capture or Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={''}>
                    <Text style={styles.buttonText}>User Manual</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.7,
        resizeMode: 'cover',
        position: 'absolute',
        left: -5,
        bottom: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    title: {
        fontSize: 45,
        paddingHorizontal: 18,
        fontWeight: 'bold',
        color: 'white',
        top: 50,
        textAlign: 'center',
    },
    developerText: {
        fontSize: 16,
        color: 'white',
        bottom: 30,
    },
    // Botones
    button: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 10,
        bottom: 80,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HomeScreen;
