import { Comment } from "./comment.model";

export class Recipe {
    constructor(
        public idRecipe: number,
        public title: string,
        public description: string, // a remplacer par d'autre attributs par la suite --> liste des ingrédients, étapes de préparation, etc ...
        public authorId: string,
        public rates: number[],
        public comments: Comment[]        
    ) { }
}