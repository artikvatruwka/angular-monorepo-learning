import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraPageComponent } from './components/pages/camera-page/camera-page.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [

  {
    path: 'camera', component: CameraPageComponent
  },
  {
    path: '', component: LoginComponent, 'pathMatch': 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
