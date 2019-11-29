import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorite.service';
import { FavoriteModel, FavoriteTypeModel } from 'src/app/model/favorite.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SubscribedPublisherModel } from '../../model/subscribed_publisher.model';
import { PublisherModel } from '../../model/publisher.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  lstFavoritePublishers: PublisherModel[];
  listSubscribes: SubscribedPublisherModel[];
  user: UserModel;
  arraySubscribes;
  

  constructor(
    public favoritesService: FavoritesService,
    public authService: AuthService,
    public userService: UserService) {
  }

  async ngOnInit() {
    const userEmail: string = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    this.lstFavoritePublishers = await this.favoritesService.
      getAllSubscribedPublishers(this.user.id);

    console.log(this.lstFavoritePublishers);

    this.listSubscribes = await this.favoritesService.getSubscribesUser(this.user.id);

    //Contém as notícias curtidas pelo usuário
    this.arraySubscribes = []
    for (let index = 0; index < this.listSubscribes.length; index++) {
      await this.arraySubscribes.push(this.listSubscribes[index].id_publisher);
    }
  }

  async doRefresh(event: any) {
    try {
      this.lstFavoritePublishers = await this.favoritesService.
      getAllSubscribedPublishers(this.user.id);
    } finally {
      event.target.complete();
    }
  }

  verifySubscribe(id_publisher: number) {    
    return (this.arraySubscribes.indexOf(id_publisher) != -1);
    
  }
}