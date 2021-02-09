import { User } from "./user.model";

export class Commentaire {
    constructor(
        public idCommentaire: number,
        public comment: string,
        public author: User
    ) { }
}