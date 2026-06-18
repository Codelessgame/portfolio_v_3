import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../translation.service';

export interface LibraryItem {
  id: string;
  type: 'project' | 'book' | 'youtube' | 'podcast';
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
    MatIconModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  private ts = inject(TranslationService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
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
      status: 'ongoing',
      translationPrefix: 'projects.electrodynamics',
      hasAnalysis: false,
      extraKey: 'David J. Griffiths'
    },
    {
      id: 'nineteen-eighty-four',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.nineteen_eighty_four',
      hasAnalysis: false,
      extraKey: 'George Orwell'
    },
    {
      id: 'bible-first-100-pages',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.bible_first_100_pages',
      hasAnalysis: false,
      extraKey: 'Various'
    },
    {
      id: 'surely-youre-joking-feynman',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.surely_youre_joking_feynman',
      hasAnalysis: false,
      extraKey: 'Richard Feynman'
    },
    {
      id: 'feynman-lectures-vol1',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.feynman_lectures_vol1',
      hasAnalysis: false,
      extraKey: 'Richard Feynman'
    },
    {
      id: 'white-disease',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.white_disease',
      hasAnalysis: false,
      extraKey: 'Karel Čapek'
    },
    {
      id: 'war-with-the-newts',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.war_with_the_newts',
      hasAnalysis: false,
      extraKey: 'Karel Čapek'
    },
    {
      id: 'mother-capek',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.mother_capek',
      hasAnalysis: false,
      extraKey: 'Karel Čapek'
    },
    {
      id: 'hitchhikers-guide',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.hitchhikers_guide',
      hasAnalysis: false,
      extraKey: 'Douglas Adams'
    },
    {
      id: 'handmaids-tale',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.handmaids_tale',
      hasAnalysis: false,
      extraKey: 'Margaret Atwood'
    },
    {
      id: 'to-kill-a-mockingbird',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.to_kill_a_mockingbird',
      hasAnalysis: false,
      extraKey: 'Harper Lee'
    },
    {
      id: 'ten-rules-for-life',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.ten_rules_for_life',
      hasAnalysis: false,
      extraKey: 'Jordan Peterson'
    },
    {
      id: 'beyond-order',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.beyond_order',
      hasAnalysis: false,
      extraKey: 'Jordan Peterson'
    },
    {
      id: 'why-we-sleep',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.why_we_sleep',
      hasAnalysis: false,
      extraKey: 'Matthew Walker'
    },
    {
      id: 'structures-why-things-dont-fall',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.structures_why_things_dont_fall',
      hasAnalysis: false,
      extraKey: 'J.E. Gordon'
    },
    {
      id: 'stiff-cadavers',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.stiff_cadavers',
      hasAnalysis: false,
      extraKey: 'Mary Roach'
    },
    {
      id: 'rich-dad-poor-dad',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.rich_dad_poor_dad',
      hasAnalysis: false,
      extraKey: 'Robert Kiyosaki'
    },
    {
      id: 'modern-computer-graphics',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.modern_computer_graphics',
      hasAnalysis: false,
      extraKey: 'Jiří Žára, Bedřich Beneš, Petr Felkel'
    },
    {
      id: 'fahrenheit-451',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.fahrenheit_451',
      hasAnalysis: false,
      extraKey: 'Ray Bradbury'
    },
    {
      id: 'antigone',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.antigone',
      hasAnalysis: false,
      extraKey: 'Sophocles'
    },
    {
      id: 'divine-comedy',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.divine_comedy',
      hasAnalysis: false,
      extraKey: 'Dante Alighieri'
    },
    {
      id: 'day-of-the-jackal',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.day_of_the_jackal',
      hasAnalysis: false,
      extraKey: 'Frederick Forsyth'
    },
    {
      id: 'diary-of-anne-frank',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.diary_of_anne_frank',
      hasAnalysis: false,
      extraKey: 'Anne Frank'
    },
    {
      id: 'animal-farm',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.animal_farm',
      hasAnalysis: false,
      extraKey: 'George Orwell'
    },
    {
      id: 'ivanhoe',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.ivanhoe',
      hasAnalysis: false,
      extraKey: 'Walter Scott'
    },
    {
      id: 'brave-new-world',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.brave_new_world',
      hasAnalysis: false,
      extraKey: 'Aldous Huxley'
    },
    {
      id: 'krakatit',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.krakatit',
      hasAnalysis: false,
      extraKey: 'Karel Čapek'
    },
    {
      id: 'ku-klux-klan',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.ku_klux_klan',
      hasAnalysis: false,
      extraKey: 'Katarzyna Surmiak-Domańska'
    },
    {
      id: 'butterball',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.butterball',
      hasAnalysis: false,
      extraKey: 'Guy de Maupassant'
    },
    {
      id: 'a-bouquet',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.a_bouquet',
      hasAnalysis: false,
      extraKey: 'Karel Jaromír Erben'
    },
    {
      id: 'the-miser',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.the_miser',
      hasAnalysis: false,
      extraKey: 'Molière'
    },
    {
      id: 'the-little-prince',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.the_little_prince',
      hasAnalysis: false,
      extraKey: 'Antoine de Saint-Exupéry'
    },
    {
      id: 'prayer-for-katerina-horovitzova',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.prayer_for_katerina_horovitzova',
      hasAnalysis: false,
      extraKey: 'Arnošt Lustig'
    },
    {
      id: 'all-quiet-on-western-front',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.all_quiet_on_western_front',
      hasAnalysis: false,
      extraKey: 'Erich Maria Remarque'
    },
    {
      id: 'lord-of-the-rings',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.lord_of_the_rings',
      hasAnalysis: false,
      extraKey: 'J.R.R. Tolkien'
    },
    {
      id: 'persepolis',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.persepolis',
      hasAnalysis: false,
      extraKey: 'Marjane Satrapi'
    },
    {
      id: 'hound-of-the-baskervilles',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.hound_of_the_baskervilles',
      hasAnalysis: false,
      extraKey: 'Arthur Conan Doyle'
    },
    {
      id: 'tales-of-the-little-quarter',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.tales_of_the_little_quarter',
      hasAnalysis: false,
      extraKey: 'Jan Neruda'
    },
    {
      id: 'change-kafka',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.change_kafka',
      hasAnalysis: false,
      extraKey: 'Franz Kafka'
    },
    {
      id: 'r-u-r',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.r_u_r',
      hasAnalysis: false,
      extraKey: 'Karel Čapek'
    },
    {
      id: 'robinson-crusoe',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.robinson_crusoe',
      hasAnalysis: false,
      extraKey: 'Daniel Defoe'
    },
    {
      id: 'romeo-and-juliet',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.romeo_and_juliet',
      hasAnalysis: false,
      extraKey: 'William Shakespeare'
    },
    {
      id: 'saturnin',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.saturnin',
      hasAnalysis: false,
      extraKey: 'Zdeněk Jirotka'
    },
    {
      id: 'great-gatsby',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.great_gatsby',
      hasAnalysis: false,
      extraKey: 'F. Scott Fitzgerald'
    },
    {
      id: 'merry-wives-of-windsor',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.merry_wives_of_windsor',
      hasAnalysis: false,
      extraKey: 'William Shakespeare'
    },
    {
      id: 'murder-on-orient-express',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.murder_on_orient_express',
      hasAnalysis: false,
      extraKey: 'Agatha Christie'
    },
    {
      id: 'cowards-skvorecky',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.cowards_skvorecky',
      hasAnalysis: false,
      extraKey: 'Josef Škvorecký'
    },
    {
      id: 'crime-and-punishment',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.crime_and_punishment',
      hasAnalysis: false,
      extraKey: 'Fyodor Dostoevsky'
    },
    {
      id: 'i-robot',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.i_robot',
      hasAnalysis: false,
      extraKey: 'Isaac Asimov'
    },
    {
      id: 'study-in-scarlet',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.study_in_scarlet',
      hasAnalysis: false,
      extraKey: 'Arthur Conan Doyle'
    },
    {
      id: 'become-investor',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.become_investor',
      hasAnalysis: false,
      extraKey: 'Mikuláš Splítek'
    },
    {
      id: 'sport-is-pain',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.sport_is_pain',
      hasAnalysis: false,
      extraKey: 'Martin Kovář'
    },
    {
      id: 'fault-in-our-stars',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.fault_in_our_stars',
      hasAnalysis: false,
      extraKey: 'John Green'
    },
    {
      id: 'ai-modern-approach',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'ongoing',
      translationPrefix: 'projects.ai_modern_approach',
      hasAnalysis: false,
      extraKey: 'Stuart Russell, Peter Norvig'
    },
    {
      id: 'flowers-for-algernon',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.flowers_for_algernon',
      hasAnalysis: false,
      extraKey: 'Daniel Keyes'
    },
    {
      id: 'contact-sagan',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.contact_sagan',
      hasAnalysis: false,
      extraKey: 'Carl Sagan'
    },
    {
      id: 'safehold-series',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.safehold_series',
      hasAnalysis: false,
      extraKey: 'David Weber'
    },
    {
      id: 'children-of-time',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'finished',
      translationPrefix: 'projects.children_of_time',
      hasAnalysis: false,
      extraKey: 'Adrian Tchaikovsky'
    },
    {
      id: 'rocket-propulsion-elements',
      image: 'book_placeholder.png',
      type: 'book',
      status: 'ongoing',
      translationPrefix: 'projects.rocket_propulsion_elements',
      hasAnalysis: false,
      extraKey: 'George P. Sutton'
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

  sortMode = signal<'default' | 'default-rev' | 'alpha-asc' | 'alpha-desc' | 'date-desc' | 'date-asc'>('default');

  cycleSort() {
    const modes: ('default' | 'default-rev' | 'alpha-asc' | 'alpha-desc' | 'date-desc' | 'date-asc')[] = [
      'default',
      'default-rev',
      'alpha-asc',
      'alpha-desc',
      'date-desc',
      'date-asc'
    ];
    const currentIndex = modes.indexOf(this.sortMode());
    const nextIndex = (currentIndex + 1) % modes.length;
    this.sortMode.set(modes[nextIndex]);
  }

  getSortIcon(): string {
    switch (this.sortMode()) {
      case 'alpha-asc': return 'sort_by_alpha';
      case 'alpha-desc': return 'sort_by_alpha';
      case 'date-desc': return 'event';
      case 'date-asc': return 'event';
      case 'default-rev': return 'swap_vert';
      default: return 'sort';
    }
  }

  getSortLabel(): string {
    const lang = this.currentLang();
    switch (this.sortMode()) {
      case 'alpha-asc': return lang === 'en' ? 'A-Z' : 'A-Z';
      case 'alpha-desc': return lang === 'en' ? 'Z-A' : 'Z-A';
      case 'date-desc': return lang === 'en' ? 'Newest' : 'Nejnovější';
      case 'date-asc': return lang === 'en' ? 'Oldest' : 'Nejstarší';
      case 'default-rev': return lang === 'en' ? 'Reversed' : 'Obráceně';
      default: return lang === 'en' ? 'Default' : 'Výchozí';
    }
  }

  getSortTooltip(): string {
    const lang = this.currentLang();
    switch (this.sortMode()) {
      case 'alpha-asc': return lang === 'en' ? 'Sort: Alphabetical (A-Z)' : 'Řadit: Abecedně (A-Z)';
      case 'alpha-desc': return lang === 'en' ? 'Sort: Alphabetical (Z-A)' : 'Řadit: Abecedně (Z-A)';
      case 'date-desc': return lang === 'en' ? 'Sort: Date (Newest First)' : 'Řadit: Podle data (nejnovější)';
      case 'date-asc': return lang === 'en' ? 'Sort: Date (Oldest First)' : 'Řadit: Podle data (nejstarší)';
      case 'default-rev': return lang === 'en' ? 'Sort: Default (Reversed)' : 'Řadit: Výchozí (obráceně)';
      default: return lang === 'en' ? 'Sort: Default Order' : 'Řadit: Výchozí pořadí';
    }
  }

  getItemTags(item: LibraryItem): string[] {
    if (item.type === 'project') {
      return item.extraKey ? item.extraKey.split(',').map(s => s.trim()) : [];
    }

    if (item.type === 'youtube') {
      const defaultTags = ['YouTube'];
      const ytTags: Record<string, string[]> = {
        three_blue_one_brown: ['Math', 'Visualization'],
        veritasium: ['Science', 'Physics'],
        mark_rober: ['Engineering', 'Science'],
        stuff_made_here: ['Engineering', 'DIY'],
        nikhil_kamath: ['Business', 'Podcast'],
        ivysilani: ['TV', 'Czech'],
        andy_guitar: ['Music', 'Guitar'],
        herdyn: ['Gaming', 'Czech'],
        mit_ocw: ['Education', 'University'],
        revision_village: ['Math', 'IB'],
        cvutfel: ['Education', 'Czech'],
        jaderka: ['Education', 'Czech'],
        kapitalista: ['Finance', 'Czech'],
        steve_mould: ['Science', 'Physics'],
        online_ucitel: ['Education', 'Czech'],
        learntube: ['Education', 'Czech'],
        artem_kirsanov: ['Neuroscience', 'Biology'],
        real_engineering: ['Engineering', 'History'],
        scott_manley: ['Space', 'Astronomy'],
        gal_lahat: ['Tech', 'Coding'],
        alexander_amini: ['AI', 'MIT'],
        ai_explained: ['AI', 'Analysis'],
        aleph_0: ['Math', 'Physics'],
        efficient_engineer: ['Engineering', 'Physics'],
        cgp_grey: ['Education', 'History'],
        quanta_magazine: ['Science', 'Math'],
        lemmino: ['Documentary', 'Mystery'],
        andrej_karpathy: ['AI', 'Deep Learning'],
        integza: ['Engineering', 'DIY'],
        bps_space: ['Aerospace', 'Engineering'],
        sebastian_lague: ['Coding', 'GameDev'],
        hyperplexed: ['Web Design', 'Coding'],
        jirka_vysvetluje: ['Education', 'Czech'],
        everyday_astronaut: ['Space', 'Aerospace'],
        vsauce: ['Science', 'Philosophy'],
        smarter_every_day: ['Science', 'Engineering'],
        bycloud: ['Tech', 'AI']
      };
      return ytTags[item.id] || defaultTags;
    }

    if (item.type === 'book') {
      const defaultTags = ['Book'];
      const bookTags: Record<string, string[]> = {
        'atomic-habits': ['Productivity', 'Self-Help'],
        'clean-code': ['Coding', 'Software'],
        'design-things': ['Design', 'UX'],
        electrodynamics: ['Physics', 'Electromagnetism'],
        'nineteen-eighty-four': ['Classic', 'Dystopian'],
        'bible-first-100-pages': ['Religion', 'History'],
        'surely-youre-joking-feynman': ['Biography', 'Physics'],
        'feynman-lectures-vol1': ['Physics', 'Science'],
        'white-disease': ['Classic', 'Drama', 'Czech'],
        'war-with-the-newts': ['Sci-Fi', 'Satire', 'Czech'],
        'mother-capek': ['Classic', 'Drama', 'Czech'],
        'hitchhikers-guide': ['Sci-Fi', 'Comedy'],
        'handmaids-tale': ['Fiction', 'Dystopian'],
        'to-kill-a-mockingbird': ['Classic', 'Fiction'],
        'ten-rules-for-life': ['Psychology', 'Self-Help'],
        'beyond-order': ['Psychology', 'Self-Help'],
        'why-we-sleep': ['Science', 'Health'],
        'structures-why-things-dont-fall': ['Engineering', 'Physics'],
        'stiff-cadavers': ['Science', 'Biology'],
        'rich-dad-poor-dad': ['Finance', 'Business'],
        'modern-computer-graphics': ['Graphics', 'Coding'],
        'fahrenheit-451': ['Classic', 'Dystopian'],
        antigone: ['Classic', 'Drama'],
        'divine-comedy': ['Classic', 'Poetry'],
        'day-of-the-jackal': ['Thriller', 'Fiction'],
        'diary-of-anne-frank': ['Biography', 'History'],
        'animal-farm': ['Classic', 'Satire'],
        ivanhoe: ['Classic', 'Historical'],
        'brave-new-world': ['Classic', 'Dystopian'],
        krakatit: ['Sci-Fi', 'Czech'],
        'ku-klux-klan': ['Non-Fiction', 'History'],
        butterball: ['Classic', 'Fiction'],
        'a-bouquet': ['Classic', 'Poetry', 'Czech'],
        'the-miser': ['Classic', 'Comedy'],
        'the-little-prince': ['Classic', 'Philosophy'],
        'prayer-for-katerina-horovitzova': ['Classic', 'Czech'],
        'all-quiet-on-western-front': ['Classic', 'Historical'],
        'lord-of-the-rings': ['Fantasy', 'Classic'],
        persepolis: ['Biography', 'Graphic Novel'],
        'hound-of-the-baskervilles': ['Mystery', 'Classic'],
        'tales-of-the-little-quarter': ['Classic', 'Czech'],
        'change-kafka': ['Classic', 'Czech'],
        'r-u-r': ['Sci-Fi', 'Drama', 'Czech'],
        'robinson-crusoe': ['Classic', 'Adventure'],
        'romeo-and-juliet': ['Classic', 'Drama'],
        saturnin: ['Classic', 'Comedy', 'Czech'],
        'great-gatsby': ['Classic', 'Fiction'],
        'merry-wives-of-windsor': ['Classic', 'Comedy'],
        'murder-on-orient-express': ['Mystery', 'Classic'],
        'cowards-skvorecky': ['Classic', 'Czech'],
        'crime-and-punishment': ['Classic', 'Psychology'],
        'i-robot': ['Sci-Fi', 'Classic'],
        'study-in-scarlet': ['Mystery', 'Classic'],
        'become-investor': ['Finance', 'Investing'],
        'sport-is-pain': ['Biography', 'Sport'],
        'fault-in-our-stars': ['Fiction', 'Drama'],
        'ai-modern-approach': ['AI', 'Computer Science'],
        'flowers-for-algernon': ['Classic', 'Drama'],
        'contact-sagan': ['Sci-Fi', 'Space'],
        'safehold-series': ['Sci-Fi', 'Space'],
        'children-of-time': ['Sci-Fi', 'Space'],
        'rocket-propulsion-elements': ['Aerospace', 'Engineering']
      };
      return bookTags[item.id] || defaultTags;
    }

    return [];
  }

  getYear(item: LibraryItem): number {
    if (item.type === 'youtube') return 2026;
    const translator = this.ts.t();
    const dateStr = translator(`${item.translationPrefix}.date`);
    if (!dateStr || dateStr.toLowerCase().includes('reading') || dateStr.toLowerCase().includes('ongoing') || dateStr.toLowerCase().includes('future')) {
      return 2026;
    }
    const matches = dateStr.match(/\d{4}/g);
    if (matches && matches.length > 0) {
      return Math.max(...matches.map(m => parseInt(m, 10)));
    }
    return 0;
  }

  toggleTag(tag: string) {
    const current = this.searchQuery().trim();
    if (!current) {
      this.searchQuery.set(tag);
    } else {
      const words = current.split(/\s+/);
      if (words.includes(tag)) {
        const filtered = words.filter(w => w !== tag).join(' ');
        this.searchQuery.set(filtered);
      } else {
        this.searchQuery.set(current + ' ' + tag);
      }
    }
  }

  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const translator = this.ts.t();

    let items = this.libraryItems.filter(item => {
      // Category Filter
      if (cat !== 'all' && item.type !== cat) return false;

      // Search Filter
      if (query) {
        const title = translator(`${item.translationPrefix}.title`).toLowerCase();
        const desc = translator(`${item.translationPrefix}.desc`).toLowerCase();
        const extra = item.extraKey ? item.extraKey.toLowerCase() : '';
        const tags = this.getItemTags(item).map(t => t.toLowerCase());
        const typeLabel = translator(`projects.filter_${item.type}`).toLowerCase();

        return (
          title.includes(query) ||
          desc.includes(query) ||
          extra.includes(query) ||
          tags.some(t => t.includes(query)) ||
          typeLabel.includes(query)
        );
      }

      return true;
    });

    const mode = this.sortMode();
    if (mode === 'default-rev') {
      return [...items].reverse();
    } else if (mode === 'alpha-asc') {
      return [...items].sort((a, b) => {
        const titleA = translator(`${a.translationPrefix}.title`).toLowerCase();
        const titleB = translator(`${b.translationPrefix}.title`).toLowerCase();
        return titleA.localeCompare(titleB, this.currentLang());
      });
    } else if (mode === 'alpha-desc') {
      return [...items].sort((a, b) => {
        const titleA = translator(`${a.translationPrefix}.title`).toLowerCase();
        const titleB = translator(`${b.translationPrefix}.title`).toLowerCase();
        return titleB.localeCompare(titleA, this.currentLang());
      });
    } else if (mode === 'date-desc') {
      return [...items].sort((a, b) => {
        return this.getYear(b) - this.getYear(a);
      });
    } else if (mode === 'date-asc') {
      return [...items].sort((a, b) => {
        return this.getYear(a) - this.getYear(b);
      });
    }

    return items;
  });

  t(key: string): string {
    return this.ts.t()(key);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
