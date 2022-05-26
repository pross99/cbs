import { User } from "../../entities/User";
import { LOGOUT, REHYDRATE_USER, SIGNUP, LOGIN } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User | null,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: {} as User,
    idToken: undefined
}
// For at ændre state i applikation laver jeg et nyt objekt ved at passe den nuværende state og action.payload
// Det returnere et nyt objekt med hele applikation state 
// Slutresultatet er et one-way data-flow -- Store> Subscribe> Dispatch> Action>Reducer
// Redux - meget boilerplate kode og kinda meget komplexsitet til et "lille" projekt 

// Function som taget den gamle state og action  og så definere man logikken som er krævet for at ændre "the state"
const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, loggedInUser: null, idToken: undefined }
            
        case SIGNUP:
            const newUser = new User(action.payload.email, '', '');
      // return {...state, loggedInUser: user}

      //const user = {email: 'fakjsdflh', photoUrl: 'afdds' } as User
      return {
        ...state,
        loggedInUser: newUser,
        idToken: action.payload.idToken,
      };

            case LOGIN:
                     const user = new User(action.payload.email,action.payload.displayName, action.payload.photoUrl)
      
      return {
        ...state,
        loggedInUser: user,
        idToken: action.payload.idToken,
      };

      case REHYDRATE_USER:
        console.log("display name updated", action.payload.user)
        return {
          ...state,
          loggedInUser: action.payload.user,
          idToken: action.payload.idToken,
        };

        
            default:
               return state;
    }
};

export default userReducer;