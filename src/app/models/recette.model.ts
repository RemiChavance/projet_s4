import { Commentaire } from "./commentaire.model";
import { User } from "./user.model";

export class Recette {
    constructor(
        public idRecette: number,
        public titre: string,
        public descrption: string, // a remplacer par d'autre attributs par la suite --> liste des ingrédients, étapes de préparation, etc ...
        public author: User,
        public notes: number[],
        public commentaires: Commentaire[]        
    ) { }
}