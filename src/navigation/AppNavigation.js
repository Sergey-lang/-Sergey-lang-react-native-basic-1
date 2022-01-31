import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { Platform } from 'react-native';
import { THEME } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BookedScreen } from '../screens/BookedScreen';
import { Ionicons } from '@expo/vector-icons';

const isIOS = Platform.OS !== 'android';

const Post = createNativeStackNavigator();
const Booked = createNativeStackNavigator();

function PostStackScreen() {
  return (
    <Post.Navigator>
      <Post.Screen name="Home" component={MainScreen} />
      <Post.Screen name="Post" component={PostScreen} />
    </Post.Navigator>
  );
}

function BookedStackScreen() {
  return (
    <Booked.Navigator>
      <Booked.Screen name="Booked" component={BookedScreen} />
      <Booked.Screen name="Post" component={PostScreen} />
    </Booked.Navigator>
  );
}

const BottomNavigation = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const AppNavigation = () => {

  return (
    <NavigationContainer>
      <BottomNavigation.Navigator screenOptions={mainOptions}>
        <BottomNavigation.Screen name="Post"
                                 component={PostStackScreen}
                                 options={{tabBarIcon: (info) => <Ionicons name="ios-albums" size={25} color={info.tintColor}/>}}
        />
        <BottomNavigation.Screen name="Booked"
                                 component={BookedStackScreen}
                                 options={{tabBarIcon: (info) => <Ionicons name="ios-star" size={25} color={info.tintColor}/>}}
        />
      </BottomNavigation.Navigator>
    </NavigationContainer>
  );
};

const mainOptions = {
  headerStyle: {
    backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
  },
  headerTintColor: isIOS ? THEME.MAIN_COLOR : '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
