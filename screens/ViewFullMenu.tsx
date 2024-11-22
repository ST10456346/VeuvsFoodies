import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ViewFullMenu = () => {
  const [menu, setMenu] = useState([]); 
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [filter, setFilter] = useState('All'); 
  const [selectedDishes, setSelectedDishes] = useState([]);
  const navigation = useNavigation();

  // Load menu from AsyncStorage
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const savedMenu = await AsyncStorage.getItem('menu');
        if (savedMenu) {
          const parsedMenu = JSON.parse(savedMenu);
          setMenu(parsedMenu);
          setFilteredMenu(parsedMenu);
        }
      } catch (error) {
        console.error('Failed to load menu from AsyncStorage:', error);
      }
    };

    loadMenu();
  }, []);

  // Apply filtering based on selected filter
  useEffect(() => {
    if (filter === 'All') {
      setFilteredMenu(menu); 
    } else {
      const filtered = menu.filter(
        (item) => item.courseType?.toLowerCase() === filter.toLowerCase()
      );
      setFilteredMenu(filtered);
    }
  }, [filter, menu]);

  const selectDish = (dish) => {
    const isSelected = selectedDishes.some((item) => item.dishName === dish.dishName);
    if (isSelected) {
      setSelectedDishes((prevState) => prevState.filter((item) => item.dishName !== dish.dishName));
    } else {
      setSelectedDishes((prevState) => [...prevState, dish]);
    }
  };

  // Navigate to ReservePage
  const goToReservePage = () => {
    if (selectedDishes.length > 0) {
      navigation.navigate('ReservePage', { selectedDishes });
    } else {
      alert('Please select at least one dish before proceeding to reservation.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Menu</Text>

      <View style={styles.filterButtonsContainer}>
        {['All', 'Starter', 'Main_Meal', 'Dessert'].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.filterButton,
              filter === value && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(value)} 
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === value && styles.activeFilterButtonText,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredMenu.length > 0 ? (
        <FlatList
          data={filteredMenu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <View style={styles.dishDetails}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text>{item.description}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Course Type: {item.courseType}</Text>

                <TouchableOpacity
                  style={[
                    styles.selectButton,
                    selectedDishes.some((dish) => dish.dishName === item.dishName) &&
                      styles.selectedButton,
                  ]}
                  onPress={() => selectDish(item)}
                >
                  <Text style={styles.selectButtonText}>
                    {selectedDishes.some((dish) => dish.dishName === item.dishName)
                      ? 'Deselect'
                      : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No items in this category</Text>
      )}

      <Button title="Go to Reservations" onPress={goToReservePage} color="#4CAF50"/>

    </View>
  );
};

export default ViewFullMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  menuItem: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  dishDetails: {
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF9800',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
