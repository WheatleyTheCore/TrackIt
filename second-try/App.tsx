import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('testing', value)
  } catch (e) {
    console.log(e)
  }
}


const getData = async (setData) => {
  try {
    const value = await AsyncStorage.getItem('testing')
    if(value !== null) {
      setData(value)
    }
  } catch(e) {
    // error reading value
    console.log(e)
  }
}



function HomeScreen({navigation}) {
  
  storeData('some test data')
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Settings")
      }}>
        <Text>Settings page</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingsScreen() {
  let [storedData, setStoredData] = React.useState()
  getData(setStoredData)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Text>We loaded {storedData} from storage</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
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
