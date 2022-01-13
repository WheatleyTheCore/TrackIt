import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddCollection, AddEntry, EditCollection, EditEntry, Home, Settings, ViewGraphedCollectionData, ViewRawCollectionData} from './screens/Screens'
import { AppDataContextProvider, AppDataContext } from './DataMgmt/AppDataContext';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AppDataContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="AddCollection" component={AddCollection} />
          <Stack.Screen name="AddEntry" component={AddEntry} />
          <Stack.Screen name="EditCollection" component={EditCollection} />
          <Stack.Screen name="EditEntry" component={EditEntry} />
          <Stack.Screen name="ViewGraphedCollectionData" component={ViewGraphedCollectionData} />
          <Stack.Screen name="ViewRawCollectionData" component={ViewRawCollectionData} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppDataContextProvider>
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
