import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-store-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './store-layout.component.html',
  styleUrl: './store-layout.component.css'
})
export class StoreLayoutComponent {

}
