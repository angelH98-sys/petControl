import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports:[
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule
    ],
    exports:[
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule
    ]
})

export class MaterialModule{}