export class Stat {
    constructor(
        public idUser: string,
        public nbCommentaires: number,
        public notes: number[],
        public nbRecipePosted: number
    ) { }
}