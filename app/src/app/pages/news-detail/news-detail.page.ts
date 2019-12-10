import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsModel } from 'src/app/model/news.model';
import { NewsService } from 'src/app/services/news.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FavoritesService } from 'src/app/services/favorite.service';
import { FavoriteModel, FavoriteTypeModel } from 'src/app/model/favorite.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { CommentsModel } from '../../model/comments.model';
import { LikesModel } from '../../model/likes.model';
import { SectionsModel } from 'src/app/model/sections.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  currentNews: NewsModel;
  starId: number;
  likeId: number;
  newsId: number;
  user: UserModel;
  commentsNews: CommentsModel[];
  commentUser: string;

  commentWillEdit: CommentsModel;
  editComment: boolean;

  lstLikes: LikesModel[];
  arrayLikes;

  sectionsNews: SectionsModel[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public socialSharing: SocialSharing,
    public newsService: NewsService,
    public favoritesService: FavoritesService,
    public authService: AuthService,
    public userService: UserService,
    public alertController: AlertController) {
  }

  async ngOnInit() {
    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    this.newsId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.currentNews = await this.newsService.searchById(this.newsId);
    this.commentsNews = await this.newsService.getAllCommentsNews(this.newsId);
    this.editComment = false;

    this.likeId = await this.favoritesService.getLikeId(this.user.id, this.newsId);
    this.sectionsNews = await this.newsService.getSectionsNews(this.newsId);
  }

  async handleLike() {
    if (!this.likeId) {
      this.likeAlert();
      let like = new LikesModel(null, this.user.id, this.newsId);
      this.likeId = await this.favoritesService.add(like);
      this.currentNews.likes += 1;
    } else {
      this.dislikeAlert();
      await this.favoritesService.delete(this.likeId);
      this.likeId = null;
      this.currentNews.likes -= 1;
    }
    this.currentNews = await this.newsService.update(this.currentNews);
  }

  async handleCommentsVisibility() {
    if (document.getElementById("comments").style.display == "none") {
      document.getElementById("comments").style.display = "block";
      document.getElementById("commentsUsers").style.display = "block";
    }
    else {
      document.getElementById("comments").style.display = "none";
      document.getElementById("commentsUsers").style.display = "none";
    }
  }

  horarioPublicacao(data: string){
    let data_partes = data.split('T')

    let data_dia = data_partes[0].split('-')
    
    let dia = data_dia[2]
    let mes = data_dia[1]
    let ano = data_dia[0]

    let data_publicada = dia + '/' + mes + '/' + ano

    let horario_publicado = data_partes[1].split(':')
    let hora = horario_publicado[0] + ":" + horario_publicado[1]

    return data_publicada + ' às ' + hora
  }

  async likeAlert() {
    const alert = await this.alertController.create({
      message: 'Like atribuído com sucesso!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async dislikeAlert() {
    const alert = await this.alertController.create({
      message: 'Like retirado com sucesso!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async updateComment(comment: CommentsModel) {
    if (!this.editComment) {
      const alert = await this.alertController.create({
        message: 'Digite o comentário para edição',
        buttons: ['OK']
      });
      await alert.present();

      this.commentUser = '';
      this.editComment = true;
      this.commentWillEdit = comment;

      return false;
    }
    else {
      comment.content = this.commentUser
  
      await this.newsService.updateComment(comment);

      this.commentUser = '';
      this.commentsNews = await this.newsService.getAllCommentsNews(this.newsId);
      this.editComment = false;
      const alert = await this.alertController.create({
        message: 'Comentário editado com sucesso',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async removeComment(id_comment: number) {
    await this.newsService.deleteComment(id_comment);
    this.commentsNews = await this.newsService.getAllCommentsNews(this.newsId);
    this.currentNews.comments -= 1;
  }

  async sendComment(id_news: number) {
    if (!this.commentUser) {
      alert('Digite algo')
      return false
    }

    if (!this.editComment) {
      let now = new Date();

      let comment = new CommentsModel(
        null, id_news, this.user.id, now, this.commentUser);

      await this.newsService.postComment(comment);
      this.commentUser = ''
      this.commentsNews = await this.newsService.getAllCommentsNews(this.newsId);
      this.currentNews.comments += 1;
    }
    else {
      this.updateComment(this.commentWillEdit);
    }

  }
}