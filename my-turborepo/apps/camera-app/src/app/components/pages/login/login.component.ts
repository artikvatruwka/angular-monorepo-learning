import { Component } from '@angular/core';
import { FusionauthClientService } from '@capp/ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private faClient: FusionauthClientService
    ) {}
  login() {
    JSON.stringify(this.faClient.client);
  }
}
