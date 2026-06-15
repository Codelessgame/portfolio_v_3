import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-star',
  imports: [NgStyle],
  templateUrl: './star.html',
  styleUrl: './star.css',
})
export class Star {
  star_data = this.generate_star_data();

  generate_star_data() {
    const top = Math.random() * 50; // Random vertical position in ems
    const tail_length = 10 + Math.random() * 25;
    const duration = 4 + Math.random() * 10; // Between 4s and 14s
    const delay = -(Math.random() * duration); // Negative delay so stars start mid-animation

    return { delay, duration, tail_length, top };
  }
}
