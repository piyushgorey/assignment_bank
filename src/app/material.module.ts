import { NgModule } from '@angular/core';

    import {
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatTabsModule,
      MatOptionModule,
      MatSelectModule,
      MatGridListModule,
      MatProgressSpinnerModule,
      MatListModule,
      MatSnackBarModule,
    } from '@angular/material';

    @NgModule({
      imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        MatListModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule
      ],
      exports: [
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatIconModule,
        MatOptionModule,
        MatCardModule,
        MatTabsModule,
        MatSnackBarModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
export class MaterialModule {

}