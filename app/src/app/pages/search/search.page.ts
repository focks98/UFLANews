import { Component, OnInit } from '@angular/core';
import { PublisherModel } from 'src/app/model/publisher.model';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { SubscribedPublisherModel } from '../../model/subscribed_publisher.model';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-news',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  listPublishers: PublisherModel[];
  listSubscribes: SubscribedPublisherModel[];
  user: UserModel;
  subscribeId: number;
  arraySubscribes;


  constructor(
    public authService: AuthService,
    public userService: UserService,
    public publisherService: SearchService,
    public alertController: AlertController) {}

  async ngOnInit() {
    this.listPublishers = await this.publisherService.getAll();

    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    this.listSubscribes = await this.publisherService.getSubscribesUser(this.user.id);

    // Contém as notícias curtidas pelo usuário
    this.arraySubscribes = []
    for (let index = 0; index < this.listSubscribes.length; index++) {
      await this.arraySubscribes.push(this.listSubscribes[index].id_publisher);
    }
  }

  async doRefresh(event: any) {
    try {
      this.listSubscribes = await this.publisherService.getSubscribesUser(this.user.id);
      this.arraySubscribes = []
      for (let index = 0; index < this.listSubscribes.length; index++) {
        await this.arraySubscribes.push(this.listSubscribes[index].id_publisher);
      }
    } finally {
      event.target.complete();
    }
  }

  async updateListPublishers(event: any) {
    this.listPublishers = await this.publisherService.searchByName(event.target.value);
  }

  async subscribedPublisher(publisher_id: number) {
    if (!this.verifySubscribe(publisher_id)) {
      this.subscribeAlert();
      let subscribe = new SubscribedPublisherModel(null, this.user.id, publisher_id);
      await this.publisherService.postSubscribedPublisher(subscribe);
    } else {
      this.unsubscribeAlert();
      this.subscribeId = this.verifyId(publisher_id);
      await this.publisherService.delete(this.subscribeId);
    }

    this.listPublishers = await this.publisherService.getAll();
  }

  verifyId(publisher_id: number) {
    for (let index = 0; index < this.listSubscribes.length; index++) {
      if(this.arraySubscribes[index] === publisher_id) {
        return this.subscribeId = this.listSubscribes[index].id;
      }
    }
  }

  verifySubscribe(id_publisher: number) {
    return (this.arraySubscribes.indexOf(id_publisher) != -1);
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

