import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Location from "./Location";

import SelectDropdown from "react-native-select-dropdown";

import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();
    const roles = ["Admin", "Driver"];

    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    const handleLogin = async () => {
        try{
            if(email !== '' && password !== '' && role !== '') {
                const isUserLoggedIn = await auth().signInWithEmailAndPassword(email, password);
                console.log('-------isUserLoggedIn----', isUserLoggedIn);
                navigation.navigate('Location', { userRole: role })
            } else {
                Alert.alert('Please enter valid email and password');
            }
            
        } catch (error) {
            console.log('----LoginScreen---error----', error);
            Alert.alert(error);
        }
    };

    const handleSignUp = async () => {
        try{
            if (email !== '' && password !== '' && role !== '') {
                const isUserCreated = await auth().createUserWithEmailAndPassword(email, password);
                console.log('----isUserCreated', isUserCreated);
                navigation.navigate('Location', {userRole: role});
            } else {
                Alert.alert('Please fill all required fields.');
            }
        } catch (e) {
            console.log('-----signup---error--', e);
        }
    };

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.view}>
                <Text style={styles.text}>
                    Enter your Email Id:
                </Text>
                <TextInput
                    value={email}
                    cursorColor={'grey'}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.numberInput} />

                <Text style={styles.text}>
                    Enter your Password:
                </Text>
                <TextInput
                    value={password}
                    cursorColor={'grey'}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                    style={styles.numberInput} />
                <Text style={styles.text}>
                    Select Role:
                </Text>
                <SelectDropdown 
                    data={roles}
                    onSelect={(selectItem, index) => {
                        setRole(selectItem);
                    }}
                    buttonStyle={styles.dropdownContainer}
                    />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => handleSignUp()} style={styles.button}>
                    <Text style={{color: '#fff', fontSize: 18}}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
                    <Text style={{color: '#fff', fontSize: 18}}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    view: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        // height: '30%',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    numberInput: {
        borderWidth: 1,
        height: 60,
        color: 'black',
        justifyContent: 'center',
        padding: 10,
        borderColor: 'grey',
        fontSize: 18,
        borderRadius: 3,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    text: {
        color: '#2897e0',
        marginVertical: 10,
        fontSize: 18,
    },
    button: {
        height: 60,
        marginTop: 100,
        backgroundColor: '#2897e0',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdownContainer: {
        height: 60,
        width: 'auto',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'grey',
        // marginHorizontal: 15,
        marginVertical: 5
    }
});

export default LoginScreen;
