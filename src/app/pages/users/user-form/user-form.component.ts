import { User } from './../../../core/models/user';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Validators } from '@angular/forms';
import { UserService } from './../../../core/services/user.service';
import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BaseFormComponent<User> {
  user: User;

  constructor(private userService: UserService, protected injector: Injector) {
    super(injector, userService);
    this.setErrorAdded = "Não foi possível adicionar o usuário!";
    this.setSuccessAdded = "Usuário adicionado com sucesso!";
    this.setNavigate = ['/users'];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      permission: [null, [Validators.required]],
      serverId: [this.loginService.getServer().id]
    });
    this.user = this.loginService.getUser();
    if (this.route.snapshot.paramMap.get('id')) {
      this.editing = true;
      const id = this.route.snapshot.paramMap.get('id');
      this.userService.getById(id).subscribe((user: User) => {
        // this.form = this.formBuilder.group(user)
        this.form = this.formBuilder.group({
          id: [user.id],
          name: [user.name, [Validators.required]],
          email: [user.email, [Validators.required, Validators.email]],
          password: [user.password, [Validators.required]],
          permission: [user.permission, [Validators.required]],
          serverId: [user.server ? user.server.id : '']
        });
        console.log(this.form);
      });
    } else {
      this.ngxSpinner.show();
      setTimeout(() => {
        this.ngxSpinner.hide();
      }, 100);
    }
  }
}
