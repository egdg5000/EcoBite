import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import { Link, useRouter } from 'expo-router';


export default function Home() {
    const router = useRouter();

    const loginStatus = async () => {
    try {
        const response = await fetch('http://localhost:3000/users/loginStatus', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        if (!response.ok) {
            console.log(data);
            router.push('/');
        }

        } catch (error) {
        console.error('Network error:', error);
        }
    };
    
    loginStatus();

    const logout = async () => {
    try {
        const response = await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        if (!response.ok) {
            console.log(data);
        }
        } catch (error) {
        console.error('Network error:', error);
        }
    };

    return (
    <View style={[styles.container]}>
        <Text>You are logged in!</Text>
        <Button 
            title={'Log out'}
            onPress={logout}
            buttonStyle={styles.button} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
    button: {
        padding: 6, 
        backgroundColor: 'rgb(98, 169, 255)',
        margin: 100,
    },
});