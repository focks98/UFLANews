import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';

import { FavoriteModel, FavoriteTypeModel } from '../model/favorite.model';
import { AuthService } from './auth.service';
import { LikesModel } from '../model/likes.model';
import { SectionsModel } from '../model/sections.model';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {


  constructor(public http: HttpClient, public authService: AuthService) { }

  async getHttpOptions() {
    const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getLikeId(userId: number, newsId: number): Promise<number> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/likes?id_user=${userId}&id_news=${newsId}`, options).map(
      (likes: LikesModel[]) => {
        return (likes.length == 0) ? null : likes[0].id;
      }
    ).toPromise();
  }

  async getAllByUser(userId: number, type: FavoriteTypeModel): Promise<FavoriteModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/favorites?_expand=news&_expand=user&userId=${userId}&favoriteType=${type}`, options).map(
      (itens: FavoriteModel[]) => {
        return itens.map(
          (item: FavoriteModel) => {
            return new FavoriteModel(item.user, item.news, item.favoriteType, item.id);
          }
        )
      }
    ).toPromise();
  }

  async add(like: LikesModel): Promise<number> {    
    const data: any = {
      id: like.id,
      id_user: like.id_user,
      id_news: like.id_news
    }

    const options = await this.getHttpOptions();

    return this.http.post(`${API_URL}/likes`, data, options).map(
      (like: LikesModel) => {
        return like.id;
      }
    ).toPromise();
  }

  async delete(id: number): Promise<any> {
    const options = await this.getHttpOptions();

    return this.http.delete(`${API_URL}/likes/${id}`, options).toPromise();
  }
}