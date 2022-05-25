import React, { useEffect} from "react";
import {
  Platform,
  Text, 
  View, 
  Image, 
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useDispatch, useSelector } from "react-redux";
import { rehydrateUser } from "../redux/actions/user.actions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnEsawmbpAUL7D545OdchE1SdJ0fzB-Is",
    authDomain: "cbsrn-ed846.firebaseapp.com",
    databaseURL: "https://cbsrn-ed846-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cbsrn-ed846",
    storageBucket: "cbsrn-ed846.appspot.com",
    messagingSenderId: "880220759582",
    appId: "1:880220759582:web:3628b26da0d36d442b300f",
    measurementId: "G-KVBD18WPFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

initializeApp(firebaseConfig);

export default function UploadScreen(probs: any) {
  const dispatch = useDispatch(); // hook to get
  const user = useSelector((state: any) => state.user.loggedInUser);
  const token = useSelector((state: any) => state.user.idToken);
  const [photoUrl, setphotoUrl] = React.useState(user.photoUrl)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storage = getStorage(); //the storage itself
      const uri = result.uri; //full uri of the image
      const lastIndex = uri.lastIndexOf("/"); //getting the last / in the path of the uri
      const length = uri.length; //getting the last index of the uri so we can slice
      const fileName = uri.slice(lastIndex, length); //slicing, to recieve the image file name so we can store it in our firebase storage
      const reference = ref(storage, fileName); //how the image will be addressed inside the storage
      
      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes); //upload images
      getDownloadURL(ref(storage, reference.fullPath)).then((url)=> {
        setphotoUrl(url)  
        dispatch(rehydrateUser(user, token))
      })
    }
  };

  return (
    <View style={styles.uploadImageButton}>
      <TouchableHighlight onPress={pickImage}>
        <Text style={styles.textStyle}>Upload image</Text>
      </TouchableHighlight>
    </View> 
  );
}
const styles = StyleSheet.create({
    uploadImageButton: {
        position:"absolute",
        right: Dimensions.get("window").width-160,
        bottom: Dimensions.get("window").height-290,
        backgroundColor: 'blue', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 100,
        height: 30,
        borderRadius: 15
    },
    textStyle:{
        color: "white",
    }
});