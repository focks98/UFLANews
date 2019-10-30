export class NewsModel {
    constructor(
        public id: number,
        public title: string,
        public likes: number,
        public publishedAt: Date,
        public image: string,
        public content: string,
        public link: string     
    ) {}
} 