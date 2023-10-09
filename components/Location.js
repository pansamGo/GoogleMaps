import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';

import MapView, { LocalTile, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import { firebaseConfig } from './../firebaseConfig';

const Location = () => {

    const [locationLatitude, setLatitude] = useState(30.706415978844426);
    const [locationLongitude, setLongitude] = useState(76.70904955522218);

    useEffect(() => {
        requestLocationPermission();
        // getCurrentLocation();
    }, []);

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the Location');
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          async (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            await sendLocationToFirebase();
            await checkDriverPosition();
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
        );
        
    };
    
    const sendLocationToFirebase = async () => {
        const db = firebase.database();
        let response = await db.ref("drivers/1").set({
            latitude: locationLatitude,
            longitude: locationLongitude,
        });
    };
    
      const checkDriverPosition = async () => {
        Geolocation.watchPosition(
          async (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            await sendLocationToFirebase();
          },
          (error) => {
            console.log('--err--', error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
        );
      };
    
      const getDriversLocation = async () => {
        try {
          const db = firebase.database()
          // let data = await db.ref("drivers/1").once('value');
        } catch (e) {
          console.log('----e---', e);
        }
      };

    return (
        <View style={{flex: 1}}>
            <MapView
            style={{width: '100%', height: '100%'}}
            initialRegion={{
                latitude: locationLatitude, 
                longitude: locationLongitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
          <Marker coordinate={{latitude: locationLatitude, longitude: locationLongitude}} />
            </MapView>
            <TouchableOpacity style={{width: '90%', height: 60, alignSelf: 'center', position: 'absolute', bottom: 20, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => getCurrentLocation()}>
                <Text style={{color: 'white'}}>Get Current Location</Text>
            </TouchableOpacity>
      </View>
    )
}

export default Location;