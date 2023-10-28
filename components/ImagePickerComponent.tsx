import React, { useState } from 'react';
import { Button, Image, View} from 'react-native';
import useImagePicker from './useImagePicker';

function ImagePickerComponent(){
  const { imageBase64, takeImage, editImage, toggle } = useImagePicker();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width:'100%'}}>
      {imageBase64 && <Image source={{ uri: imageBase64 }} style={{width: '100%', height:'80%'}} />}
      <Button title="写真を撮る" onPress={takeImage} />
      {toggle && <Button title="編集" onPress={()=> editImage} />}
    </View>
  );
}

export default ImagePickerComponent;
