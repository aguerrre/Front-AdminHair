export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google_auth?: boolean,
        public is_confirmed?: boolean,
        public uid?: string,
    ) { }
}