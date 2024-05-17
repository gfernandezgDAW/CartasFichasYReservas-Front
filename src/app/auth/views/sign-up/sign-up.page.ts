import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UtilsService } from '../../../common/services/utils.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage {
  signUpForm = this.fromBuilder.group({
    username: ['', [Validators.required]],
    dni: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{8,8}[A-Za-z]$')],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    checkPassword: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  registerSubmit() {
    if (!this.checkIfSamePassword()) {
      this.signUpForm.controls['checkPassword'].setErrors({ mismatch: true });
      this.utilsService.displayToast(
        'La contraseña introducida no coincide',
        'error'
      );
      return;
    }

    const formControls = this.signUpForm.controls;
    const username = formControls.username.value;
    const dni = formControls.dni.value;
    const email = formControls.email.value;
    const password = formControls.password.value;
    if (!username || !dni || !email || !password) {
      return;
    }

    this.authService
      .signUp(username, email.trim(), dni.trim(), password)
      .pipe(first())
      .subscribe(
        () => {
          this.utilsService.displayToast(
            'Usuario registrado con exito',
            'info'
          );
          this.navigateToLogIn();
        },
        (err) => {
          this.utilsService.displayToast(err.error.message, 'error');
        }
      );
  }

  checkIfSamePassword() {
    const formControls = this.signUpForm.controls;
    const pass = formControls['password'].value;
    const checkPass = formControls['checkPassword'].value;
    return pass && checkPass && pass === checkPass;
  }

  navigateToLogIn() {
    this.router.navigate(['/']);
  }
}
