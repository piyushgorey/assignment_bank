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
      MatTooltipModule,
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
        MatTooltipModule,
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
        MatTooltipModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
export class MaterialModule {

}