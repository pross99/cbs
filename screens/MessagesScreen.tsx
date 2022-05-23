import React from "react"
import { View, StyleSheet, Text, Button, FlatList } from "react-native"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import {Container,
     Card,
    UserImg,
    UserInfo,
    UserName,
    PostTime,
    TextSection, 
    MessageText,
    UserImgWrapper
} from '../styles/MessageStyles'
import { UserInfoText } from "../styles/FeedStyles";


const Messages = [
    {
      id: '1',
      userName: 'Olga Jensen',
      userImg: require('../images/prof-1.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Vi laver det bare i morgen efter undervisning.',
    },
    {
      id: '2',
      userName: 'Jens ole',
      userImg: require('../images/prof-2.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Kommer du til fredagsbar i morgen?',
    },
    {
      id: '3',
      userName: 'Kenny Williamsen',
      userImg: require('../images/prof-3.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Håber det gik godt til eksamen :-)',
    },
    {
      id: '4',
      userName: 'Selina Poulsen',
      userImg: require('../images/prof-4.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Kommer du i morgen?',
    },
    {
      id: '5',
      userName: 'Alexander Andersen',
      userImg: require('../images/prof-5.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Har du noter fra undervisningen i dag?',
    },
  ];


type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Messages">;
const MessagesScreen = () => {
    const navigation = useNavigation<ScreenNavigationType>();
    return(
      <Container>
        <FlatList
         data={Messages}
         renderItem={({item}) => (
             <Card onPress={() => navigation.navigate('Chat', {UserName: item.userName})}>
                 <UserInfo>
                     <UserImgWrapper>
                         <UserImg source={item.userImg} />
                     </UserImgWrapper>
                     <TextSection>
                         <UserInfoText>
                             <UserName>{item.userName}</UserName>
                             <PostTime>{item.messageTime}</PostTime>
                         </UserInfoText>
                         <MessageText> {item.messageText}</MessageText>
                     </TextSection>
                 </UserInfo>
             </Card> 
              )}
         keyExtractor={item=>item.id}
         /> 
      </Container>
    )
}

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})