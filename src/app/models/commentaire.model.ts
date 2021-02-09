import { User } from "./user.model";

export class Commentaire {
    constructor(
        idCommentaire: number,
        comment: string,
        author: User
    ) { }
}