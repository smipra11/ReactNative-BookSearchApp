
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import WelcomeScreen from "./Screen/AppSwitchNavigator/WelcomeScreen"
import HomeScreen from "./Screen/HomeScreen"
import LoginScreen from "./Screen/LoginScreen"
import { Ionicons } from "@expo/vector-icons"
import SettingScreen from "./Screen/SettingScreen"
import firebase from "firebase/app"
import { firebaseConfig } from "./Config/config"
import LoadingScreen from "./Screen/AppSwitchNavigator/LoadingScreen"
import BooksReadingScreen from "./Screen/HomeTabNavigator/BooksReadingScreen"
import BooksReadScreen from "./Screen/HomeTabNavigator/BooksReadScreen"
//import BookReadingScreen from './Screen/HomeTabNavigator/BooksReadingScreen';
import{Provider} from 'react-redux'
import store from "./redux/store"
import BooksCountContainer from "./redux/container/BooksCountContainer"
import BooksReadingCount from "./redux/container/BooksReadingCount"
import BookReadCount from "./redux/container/BooksReadCount"
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);


const initializefirebase = () => {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }


}

const App = () => {
  initializefirebase();


  return (
    <Provider store={store}>
      <ActionSheetProvider>
 <AppContainer />
 </ActionSheetProvider>
    </Provider>
   
  )
}
const HomeTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Total",
      tabBarIcon:({tintColor}) =>(
        <BooksCountContainer  />
      )

    }
  },
  BooksReadingScreen: {
    screen: BooksReadingScreen,
    navigationOptions: {
      tabBarLabel: "Book Reading",
      tabBarIcon:({tintColor}) =>(
       <BooksReadingCount/>
     )

    }
  },
  BooksReadScreen: {
    screen: BooksReadScreen,
    navigationOptions: {
      tabBarLabel: "Book Read",
   tabBarIcon:({tintColor}) =>(
       <BookReadCount/>
     )

    }

  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#354D58DA',
      
    },
    labelStyle: {
      fontSize: 15,
      fontWeight:'bold'
    },
    activeTintColor: "white",
    
  }
})

HomeTabNavigator.navigationOptions = ({navigation}) =>{
  const {routeName} = navigation.state.routes[navigation.state.index];
switch(routeName){
  case  'HomeScreen':
    return{
      headerTitle: 'Total Books'
    };
  case 'BooksReadingScreen':
    return{
      headerTitle: 'Books Reading'
    };
  case "booksReadScreen":
    return{
      headerTitle: "Books Read"
    };
    default:
      return{
        headerTitle: "Book Search App"
      }

}

}

const HomeStackNavigator = createStackNavigator({
  HomeTabNavigator: {
    screen: HomeTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
          name = "md-menu"
          size = { 30 }
          color = "white"
          onPress = { ()=> navigation.openDrawer() }
             
            
           />
        )
        }
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#354D58DA'
    },
    headerTintColor: 'white'
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  HomeStackNavigator,
  SettingScreen: {
    screen: SettingScreen,

    navigationOptions: {
      title: "Setting",
      drawerIcon: () => <Ionicons name="md-settings" size={25} />
    },


  }
})

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen,

}, {
  mode: 'modal',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#2E424D"
    }
  }
})


const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator



})

const AppContainer = createAppContainer(AppSwitchNavigator)






export default App