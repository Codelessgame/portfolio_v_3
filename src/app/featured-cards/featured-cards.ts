import { Component } from '@angular/core';

interface CardItem {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  linkText: string;
}

@Component({
  selector: 'app-featured-cards',
  imports: [],
  templateUrl: './featured-cards.html',
  styleUrl: './featured-cards.css',
})
export class FeaturedCards {
  cards: CardItem[] = [
    {
      title: 'GitHub',
      description: 'Explore my open-source repositories, web apps, and coding projects.',
      link: 'https://github.com/Codelessgame',
      imageUrl: '/home/code_img.jpg',
      linkText: 'View Code'
    },
    {
      title: 'Instagram',
      description: 'Check out my 2D art, designs, sketches, and creative works.',
      link: 'https://www.instagram.com/stanislav_ruza/profilecard/?igsh=enEzZHc2aGIxemk0',
      imageUrl: '/home/art_img.jpg',
      linkText: 'View Art'
    },
    {
      title: 'Printables',
      description: 'Browse my 3D printing designs, CAD models, and engineering parts.',
      link: 'https://www.printables.com/',
      imageUrl: '/home/3D_art.jpg',
      linkText: 'View Prints'
    }
  ];
}
