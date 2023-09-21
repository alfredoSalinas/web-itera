import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from "@angular/material/tabs";
import { ModalDeleteComponent } from './components/modals/modal-delete/modal-delete.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  declarations: [
    ModalDeleteComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSnackBarModule,
    ModalDeleteComponent,
  ],
  providers: []
})

export class SharedModule {
  constructor(){}
}