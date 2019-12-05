import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { ToastService, MessageType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: UserModel = new UserModel();
  password: string;
  confPassword: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public toastService: ToastService
  ) { }

  ngOnInit() {
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

        const token: any = await this.authService.register(this.user.email, this.password);

        // Isto foi necessário, pois o token ainda não existe e o usuário
        // precisa ser cadastrado na base de dados da API
        await this.userService.add(this.user, token.access_token);

        this.user = new UserModel();
        this.password = "";
        this.confPassword = "";

        this.toastService.presentMessage("Conta criada com sucesso!", MessageType.SUCCESS);
      } catch (error) {
        this.toastService.presentMessage("Já existe uma conta cadastrada com esse endereço de email!", MessageType.ERROR);
      }

    }

  }

}
