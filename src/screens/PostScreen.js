import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, toggleBooked } from '../store/actions/post';

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const postId = route.params.postId;

  const bookedPost = useSelector((state) => state.post.bookedPosts
    .some((post) => post.id === postId));

  const currentPost = useSelector((state) => state.post.allPosts
    .find((p) => p.id === postId));

  const selectedIconName = bookedPost ? 'ios-star' : 'ios-star-outline';

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    navigation.setParams({ booked: bookedPost });
  }, [bookedPost]);

  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler, postId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Take photo"
            iconName={selectedIconName}
            onPress={toggleHandler}
          />
        </HeaderButtons>
      ),
      title: 'Post from ' + new Date(route.params.date).toLocaleDateString()
    });
  }, [navigation, bookedPost]);

  if (!currentPost) {
    return null;
  }

  const removeHandler = () => {
    Alert.alert(
      'Deleting',
      `Are you sure? Post ${currentPost.id} will delete.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress() {
            dispatch(removePost(postId));
            navigation.navigate('Main');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: currentPost.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{currentPost.text}</Text>
      </View>
      <Button
        title="Delete"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-regular',
  }
});

