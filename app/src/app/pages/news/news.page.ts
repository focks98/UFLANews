import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/app/model/news.model';
import { NewsService } from 'src/app/services/news.service';
import { LikesPipe } from 'src/app/pipes/likes.pipe';
import { PublisherService } from 'src/app/services/publisher.service';
import { PublisherModel } from 'src/app/model/publisher.model';
import { LikesModel } from '../../model/likes.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})



export class NewsPage {

  lstNews: NewsModel[];
  lstLikes: LikesModel[];
  listPublishers: PublisherModel[];
  user: UserModel;
  arrayLikes;

  constructor(
    public newsService: NewsService,
    public publisherService: PublisherService,
    public authService: AuthService,
    public userService: UserService
    
  ) { }

  async ngOnInit() {
    this.lstNews = await this.newsService.getAll();

    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);
    this.lstLikes = await this.newsService.getLikesUser(this.user.id);

    
    this.listPublishers = await this.publisherService.getAll();

    //Contém as notícias curtidas pelo usuário
    this.arrayLikes = []
    for (let index = 0; index < this.lstLikes.length; index++) {
      await this.arrayLikes.push(this.lstLikes[index].id_news);
    }
  }

  async doRefresh(event: any) {
    console.log('chamei refresh')
    try {
      this.lstNews = await this.newsService.getAll();
    } finally {
      event.target.complete();
    }    
  }

  async updateListNews(event: any) {
    this.lstNews = await this.newsService.searchByTitle(event.target.value);
  }

  
  verifyLike(id_news: number) {    
    return (this.arrayLikes.indexOf(id_news) != -1);
    
  }
  
  
}