import { View, Text,TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {getDatabase,ref, push,onValue,set, remove, update} from 'firebase/database';
import { db } from './passenger';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const cityBusRef = ref(db, 'city-bus');
let data = {}

const conductor = () => {
    const [boarding, setBoarding] = useState('')
    const [dropping, setDropping] = useState('')
    const busNumber = 222
    const [busPassengerCount, setBusPassengerCount] = useState(0)

    const boardingHandler = (text) => {
        setBoarding(text)
    }
    
    const droppingHandler = (text) => {
        setDropping(text)
    }
    
    const AddPassenger = () => {
        onValue(cityBusRef, (snapshot) => {
            data = snapshot.val()[busNumber]
            let count = data.count
            setBusPassengerCount(count)
        })
        set(ref(db, 'city-bus/222/count'),busPassengerCount+1 )
        push(ref(db, 'city-bus/222/dropping'), dropping)
        push(ref(db, 'city-bus/222/boarding'), boarding)
    }

    const decreaseCount = () => {
        onValue(cityBusRef, (snapshot) => {
            data = snapshot.val()[busNumber]
            let count = data.count-1
            setBusPassengerCount(count)
        })
        set(ref(db, 'city-bus/222/count'), busPassengerCount)
    }
  return (

    <>
         <Link href={'/'} style={styles.backArraow}>
            <AntDesign name="leftcircleo" size={24} color="black"/> 
        </Link>
        <View style={styles.container}>
            <Text style={styles.headText}>
                You are on 222
            </Text>
            <Text style={styles.headText}>
                {busPassengerCount} passengers
            </Text>
            <Text style={styles.headText}>
                Take a Ticket
            </Text>
            <TextInput style={styles.InputText} placeholder="from:" value={boarding} onChangeText={(text) => {boardingHandler(text)}} />
            <TextInput style={styles.InputText} placeholder="to:" value={dropping} onChangeText={(text)=>{droppingHandler(text)}} />

            <TouchableOpacity style={styles.button} onPress={AddPassenger}>
                <Text style={styles.buttonText}>
                    Book Ticket
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={decreaseCount}>
                <Text style={styles.buttonText}>
                    -1
                </Text>
                </TouchableOpacity>
        </View>
    </>
  )
}
const styles = StyleSheet.create({  
    headText:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    InputText:{
        height: 50,
        width: '70%',
        marginTop: 10,
        borderWidth:1,
        borderRadius: 5,
        fontSize: 30,
        padding:10,
        textAlign:'left',
    },
    buttonText: {
        marginTop: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
      },
      backArraow: {
        marginTop:10,
        marginLeft: 10,
    },
})

export default conductor