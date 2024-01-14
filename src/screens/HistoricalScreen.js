import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, FlatList, SafeAreaView } from 'react-native';
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import PlantCard from "../components/PlantCard";
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { plantListScreenStyles } from '../styles/screenStyles';
import PlantCardSkeleton from '../components/PlantCardSkeleton';
import HistoricalCard from '../components/HistoricalCard';

const HistoricalScreen = () => {
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistorical = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "historical"));
        const fetchedHistorical = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistorical(fetchedHistorical);
      } catch (error) {} finally {
        setLoading(false);
      }
    };
    fetchHistorical();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <PlantCardSkeleton key={index} />
    ));
  };

  return (
    <LinearGradient
      colors={['#2e7d32', '#388e3c', '#43a047']}
      style={{ ...plantListScreenStyles.container }}
    >
      <Appbar.Header style={plantListScreenStyles.appbar}>
        {Platform.OS === 'android' && (
          <Appbar.BackAction onPress={() => navigation.navigate('ImageUpload')} />
        )}
        <Appbar.Content title={'Historical'} titleStyle={plantListScreenStyles.title_header} />
      </Appbar.Header>
      <SafeAreaView style={{ ...plantListScreenStyles.container }}>
        {loading ? (
          <View>{renderSkeletons()}</View>
        ) : (
          <FlatList
            data={historical}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HistoricalCard historical={item} />}
          />
        )}
      </SafeAreaView>
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

export default HistoricalScreen;
