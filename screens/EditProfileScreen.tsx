import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Pressable,SafeAreaView,StyleSheet,Text, View,Image, TouchableOpacity} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Upload from "../components/Upload";
import { User } from "../entities/User";
import { rehydrateUser } from "../redux/actions/user.actions";

export default function EditProfileScreen() {
  const user = useSelector((state: any) => state.user.loggedInUser);
  const token = useSelector((state: any) => state.user.idToken);
  const dispatch = useDispatch(); // hook to get
  const [name, setName] = React.useState(user.displayName);
  const [photoUrl, setphotoUrl] = React.useState(user.photoUrl)
  // const [photoUrl, setphotoUrl] = useState(user.photoUrl)




  const onSave = () => {
    if (name !== "" && photoUrl !== "") {
      const newUser: User = new User(user.email, name, photoUrl)
      dispatch(rehydrateUser(newUser, token))
    } else {
      alert("Username or Picture")
    }
  }

  if (user.photoUrl === "") {
    user.photoUrl = "https://picsum.photos/id/237/200/300"
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={'padding'}
      keyboardVerticalOffset={65}>
      <SafeAreaView style={styles.safeArea}>
        
        <Upload />
      <Image source={{ uri: user.photoUrl }} style={styles.imageStyle} />
      
        <View style={styles.container}>

             <Input  title="Ønsket navn"
            inputValue={name}
            setText={setName}
            error={"Cannot be empty"}/>
      
         

          <Input title="Addrese til ønsket billede..."
            inputValue={photoUrl}
            setText={setphotoUrl}
            error={"Cannot be empty"}
          />
          <TouchableOpacity style={styles.userBtn} onPress={() =>dispatch(onSave)}>
                <Text style={styles.userBtnTxt}> Opdater profil </Text>
              </TouchableOpacity>

         
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    position:"absolute",
    top: 150,
    

  },
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 0,
  },
  saveText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  imageStyle:{
    height: 140, 
    width: 140,
    position: "absolute",
    top:20,
    right: Dimensions.get("window").width - 350,
    borderRadius: 80

  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
});