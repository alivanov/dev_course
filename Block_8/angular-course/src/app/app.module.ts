import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleDirective } from './directives/style.directive';
import { MultByPipe } from './pipes/mult-by.pipe';
import { CutStringPipe } from './pipes/cut-string.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LocalCounterOneComponent } from './components/local-counter-one/local-counter-one.component';
import { LocalCounterTwoComponent } from './components/local-counter-two/local-counter-two.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    StyleDirective,
    MultByPipe,
    CutStringPipe,
    FilterPipe,
    LocalCounterOneComponent,
    LocalCounterTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
