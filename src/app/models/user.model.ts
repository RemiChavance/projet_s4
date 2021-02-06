import { Groupe } from "./groupe.model";

export class User {
    constructor(
        public email: string,
        public password: string,
        public nom: string,
        public groupes?: Groupe[],
        public notes?: number[],
        public nbCommentaires?: number
    ) { }
}