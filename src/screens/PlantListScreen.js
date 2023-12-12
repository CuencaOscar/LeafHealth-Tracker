import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import PlantCard from '../components/PlantCard';
import { LinearGradient } from 'expo-linear-gradient';
import { plantListScreenStyles } from '../styles/screenStyles';
import PlantCardSkeleton from '../components/PlantCardSkeleton';

const PlantListScreen = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'plants'));
        const fetchedPlants = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlants(fetchedPlants);
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <PlantCardSkeleton key={index} />
    ));
  };

  return (
    <LinearGradient
      colors={['#2e7d32', '#388e3c', '#43a047']}
      style={plantListScreenStyles.container}
    >
      {loading ? (
        <View>{renderSkeletons()}</View>
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlantCard plant={item} />
          )}
        />
      )}
    </LinearGradient>
  );
};

export default PlantListScreen;
