import {StyleSheet, View, Text, Image, TextInput,Button} from 'react-native'
import {React,useState, useEffect} from 'react'
import{Link} from 'expo-router'
import { AntDesign } from '@expo/vector-icons';
import BusImage from '../assets/busPassenger.png'
import {getDatabase,ref, push,onValue, remove} from 'firebase/database';
import { initializeApp } from "firebase/app";
import { useNavigation } from '@react-navigation/native';


const firebaseConfig = {
    apiKey: "AIzaSyC57K4uo1O7s6CuXlYD3USxBz3-NuwoGsg",
    authDomain: "iot-public-transport.firebaseapp.com",
    databaseURL: "https://iot-public-transport-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-public-transport",
    storageBucket: "iot-public-transport.appspot.com",
    messagingSenderId: "319372995132",
    appId: "1:319372995132:web:6bbff6d698a0fb93d3f139"
  };


const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const cityBusesRef = ref(db, 'city-bus')
let busNumberValue = 0
let regionValue = {}
let data = {}
let busPassengerCountVal = 0
const passenger = () => {
    const [region, setRegion] = useState({})
    const [busNumber, setBusNumber] = useState('')
    const [busPassengerCount, setBusPassengerCount] = useState(0)
    const navigation = useNavigation();


    const busNumberHandler = () => {
        onValue(cityBusesRef, (snapshot) => {
            data = snapshot.val()[busNumber]
            console.log('p-data',data)
            regionValue = {
                latitude: data.latitude,
                longitude: data.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
            setRegion(regionValue)
            busPassengerCountVal = data.count
            setBusPassengerCount(busPassengerCountVal)
        })
        if(regionValue.latitude != undefined)
        navigation.navigate('busLocation');
        busNumberValue = busNumber
    
}

  return (
    <View style={styles.container}>
        <Link href={'/'} style={styles.backArraow}>
            <AntDesign name="leftcircleo" size={24} color="black"/> 
        </Link>
        <Image source={BusImage} style={styles.image} />
        <Text style = {({fontSize:30, fontWeight:'bold', textAlign:'center'})}>
            Hello Passenger, let's see where your bus is
        </Text>
        <View style = {styles.Inputs}>
            <TextInput style={styles.InputText} placeholder="Sno" value={busNumber}
          onChangeText={(text) => setBusNumber(text)}/>
            <Button title="Track" onPress={busNumberHandler} />
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
       margin:0,

        height: '100%',
    },
    backArraow: {
        marginTop:10,
        marginLeft: 10,
    },

    image: {
        marginLeft: 90,
        marginTop: 20,
        marginBottom: 0,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    Inputs: {
        martginTop: 30,
        alignItems: 'center',

        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,

    },
    InputText: {
        height: 50,
        width: '45%',
        marginTop: 20,
        borderBottomWidth: 1,
        padding: 10,
        borderRadius: 5,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        
        
    },
    Button: {
        height: 50,
        width: '30%',
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#0fff78',
        alignItems: 'center',
        justifyContent: 'center',
    },

    })
export default passenger
export {busNumberValue}
export {regionValue}
export {busPassengerCountVal}
export {db}