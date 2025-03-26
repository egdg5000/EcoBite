import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { TouchableOpacity, Image } from 'react-native';
import { Button, ListItem } from '@rneui/themed';
import { useRouter } from "expo-router";


const SetupScreen = () => {
    const [fontsLoaded] = useFonts({
        'ABeeZee': require('../assets/fonts/ABeeZee.ttf'),
    });
    const router = useRouter();
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);
    const [checkbox4, setCheckbox4] = useState(false);
    const [checkbox5, setCheckbox5] = useState(false);


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
            <View style={styles.container}>
                <Image source={require('../assets/images/EcoBite2.png')} style={styles.logo} />
                <Text style={styles.title}>Allergieën</Text>
                <Text style={styles.subtitle}>Geef hier uw allergieën aan. U kunt dit altijd wijzigen in uw instellingen.</Text>
                <View style={styles.list}>
                <ListItem>
                    <ListItem.CheckBox
                    checked={checkbox1}
                    onPress={() => setCheckbox1(!checkbox1)}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemText}>Glutenallergie</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <ListItem.CheckBox
                    checked={checkbox2}
                    onPress={() => setCheckbox2(!checkbox2)}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemText}>Notenallergie</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <ListItem.CheckBox
                    checked={checkbox3}
                    onPress={() => setCheckbox3(!checkbox3)}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemText}>Pinda-allergie</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <ListItem.CheckBox
                    checked={checkbox4}
                    onPress={() => setCheckbox4(!checkbox4)}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.itemText}>Lactose intolerantie</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <TouchableOpacity onPress={() => setCheckbox5(!checkbox5)}>
                    <ListItem>
                        <ListItem.CheckBox
                        checked={checkbox5}
                        containerStyle={{width: 0}}
                        onPress={() => setCheckbox5(!checkbox5)}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={styles.itemText}>Lactose intolerantie</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
                
                <Button 
                  buttonStyle={styles.button}
                  onPress={() => router.push('/home')}
                  title={'Verder'}/>
                <Button 
                  buttonStyle={[styles.button, {backgroundColor: "#FFF", borderWidth: 2, borderColor: '#2DBE60'}]}
                  onPress={() => router.push('/home')}
                  title={'Overslaan'}
                  titleStyle={{color: 'black'}}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'ABeeZee'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    list: {
        width: '100%',
        padding: 20,
        paddingTop: 10
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        marginTop: 20,
        marginHorizontal: 20,
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        margin: 5
    },
    button: {
        backgroundColor: '#2DBE60',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ABeeZee', 
    },
});

export default SetupScreen;
