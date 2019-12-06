import { Component, OnInit } from '@angular/core';
import { PublisherModel } from 'src/app/model/publisher.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { ActivatedRoute } from '@angular/router';
import { NewsModel } from 'src/app/model/news.model'
import { NewsService } from 'src/app/services/news.service'
import { AlertController } from '@ionic/angular';
import { LikesPipe } from 'src/app/pipes/likes.pipe';
import { SubscribedPublisherModel } from '../../model/subscribed_publisher.model';
import { SearchService } from 'src/app/services/search.service';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})

export class PublisherPage implements OnInit {

  selectedPublisher: PublisherModel;
  publisherId: number;
  lstNews : NewsModel[];
  user: UserModel;
  listSubscribes: SubscribedPublisherModel[];
  arraySubscribes;
  subscribeId: number;

  constructor(
    public newsService : NewsService,
    public activatedRoute: ActivatedRoute,
    public publisherService: PublisherService,
    public searchService: SearchService,
    public userService: UserService,
    public authService: AuthService,
    public alertController: AlertController) {}

  async ngOnInit() {
      this.publisherId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

      this.selectedPublisher = await this.publisherService.searchById(this.publisherId);
      this.lstNews = await this.newsService.getAll();

      const userEmail = await this.authService.getAuthEmail();
      this.user = await this.userService.getUserByEmail(userEmail);
      this.listSubscribes = await this.searchService.getSubscribesUser(this.user.id);

      this.arraySubscribes = []
      for (let index = 0; index < this.listSubscribes.length; index++) {
        await this.arraySubscribes.push(this.listSubscribes[index].id_publisher);
      }
  }

  async doRefresh(event: any) {
    try {
        this.publisherId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.selectedPublisher = await this.publisherService.searchById(this.publisherId);
    } finally {
      event.target.complete();
    }
  }

  async subscribedPublisher() {
    if (!this.verifySubscribe()) {
      this.subscribeAlert();
      let subscribe = new SubscribedPublisherModel(null, this.user.id, this.selectedPublisher.id);
      console.log("USER.ID: " + this.user.id);
      console.log("SELECTEDPUBLISHER.ID: " + this.selectedPublisher.id);
      await this.searchService.postSubscribedPublisher(subscribe);
    } else {
      this.unsubscribeAlert();
      console.log("USER.ID: " + this.user.id);
      console.log("SELECTEDPUBLISHER.ID: " + this.selectedPublisher.id);
      this.subscribeId = this.verifyId();
      await this.searchService.delete(this.selectedPublisher.id);
    }
  }

  verifyId() {
    for (let index = 0; index < this.listSubscribes.length; index++) {
      if(this.arraySubscribes[index] === this.selectedPublisher.id) {
        return this.subscribeId = this.listSubscribes[index].id;
      }
    }
  }

  verifySubscribe() {
    return (this.arraySubscribes.indexOf(this.selectedPublisher.id) != -1);
  }

  async subscribeAlert() {
    const alert = await this.alertController.create({
      message: 'Inscrição realizada com sucesso!',
      buttons: ['OK']
    });
    await alert.present();

  }

  async unsubscribeAlert() {
    const alert = await this.alertController.create({
      message: 'Inscrição retirada com sucesso!',
      buttons: ['OK']
    });
    await alert.present();
  }

}
