import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/app/model/news.model';
import { NewsService } from 'src/app/services/news.service';
import { LikesPipe } from 'src/app/pipes/likes.pipe';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  lstNews: NewsModel[];

  constructor(public newsService: NewsService) { }

  async ngOnInit() {
    this.lstNews = await this.newsService.getAll();
  }

  async doRefresh(event: any) {
    try {
      this.lstNews = await this.newsService.getAll();
    } finally {
      event.target.complete();
    }    
  }

  async updateListNews(event: any) {
    this.lstNews = await this.newsService.searchByTitle(event.target.value);
  }
}