import { Injectable } from '@angular/core';
import { NewsModel } from '../model/news.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { AuthService } from './auth.service';
import { LikesModel } from '../model/likes.model';
import { CommentsModel } from '../model/comments.model';
import { SectionsModel } from '../model/sections.model';
import { isNgTemplate } from '@angular/compiler';
import { isEmpty } from 'rxjs-compat/operator/isEmpty';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})

export class NewsService {

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

  async getAll(): Promise<NewsModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/news`, options).map(
      (itens: NewsModel[]) => {
        return itens.map(
          (item: NewsModel) => {
            return new NewsModel(
              item.id, item.title, item.likes, item.comments, item.publishedAt,
              item.image, item.content, item.id_publisher);
          }
        )
      }
    ).toPromise();
  }

  async getSectionsNews(id_news: number): Promise<SectionsModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/sections?id_news=${id_news}`, options).map(
      (itens: SectionsModel[]) => {
        return itens.map(
          (item: SectionsModel) => {
            return new SectionsModel(item.id, item.id_news, item.title, item.content, item.image);
          }
        )
      }
    ).toPromise();
  }


  async getAllCommentsNews(id_news: number): Promise<CommentsModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/comments?id_news=${id_news}`, options).map(
      (itens: CommentsModel[]) => {
        return itens.map(
          (item: CommentsModel) => {
            return new CommentsModel(
              item.id, item.id_news, item.id_user, item.publishedAt, item.content);
          }
        )
      }
    ).toPromise();
  }


  async postComment(comment: CommentsModel) {
    
    const options = await this.getHttpOptions(); 

    return this.http.post(`${API_URL}/comments`, comment, options).map(
      (item: CommentsModel) => {
        return new CommentsModel(
          item.id, item.id_news, item.id_user, item.publishedAt,
          item.content);
      }
    ).toPromise();
    

  }

  async deleteComment(id_comment: number) {
    
    const options = await this.getHttpOptions(); 

    return this.http.delete(`${API_URL}/comments/${id_comment}`,  options).map(
      (item: CommentsModel) => {
        return new CommentsModel(
          item.id, item.id_news, item.id_user, item.publishedAt,
          item.content);
      }
    ).toPromise();

  }


  async updateComment(comment: CommentsModel) {
    
    const options = await this.getHttpOptions(); 

    return this.http.put(`${API_URL}/comments/${comment.id}`, comment, options).map(
      (item: CommentsModel) => {
        return new CommentsModel(
          item.id, item.id_news, item.id_user, item.publishedAt,
          item.content);
      }
    ).toPromise();
    

  }

  async getLikesUser(id_user: number): Promise<LikesModel[]> {

    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/likes?id_user=${id_user}`, options).map(
      (itens: LikesModel[]) => {
        return itens.map(
          (item: LikesModel) => {
            return new LikesModel(
              item.id, item.id_user, item.id_news);
          }
        )
      }
    ).toPromise();
  }

  async searchById(id: number): Promise<NewsModel> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/news/${id}`, options).map(
      (item: NewsModel) => {
        return new NewsModel(
          item.id, item.title, item.likes, item.comments, item.publishedAt,
          item.image, item.content, item.id_publisher);
      }
    ).toPromise();
  }

  async searchByTitle(title: string): Promise<NewsModel[]> {

    title = title.trim().toLowerCase();

    if (title == '') {
      return this.getAll();
    }

    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/news?q=${title}`, options).map(
      (itens: NewsModel[]) => {
        return itens.map(
          (item: NewsModel) => {
            return new NewsModel(
              item.id, item.title, item.likes, item.comments, item.publishedAt,
              item.image, item.content, item.id_publisher);
          }
        )
      }
    ).toPromise();
  }

  async update(news: NewsModel) {
    const options = await this.getHttpOptions();

    return this.http.put(`${API_URL}/news/${news.id}`, news, options).map(
      (item: NewsModel) => {
        return new NewsModel(
          item.id, item.title, item.likes, item.comments, item.publishedAt,
          item.image, item.content, item.id_publisher);
      }
    ).toPromise();
  }
}