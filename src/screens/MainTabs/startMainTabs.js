import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-share-alt" : "ios-share",
      30
    ),
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: "awesome-places.SideDrawer"
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "awesome-places.FindPlaceScreen",
                          options: {
                            topBar: {
                              visible: true,

                              leftButtons: [
                                {
                                  id: "sideDrawerToggle",
                                  icon: sources[2],
                                  color: "red"
                                }
                              ]
                            }
                          }
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        text: "Find Place",
                        icon: sources[0],
                        iconColor: "red",
                        selectedIconColor: "blue",
                        selectedTextColor: "blue"
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "awesome-places.SharePlaceScreen",
                          options: {
                            topBar: {
                              visible: true,
                              leftButtons: [
                                {
                                  id: "sideDrawerToggle",
                                  icon: sources[2],
                                  color: "red"
                                }
                              ]
                            }
                          }
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        text: "Share Place",
                        icon: sources[1],
                        iconColor: "red",
                        selectedIconColor: "blue",
                        selectedTextColor: "blue"
                      }
                    }
                  }
                }
              ],
              options: {}
            }
          }
        }
      }
    });
  });
};

/*Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: "awesome-places.SideDrawer"
            }
          },
          center: {
            bottomTabs: {
              id: "tabs",

              children: [
                {
                  stack: {
                    id: "tab1",
                    children: [
                      {
                        component: {
                          name: "awesome-places.SharePlaceScreen",

                          options: {
                            topBar: {
                              visible: true,
                              leftButtons: [
                                {
                                  id: "sideDrawerToggle",
                                  icon: sources[2]
                                }
                              ]
                            },
                            bottomTab: {
                              fontSize: 12,
                              text: "Share Place",
                              icon: sources[0]
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    id: "tab2",
                    children: [
                      {
                        component: {
                          name: "awesome-places.FindPlaceScreen",

                          options: {
                            topBar: {
                              visible: true,
                              leftButtons: [
                                {
                                  id: "sideDrawerToggle",
                                  icon: sources[2]
                                }
                              ]
                            },
                            bottomTab: {
                              text: "Find Place",
                              fontSize: 12,
                              icon: sources[1],

                              selectedTextColor: "#000",
                              selectedIconColor: "#000"
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    });*/
//});
//};

export default startTabs;
