import { Component, OnInit } from '@angular/core';
import { ClienteService } from './shared/services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'theatrum';
  constructor() {}

  ngOnInit(): void {}
}
