import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from './modal/modal';
import { Contact } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss',
})
export class AddContact {
  readonly dialog = inject(MatDialog);
  openModal(): void {
    const dialogRef = this.dialog.open(Modal, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        window.location.reload();
      }
    });
  }

  // Reutilizar el modal existente para edición
  openEditModal(contact: Contact): void {
    const dialogRef = this.dialog.open(Modal, {
      data: { contact, isEdit: true },
    });
  }
}
