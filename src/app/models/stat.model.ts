import { User } from "./user.model";

export class Stat {
    constructor(
        public idUser: User,
        public nbCommentaires: number,
        public notes: number[]
    ) { }
}
