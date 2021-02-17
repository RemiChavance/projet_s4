import { User } from "./user.model";

export class Comment {
    constructor(
        public idComment: number,
        public description: string,
        public idAuthor: string
    ) { }
}