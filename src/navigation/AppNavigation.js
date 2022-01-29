import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { Platform } from 'react-native';
import { THEME } from '../theme';

const Stack = createNativeStackNavigator();
const isIOS = Platform.OS !== 'android';
export const AppNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={options}>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const options = {
  headerStyle: {
    backgroundColor: isIOS ? '#fff' : THEME.MAIN_COLOR,
  },
  headerTintColor: isIOS ? THEME.MAIN_COLOR : '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
