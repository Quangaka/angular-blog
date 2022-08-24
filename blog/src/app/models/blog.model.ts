export class Blog {
    constructor(
        public _id: string,
        public title: string,
        public topic: string,
        public author: string,
        public description: string,
        public body: string,
        public imageSrc: string,
        public createdAt: Date,
        public publishedAt: Date,
        public status: boolean,
    ) 
    {}
}