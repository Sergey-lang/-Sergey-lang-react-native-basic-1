import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { THEME } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const isIOS = Platform.OS !== 'android';
export const AppHeaderIcon = (props) => (
  <HeaderButton iconSize={24}
                IconComponent={Ionicons}
                color={isIOS ? THEME.MAIN_COLOR : '#fff'}
                {...props}
  />
);


