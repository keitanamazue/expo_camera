import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImagePickerComponent from './components/ImagePickerComponent';

function App() {
  return (
    <View style={styles.container}>
      <ImagePickerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;


