import { Component, OnInit } from '@angular/core';
import { PublisherModel } from 'src/app/model/publisher.model';
import { SearchService } from 'src/app/services/search.service';
import { UserModel } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  listPublishers: PublisherModel[];

  constructor(
    public searchService: SearchService) {}

  async ngOnInit() {
    this.listPublishers = await this.searchService.getAll();
  }

  async doRefresh(event: any) {
    try {
      this.listPublishers = await this.searchService.getAll();
    } finally {
      event.target.complete();
    }
  }

  async updateListPublishers(event: any) {
    this.listPublishers = await this.searchService.searchByName(event.target.value);
  }
  
}

