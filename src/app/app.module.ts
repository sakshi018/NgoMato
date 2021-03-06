import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule,MatGridListModule} from '@angular/material';
import { NgoListComponent } from './ngo-list/ngo-list.component';
import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NgoListComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
