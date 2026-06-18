import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';

export interface LibraryItem {
  id: string;
  type: 'project' | 'book' | 'youtube';
  image: string;
  category?: 'embedded' | 'ai'; // for projects
  status?: 'finished' | 'ongoing';
  translationPrefix: string;
  hasAnalysis?: boolean; // for books
  link?: string; // external link for youtube channels, or projects
  extraKey?: string; // tech stack, author name, creator
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  private ts = inject(TranslationService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  dimUnreviewed = signal<boolean>(false);
  currentLang = this.ts.currentLang;

  // Pinned/fixed items to showcase at the top
  pinnedItems: LibraryItem[] = [
    {
      id: 'rc_car',
      image: 'rc_car_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.rc_car',
      extraKey: 'Arduino, C++, Bluetooth, CAD'
    },
    {
      id: 'railway',
      image: 'railway_switches_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.railway',
      extraKey: 'ESP32, MicroPython, I2C'
    },
    {
      id: 'digit',
      image: 'digit_recognizer_project.png',
      type: 'project',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.digit',
      extraKey: 'TensorFlow, CNN, Python, JS'
    }
  ];

  // The searchable & filterable collection of ALL items
  libraryItems: LibraryItem[] = [
    // Projects
    {
      id: 'rc_car',
      image: 'rc_car_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.rc_car',
      extraKey: 'Arduino, C++, Bluetooth, CAD'
    },
    {
      id: 'railway',
      image: 'railway_switches_project.png',
      type: 'project',
      category: 'embedded',
      status: 'finished',
      translationPrefix: 'projects.railway',
      extraKey: 'ESP32, MicroPython, I2C'
    },
    {
      id: 'digit',
      image: 'digit_recognizer_project.png',
      type: 'project',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.digit',
      extraKey: 'TensorFlow, CNN, Python, JS'
    },
    {
      id: 'music',
      image: 'music_attention_project.png',
      type: 'project',
      category: 'ai',
      status: 'finished',
      translationPrefix: 'projects.music',
      extraKey: 'PyTorch, Transformers, Spectral Analysis'
    },
    {
      id: 'slm',
      image: 'small_language_model_project.png',
      type: 'project',
      category: 'ai',
      status: 'ongoing',
      translationPrefix: 'projects.slm',
      extraKey: 'PyTorch, Tokenization, Transformer'
    },
    // Books
    {
      id: 'atomic-habits',
      image: 'atomic_habits_cover.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.atomic_habits',
      hasAnalysis: true,
      extraKey: 'James Clear'
    },
    {
      id: 'clean-code',
      image: 'clean_code_cover.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.clean_code',
      hasAnalysis: true,
      extraKey: 'Robert C. Martin'
    },
    {
      id: 'design-things',
      image: 'design_things_cover.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.design_things',
      hasAnalysis: false,
      extraKey: 'Don Norman'
    },
    {
      id: 'electrodynamics',
      image: 'electrodynamics_cover.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.electrodynamics',
      hasAnalysis: false,
      extraKey: 'David J. Griffiths'
    },
    // YouTube Channels
    {
      id: 'three_blue_one_brown',
      image: '3b1b_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.three_blue_one_brown',
      link: 'https://www.youtube.com/@3blue1brown',
      extraKey: 'Grant Sanderson'
    },
    {
      id: 'mark_rober',
      image: 'mark_rober_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.mark_rober',
      link: 'https://www.youtube.com/@markrober',
      extraKey: 'Mark Rober'
    },
    {
      id: 'veritasium',
      image: 'veritasium_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.veritasium',
      link: 'https://www.youtube.com/@veritasium',
      extraKey: 'Derek Muller'
    },
    {
      id: 'stuff_made_here',
      image: 'stuff_made_here_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.stuff_made_here',
      link: 'https://www.youtube.com/@StuffMadeHere',
      extraKey: 'Shane Wighton'
    },
    {
      id: 'nikhil_kamath',
      image: 'nikhil_kamath_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.nikhil_kamath',
      link: 'https://www.youtube.com/@Nikhil.Kamath',
      extraKey: 'Nikhil Kamath'
    },
    {
      id: 'ivysilani',
      image: 'ivysilani_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.ivysilani',
      link: 'https://www.ceskatelevize.cz/ivysilani/',
      extraKey: 'Česká Televize'
    },
    {
      id: 'andy_guitar',
      image: 'andy_guitar_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.andy_guitar',
      link: 'https://www.youtube.com/@andyguitar',
      extraKey: 'Andy Crowley'
    },
    {
      id: 'herdyn',
      image: 'herdyn_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.herdyn',
      link: 'https://www.youtube.com/@Herdyn',
      extraKey: 'Pavel Mikeš'
    },
    {
      id: 'mit_ocw',
      image: 'mit_ocw_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.mit_ocw',
      link: 'https://www.youtube.com/@mitocw',
      extraKey: 'MIT'
    },
    {
      id: 'revision_village',
      image: 'revision_village_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.revision_village',
      link: 'https://www.youtube.com/@RevisionVillage',
      extraKey: 'Revision Village'
    },
    {
      id: 'cvutfel',
      image: 'cvutfel_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.cvutfel',
      link: 'https://www.youtube.com/@felcvut',
      extraKey: 'FEL ČVUT'
    },
    {
      id: 'jaderka',
      image: 'jaderka_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.jaderka',
      link: 'https://www.youtube.com/@JaderkaFJFI',
      extraKey: 'FJFI ČVUT'
    },
    {
      id: 'kapitalista',
      image: 'kapitalista_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.kapitalista',
      link: 'https://www.youtube.com/@Kapitalistacz',
      extraKey: 'Kapitalista'
    },
    {
      id: 'steve_mould',
      image: 'steve_mould_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.steve_mould',
      link: 'https://www.youtube.com/@stevemould',
      extraKey: 'Steve Mould'
    },
    {
      id: 'online_ucitel',
      image: 'online_ucitel_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.online_ucitel',
      link: 'https://www.youtube.com/@OnlineUcitel',
      extraKey: 'Online Učitel'
    },
    {
      id: 'learntube',
      image: 'learntube_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.learntube',
      link: 'https://www.learntube.cz',
      extraKey: 'LearnTube'
    },
    {
      id: 'artem_kirsanov',
      image: 'artem_kirsanov_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.artem_kirsanov',
      link: 'https://www.youtube.com/@ArtemKirsanov',
      extraKey: 'Artem Kirsanov'
    },
    {
      id: 'real_engineering',
      image: 'real_engineering_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.real_engineering',
      link: 'https://www.youtube.com/@RealEngineering',
      extraKey: 'Shaun Fitzgerald'
    },
    {
      id: 'scott_manley',
      image: 'scott_manley_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.scott_manley',
      link: 'https://www.youtube.com/@szyzyg',
      extraKey: 'Scott Manley'
    },
    {
      id: 'gal_lahat',
      image: 'gal_lahat_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.gal_lahat',
      link: 'https://www.youtube.com/@GalLahat',
      extraKey: 'Gal Lahat'
    },
    {
      id: 'alexander_amini',
      image: 'alexander_amini_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.alexander_amini',
      link: 'https://www.youtube.com/@AlexanderAmini',
      extraKey: 'Alexander Amini'
    },
    {
      id: 'ai_explained',
      image: 'ai_explained_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.ai_explained',
      link: 'https://www.youtube.com/@aiexplained-official',
      extraKey: 'AI Explained'
    },
    {
      id: 'aleph_zero',
      image: 'aleph_zero_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.aleph_zero',
      link: 'https://www.youtube.com/@AlephZeroMath',
      extraKey: 'Aleph 0'
    },
    {
      id: 'efficient_engineer',
      image: 'efficient_engineer_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.efficient_engineer',
      link: 'https://www.youtube.com/@TheEfficientEngineer',
      extraKey: 'The Efficient Engineer'
    },
    {
      id: 'cgp_grey',
      image: 'cgp_grey_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.cgp_grey',
      link: 'https://www.youtube.com/@cgpgrey',
      extraKey: 'CGP Grey'
    },
    {
      id: 'quanta_magazine',
      image: 'quanta_magazine_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.quanta_magazine',
      link: 'https://www.youtube.com/@QuantaScienceChannel',
      extraKey: 'Quanta Magazine'
    },
    {
      id: 'lemmino',
      image: 'lemmino_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.lemmino',
      link: 'https://www.youtube.com/@lemmino',
      extraKey: 'LEMMiNO'
    },
    {
      id: 'andrej_karpathy',
      image: 'andrej_karpathy_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.andrej_karpathy',
      link: 'https://www.youtube.com/@AndrejKarpathy',
      extraKey: 'Andrej Karpathy'
    },
    {
      id: 'integza',
      image: 'integza_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.integza',
      link: 'https://www.youtube.com/@Integza',
      extraKey: 'Integza'
    },
    {
      id: 'bps_space',
      image: 'bps_space_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.bps_space',
      link: 'https://www.youtube.com/@BPSspace',
      extraKey: 'Joe Barnard'
    },
    {
      id: 'sebastian_lague',
      image: 'sebastian_lague_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.sebastian_lague',
      link: 'https://www.youtube.com/@SebastianLague',
      extraKey: 'Sebastian Lague'
    },
    {
      id: 'hyperplexed',
      image: 'hyperplexed_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.hyperplexed',
      link: 'https://www.youtube.com/@Hyperplexed',
      extraKey: 'Hyperplexed'
    },
    {
      id: 'jirka_vysvetluje',
      image: 'jirka_vysvetluje_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.jirka_vysvetluje',
      link: 'https://www.youtube.com/@Jirkavysvetlujeveci',
      extraKey: 'Jirka Král'
    },
    {
      id: 'everyday_astronaut',
      image: 'everyday_astronaut_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.everyday_astronaut',
      link: 'https://www.youtube.com/@EverydayAstronaut',
      extraKey: 'Tim Dodd'
    },
    {
      id: 'vsauce',
      image: 'vsauce_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.vsauce',
      link: 'https://www.youtube.com/@Vsauce',
      extraKey: 'Michael Stevens'
    },
    {
      id: 'smarter_every_day',
      image: 'smarter_every_day_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.smarter_every_day',
      link: 'https://www.youtube.com/@smartereveryday',
      extraKey: 'Destin Sandlin'
    },
    {
      id: 'bycloud',
      image: 'bycloud_logo.png',
      type: 'youtube',
      status: 'ongoing',
      translationPrefix: 'projects.bycloud',
      link: 'https://www.youtube.com/@bycloud',
      extraKey: 'bycloud'
    }
  ];

  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const translator = this.ts.t();

    return this.libraryItems.filter(item => {
      // Category Filter
      if (cat !== 'all' && item.type !== cat) return false;

      // Search Filter
      if (query) {
        const title = translator(`${item.translationPrefix}.title`).toLowerCase();
        const desc = translator(`${item.translationPrefix}.desc`).toLowerCase();
        const extra = item.extraKey ? item.extraKey.toLowerCase() : '';
        const typeLabel = translator(`projects.filter_${item.type}`).toLowerCase();

        return (
          title.includes(query) ||
          desc.includes(query) ||
          extra.includes(query) ||
          typeLabel.includes(query)
        );
      }

      return true;
    });
  });

  t(key: string): string {
    return this.ts.t()(key);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
