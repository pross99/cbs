import * as SecureStore from 'expo-secure-store';
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import { User } from '../../entities/User';


export const SIGNUP = 'SIGNUP';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const LOGOUT = 'LOGOUT';
export const LOGIN = "LOGIN"

export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}

export const logout = () => {
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}

export const login =(email : string, password : string) => {
    const APIKEY = "AIzaSyAnEsawmbpAUL7D545OdchE1SdJ0fzB-Is"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKEY 
    // laver en const som jeg kalder i min fetch forneden
    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password,
                returnSecureToken: true
            })
        });

        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            
            const user = new User(data.email, '', '');
             
             
            SecureStore.setItemAsync('idToken', data.idToken);
            SecureStore.setItemAsync('user', JSON.stringify(user));


 
 
            dispatch({type: LOGIN, payload: { user, token: data.idToken } })
        }
    };
 };
export const signup = (email : string, password : string) => {
    const APIKEY = "AIzaSyAnEsawmbpAUL7D545OdchE1SdJ0fzB-Is"
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APIKEY // 

   return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
       const response = await fetch(url, {

           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email, //email: email
               password,
               returnSecureToken: true //returns ID and refresh token. ALWAYS USE TRUE
           })
       });
 
       if (!response.ok) {
           //There was a problem.. error handling time, BUT I WONT LOL
           console.log("response problem");

       } else {
           const data: FirebaseSignupSuccess = await response.json(); // json to javascript
           console.log("Data from the server ", data);

           const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

           dispatch({type: SIGNUP, payload: {email: data.email, idToken: data.idToken}})
       }
   };
};