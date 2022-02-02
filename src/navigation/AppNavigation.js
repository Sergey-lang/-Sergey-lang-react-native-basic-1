import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { Platform } from 'react-native';
import { THEME } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BookedScreen } from '../screens/BookedScreen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const isIOS = Platform.OS !== 'android';

function PostNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
      },
      headerTintColor: !isIOS ? '#fff' : THEME.MAIN_COLOR,
      initialRoute: 'Main',
    }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}

function BookedNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
      },
      headerTintColor: !isIOS ? '#fff' : THEME.MAIN_COLOR,
      initialRoute: 'Booked',
    }}>
      <Stack.Screen name="Booked" component={BookedScreen} />
    </Stack.Navigator>
  );
}

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Post" screenOptions={mainOptions}>
        <Tab.Screen name="Post" component={PostNavigator} options={{
          tabBarIcon: (info) => (
            <Ionicons name="ios-albums" size={25} color={info.color} />
          )
        }} />
        <Tab.Screen name="Booked" component={BookedNavigator} options={{
          tabBarIcon: (info) => (
            <Ionicons name="ios-star" size={25} color={info.color} />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
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
};
