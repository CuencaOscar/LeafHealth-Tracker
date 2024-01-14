import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
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
        {Platform.OS === 'android' && (
          <Appbar.BackAction onPress={() => navigation.navigate('PlantList')} />
        )}
        <Appbar.Content title={disease.name} titleStyle={styles.title_header}/>
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
    aspectRatio: 16 /16,
    borderRadius: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  cardContent: {
    padding: 16,
  },
  title_header: {
    textAlign: 'center',
    color: 'white',
    fontSize: Platform.OS === 'android' ? 20 : 24,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32',
  },
  paragraph: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'justify',
    color: 'black',
    lineHeight: Platform.OS === 'android' ? 25 : 30,
  },
});

export default PlantDetailScreen;
