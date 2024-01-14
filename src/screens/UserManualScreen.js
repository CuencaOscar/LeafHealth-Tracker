import React, { useState, useCallback  } from "react";
import { FlatList, View, SafeAreaView, Text } from "react-native";
import { Appbar } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { plantListScreenStyles } from "../styles/screenStyles";
import PlantCardSkeleton from "../components/PlantCardSkeleton";
import { useNavigation } from '@react-navigation/native';
import UserGuideList from "../components/UserGuideList";
import { user_manual_data } from "../utils/user_manual_data"

const UserManualScreen = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index);
    }
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 15 }).map((_, index) => (
      <PlantCardSkeleton key={index} />
    ));
  };

  const renderPageIndicators = () => {
    return user_manual_data.map((_, index) => (
      <View key={index} style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: currentPage === index ? '#388e3c' : '#c8e6c9',
        marginHorizontal: 5
      }} />
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
          <View style={{ flex: 1 }}>
            <FlatList
              data={user_manual_data}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => <UserGuideList title={item.title}
                imageUrl={item.img_path}
                description={item.description} />}
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {renderPageIndicators()}
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default UserManualScreen;
