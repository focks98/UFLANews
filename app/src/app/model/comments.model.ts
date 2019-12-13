export class CommentsModel {
    constructor(
        public id: number,
        public id_news: number,
        public id_user: number,
        public name_user: string,
        public publishedAt: Date,
        public content: string
    ) {}
}