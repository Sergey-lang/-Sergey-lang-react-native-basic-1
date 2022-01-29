import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export const MainScreen = ({navigation}) => {
  const goTo = () => {
    navigation.navigate('Post')
  }
  return (
    <View style={styles.center}>
      <Text>Main screen</Text>
      <Button title={'Go'} onPress={goTo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

