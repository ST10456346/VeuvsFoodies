import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const ReservePage = () => {
  const route = useRoute();
  const { selectedDishes, totalPrice } = route.params || {};

  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [reservedDishes, setReservedDishes] = useState(selectedDishes || []);
  const [reservedTotalPrice, setReservedTotalPrice] = useState(totalPrice || 0);

  const navigation = useNavigation();

  useEffect(() => {
    if (selectedDishes && selectedDishes.length > 0) {
      setReservedDishes(selectedDishes);
      const total = selectedDishes.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
      setReservedTotalPrice(total);
    }
  }, [selectedDishes]);

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(cellphone)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit cellphone number.');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (isNaN(numPeople) || numPeople <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid number of people.');
      return false;
    }
    return true;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const goToPaymentPage = () => {
    if (validateInputs()) {
      navigation.navigate('PaymentPage', { 
        reservedDishes, 
        totalPrice: reservedTotalPrice, 
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation</Text>
      <ScrollView>
        {reservedDishes && reservedDishes.length > 0 ? (
          <View>
            {reservedDishes.map((dish, index) => (
              <View key={index} style={styles.dishCard}>
                <Text style={styles.dishName}>{dish.dishName}</Text>
                <Text>{dish.description}</Text>
                <Text style={styles.dishPrice}>Price: R{dish.price}</Text>
                <Text style={styles.dishType}>Course Type: {dish.courseType}</Text>
              </View>
            ))}
            <Text style={styles.total}>Total: R{reservedTotalPrice.toFixed(2)}</Text>
          </View>
        ) : (
          <Text>No dishes reserved yet.</Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Enter your Full name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Enter your Cellphone number" value={cellphone} onChangeText={setCellphone} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Enter your Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Number of People coming" value={numPeople} onChangeText={setNumPeople} keyboardType="numeric" />
        </View>

        <View style={styles.dateContainer}>
          <Button title="Choose Date and Time" onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.dateText}>Selected: {date.toLocaleString()}</Text>
        </View>
      </ScrollView>

      <Button title="Go to Payments" onPress={goToPaymentPage} color="#4CAF50" />
    </View>
  );
};

export default ReservePage;

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
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dishPrice: {
    fontSize: 16,
    marginTop: 5,
    color: '#4CAF50',
  },
  dishType: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFFFFF',
  },
  dateContainer: {
    marginTop: 20,
    color: '#FFFFFF',
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
});
