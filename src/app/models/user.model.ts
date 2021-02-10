import { Group } from "./group.model";

export class User {
    constructor(
        public id: string,
        public email?: string,
        public name?: string,
        public groups?: Group[],
        public rates?: number[],
        public nbComments?: number
    ) { }
}