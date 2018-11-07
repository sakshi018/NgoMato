import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatToolbarModule, MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatGridListModule, MatIconModule, MatInput, MatTabsModule } from '@angular/material';
import { NgoListComponent } from './ngo-list/ngo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgoViewComponent } from './ngo-view/ngo-view.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { DialogBox } from './ngo-list/ngo-list.component';
import { MatDialog } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { HistoryComponent } from './history/history.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NGOListService } from './ngo-list/ngo-list.component.service';
import { NgoMatoDataService } from './shared/ngoMatoDataService.service';
import { HistoryService } from './../app/history/history.component.service';
import { AdminService } from './admin/admin.component.service';

@NgModule({
  declarations: [
    AppComponent,
    NgoListComponent,
    NgoViewComponent,
    LoginSignupComponent,
    DialogBox,
    AdminComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [MatDialog, NGOListService, NgoMatoDataService, HistoryService, AdminService],
  entryComponents: [DialogBox],
  bootstrap: [AppComponent]
})
export class AppModule { }
