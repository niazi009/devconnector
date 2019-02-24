import { SET_PLACES, REMOVE_PLACE } from "../actions/actionTypes";

import { Platform } from "react-native";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import UUID from "uuid";
import firebase from "../../src/Firebase/index";
import RNFetchBlob from "react-native-fetch-blob";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
let image = null;
export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(uploadImage(image.uri))
      .catch(error => {
        console.log(error);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(image => {
        console.log(image);
        const placeData = {
          name: placeName,
          location: location,
          image: image.uri,
          path: image.path
        };

        dispatch(authGetToken())
          .catch(err => {
            alert("something went wnet wong");
          })
          .then(token => {
            return fetch(
              "https://rnative-1549466028052.firebaseio.com/places.json?auth=" +
                token,
              {
                method: "POST",
                body: JSON.stringify(placeData)
              }
            )
              .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
              })
              .then(res => res.json())
              .then(parsedres => {
                console.log(parsedres);
                dispatch(uiStopLoading());
              });
          });
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://rnative-1549466028052.firebaseio.com/places.json?auth=" +
            token
        );
      })
      .catch(() => {
        alert("No valid token found");
      })

      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};
export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          "https://rnative-1549466028052.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const uploadImage = (uri, mime = "image/jpeg") => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      let uploadBlob = null;

      const uuid = UUID();
      const imageRef = firebase
        .storage()
        .ref("images")
        .child(uuid);

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
        .catch(error => {
          reject(error);
        })
        .then(url => {
          image = {
            uri: url
          };

          return imageRef.fullPath;
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .then(path => {
          image = {
            ...image,
            path: path
          };
          console.log("url", image.uri, "path", image.path);
          resolve(image);
        });
    });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
