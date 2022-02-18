import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Post } from './Post';

export const PostList = ({ data, onOpen }) => {

  if (!data.length) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.noItems}>
          No posts...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <FlatList data={data}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={onOpen} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  noItems: {
    fontFamily: 'open-sans-regular',
    textAlign: 'center',
    margin: 10,
    fontSize: 18,
  }
});


