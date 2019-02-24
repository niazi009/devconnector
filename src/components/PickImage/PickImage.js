import React, { Component } from "react";
import { View, Text, Image, Button, StyleSheet, Platform } from "react-native";
import ImagePicker from "react-native-image-picker";

import RNFetchBlob from "react-native-fetch-blob";
import Firebase from "firebase";
import "firebase/storage";

/*var config = {
  apiKey: "AIzaSyDOPWQtlS9RECcDebMopEV79DdLnyXRaa0",
  authDomain: "rnative-1549466028052.firebaseapp.com",
  databaseURL: "https://rnative-1549466028052.firebaseio.com",
  projectId: "rnative-1549466028052",
  storageBucket: "rnative-1549466028052.appspot.com",
  messagingSenderId: "86256577359"
};
Firebase.initializeApp(config);

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;*/
class PickImage extends Component {
  state = {
    pickedImage: null
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePicked({ uri: res.uri, base64: res.data });
      }
    });
  };
  /* uploadImage(uri, mime = "image/jpeg") {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      let uploadBlob = null;

      const imageRef = Firebase.storage()
        .ref("images")
        .child("test");

      fs.readFile(uploadUri, "base64")
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }*/
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default PickImage;
