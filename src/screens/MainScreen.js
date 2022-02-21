import React, { useEffect, useLayoutEffect } from 'react';
import { Post } from '../components/Post';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/post';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const isLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Take photo"
            iconName="ios-camera"
            onPress={() => navigation.navigate('Create')} />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Toggle Drawer"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
      ),
      title: 'Home Page',
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} />
      </View>
    );
  }

  return (
    <PostList
      data={allPosts}
      onOpen={openPostHandler}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});



