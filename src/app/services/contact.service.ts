import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    this.loadFromStorage();
  }
  addContact(contact: Omit<Contact, 'id'>) {
    const newContact: Contact = { id: Date.now(), ...contact };
    this.contacts.push(newContact);
    this.saveToStorage();
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  private loadFromStorage() {
    const data = localStorage.getItem('contacts');
    this.contacts = data ? JSON.parse(data) : [];
  }
}
