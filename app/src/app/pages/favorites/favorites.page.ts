import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorite.service';
import { FavoriteModel, FavoriteTypeModel } from 'src/app/model/favorite.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  lstFavoriteNews: FavoriteModel[];
  user: UserModel;

  constructor(
    public favoritesService: FavoritesService,
    public authService: AuthService,
    public userService: UserService) {
  }

  async ngOnInit() {
    const userEmail: string = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    this.lstFavoriteNews = await this.favoritesService.
      getAllByUser(this.user.id, FavoriteTypeModel.STAR);
  }

  async doRefresh(event: any) {
    try {
      this.lstFavoriteNews = await this.favoritesService.
        getAllByUser(this.user.id, FavoriteTypeModel.STAR);
    } finally {
      event.target.complete();
    }
  }
}