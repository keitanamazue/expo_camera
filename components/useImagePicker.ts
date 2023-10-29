import { useState } from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { Camera } from 'expo-camera'

const useImagePicker = () => {
  const [imageBase64, setImageBase64] = useState<string>('')

  const { showActionSheetWithOptions } = useActionSheet()

  const _resizeImage = async (uri: string) => {//写真をbase64に変換する
    const manipResult = await ImageManipulator.manipulateAsync(uri ,[ ], {
      base64: true,
      compress: 1.0,
      format: ImageManipulator.SaveFormat.JPEG
    })
    setImageBase64('data:image/png;base64,' + manipResult.base64)
  }

  

  const takeEditImage = async () => { //写真を撮影してから編集 ＆ レポジトリに保存
    try {
      const { status } = await Camera.requestCameraPermissionsAsync()
      if (status == 'granted') {
        const result = await launchCameraAsync({
          allowsEditing: true,
          aspect:[1,1],
          mediaTypes: MediaTypeOptions.Images
        })
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            if (uri) {
                await _resizeImage(uri)
            }
        }    
      } else {
        alert('No access to camera')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const takeImage = async () => { //写真を撮影 ＆ レポジトリに保存
    try {
      const { status } = await Camera.requestCameraPermissionsAsync()
      if (status == 'granted') {
        const result = await launchCameraAsync({
          allowsEditing: false,
          mediaTypes: MediaTypeOptions.Images
        })
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            if (uri) {
                await _resizeImage(uri)
            }
        }    
      } else {
        alert('No access to camera')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { imageBase64, takeImage , takeEditImage}
}

export default useImagePicker