import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const ViewFullMenu = ({ menuItems }) => {
  const [filter, setFilter] = useState('All');

  const filterItems = () => {
    if (filter === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.courseType === filter);
  };

  return (
    <View>
      <Text style={styles.menuTitle}>Full Menu</Text>

      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setFilter('All')} style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Starters')} style={styles.filterButton}>
          <Text style={styles.filterText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Main_meal')} style={styles.filterButton}>
          <Text style={styles.filterText}>Main Meal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Desserts')} style={styles.filterButton}>
          <Text style={styles.filterText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterItems()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>Course: {item.courseType}</Text>
            <Text style={styles.cardText}>Dish Name: {item.dishName}</Text>
            <Text style={styles.cardText}>Description: {item.description}</Text>
            <Text style={styles.cardText}>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewFullMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  menuTitle: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#F57C00',
    borderRadius: 5,
  },
  filterText: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#F57C00',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    color: 'white',
  },
});
