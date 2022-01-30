import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { DATA } from '../data';
import { Post } from '../components/Post';

export const MainScreen = ({ navigation }) => {
  const goTo = () => {
    navigation.navigate('Post');
  };
  return (
    <View style={styles.wrap}>
      <FlatList data={DATA} keyExtractor={post => post.id.toString()} renderItem={({ item }) => <Post post={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
});

