export interface UserModel {
    firstName: string;
    lastName: String;
    name: String | "Peter Ross"
}

export interface UserState{
    user: UserModel;
    error: string | undefined
    name: String | "Peter Ross"
}