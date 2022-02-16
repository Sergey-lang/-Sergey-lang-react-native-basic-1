import React, { useLayoutEffect } from 'react';
import { Post } from '../components/Post';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { useSelector } from 'react-redux';

export const BookedScreen = ({ navigation }) => {

  const bookedPosts = useSelector((state) => state.post.bookedPosts);

  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Toggle Drawer"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
      ),
      title: 'Favourites',
    });
  }, [navigation]);

  return <PostList data={bookedPosts} onOpen={openPostHandler} />;
};

