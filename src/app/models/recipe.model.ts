import { Comment } from "./comment.model";
import { User } from "./user.model";

export class Recipe {
    constructor(
        public idRecipe: number,
        public title: string,
        public description: string, // a remplacer par d'autre attributs par la suite --> liste des ingrédients, étapes de préparation, etc ...
        public author: User,
        public rates: number[],
        public comments: Comment[]        
    ) { }
}