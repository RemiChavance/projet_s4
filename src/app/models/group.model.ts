import { Recipe } from "./recipe.model";
import { Stat } from "./stat.model";
import { User } from "./user.model";

export class Group {
    constructor(
        public name: string,
        public adminId: string,
        public idGroup?: number,
        public requests?: User[],
        public stats?: Stat[],
        public recipes?: Recipe[]
    ) { }
}