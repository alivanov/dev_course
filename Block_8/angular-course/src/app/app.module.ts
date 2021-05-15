import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { StyleDirective } from './directives/style.directive';
import { MultByPipe } from './pipes/mult-by.pipe';
import { CutStringPipe } from './pipes/cut-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    StyleDirective,
    MultByPipe,
    CutStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
