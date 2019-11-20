import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/app/model/news.model';
import { NewsService } from 'src/app/services/news.service';
import { LikesPipe } from 'src/app/pipes/likes.pipe';
import { PublisherService } from 'src/app/services/publisher.service';
import { PublisherModel } from 'src/app/model/publisher.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  lstNews: NewsModel[];
  listPublishers: PublisherModel[];

  constructor(
    public newsService: NewsService,
    public publisherService: PublisherService
  ) { }

  async ngOnInit() {
    this.lstNews = await this.newsService.getAll();
    this.listPublishers = await this.publisherService.getAll();
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