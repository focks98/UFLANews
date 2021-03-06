import { Injectable } from '@angular/core';
import { PublisherModel } from '../model/publisher.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsModel } from '../model/news.model';
import { NewsService } from 'src/app/services/news.service';

import 'rxjs/Rx';
import { AuthService } from './auth.service';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})

export class PublisherService {

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

  async getAll(): Promise<PublisherModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/publishers`, options).map(
      (itens: PublisherModel[]) => {
        return itens.map(
          (item: PublisherModel) => {
            return new PublisherModel(
              item.id, item.name, item.thumbnail);
          }
        )
      }
    ).toPromise();
  }

  async searchById(id: number): Promise<PublisherModel> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/publishers/${id}`, options).map(
      (item: PublisherModel) => {
        return new PublisherModel(
          item.id, item.name, item.thumbnail);
      }
    ).toPromise();
  }

  async searchByName(name: string): Promise<PublisherModel[]> {

    name = name.trim().toLowerCase();

    if (name == '') {
      return this.getAll();
    }

    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/publishers?q=${name}`, options).map(
      (itens: PublisherModel[]) => {
        return itens.map(
          (item: PublisherModel) => {
            return new PublisherModel(
              item.id, item.name, item.thumbnail);
          }
        )
      }
    ).toPromise();
  }

  async update(publisher: PublisherModel) {
    const options = await this.getHttpOptions();

    return this.http.put(`${API_URL}/publishers/${publisher.id}`, publisher, options).map(
      (item: PublisherModel) => {
        return new PublisherModel(
          item.id, item.name, item.thumbnail);
      }
    ).toPromise();
  }
}
