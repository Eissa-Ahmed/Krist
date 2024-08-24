import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrl: './token-expired.component.scss'
})
export class TokenExpiredComponent {

  option: AnimationOptions = {
    path: './assets/Lottie/404.json',
    autoplay: true,
    loop: true,
  }
}
