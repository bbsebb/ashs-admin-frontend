import { Component } from '@angular/core';
import {MainContentComponent} from "./core/main-content/main-content.component";

@Component({
    selector: 'app-root',
    imports: [MainContentComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-frontend';
}
