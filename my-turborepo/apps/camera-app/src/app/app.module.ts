import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CameraPreviewComponent} from '@capp/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CameraPreviewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
