import React,{useState} from "react"
import {View,Text,StyleSheet,TextInput} from 'react-native'
import CustomActionButton from "../components/CustomActionButton"
import firebase from 'firebase'


const LoginScreen = (props) =>{

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[isLoading,setisLoading] = useState(false)

    const onSignIn = async() =>{
        if(email,password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
               console.log(password)
            }catch (error){
                alert("user with that email does not exit,please sign in")
               

            }
        }
        else{
            alert("please enter valid email and password")
        }

    }

    const onSignUp = async() =>{
        if(email && password){
            try {
                const response  = await firebase.auth()
                .createUserWithEmailAndPassword(email,password)
             if(response){
                 const user=  await firebase.database().ref("users").child(response.user.uid)
                 
                 .set({email:response.user.email,uid:response.user.uid})

                 props.navigation.navigate('LoadingScreen')
             }
                
            } catch (error) {
                alert('User already exits')
                
            }
        }
        else{
            alert("Please enter email and password")
        }

    }
    return(
        <View style={Styles.container}>
        <TextInput style={Styles.TextInput}placeholder="abc@exapmple.com"
         keyboardType="email-address"
        onChangeText={email =>setEmail(email)}/>
        <TextInput style={Styles.TextInput}placeholder="enter password"
        secureTextEntry
        onChangeText={password =>setPassword(password)}/>
        <CustomActionButton style={Styles.loginButton} 
        onPress= {onSignIn}>
        
            <Text style={{color:'white',fontWeight:'200'}}>Login</Text>
        </CustomActionButton>
        <CustomActionButton style={Styles.loginButton} onPress ={onSignUp}>
        <Text style={{color:'white',fontWeight:'200'}}>Signup</Text>

        </CustomActionButton>
        </View>

    )

}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    
    backgroundColor:'#2E424D'

    },
    TextInput:{
        height:50,
        borderWidth:0.5,
        borderColor:'gray',
        marginHorizontal:40,
        marginBottom:15,
        backgroundColor:'white',
        color:'black',
        paddingHorizontal:10
        
    },
    loginButton:{
        borderWidth:0.5,
        backgroundColor:'transparent',
       
        marginTop:10,
        width:200
    }

    



})

export default LoginScreen