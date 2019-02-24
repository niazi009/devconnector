import { Navigation } from "react-native-navigation";
import React from "react";
import { Provider } from "react-redux";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import configureStore from "./store/configureStore";
import SideDrawer from "./src/screens/Sidedrawer/SideDrawer";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";

const store = configureStore();
//register screens
Navigation.registerComponent(
  "awesome-places.AuthScreen",
  () => props => (
    <Provider store={store}>
      <AuthScreen {...props} />
    </Provider>
  ),
  () => AuthScreen
);

Navigation.registerComponent(
  "awesome-places.SharePlaceScreen",
  () => props => (
    <Provider store={store}>
      <SharePlaceScreen {...props} />
    </Provider>
  ),
  () => SharePlaceScreen
);

Navigation.registerComponent(
  "awesome-places.FindPlaceScreen",
  () => props => (
    <Provider store={store}>
      <FindPlaceScreen {...props} />
    </Provider>
  ),
  () => FindPlaceScreen
);

Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen",
  () => props => (
    <Provider store={store}>
      <PlaceDetailScreen {...props} />
    </Provider>
  ),
  () => PlaceDetailScreen
);

Navigation.registerComponent(
  "awesome-places.SideDrawer",
  () => props => (
    <Provider store={store}>
      <SideDrawer {...props} />
    </Provider>
  ),
  () => SideDrawer
);
///start  A app
export default () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "awesome-places.AuthScreen"
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: "Login",
              color: "red"
            }
          }
        }
      }
    }
  });

/*
Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            name: "awesome-places.AuthScreen",
            passProps: {
              text: "stack with one child"
            }
          }
        }
      ],
      options: {
        topBar: {
          title: {
            text: "Login"
          }
        }
      }
    }
  }
});*/
