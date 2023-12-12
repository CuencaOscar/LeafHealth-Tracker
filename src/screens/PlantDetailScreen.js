import React from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PlantDetailScreen = ({ route }) => {
  const disease  = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('PlantList')} />
        <Appbar.Content title={disease.name} />
      </Appbar.Header>
      <ScrollView>
        <Image source={{ uri: disease.imageUrl }} style={styles.image} />
        <Card style={styles.card}>
          <Card.Content>
            <Title>Descripción</Title>
            <Paragraph>{disease.description}</Paragraph>
            <Title>Causas</Title>
            <Paragraph>{disease.causes}</Paragraph>
            <Title>Síntomas</Title>
            <Paragraph>{disease.symptoms}</Paragraph>
            <Title>Prevención y tratamiento</Title>
            <Paragraph>{disease.prevention}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  card: {
    margin: 16,
  },
});

export default PlantDetailScreen;
