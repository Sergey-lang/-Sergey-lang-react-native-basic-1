import { NavigationContainer } from '@react-navigation/native';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { Platform } from 'react-native';
import { THEME } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { BookedScreen } from '../screens/BookedScreen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MTab = createMaterialBottomTabNavigator();
const isIOS = Platform.OS !== 'android';

const navigatorOptions = {
  headerStyle: {
    backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
  },
  headerTintColor: !isIOS ? '#fff' : THEME.MAIN_COLOR,
};

const mainOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
  },
  headerTintColor: !isIOS ? '#fff' : THEME.MAIN_COLOR,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarActiveTintColor: THEME.MAIN_COLOR,
  barStyle: THEME.MAIN_COLOR,
};

const materialOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
  },
  headerTintColor: !isIOS ? '#fff' : THEME.MAIN_COLOR,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarActiveTintColor: '#fff',
  barStyle: THEME.MAIN_COLOR,
  shift: true,
};

function PostNavigator() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}

function BookedNavigator() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen name="Booked" component={BookedScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}


const options = !isIOS ? mainOptions : materialOptions;

export const AppNavigation = () => {
  const tabConfig = !isIOS ? Tab : MTab;
  return (
    <NavigationContainer>
      <tabConfig.Navigator initialRouteName="Post" screenOptions={options}>
        <tabConfig.Screen name="Top" component={PostNavigator} options={{
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={info.color} />
          ),
          tabBarLabel: 'All',
        }} />
        <tabConfig.Screen name="Bottom" component={BookedNavigator} options={{
          tabBarIcon: (info) => (
            <Ionicons name="ios-star" size={25} color={info.color} />
          ),
          tabBarLabel: 'Favourite',
        }} />
      </tabConfig.Navigator>
    </NavigationContainer>
  );
};
