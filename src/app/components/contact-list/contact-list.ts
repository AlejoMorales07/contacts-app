import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Contact, ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts$().subscribe((contacts) => {
      this.contacts = contacts;
      this.searchContacts(); // Reaplica filtros
    });
  }

  loadContacts() {
    this.contacts = this.contactService.getContacts();
    this.filteredContacts = [...this.contacts];
  }

  searchContacts() {
    if (!this.searchTerm.trim()) {
      this.filteredContacts = [...this.contacts];
      return;
    }

    this.filteredContacts = this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.phone.includes(this.searchTerm) ||
        contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteContact(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      this.contactService.deleteContact(id);
      this.loadContacts();
      this.searchContacts(); // Reaplica el filtro después de eliminar
    }
  }

  // Para actualizar la lista cuando se agregue un contacto nuevo
  refreshContacts() {
    this.loadContacts();
    this.searchContacts();
  }
}
