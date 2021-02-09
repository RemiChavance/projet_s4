import { Commentaire } from "./commentaire.model";
import { User } from "./user.model";

export class Recette {
    constructor(
        idRecette: number,
        titre: string,
        descrption: string, // a remplacer par d'autre attributs par la suite --> liste des ingrédients, étapes de préparation, etc ...
        author: User,
        notes: number[],
        commentaires: Commentaire[]        
    ) { }
}