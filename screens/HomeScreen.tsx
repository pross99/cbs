import React from 'react';
import { Button, StyleSheet, Text, View, FlatList, ListRenderItem } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user.actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../styles/FeedStyles';
import PostCard from '../components/PostCard'
import { getItemAsync } from 'expo-secure-store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';
type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Home">;
const Posts = [
    {
      id: '1',
      userName: 'Karen sørensen',
      userImg: require('../images/prof-1.jpg'),
      postTime: '4 minutter siden',
      post:
        'Søger studiegruppe.',
      postImg: require('../images/studiegruppe.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John madsen',
      userImg: require('../images/prof-2.jpg'),
      postTime: '2 timer siden',
      post:
        'Hvornår har vi sommerferie?.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Kent boye',
      userImg: require('../images/prof-3.jpg'),
      postTime: '1 hours ago',
      post:
        'Søger billige brugte bøger :-).',
        postImg: require('../images/post-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Paulina kronborg',
      userImg: require('../images/prof-4.jpg'),
      postTime: '1 dag siden',
      post:
        'Vi mangler stadig et hold til årets største beer-pong tuneringen på fredag. I kan tilmelde jer via appen',
        postImg: require('../images/post-3.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Alexander Chritiansen',
      userImg: require('../images/prof-5.jpg'),
      postTime: '2 dage siden',
      post:
        'Hej. Det her er en test',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];

const HomeScreen = () => {
   
    const navigation = useNavigation<ScreenNavigationType>();
//   const renderPost = ({item}: {item: any}) => (
//       <PostCard {...item}/>
    //  );

    return (
        <Container>    
           <FlatList 
           data={Posts}
           renderItem= {({item}) => <PostCard item={item} 
           />}
           keyExtractor={item=>item.id}
           showsVerticalScrollIndicator={false}
           />

               <Icon name="add-outline" style={styles.button}
                  onPress={() => navigation.navigate("AddPost")}/>
            
           </Container>
           

           
    );
};
const styles = StyleSheet.create({
    button: {
        flex: 1,
         alignItems: 'center',
          justifyContent: 'center', 
          position:'absolute',
          top: 10,
          right: 10,
          fontSize: 50
    },
})
export default HomeScreen;


