import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './screens/Homepage';
import Chefsloginpage from './screens/Chefsloginpage';
import ViewFullMenu from './screens/ViewFullMenu';
import ChefsMenuPage from './screens/ChefsMenu';
import menupage from './screens/menupage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Homepage'>
        <Stack.Screen name='Homepage' component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name='Chefsloginpage' component={Chefsloginpage}/>
        <Stack.Screen name='ViewFullMenu' component={ViewFullMenu}/>
        <Stack.Screen name= 'chefsmenu' component={ChefsMenuPage}/>
        <Stack.Screen name='Menupage' component={menupage}/>

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
