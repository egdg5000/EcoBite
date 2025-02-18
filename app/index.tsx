import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import { Link, useRouter } from 'expo-router';


export default function Index() {
    const router = useRouter();
    const link = (href: any) => {
        router.push(href);
    }

    return (
    <View style={[styles.container]}>
        <Text>Placeholder text</Text>
        <Button
            onPress={() => link('/register')}
            buttonStyle={styles.button} 
            title={'Register'}/>
        <Button
            onPress={() => link('/login')}
            buttonStyle={styles.button} 
            title={'Login'}/>
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
        margin: 10,
        backgroundColor: 'green',
    }
});