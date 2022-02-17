import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null);
  const [st, requestPermission] = ImagePicker.useCameraPermissions();
  const askPermission = async () => {
    const { status } = await requestPermission();

    console.log(status);
    if (status !== 'granted') {
      Alert.alert('Error. You don\'t get permission');
      return false;
    }

    return true;
  };

  const takePhoto = async () => {
    const hasPermissions = await askPermission();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    });

    setImage(img.uri);
    onPick(img.uri);
  };

  return (
    <View style={styles.wrapper}>
      <Button title="Make photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  }
});
