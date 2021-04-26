import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/utility/services/auth.service';
import { DataService } from 'src/app/utility/services/data.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list-view',
  templateUrl: './contact-list-view.component.html',
  styleUrls: ['./contact-list-view.component.scss']
})
export class ContactListViewComponent implements OnInit, OnDestroy {

  constructor(private data:DataService, private dialog: MatDialog, private auth: AuthService) { }

  private readonly dataType = 'contacts'
  public selection = new SelectionModel<Contact>(true, []);
  public dialogTitle:string = ''
  public displayedColumns = ['select','id','name', 'phone', 'buttons']
  public items:Contact[]
  private timeout = null
  public editFormGroup : FormGroup = new FormGroup({
    id: new FormControl(''),
    userId: new FormControl(''),
    name : new FormControl('',[Validators.required]),
    phone : new FormControl('',[Validators.required])
  })

  get selectionHasValue(){
    return this.selection.hasValue();
  }

  public subsriptions:Subscription[] = []

  ngOnInit(): void {
    this.load();
    this.subsriptions.push(this.dialog.afterAllClosed.subscribe(result=>{
      this.editFormGroup.reset()
    }))
  }
  ngOnDestroy():void
  {
    this.subsriptions.forEach(s=>s.unsubscribe())
  }

  public load(search = null)
  {
    return this.data.getDataByType<Contact[]>(this.dataType,search)
    .then(data=>{
      this.items = data;
    })
  }

  public reload()
  {
    return this.load()
  }

  public onDeleteClick()
  {
    let obs = []
    this.selection.selected.forEach(s=>{
      obs.push(this.data.deleteData(this.dataType,s.id))
    })

    forkJoin(obs).toPromise().then(response=>{
      this.reload()
      this.selection.deselect(...this.selection.selected)
    })
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.items.length;
    return numSelected == numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.items.forEach(row => this.selection.select(row));
  }

  openDialog(templateRef: TemplateRef<any>,row = null)
  {
    this.dialogTitle =  !!!row? 'Adding new contact': 'Editing contact'
    this.editFormGroup.patchValue(row)
    this.dialog.open(templateRef)
  }

  onSubmitClick = () =>
  {
    let item = this.editFormGroup.value
    const isNew = !!!item.id
    item.id = item.id ?? this.items.length + 1
    item.userId = item.userId ?? this.auth.getUser().id
    this.editFormGroup.markAllAsTouched()
    if(this.editFormGroup.valid && !this.editFormGroup.pristine)
    {
      (isNew ? this.data.insertData(this.dataType, item) : this.data.updateData(this.dataType, item))
      .then(re=>{
        this.reload()
        this.dialog.closeAll()
      })
    }
  }

  public onTypeSearch(e)
  {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(()=>{
      this.load(e.target.value)
    }, 500)
  }

  public logoutClick()
  {
    this.auth.logout()
  }

}
