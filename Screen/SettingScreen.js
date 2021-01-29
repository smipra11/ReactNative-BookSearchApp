import React from "react"
import {View,Text} from 'react-native'
import CustomActionButton from "../components/CustomActionButton"

const SettingScreen = (props) =>{
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#2E424D'}}>
            <CustomActionButton style={{backgroundColor:'transparent',
                width:200,borderWidth:0.5,borderColor:'gray'}}title="Sign Up" 
                onPress ={()=>props.navigation.navigate('WelcomeScreen')}>
                    <Text style={{fontWeight:'100',color:'white'}}> Log Out</Text>
                </CustomActionButton>
        </View>

    )

}

export default SettingScreen