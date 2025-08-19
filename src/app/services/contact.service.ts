import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadFromStorage();
  }

  addContact(contact: Omit<Contact, 'id'>) {
    const newContact: Contact = { id: Date.now(), ...contact };
    this.contacts.push(newContact);
    this.saveToStorage();
    this.contactsSubject.next([...this.contacts]);
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContacts$(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.saveToStorage();
    this.contactsSubject.next([...this.contacts]);
  }

  searchContacts(searchTerm: string): Contact[] {
    if (!searchTerm.trim()) {
      return this.contacts;
    }

    return this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  private saveToStorage() {
    if (this.isBrowser) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
      } catch (error) {
        console.warn('Error saving to localStorage:', error);
      }
    }
  }

  private loadFromStorage() {
    if (this.isBrowser) {
      try {
        const data = localStorage.getItem('contacts');
        this.contacts = data ? JSON.parse(data) : [];
      } catch (error) {
        console.warn('Error loading from localStorage:', error);
        this.contacts = [];
      }
    } else {
      this.contacts = [];
    }

    this.contactsSubject.next([...this.contacts]);
  }
}
