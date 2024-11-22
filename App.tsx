import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './screens/Homepage';
import Chefsloginpage from './screens/Chefsloginpage';
import ViewFullMenu from './screens/ViewFullMenu';
import ChefsMenu from './screens/ChefsMenu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservePage from './screens/ReservePage';
import PaymentPage from './screens/PaymentPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Homepage'>
        <Stack.Screen name='Homepage' component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name='Chefsloginpage' component={Chefsloginpage}/>
        <Stack.Screen name='ViewFullMenu' component={ViewFullMenu}/>
        <Stack.Screen name= 'ChefsMenu' component={ChefsMenu}/>
        <Stack.Screen name='ReservePage' component={ReservePage}/>
        <Stack.Screen name='PaymentPage' component={PaymentPage}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
