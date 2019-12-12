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

  checkForm() {
    if (
      this.user.name == undefined || this.user.name.trim() == "" ||
      this.user.email == undefined || this.user.email.trim() == "" ||
      this.password == undefined || this.password.trim() == "" ||
      this.confPassword == undefined || this.confPassword.trim() == "") {
      this.toastService.presentMessage("Por favor, preencha todos os campos do formulário!", MessageType.ERROR);
      return false;
    }

    if (this.password != this.confPassword) {
      this.toastService.presentMessage("As senhas informadas não conferem!", MessageType.ERROR);
      return false;
    }

    return true;
  }

  async save() {
    if (this.checkForm()) {
      try {

        console.log("id_do_usuario: " + this.user.id);
        console.log("id_do_usuario: " + this.user.email);
        console.log("id_do_usuario: " + this.password);

        const token: any = await this.authService.register(this.user.email, this.password);

        // TEM QUE ARRUMAR ISSO
        // const token: any = await this.authService.editAccount(this.user.id, this.user.email, this.password);

        // Isto foi necessário, pois o token ainda não existe e o usuário
        // precisa ser cadastrado na base de dados da API
        await this.userService.update(this.user, token.access_token);

        // this.user = new UserModel();
        this.password = "";
        this.confPassword = "";

        this.toastService.presentMessage("Conta editada com sucesso!", MessageType.SUCCESS);
      } catch (error) {
        this.toastService.presentMessage("Já existe uma conta cadastrada com esse endereço de email!", MessageType.ERROR);
      }
    }
  }

}
