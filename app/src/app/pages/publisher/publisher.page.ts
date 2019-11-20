import { Component, OnInit } from '@angular/core';
import { PublisherModel } from 'src/app/model/publisher.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { UserModel } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})

export class PublisherPage implements OnInit {

  listPublishers: PublisherModel[];

  constructor(
    public publisherService: PublisherService) {}

  async ngOnInit() {
    this.listPublishers = await this.publisherService.getAll();
  }

  async doRefresh(event: any) {
    try {
      this.listPublishers = await this.publisherService.getAll();
    } finally {
      event.target.complete();
    }
  }

  async updateListPublishers(event: any) {
    this.listPublishers = await this.publisherService.searchByName(event.target.value);
  }
  
}

