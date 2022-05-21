import React from 'react';
import { Button, StyleSheet, Text, View, FlatList, ListRenderItem } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/user.actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../styles/FeedStyles';
import PostCard from '../components/PostCard'
import { getItemAsync } from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';

const Posts = [
    {
      id: '1',
      userName: 'Karen sørensen',
      userImg: require('../images/prof.jpg'),
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
      userImg: require('../images/prof.jpg'),
      postTime: '2 timer siden',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Kent boye',
      userImg: require('../images/prof.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../images/studiegruppe.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Paulina kronborg',
      userImg: require('../images/prof.jpg'),
      postTime: '1 dag siden',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../images/studiegruppe.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Alexander Chritiansen',
      userImg: require('../images/prof.jpg'),
      postTime: '2 dage siden',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];

const HomeScreen = ({navigation}: {navigation: any}) => {
  
//   const renderPost = ({item}: {item: any}) => (
//       <PostCard {...item}/>
    //  );

    return (
        <Container>    
           <FlatList 
           data={Posts}
           renderItem={({item}) => <PostCard item={item} />}
           keyExtractor={item=>item.id}
           showsVerticalScrollIndicator={false}
           />

              
                    
                    <Icon name="add-outline" style={styles.button}
                  onPress={() => navigation.navigate("AddPostScreen", {screen: "AddPostScreen"})}/>
            
           </Container>
           

           
    );
};
const styles = StyleSheet.create({
    button: {
        flex: 1,
         alignItems: 'center',
          justifyContent: 'center', 
          position:'absolute',
          top: 40,
          right: 30,
          fontSize: 50
    },
})
export default HomeScreen;


