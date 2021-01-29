import React from  'react'
import { StyleSheet, Text, View, SafeAreaView,Image,TouchableOpacity } from 'react-native';


const ListItem  =({item,children,editable,onPress}) =>{
    return(
        <View style={{ height: 100, flexDirection: 'row',alignItems:'center' ,marginVertical: 5
    }}>
         
      <View style={{ height:70,width:70}}>
        <TouchableOpacity  disabled={!editable}style={{flex:1}} onPress={()=>onPress(item)}>
        
        {item.image ?(
          <Image source={{uri:item.image}} style={{flex:1,borderRadius:30,height:null,width:null}}/>
        ):(
        <Image source={require('../assets/icon.png')} style ={{flex:1,borderRadius:30,height:null,width:null}}/>
        )}
        </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
        <Text style={{fontWeight:'100',fontSize:22,color: "lightgray",marginLeft:5}}>{item.name}</Text>
        
      </View>
     
       {children}
    </View>
   

    )
}

export  default ListItem