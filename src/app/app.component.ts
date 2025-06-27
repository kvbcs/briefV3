import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateModalComponent } from './adminpage/components/update-modal/update-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UpdateModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'briefV3';
}
