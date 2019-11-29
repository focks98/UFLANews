import { Component, OnInit } from '@angular/core';
import { PublisherModel } from 'src/app/model/publisher.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { ActivatedRoute } from '@angular/router';
import { NewsModel } from 'src/app/model/news.model'
import { NewsService } from 'src/app/services/news.service'
import { AlertController } from '@ionic/angular';
import { LikesPipe } from 'src/app/pipes/likes.pipe';

@Component({
  selector: 'app-news',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})

export class PublisherPage implements OnInit {

  selectedPublisher: PublisherModel;
  publisherId: number;
  lstNews : NewsModel[];

  constructor(
    public newsService : NewsService,
    public activatedRoute: ActivatedRoute,
    public publisherService: PublisherService) {}

  async ngOnInit() {
      this.publisherId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

      this.selectedPublisher = await this.publisherService.searchById(this.publisherId);
      this.lstNews = await this.newsService.getAll();
  }

  async doRefresh(event: any) {
    try {
        this.publisherId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.selectedPublisher = await this.publisherService.searchById(this.publisherId);
    } finally {
      event.target.complete();
    }
  }

}
