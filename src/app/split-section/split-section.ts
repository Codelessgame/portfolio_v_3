import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-split-section',
  imports: [],
  templateUrl: './split-section.html',
  styleUrl: './split-section.css',
})
export class SplitSection {
  @Input() imageSrc: string = '';
  @Input() imageAlt: string = 'Section Image';
  @Input() imageOnRight: boolean = false;
  @Input() sectionTitle: string = '';
  @Input() sectionSubtitle: string = '';
}
