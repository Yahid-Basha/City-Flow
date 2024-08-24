import {StyleSheet, View, Text, Image} from 'react-native'
import React from 'react'
import{Link} from 'expo-router'
import Header from '../components/Header'
import { FontAwesome } from '@expo/vector-icons';
import BusImage from '../assets/Bus.gif'
const index = () => {
    return (
        <View style={styles.body}>
                <View style={styles.container}>
                        <Header />
                        <Image source={BusImage} style={styles.busImage}/>
                        <Text style={styles.intro}>Welcome to our public transport app! With this app, you can easily track the location of buses in real-time and know the availe vacancies and plan your journey accordingly.</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        margin: 0,
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        margin:15,
        flex: 1,
        alignItems: 'center',
        justifyContent:'end',
    },
    Passengerbutton:{
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
        margin: 10,
    },
    busImage:{
        marginTop: 90,
        width: 150,
        height: 150,
        
        alignSelf: 'center',
    },
    intro:{
        marginTop: 50,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    }
    
})

export default index
