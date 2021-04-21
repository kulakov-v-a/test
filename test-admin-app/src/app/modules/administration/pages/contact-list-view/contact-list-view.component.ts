import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/utility/services/data.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list-view',
  templateUrl: './contact-list-view.component.html',
  styleUrls: ['./contact-list-view.component.scss']
})
export class ContactListViewComponent implements OnInit {

  constructor(private data:DataService) { }
  private readonly dataType = 'contacts'

  public displayedColumns = ['id','name', 'phone']
  public items:Contact[]
  public load()
  {
    return this.data.getDataByType<Contact[]>(this.dataType)
    .then(data=>{
      this.items = data
    })
  }
  ngOnInit(): void {
    this.load()
  }

}
