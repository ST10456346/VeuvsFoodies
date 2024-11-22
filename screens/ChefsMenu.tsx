import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const ChefsMenu = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [courseType, setCourseType] = useState('Starter');
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Starter', value: 'Starter' },
    { label: 'Main Meal', value: 'Main Meal' },
    { label: 'Dessert', value: 'Dessert' },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('menu');
        if (savedMenu) {
          setMenu(JSON.parse(savedMenu));
        }
      } catch (error) {
        console.log('Failed to load menu from AsyncStorage:', error);
      }
    };

    loadMenu();
  }, []);

  const addDish = async () => {
    if (dishName && description && price) {
      const newDish = {
        dishName,
        description,
        price,
        courseType,
      };

      const newMenu = [...menu, newDish];
      setMenu(newMenu);

      try {
        await AsyncStorage.setItem('menu', JSON.stringify(newMenu));
        Alert.alert('Success', 'Dish added to menu successfully!');
        setDishName('');
        setDescription('');
        setPrice('');
        setCourseType('Starter');
      } catch (error) {
        Alert.alert('Error', 'Failed to save dish. Try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill all fields before adding the dish.');
    }
  };

  const removeDish = async (index) => {
    const updatedMenu = menu.filter((_, i) => i !== index);
    setMenu(updatedMenu);

    try {
      await AsyncStorage.setItem('menu', JSON.stringify(updatedMenu));
      Alert.alert('Success', 'Dish removed successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove dish. Try again.');
    }
  };

  const navigateToViewFullMenu = () => {
    navigation.navigate('ViewFullMenu', { menu });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name"
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Course Type</Text>
      <DropDownPicker
        open={open}
        value={courseType}
        items={items}
        setOpen={setOpen}
        setValue={setCourseType}
        setItems={setItems}
        placeholder="Select a course type"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      <Button title="Add Dish" onPress={addDish} />

      <FlatList data={menu} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
      <Card style={styles.card}>
        <Card.Title title={item.dishName} />
        <Card.Content>
        <Text>Course Type: {item.courseType}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Price: R{item.price}</Text>
        </Card.Content>
        <Card.Actions>

          <Button title="Remove Dish" color="#F57C00" onPress={() => removeDish(index)} />
            
        </Card.Actions>
      </Card>
    )}
  />

      <Button title="View Full Menu" onPress={navigateToViewFullMenu} color="#F57C00" />
    </View>
  );
};

export default ChefsMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2C2C2C',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    borderColor: '#FFFFFF',
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#FFFFFF',
  },
  card: {
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 3,
    backgroundColor: '#ccc',
  },
});
