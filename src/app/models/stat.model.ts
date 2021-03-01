export class Stat {
    constructor(
        public idUser: string,
        public nbComments: number,
        public rates: number[],
        public nbRecipePosted: number
    ) { }
}