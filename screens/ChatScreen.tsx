import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chatroom, Status } from '../entities/Chatroom';
import { addChatroom, fetchChatrooms, toggleHappy } from '../redux/actions/chat.actions';
import { StackParamList } from "../typings/navigations";
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Chat"
>

const ChatScreen =() => {
    const [messages, setMessages] = useState([] as any);
    

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },

      {
        _id: 2,
        text: 'Hej Ven :-)',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },


    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: IMessage[] | undefined) => GiftedChat.append(previousMessages, messages))
  }, [])
  return (
    <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    }}
  />
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ChatScreen;