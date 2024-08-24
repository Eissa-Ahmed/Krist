import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-image',
  templateUrl: './side-image.component.html',
  styleUrl: './side-image.component.scss'
})
export class SideImageComponent {
  @Input({ required: true }) Image!: string;
}
