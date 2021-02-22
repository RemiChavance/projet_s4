import { Comment } from './comment.model';

export class Recipe {
    constructor(
        public idRecipe: string,
        public idGroup: number,
        public title: string,
        public type: string,
        public prepTime: number,
        public totalTime: number,
        public ingredients: string,
        public steps: string,
        public description: string,
        public author: string,
        public rates?: number[],
        public comments?: Comment[]
    ) { }
}
