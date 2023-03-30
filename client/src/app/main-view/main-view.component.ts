import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GetContactsService } from '../get-contacts.service';



@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  contacts: any;
  count: number | undefined;
  numberOfPages: number = 1;
  details: any = {};
  unlocked: string = '';
  newContact = false;
  user: any;
  offset: number = 0;
  filter = { name: '', phone: '', address: '', notes: '' };

  constructor(private getContactsService: GetContactsService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getContacts();
  }

  selectPage($event: any): void {
    // console.log($event.target.value)
    this.offset = $event.target.value;
    this.getContacts();
  }

  nextPage() {
    this.offset = (this.offset + 1) % this.numberOfPages;
    this.getContacts();
  }

  previousPage() {
    this.offset = (this.offset - 1);
    this.getContacts();
  }

  filterContacts() {
    // console.log(this.filter);
    this.getContacts(this.filter);
  }

  private getContacts(filter: any = null) {
    this.getContactsService.getContacts(this.user._id, this.offset * 5, filter)
      .pipe()
      .subscribe(res => {
        if (res) {
          this.contacts = res.contacts;
          this.count = res.count;
          this.numberOfPages = Math.ceil(res.count / 5);
        }
        else {
          console.log("Wrong credentials");
        };
      });
  }

  logout(): void {
    localStorage.removeItem('user')
    this.router.navigateByUrl('/login');
  }

  showContactDetails(index: number): void {
    this.details = this.contacts[index];
  }

  toggleLock(_id: string): void {
    if (this.unlocked === '') this.unlocked = _id;
    else this.unlocked = ''
  }

  save(contact: any = null): void {
    if (this.newContact) {
      this.getContactsService.addContact({ ...this.details, userId: this.user._id })
        .pipe()
        .subscribe(res => {
          if (res) {
            this.newContact = false;
            var x = document.getElementById("snackbar")!;

            // Add the "show" class to DIV
            x.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            this.getContacts()
          }
          // else alert("marwan")
        })
    }
    else {
      this.getContactsService.updateContact(contact)
        .pipe()
        .subscribe(res => {
          if (res) this.unlocked = '';
        })
    }
  }

  addContact(): void {
    this.details = {};
    this.newContact = true;
  }

  cancelAdd(): void {
    this.newContact = false;
  }

  deleteContact(_id: string): void {
    if (confirm("Are you sure you want to delete!")) {
      this.getContactsService.deleteContact(_id)
        .pipe()
        .subscribe(res => {
          if (res) {
            this.getContacts()
          }
        })
    }
  }
}
