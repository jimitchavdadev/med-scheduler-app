import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.next(true);
    }
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}
