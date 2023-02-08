/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

// Import React
import React from 'react';
import {View, Image, TouchableOpacity, Alert} from 'react-native';
// Import Navigators from React Navigation
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import SideMenu from '../components/SideMenu';
import AsyncStorage from '@react-native-community/async-storage';
import {color} from 'react-native-reanimated';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <Stack.Navigator
      screenOptions={{animationTypeForReplace: 'pop'}}
      initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={toggleDrawer}>
                <Image
                  source={{
                    uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 5,
                    tintColor: '#d8d8d8',
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#96499c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenStack = ({navigation}) => {
  const toggleBack = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerLeft: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={toggleBack}>
              <Image
                source={{
                  uri: 'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png',
                }}
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 5,
                  tintColor: '#d8d8d8',
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: '#96499c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animationTypeForReplace: 'pop',
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {color: '#d8d8d8'},
      }}
      drawerContent={SideMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="ProfileScreenStack"
        options={{drawerLabel: 'Profile Screen'}}
        component={ProfileScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
