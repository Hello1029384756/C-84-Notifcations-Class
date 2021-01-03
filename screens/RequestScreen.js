import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class RequestScreen extends React.Component {
constructor() {
    super()
    this.state = {
        userId: firebase.auth().currentUser.email,
        bookName: "",
        requestReason: ""
    }
} 

requestBook = (bookName, requestReason) => {
    var userId = this.state.userId
    var requestID = this.uniqueID()
    db.collection('RequestBook').add({
        userId: userId,
        bookName: bookName,
        requestReason: requestReason,
        requestID: requestID
    })
    this.setState({
        bookName: "",
        requestReason: ""
    })
    Alert.alert("Book Requested Succesfully")
}

uniqueID() {
    return(Math.random().toString(36).substring(7))
}

    render() {
        return (
            <View style={{flex:1}}>
                <MyHeader title = "Request"/>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                <TextInput
                style = {styles.formTextInput}
                placeholder = "Book Name"
                onChangeText = {(text) => {
                    this.setState({
                        bookName: text
                    })
                }}/>
                <TextInput
                style = {[styles.formTextInput, {height: 300}]}
                placeholder = "Why Do You Want This Book"
                onChangeText = {(text) => {
                    this.setState({
                        requestReason: text
                    })
                }}/>
                <TouchableOpacity style={styles.button} onPress = {() => {this.requestBook(this.state.bookName, this.state.requestReason)}}>
                    <Text>Request Book</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )