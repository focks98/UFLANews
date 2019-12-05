import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  // currentNews: NewsModel;
  starId: number;
  likeId: number;
  newsId: number;
  user: UserModel;

  constructor(
    // public activatedRoute: ActivatedRoute,
    // public socialSharing: SocialSharing,
    // public newsService: NewsService,
    // public favoritesService: FavoritesService,
    public authService: AuthService,
    public userService: UserService) {
    // public alertController: AlertController) {
  }

  async ngOnInit() {
    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    // this.newsId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    // this.currentNews = await this.newsService.searchById(this.newsId);
    // this.starId = await this.favoritesService.getFavoriteId(this.user.id, this.newsId, FavoriteTypeModel.STAR);
    // this.likeId = await this.favoritesService.getFavoriteId(this.user.id, this.newsId, FavoriteTypeModel.LIKE);
  }

}
