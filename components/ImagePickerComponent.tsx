import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Linking,
  Platform,
  Text,
  View,
} from "react-native";
import { launchCameraAsync, MediaTypeOptions } from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from "expo-camera";

const requestCameraPermission = async () => {
  if (Platform.OS === "ios") {
    // iOSの場合
    Alert.alert(
      "カメラの使用許可がありません",
      "設定からカメラの使用を許可してください",
      [
        {
          text: "設定を開く",
          onPress: () => Linking.openURL("app-settings:"),
        },
        {
          text: "キャンセル",
          onPress: () => console.log("ユーザーが拒否しました"),
          style: "cancel",
        },
      ]
    );
  } else if (Platform.OS === "android") {
    Alert.alert(
      "許可が拒否されました",
      "設定 > アプリ > [アプリの名前] > 許可 > カメラへのアクセスを有効にしてください。",
      [
        {
          text: "設定に移動",
          onPress: () => {
            // アプリの設定画面に飛ばす
            Linking.openURL(`app-settings://`);
          },
        },
        {
          text: "キャンセル",
          onPress: () => console.log("ユーザーが拒否しました"),
          style: "cancel",
        },
      ]
    );
  }
};
function ImagePickerComponent() {
  const [imageBase64, setImageBase64] = useState("");

  const takeImage = async () => {
    const { granted, canAskAgain } =
      await Camera.requestCameraPermissionsAsync();
    /**
     * canAskAgain: 再度許可を求めることができるかどうか
     */
    if (!granted && canAskAgain) return requestCameraPermission();
    if (!granted) return Alert.alert("カメラの使用許可がありません。");

    const imagePickerResult = await launchCameraAsync({
      allowsEditing: false,
      base64: true,
      mediaTypes: MediaTypeOptions.Images,
    });

    if (imagePickerResult.canceled)
      return console.log("撮影をキャンセルしました");

    // TODO: androidの場合にassetsがに情報があるにも関わらずfalseになる
    // if (imagePickerResult.assets && imagePickerResult.assets.length > 0)
    //   return Alert.alert("画像の取得に失敗しました");

    const uri = imagePickerResult.assets[0].uri;
    const compressedImage = await ImageManipulator.manipulateAsync(uri, [], {
      base64: true,
      compress: 1.0,
      format: ImageManipulator.SaveFormat.PNG,
    });
    setImageBase64("data:image/png;base64," + compressedImage.base64);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}>
      {imageBase64 ? (
        <Image
          source={{ uri: imageBase64 }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Text>Loading...</Text>
      )}

      <Button title="写真を撮る" onPress={takeImage} />
    </View>
  );
}

export default ImagePickerComponent;
