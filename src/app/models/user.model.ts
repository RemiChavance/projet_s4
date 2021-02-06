import { Groupe } from "./groupe.model";

export class User {
    constructor(
        public id: string,
        public email?: string,
        public nom?: string,
        public groupes?: Groupe[],
        public notes?: number[],
        public nbCommentaires?: number
    ) { }
}