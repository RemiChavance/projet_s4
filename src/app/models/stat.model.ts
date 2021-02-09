import { User } from "./user.model";

export class Stat {
    constructor(
        public user: User,
        public nbCommentaires: number,
        public notes: number[]
    ) { }
}