import React, { useEffect, useLayoutEffect } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DATA } from '../data';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

export const PostScreen = ({ route, navigation }) => {
  const { postId, booked } = route.params;

  const iconName = booked ? 'ios-star' : 'ios-star-outline';

  const post = DATA.find((p) => p.id === postId);

  useEffect(()=> {
    navigation.setParams( { booked: post.booked })
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Take photo" iconName={iconName} onPress={()=> console.log('Press photo')}/>
        </HeaderButtons>
      ),
      title: 'Post from ' + new Date(route.params.date).toLocaleDateString()
    });
  }, [navigation]);

  const removeHandler = () => {
    Alert.alert(
      'Deleting',
      `Are you sure? Post ${post.id} will delete.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title="Delete" color={THEME.DANGER_COLOR} onPress={removeHandler} />
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

