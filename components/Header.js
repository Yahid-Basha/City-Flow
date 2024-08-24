import { StyleSheet, Text, View,} from 'react-native';
import { Link } from 'expo-router';

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.pages}>
                <Link href ={'/passenger'} >
                    <Text style={styles.headerTextPassenger}>Passenger</Text>
                </Link>
                <Link href ={'/conductor'} >
                    <Text style={styles.headerTextConductor}>Conductor</Text>
                </Link>
            </View>
            <View style={styles.icons}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        height: 60,
        borderRadius: 20,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pages: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    headerTextPassenger : {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    headerTextConductor : {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    
});