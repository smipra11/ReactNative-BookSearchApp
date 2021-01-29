import React from 'react'
import{View,Text,StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import CustomActionButton from "../../components/CustomActionButton"

const WelcomeScreen = (props) =>{

    return(
        <View style={{flex:1,backgroundColor:"#2E424D"}}>
            <View style={{flex:1,borderColor:'black',alignItems:'center',justifyContent:'center'}}> 
           <Ionicons name="md-bookmarks" size= {150} color="#bada55"/>
           <Text style={{fontSize:50,fontWeight:'100',color:'white'}}>BookFinder App</Text>
            </View>
            <View style={{flex:1,borderColor:'orange',alignItems:'center'}}>
                <CustomActionButton style={{backgroundColor:'transparent',
                width:200,
                borderWidth:0.5,borderColor:'gray',
                marginBottom:10}}
                title="Login in" onPress={()=>props.navigation.navigate('LoginScreen')}>
                    <Text style={{fontWeight:'100',color:'white'}}>LogIn</Text>
                </CustomActionButton>
                
            </View>

            
        </View>
    )

}

export default WelcomeScreen