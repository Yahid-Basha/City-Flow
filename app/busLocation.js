
import { View, Text,StyleSheet,Image, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import Mapview, { Marker } from 'react-native-maps'
import { busNumberValue, regionValue, busPassengerCountVal } from './passenger'
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Link } from 'expo-router';

const busLocation = () => {
    console.log(busNumberValue)
    console.log('locationRecieved:',regionValue)
    const [region, setRegion] = useState({});

    const userLocation = async () => {
        console.log('userLocation-accessor')
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }
        console.log('permission granted')
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });

    }

    useEffect(() =>{
        userLocation()
    },[])

    if(region.latitude == undefined){
        return (
            <View>
                <View>
                <Link href={'/passenger'} style={styles.backArraow}>
            <AntDesign name="leftcircleo" size={24} color="black"/> 
        </Link>
                <Text style={({textAlign:'center', justifyContent:'center'})}>
                    Bus Number:{busNumberValue}
                </Text>
                <Text style={({textAlign:'center', justifyContent:'center'})}>
                    Passenger Count:{busPassengerCountVal}
                </Text>
                </View>
                <View>
                <Text style={({textAlign:'center', justifyContent:'center'})}>
                    Bus Location Not Available
                </Text>
                </View>
            </View>
        )}
    else{
        return (
            <View>
                <Link href={'/passenger'} style={styles.backArraow}>
                <AntDesign name="leftcircleo" size={24} color="black"/> 
            </Link>
                    <Text style={({textAlign:'center', justifyContent:'center'})}>
                        Bus Number:{busNumberValue}
                    </Text>
                    <Text style={({textAlign:'center', justifyContent:'center'})}>
                        Passenger Count:{busPassengerCountVal}
                    </Text>
                    <Button title="Refresh" onPress={userLocation} />
                    <Mapview style={styles.map} initialRegion={regionValue}>
                        <Marker coordinate={regionValue} title={busNumberValue} >
                            <Image source={require('../assets/Bus-Stop.png')} style={{height:40, width:40}} />
                        </Marker>
                        <Marker coordinate={region} title={busNumberValue}>
                            <Image source={require('../assets/UserLocation.png')} style={{height:50, width:50}} />
                        </Marker>
                    </Mapview>
                    
                </View>
                )
        }
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    backArraow: {
        marginTop:10,
        marginLeft: 10,
    },

})

export default busLocation
