import React, { useLayoutEffect } from 'react';
import { DATA } from '../data';
import { Post } from '../components/Post';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {

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

  const data = DATA.filter((post) => post.booked);

  return <PostList data={data} onOpen={openPostHandler} />;
};

