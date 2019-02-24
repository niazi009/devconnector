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
          id: "tabs",
          options: {
            topbar: {
              visible: true
            }
          },
          children: [
            {
              stack: {
                id: "tab1",
                children: [
                  {
                    component: {
                      name: "awesome-places.SharePlaceScreen",
                      options: {
                        topbar: {
                          visible: true
                        },
                        bottomTab: {
                          fontSize: 12,
                          text: "Share Place",
                          icon: sources[0],

                          selectedTextColor: "#000",
                          selectedIconColor: "#000"
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
                      name: "awesome-places.FindPlaceScreens",
                      options: {
                        bottomTab: {
                          text: "Find Place",
                          fontSize: 12,
                          icon: eventsIcon,

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
});
