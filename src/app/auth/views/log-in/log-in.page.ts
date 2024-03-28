import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UtilsService } from '../../../common/utils.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.page.html',
  styleUrls: ['log-in.page.scss'],
})
export class LogInPage {
  logInForm = this.fromBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  logInSubmit() {
    const formGroup = this.logInForm.controls;
    const email = formGroup.email.value;
    const password = formGroup.password.value;

    if (!email || !password) {
      return;
    }

    const emailTrimmed = email.trim();
    this.authService
      .logIn(emailTrimmed, password)
      .pipe(first())
      .subscribe(
        (res) => {
          localStorage.setItem('cfyrAppToken', JSON.stringify(res));
          localStorage.setItem('cfyrAppLoggedAs', emailTrimmed);
          this.logInForm.reset();
          this.router.navigate(['menu', 'home']);
          this.utilsService.displayToast('Sesión iniciada con exito', 'info');
        },
        (err) => {
          this.utilsService.displayToast(err.error.message, 'error');
        }
      );
  }

  navigateToSignUp() {
    this.router.navigate(['sign-up']);
  }
}
