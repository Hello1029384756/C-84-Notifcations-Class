import React from 'react';
import { View, Text, TextInput, Modal, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import { ListItem, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class MyDonationsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            allDonations: []
        }
        this.requestRef = null
    }

componentDidMount() {
    this.getAllDonations()
}

getAllDonations = () => {
    this.requestRef = db.collection("AllDonations").where("donorID", "==", this.state.userID)
    .onSnapshot(snapshot => {
        var allDonations = []
        snapshot.docs.map((document) => {
            var donation = document.data()
            allDonations.push(donation)
            this.setState({
                allDonations: allDonations
            })
        })
    })
}

keyExtractor = (item, index) => index.toString()
renderItem = ({item, i}) => (
    <ListItem
    key = {i}
    title = {item.bookName}
    subtitle = {"Requested By: " + item.reciverID + "\nStatus: " + item.requestStatus}
    rightElement = {<TouchableOpacity> <Text>Send Book</Text> </TouchableOpacity>}
    />
)

render() {
    return(
        <View>
            <View>
            <MyHeader navigation = {this.props.navigation}
            title = "My Donations"/>
            <View>

                {
                    this.state.allDonations.length === 0
                    ?(<Text>Book Donations</Text>)
                    :(<FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.allDonations}
                        renderItem = {this.renderItem}
                        />)
                }
            </View>
            </View>
        </View>
    )
}

}