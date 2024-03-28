import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';
import { AuthUtilsService } from './auth-utils.service';
import { AuthService } from './auth.service';
import { LogInPage } from './views/log-in/log-in.page';
import { SignUpPage } from './views/sign-up/sign-up.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LogInPage },
      { path: 'sign-up', pathMatch: 'full', component: SignUpPage },
    ]),
  ],
  providers: [AuthService, AuthUtilsService],
  declarations: [LogInPage, SignUpPage],
})
export class AuthModule {}
