import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListViewComponent } from './pages/contact-list-view/contact-list-view.component';

const routes: Routes = [
  {
    path:'contacts',
    component:ContactListViewComponent
  },
  {
    path:'**',
    redirectTo:'contacts'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
