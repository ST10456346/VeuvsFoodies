import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootParamList, 'ViewFullMenu' | 'Chefsloginpage'>;

const Homepage = () => {
  const navigation = useNavigation<NavigationProp>();

  // Navigate to ViewFullMenu 
  const handleNavigateToFullMenu = () => {
    navigation.navigate('ViewFullMenu', { menuItems: [] });  
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Veuv’s Foodies</Text>
        </View>
      </SafeAreaView>

      <View style={styles.mainContent}>
        <Image source={require('../assets/images/VEUVS.png')} style={styles.promoImage} />
      </View>

      <View style={styles.sideButtons}>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToFullMenu}>
          <Text style={styles.buttonText}>View Full Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chefsloginpage')} style={styles.button}>
          <Text style={styles.buttonText}>Chefs Login</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Starters</Text>
        <View style={styles.menuItem}>
          <Text style={styles.foodName}>Chicken Shawarma</Text>
          <Text style={styles.foodFees}>Fee: R49.99</Text>
        </View>

        <View style={styles.menuItem}>
          <Text style={styles.foodName}>The Grand Beef African Style Taco</Text>
          <Text style={styles.foodFees}>Fee: R59.99</Text>
        </View>

        <Text style={styles.sectionTitle}>Main Meals</Text>
        <View style={styles.menuItem}>
          <Text style={styles.foodName}>The Culture Pap and Steak</Text>
          <Text style={styles.foodFees}>Fee: R74.99</Text>
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.foodName}>The Culture Pap and Chicken</Text>
          <Text style={styles.foodFees}>Fee: R74.99</Text>
        </View>

        <Text style={styles.sectionTitle}>Desserts</Text>
        <View style={styles.menuItem}>
          <Text style={styles.foodName}>Black Forest</Text>
          <Text style={styles.foodFees}>Fee: R124.99</Text>
        </View>
        
        <View style={styles.menuItem}>
          <Text style={styles.foodName}>Chocolate Waterfall</Text>
          <Text style={styles.foodFees}>Fee: R149.99</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },

  header: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 10,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  mainContent: {
    alignItems: 'center',
    marginBottom: 10,
  },

  promoImage: {
    width: 300,
    height: 400,
  },

  sideButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },

  button: {
    backgroundColor: '#F57C00',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  menuContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 10,
  },

  menuItem: {
    backgroundColor: '#424242', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },

  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  foodFees: {
    fontSize: 16,
    color: '#BDBDBD',
  },
});
