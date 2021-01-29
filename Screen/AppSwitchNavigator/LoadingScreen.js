import React,{useEffect,useState} from 'react'
import{View,Text,StyleSheet} from 'react-native'
import firebase from 'firebase'

const LoadingScreen =(props) =>{
    

    useEffect(()=>{
       const unsubscribe=  firebase.auth().onAuthStateChanged(user=>{
            if(user){
                props.navigation.navigate('HomeScreen',{user})

            }else{
                props.navigation.navigate('LoginStackNavigator')

            }
            return ()=> unsubscribe();
        })

    },[])
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Loading Screen</Text>
        </View>
    )

}

export default LoadingScreen