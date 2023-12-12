import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import PlantCard from '../components/PlantCard';
import { LinearGradient } from 'expo-linear-gradient';
import { plantListScreenStyles } from '../styles/screenStyles';

const PlantListScreen = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'plants'));
        const fetchedPlants = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlants(fetchedPlants);
        console.log('Las plantas son: ', plants)
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <LinearGradient
      colors={['#2e7d32', '#388e3c', '#43a047']}
      style={plantListScreenStyles.container}
    >
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard plant={item} />
        )}
      />
    </LinearGradient>
  );
};

export default PlantListScreen;
