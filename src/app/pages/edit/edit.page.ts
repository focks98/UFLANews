import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService, MessageType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  user: UserModel;
  password: string;
  confPassword: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public toastService: ToastService
  ) { }

  async ngOnInit() {
    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);
  }

}
