import { Component, OnInit } from '@angular/core';
import { PublisherModel } from 'src/app/model/publisher.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { SubscribedPublisherModel } from '../../model/subscribed_publisher.model';


@Component({
  selector: 'app-news',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})

export class PublisherPage implements OnInit {

  listPublishers: PublisherModel[];
  user: UserModel;


  constructor(
    public authService: AuthService,
    public userService: UserService,
    public publisherService: PublisherService) {}

  async ngOnInit() {
    this.listPublishers = await this.publisherService.getAll();

    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);
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

  async subscribedPublisher(publisher_id: number){
    let subscribe = new SubscribedPublisherModel(null, this.user.id, publisher_id);

    await this.publisherService.postSubscribedPublisher(subscribe);


  }
  
}

