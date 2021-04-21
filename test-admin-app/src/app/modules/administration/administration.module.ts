import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'; 
import { AdministrationRoutingModule } from './administration-routing.module';
import { ContactListViewComponent } from './pages/contact-list-view/contact-list-view.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ContactListViewComponent],
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
