import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import ImageUploadScreen from '../screens/ImageUploadScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PlantListScreen from '../screens/PlantListScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import UserManualScreen from '../screens/UserManualScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const insets = useSafeAreaInsets();
    return (
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="PlantList" component={PlantListScreen} />
                <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
                <Stack.Screen name="UserManual" component={UserManualScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
            </Stack.Navigator>
    )
};

export default AppNavigator;
