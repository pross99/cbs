export class User {
    email: string;
    displayName?: string;
    photoUrl?: string

    constructor(email: string, displayName?: string, photoUrl?: string) {
        this.email = email;
        this.displayName = displayName;
        this.photoUrl = photoUrl;
    }
}