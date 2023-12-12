import React from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const PlantDetailScreen = ({ route }) => {
  const disease = route.params;
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#2e7d32', '#388e3c', '#43a047']}
      style={styles.container}
    >
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.navigate('PlantList')} />
        <Appbar.Content title={disease.name} />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: disease.imageUrl }} style={styles.image} />
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={styles.title}>Description</Title>
            <Paragraph style={styles.paragraph}>{disease.description}</Paragraph>
            <Title style={styles.title}>Disease spread and conditions</Title>
            <Paragraph style={styles.paragraph}>{disease.causes}</Paragraph>
            <Title style={styles.title}>Symptoms</Title>
            <Paragraph style={styles.paragraph}>{disease.symptoms}</Paragraph>
            <Title style={styles.title}>Management</Title>
            <Paragraph style={styles.paragraph}>{disease.prevention}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  scrollView: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'justify',
    color: 'black',
  },
});

export default PlantDetailScreen;
