import {View,Text,Button,StyleSheet} from 'react-native';

const AddPostScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Lav et opsalg til dine medstudernde</Text>
            <Button 
            title="Tryk her"
            onPress={() => alert('Good Job')}
            />
        </View>
    );
}

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});