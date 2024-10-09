import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ViewFullMenu from './ViewFullMenu';

const ChefsMenuPage = () => {
  const [courseType, setCourseType] = useState('');
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState([]); 

  const handleAddItem = () => {
    if (dishName && description && price && courseType) {
      setMenuItems([...menuItems, { courseType, dishName, description, price, id: Math.random().toString() }]);
      setDishName('');
      setDescription('');
      setPrice('');
      setCourseType('');
    }
  };

  const handleRemoveItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Chef's Menu</Text>

        <RNPickerSelect
          onValueChange={(value) => setCourseType(value)}
          items={[
            { label: 'Starters', value: 'Starters' },
            { label: 'Main Meal', value: 'Main_meal' },
            { label: 'Desserts', value: 'Desserts' },
          ]}
          value={courseType}
          placeholder={{ label: 'Select Course Type', value: null }}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <Button title="Add Item" onPress={handleAddItem} />

        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>Course: {item.courseType}</Text>
              <Text style={styles.cardText}>Dish Name: {item.dishName}</Text>
              <Text style={styles.cardText}>Description: {item.description}</Text>
              <Text style={styles.cardText}>Price: {item.price}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <ViewFullMenu menuItems={menuItems} />
      </ScrollView>
    </View>
  );
};

export default ChefsMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'white',
    paddingRight: 30,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white'
  },
  card: {
    padding: 20,
    borderWidth: 3,
    borderColor: '#F57C00',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    color: 'white',
  },
  removeButton: {
    backgroundColor: '#F57C00',
    padding: 10,
    color: 'white',
    marginTop: 12,
    borderRadius: 5,
    textAlign: 'center',
  },
});

