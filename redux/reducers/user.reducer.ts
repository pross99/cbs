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

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, loggedInUser: null, idToken: undefined }
        case REHYDRATE_USER:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case SIGNUP:
            // const user = new User(action.payload.email, '', '');
            //state.loggedInUser = user; // MUTATION!!!!
            console.log("new acc created")
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }

            case LOGIN:
                     const user = new User(action.payload.email,)
      
      return {
        ...state,
        loggedInUser: user,
        idToken: action.payload.idToken,
      };

        
            default:
               return state;
    }
};

export default userReducer;