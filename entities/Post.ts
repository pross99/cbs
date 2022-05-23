import { User } from "./User";

export class Post {
    id: any;
    constructor(public userId: string, public postImg: string,
        public postTime: Date, public likes: null, public comments: null,) { }
}

