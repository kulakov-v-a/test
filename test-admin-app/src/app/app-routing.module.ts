import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './utility/components/login/login.component';
import { AuthGuard } from './utility/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administration',
    loadChildren: ()=>import('./modules/administration/administration.module').then(m=>m.AdministrationModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo:'administration'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
