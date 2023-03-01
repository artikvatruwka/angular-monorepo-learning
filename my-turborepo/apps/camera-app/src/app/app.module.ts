import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as UI  from '@capp/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraPageComponent } from './components/pages/camera-page/camera-page.component';
import { LoginComponent } from './components/pages/login/login.component';

console.log(UI)
@NgModule({
  declarations: [
    AppComponent,
    CameraPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UI.CameraPreviewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
