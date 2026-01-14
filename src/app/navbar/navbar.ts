import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    mobileNavActive = false;
  
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive;
      if (this.mobileNavActive) {
        document.body.classList.add('mobile-nav-active');
      } else {
        document.body.classList.remove('mobile-nav-active');
      }
    }
  }
