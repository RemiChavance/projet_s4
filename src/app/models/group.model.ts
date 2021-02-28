import { Stat } from './stat.model';

export class Group {
    constructor(
        public name: string,
        public adminId: string,
        public idGroup?: string,
        public requests?: string[],
        public stats?: Stat[],
    ) { }
}
