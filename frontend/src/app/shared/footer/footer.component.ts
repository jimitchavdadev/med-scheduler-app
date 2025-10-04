import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <p>&copy; 2025 MedSchedulerApp. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      margin-top: auto;
    }

    :host-context(.dark-theme) .footer {
      background-color: #303030;
    }

    p {
      margin: 0;
      color: #757575;
    }
  `]
})
export class FooterComponent {}
