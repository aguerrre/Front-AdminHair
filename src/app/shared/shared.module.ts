import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
