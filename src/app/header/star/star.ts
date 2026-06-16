import { Component, Input, OnInit, HostListener } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-star',
  imports: [NgStyle],
  templateUrl: './star.html',
  styleUrl: './star.css',
})
export class Star implements OnInit {
  @Input() index: number = 0;
  star_data: any;

  ngOnInit() {
    this.star_data = this.generate_star_data(this.index);
  }

  @HostListener('window:resize')
  onResize() {
    this.star_data = this.generate_star_data(this.index);
  }

  generate_star_data(index: number) {
    // Colors matched to the timeline: 75% pink, 25% other vibrant accent colors
    const pink = '#ff006e';
    const otherColors = ['#a855f7', '#3a86ff', '#ffbe0b', '#1bc198', '#62cab9'];
    
    let color = pink;
    if (index % 4 === 0) {
      const colorIdx = Math.floor(index / 4) % otherColors.length;
      color = otherColors[colorIdx];
    }
    
    const top = Math.random() * 80; // Percent position in the sky
    const tail_length = 8 + Math.random() * 15;
    
    // Constant speed: Random speed between 110px/s and 230px/s
    const speed = 110 + Math.random() * 120;
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const distance = 1.35 * windowWidth; // Total horizontal distance (135vw)
    const duration = distance / speed;
    
    const delay = -(Math.random() * duration); // Negative delay so stars start mid-animation

    // Trajectory calculations (all shoot from top-right to bottom-left)
    const angle = 15 + Math.random() * 20; // Slanted downwards-left between 15deg and 35deg

    const startX = '105vw';
    const endX = '-30vw';
    const rotation = -angle;
    const startY = '-10vw'; // Start slightly above baseline to enter smoothly from top-right
    const endY = (135 * Math.tan(angle * Math.PI / 180) - 10).toFixed(2) + 'vw';

    // Opacity & Twinkling properties
    const maxOpacity = +(0.35 + Math.random() * 0.65).toFixed(2); // Random base opacity between 0.35 and 1.0
    const twinkle = Math.random() < 0.5; // 50% chance to twinkle
    const twinkleDuration = +(0.8 + Math.random() * 1.4).toFixed(2); // Pulsate speed

    return {
      color,
      top,
      tail_length,
      duration,
      delay,
      startX,
      endX,
      startY,
      endY,
      rotation,
      maxOpacity,
      twinkle,
      twinkleDuration
    };
  }
}
