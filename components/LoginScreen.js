import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Location from "./Location";

import SelectDropdown from "react-native-select-dropdown";

import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const roles = ["Admin", "Driver"];

    const handleLogin = async () => {
        try{
            const isUserCreated = await auth().createUserWithEmailAndPassword(email, password);
            console.log('----isUserCreated', isUserCreated);

            navigation.navigate('Location');
        } catch (error) {
            console.log('----LoginScreen---error----', error);
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
                <SelectDropdown 
                    data={roles}
                    onSelect={(selectItem, index) => {
                        setRole(selectItem);
                    }}
                    buttonStyle={styles.dropdownContainer}
                    defaultButtonText="Select Role"
                    />
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
        // justifyContent: 'center'
    },
    view: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: '30%',
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
        marginVertical: 30
    }
});

export default LoginScreen;
