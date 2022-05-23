import {View,Text,Button,StyleSheet, Platform, Alert, ActivityIndicator} from 'react-native';
import { InputField, InputWrapper, StatusWrapper, SubmitBtn, SubmitBtnText, AddImage } from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import React from 'react';


import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../redux/actions/post.actions';
import { Post } from '../entities/Post';



const AddPostScreen = () => {
  const user = useSelector((state: any) => state.user.loggedInUser);
  const token = useSelector((state: any) => state.user.idToken);
    const [image, setImage] = useState<string | null| undefined>();
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);



    const pickImage = async () => {
      
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        width: 1200,
        height:780,
        useNativeDriver: false 

      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      
      }
    };
    
    // const choosePhotoFromLibrary = () => {
    //     ImagePicker.openPicker({
    //       width: 1200,
    //       height: 780,
    //       cropping: true,
    //     }).then((image) => {
    //       console.log(image);
       
    //     });
    //   };

    // const handleAddPost= () => {
    //   const post: Post = new Post(title, Status.UNREAD, '', new Date());
    //     dispatch(addPost(post));

    // }

    const submitPost = async () => {
      
      
      const post: Post = new Post("",  "", new Date(), null, null) 
      const imageUrl = await uploadImage();
      console.log('Image Url: ', imageUrl);
      console.log('Post: ', post);

      const dispatch = useDispatch()
      dispatch(addPost(post));
  
      firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        setPost(null);
      })
      .catch((error) => {
        console.log('Something went wrong with added post to firestore.', error);
      });
    }

      const uploadImage = async() => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
        // Add timestamp to File Name
        const extension = filename.split('.').pop(); 
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
    
        setUploading(true);
        setTransferred(0);
    
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
    
          setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
              100,
          );
        });

          try {
              await task;

              const url = await storageRef.getDownloadURL();

              setUploading(false)
              setImage(null)

              setUploading(false);
              Alert.alert(
                 'Image uploaded',
                 'Your image has been uploaded' 
              )

              return url
          } catch(e) {
              console.log(e);
              return null
          }

          setImage(null)

      }
    return(
       <View style={styles.container}>
           <InputWrapper>
           {image != null ? <AddImage source={{uri: image}} /> : null}

           <InputField
           placeholder="Hvad vil du dele med dine medstudernde?"
           multiline
           numberOfLines={4}
           />
           {uploading ? (
             <StatusWrapper>
               <Text>{transferred} % færdig </Text>
               <ActivityIndicator size="large" color="0000ff" />
             </StatusWrapper>
           ) : (
             <SubmitBtn onPress={submitPost}>
               <SubmitBtnText>Del</SubmitBtnText>
             </SubmitBtn>
           )}
           </InputWrapper>
           <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
           buttonColor='#9b59b6'
            title="Tag et billede"
            onPress={pickImage}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
           buttonColor='#3498db'
            title="Vælg et billede" onPress={pickImage}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          
        </ActionButton>
        
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
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
});