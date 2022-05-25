import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen'
import AddPostScreen from '../screens/AddPostScreen';
import Screen1 from '../screens/ChatScreen';
import Screen2 from './../screens/Screen2';
import Screen3 from './../screens/Screen3';
import { StackParamList } from "./../typings/navigations";
import Icon from 'react-native-vector-icons/Ionicons';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

// function ChatStackNavigator() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Screen1" component={Screen1} />
//             <Stack.Screen name="Screen2" component={Screen2} />
//             <Stack.Screen name="Screen3" component={Screen3} />
//         </Stack.Navigator>
//     );
// }

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name='Messages' component={MessagesScreen} />

          
            
        </Stack.Navigator>
    )
}


function HomeStackNavigator(){
   
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='AddPost' component={AddPostScreen} />
        </Stack.Navigator>
    )

    }

    function ChatStackNavigator(){
   
        return (
            <Stack.Navigator>
                <Stack.Screen name='Messages' component={MessagesScreen} />
                <Stack.Screen name="Chat"
                component={ChatScreen}
                options={({route}) => ({
                     title:route.params.UserName
                })
               
            } />
                
            </Stack.Navigator>
        )
    
        }

export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    
  

    return (

   
        <NavigationContainer>
            {/* Move navigation related code to a seperate component that is used here */}
            {/* Determine if the user is logged in and display:
        A stack navigator (only) with signup and login
        Our "normal" app with tabs navigation */}
            {user !== null ? (
                // Show the app with all navigation
                <Tab.Navigator screenOptions={{ headerShown: false }}>


                        <Tab.Screen
                         name="Hjæm"
                          component={HomeStackNavigator}
                          options={({route}) => ({
                            tabBarLabel: 'Hjæm',
                            // tabBarVisible: route.state && route.state.index === 0,
                            tabBarIcon: ({color, size}) => (
                              <MaterialCommunityIcons
                                name="home-outline"
                                color={color}
                                size={size}
                          />
                            ),
                          })}
                          />
                    {/* <Tab.Screen name="Discover" component={DiscoverScreen} /> */}
                        <Tab.Screen
                         name="Beskeder"
                          component={ChatStackNavigator}
                          options={({route}) => ({
                            tabBarLabel: 'Beskeder',
                            // tabBarVisible: route.state && route.state.index === 0,
                            tabBarIcon: ({color, size}) => (
                              <MaterialCommunityIcons
                                name="chat-outline"
                                color={color}
                                size={size}
                          />
                            ),
                          })}
                           
                           
                           /> 
                    <Tab.Screen
                     name="Profil"
                      component={ProfileStackNavigator}
                      options={({route}) => ({
                        tabBarLabel: 'Profil',
                        // tabBarVisible: route.state && route.state.index === 0,
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons
                            name="account-outline"
                            color={color}
                            size={size}
                      />
                        ),
                      })}
                      
                      
                      />


                  

                </Tab.Navigator>

               

          

     
            ) : 
            (

                
                // show a stack navigator with only signup and login screens.
                <Stack.Navigator>
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />  
                  
                </Stack.Navigator>
            )}

            
                
            
        </NavigationContainer>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})