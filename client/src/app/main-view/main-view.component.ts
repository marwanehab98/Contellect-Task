import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetContactsService } from '../get-contacts.service';
import { Subscription, startWith } from 'rxjs';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit, OnDestroy {

  contacts: any;
  count: number | undefined;
  numberOfPages: number = 1;
  details: any = {};
  unlocked: string = '';
  newContact = false;
  // editedContact: any;
  private _contactSub: Subscription = new Subscription;
  user: any;
  offset: number = 0;
  filter = { name: '', phone: '', address: '', notes: '' };
  message = '';

  constructor(private getContactsService: GetContactsService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getContacts();
    this._contactSub = this.getContactsService.editedContact.subscribe(editedContact => {
      // console.log(editedContact);
      this.contacts = this.contacts.map((contact: any) => {
        if(contact._id === editedContact._id) return editedContact;
        else return contact;
      })  
    });
  }

  ngOnDestroy() {
    this._contactSub.unsubscribe();
  }

  // CRUD OPERATIONS
  private getContacts(filter: any = null) {
    this.getContactsService.getContacts(this.offset * 5, filter)
      .pipe()
      .subscribe(res => {
        if (res) {
          this.contacts = res.contacts;
          this.count = res.count;
          this.numberOfPages = Math.ceil(res.count / 5);
        }
        else alert("Something went wrong");
      });
  }

  save(contact: any = null): void {
    if (this.newContact) {
      this.getContactsService.addContact({ ...this.details, userId: this.user._id })
        .pipe()
        .subscribe(res => {
          if (res) {
            this.newContact = false;
            this.message = 'Added Contact'
            var x = document.getElementById("snackbar")!;
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            this.getContacts()
          }
          else alert("Something went wrong");
        })
    }
    else {
      this.getContactsService.updateContact(contact)
        .pipe()
        .subscribe(res => {
          if (res) {
            this.message = 'Updated Contact'
            var x = document.getElementById("snackbar")!;
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            this.unlocked = ''
          }
          else alert("Something went wrong");
        })
    }
  }

  deleteContact(_id: string): void {
    if (confirm("Are you sure you want to delete!")) {
      this.getContactsService.deleteContact(_id)
        .pipe()
        .subscribe(res => {
          if (res) {
            this.message = 'Deleting Contact...'
            var x = document.getElementById("snackbar")!;
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            this.getContacts()
          }
          else alert("Something went wrong");
        })
    }
  }


  // PAGE CHANGE
  selectPage($event: any): void {
    this.offset = Number.isInteger($event) ? $event : $event.target.value;
    this.contacts = [];
    this.getContacts();
  }

  // HELPERS
  filterContacts() {
    this.getContacts(this.filter);
  }

  toggleLock(_id: string): void {
    if (this.unlocked === '') this.unlocked = _id;
    else this.unlocked = ''
  }

  addContact(): void {
    this.details = {};
    this.newContact = true;
  }

  cancelAdd(): void {
    this.newContact = false;
  }

  showContactDetails(index: number): void {
    this.details = this.contacts[index];
  }


  // LOGOUT
  logout(): void {
    localStorage.removeItem('user')
    this.router.navigateByUrl('/login');
  }
}
