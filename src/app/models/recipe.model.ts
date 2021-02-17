import { Comment } from './comment.model';
import { User } from './user.model';

export class Recipe {
    constructor(
        public title: string,
        public prepTime: number,
        public totalTime: number,
        public ingredients: string,
        public steps: string,
        public author: string,
        public idRecipe?: number,
        public rates?: number[],
        public comments?: Comment[]
    ) { }
}
