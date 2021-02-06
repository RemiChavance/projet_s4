import { User } from "./user.model";

export class Groupe {
    constructor(
        public nom: string,
        public admin: User,
        public demandes: User[],
        /*public stats: Stat[],
        public recettes: Recette[]*/
    ) { }
}