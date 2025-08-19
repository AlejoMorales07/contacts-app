import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-modal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    //MatDialogClose,
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  contact = { id: 0, name: '', phone: '', email: '' };
  readonly dialogRef = inject(MatDialogRef<Modal>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private contactService: ContactService) {}

  add() {
    if (this.contact.name && this.contact.phone) {
      this.contactService.addContact({ ...this.contact });
      this.dialogRef.close(this.contact);
      this.contact = {
        id: 0,
        name: '',
        phone: '',
        email: '',
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
