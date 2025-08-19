import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AddContact } from './components/add-contact/add-contact';
import { ContactList } from './components/contact-list/contact-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, AddContact, ContactList],
  templateUrl: './app.html',
})
export class App {}
