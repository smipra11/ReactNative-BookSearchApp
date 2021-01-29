import React from  'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'

const CustomActionButton = ({children,onPress,style}) =>(
    <TouchableOpacity onPress={onPress}>
    <View style={ [ styles.button,style]} >
      {children}
    </View>
  </TouchableOpacity>

)

export default CustomActionButton

const styles= StyleSheet.create({
    button:{
        width:50,
        height:50, 
        backgroundColor: "#deada5",
        alignItems:"center", 
        justifyContent:"center"

    }
})

