import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DATA } from '../data';
import { Post } from '../components/Post';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';

export const MainScreen = ({ navigation }) => {

  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Take photo" iconName="ios-camera" onPress={() => console.log('Press photo')} />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => console.log('Press photo')} />
        </HeaderButtons>
      ),
      title: 'Home',
    });
  }, [navigation]);

  return (
    <View style={styles.wrap}>
      <FlatList data={DATA}
                keyExtractor={(post) => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
});

