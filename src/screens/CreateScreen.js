import React, { useLayoutEffect, useState } from 'react';
import {
  Button,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/actions/post';

const img = 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Toggle Drawer"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      title: 'Create post',
    });
  }, [navigation]);

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      booked: false,
      text,
      img,
    };
    dispatch(addPost(post));
    navigation.navigate('Main');
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new screen</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Write note text"
            value={text}
            onChangeText={setText}
            multiline
          />
          <Image
            style={{ width: '100%', height: 200, marginBottom: 10 }}
            source={{ uri: img }}
          />
          <Button
            title="Create new post"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-sans-regular'
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  }
});

