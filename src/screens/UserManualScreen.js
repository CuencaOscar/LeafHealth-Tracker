import React, { useState, useEffect } from "react";
import { FlatList, View, SafeAreaView } from "react-native";
import { Appbar } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { plantListScreenStyles } from "../styles/screenStyles";
import PlantCardSkeleton from "../components/PlantCardSkeleton";
import { useNavigation } from '@react-navigation/native';
import UserGuideList from "../components/UserGuideList";
import { user_manual_data } from "../utils/user_manual_data"

const UserManualScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const renderSkeletons = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <PlantCardSkeleton key={index} />
    ));
  };

  return (
    <LinearGradient
      colors={["#2e7d32", "#388e3c", "#43a047"]}
      style={{ ...plantListScreenStyles.container }}
    >
      <Appbar.Header style={plantListScreenStyles.appbar}>
        {Platform.OS === 'android' && (
          <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        )}
        <Appbar.Content title={'User Manual'} titleStyle={plantListScreenStyles.title_header} />
      </Appbar.Header>
      <SafeAreaView style={{ ...plantListScreenStyles.container }}>
        {loading ? (
          <View>{renderSkeletons()}</View>
        ) : (
          <FlatList
            data={user_manual_data}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <UserGuideList title={item.title}
              imageUrl={item.img_path}
              description={item.description} />}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserManualScreen;
