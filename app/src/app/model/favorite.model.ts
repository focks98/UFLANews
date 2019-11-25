import { NewsModel } from './news.model';
import { UserModel } from './user.model';

export enum FavoriteTypeModel {
    STAR = 0,
    LIKE = 1
}

export class FavoriteModel {
    public constructor(
        public user: UserModel,
        public news: NewsModel,
        public favoriteType: FavoriteTypeModel,
        public id?: number) { }
}