import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class='container'>
      <ul class="nav navbar-nav">
        <li class='nav-item'>
          <a class='nav-link' routerLink="/">Home</a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' routerLink="/books">Books</a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' routerLink="/customers">Customers</a>
        </li>
        <li class='nav-item'>
          <a class='nav-link' routerLink="/loans">Loans</a>
        </li>
      </ul>
    </div>
  </nav>
  <router-outlet></router-outlet>
             `
})
export class AppComponent {
}
