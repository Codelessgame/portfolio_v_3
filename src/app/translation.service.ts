import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'cs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private _lang = signal<Lang>('en');

  currentLang = this._lang.asReadonly();

  toggleLanguage() {
    this._lang.update(l => l === 'en' ? 'cs' : 'en');
  }

  // A global lookup helper
  t = computed(() => {
    const l = this._lang();
    return (key: string): string => {
      return translations[l]?.[key] || key;
    };
  });
}

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navigation / Header
    'nav.home': 'Home',
    'nav.projects': 'Showcase',
    'header.title': 'STANISLAV RŮŽIČKA',

    // About Me Section
    'about.title': 'About me',
    'about.subtitle': 'Who I am',
    'about.p1': 'Hi, I’m Stanislav Růžička, a high school student studying the International Baccalaureate Diploma Programme (IBDP).',
    'about.p2': 'I am passionate about engineering, programming, and design. I enjoy creating both in the digital and physical world, from coding applications to designing and 3D-printing mechanical parts.',
    'about.p3': 'My technical background includes CAD design (Fusion 360, FreeCAD), circuit board design (KiCAD), and programming in Python, Angular, C, and TypeScript.',

    // Showcase / Creative Space Section
    'creative.title': 'My Creative Space',
    'creative.subtitle': 'A collection of code, art, and engineering projects',
    'creative.view_code': 'View Code',
    'creative.view_art': 'View Art',
    'creative.view_prints': 'View Prints',
    'creative.github_desc': 'Explore my open-source repositories, web apps, and coding projects.',
    'creative.art_desc': 'Check out my 2D art, designs, sketches, and creative works.',
    'creative.printables_desc': 'Browse my 3D printing designs, CAD models, and engineering parts.',

    // Timeline Section
    'timeline.title': 'My Journey',
    'timeline.subtitle': 'A timeline of my professional experience and education',
    'timeline.work': 'Work Experience',
    'timeline.edu': 'Education',
    'timeline.upcoming': 'Upcoming',
    'timeline.ongoing': 'Ongoing',
    
    // Timeline Card 1: Fontys
    'timeline.fontys.title': 'Fontys University of Applied Sciences',
    'timeline.fontys.sub': 'Bachelor of Science in Mechatronics',
    'timeline.fontys.date': 'Sept 2026 – Future (Upcoming)',
    'timeline.fontys.b1': 'Enrolled in the Bachelor of Science in Mechatronics engineering program.',
    'timeline.fontys.b2': 'Focusing on integrating mechanical engineering, electrical engineering, and computer systems.',
    'timeline.fontys.b3': 'Applying practical CAD/CAM, software engineering, and hardware prototyping skills in a collaborative project-based curriculum.',

    // Timeline Card 2: Viktoria
    'timeline.viktoria.title': 'Stadion Viktoria Plzeň',
    'timeline.viktoria.sub': 'Hospitality Server',
    'timeline.viktoria.date': '2025',
    'timeline.viktoria.b1': 'Delivered rapid, high-quality customer service in high-pressure, fast-paced sports stadium environments.',
    'timeline.viktoria.b2': 'Prepared and sold food and concessions while managing inventory and cash transactions for large matchday crowds.',
    'timeline.viktoria.b3': 'Maintained a welcoming, organized, and efficient service atmosphere under pressure.',

    // Timeline Card 3: PPA Arena
    'timeline.ppa.title': 'PPA Arena',
    'timeline.ppa.sub': 'Cashier & Paintball Event Organizer',
    'timeline.ppa.date': '2023 – 2024',
    'timeline.ppa.b1': 'Managed daily logistics, safety briefs, and client relations for paintball groups ranging from 6 to 90 participants per day.',
    'timeline.ppa.b2': 'Communicated event rules, handled fee collection, and guided foreign visitors (providing instructions in English and German).',
    'timeline.ppa.b3': 'Operated POS ticketing terminals, balancing concession sales and ticketing checkouts in high-energy environments.',

    // Timeline Card 4: Rokycany
    'timeline.rokycany.title': 'Gymnázium Rokycany',
    'timeline.rokycany.sub': 'International Baccalaureate (IB) Diploma Programme',
    'timeline.rokycany.date': 'Sept 2022 – June 2026 (ongoing)',
    'timeline.rokycany.b1': 'Advanced coursework: Mathematics Analysis and Approaches HL, Physics HL, English B HL, Chemistry SL, Geography SL, and Czech A: Literature SL.',
    'timeline.rokycany.b2': 'Developed an advanced computational physics/math model calculating the shadow areas of convex shapes using 3D vector analysis and the Shoelace formula (Math IA).',
    'timeline.rokycany.b3': 'Balanced rigorous academic work with self-taught engineering skills (CAD in Fusion 360, PCBs in KiCad, AI architectures in PyTorch).',

    // Personal Activities
    'act.art.label': 'Art Club & School Volunteering',
    'act.art.desc': 'Volunteered to coordinate custom physical/digital artwork commissions and designed school community farewell gifts, utilizing acrylic painting and pastels.',
    'act.physics.label': 'Aerospace & Physics Research',
    'act.physics.desc': 'Designed and simulated a mathematical shadow projection model for convex 3D shapes using coordinate geometry, vector analysis, and Python.',
    'act.sports.label': 'Team Sports (Football/Floorball)',
    'act.sports.desc': 'Engaged in competitive team sports to build tactical cooperation, leadership, and quick decision-making under physical and mental pressure.',
    'act.trace': 'Click to trace back to: ',

    // Projects Page Translations
    'projects.title': 'Showcase & Library',
    'projects.subtitle': 'A curated collection of my engineering projects, books I read, and YouTube channels I watch.',
    'projects.featured_showcase': 'Featured Showcase',
    'projects.library_resources': 'Resources Library',
    'projects.search_placeholder': 'Search projects, books, or channels by name, author, tech...',
    'projects.filter_all': 'All Resources',
    'projects.filter_embedded': 'Embedded / Engineering',
    'projects.filter_ai': 'AI Models',
    'projects.filter_project': 'Projects',
    'projects.filter_book': 'Books',
    'projects.filter_youtube': 'YouTube Channels',
    'projects.filter_podcast': 'Podcasts',
    'projects.ban_media_label': 'Hide Media',
    'projects.ban_media_tooltip': 'Hide YouTube channels and Podcasts',
    'projects.status_all': 'All Statuses',
    'projects.status_finished': 'Finished',
    'projects.status_ongoing': 'Ongoing',
    
    // Project 1: RC Car
    'projects.rc_car.title': 'Remote Controlled Car',
    'projects.rc_car.desc': 'A smart, custom-built remote-controlled vehicle designed with obstacle avoidance sensors, optimized chassis, and a dual-motor driver system.',
    'projects.rc_car.date': 'March 2024 – December 2024',
    
    // Project 2: Train switches
    'projects.railway.title': 'Model Railways Automatic Train Switches',
    'projects.railway.desc': 'An automated railway track switching system designed to direct trains dynamically based on route logic, sensor feedbacks, and integrated control microchips.',
    'projects.railway.date': 'November 2024 – June 2026',
    
    // Project 3: Digit recognizer
    'projects.digit.title': 'Digit Recognizer',
    'projects.digit.desc': 'A deep neural network (CNN) trained to classify handwritten digits with high accuracy, complete with a drawing canvas interface for real-time validation.',
    'projects.digit.date': 'June 9, 2026',
    
    // Project 4: Music attention
    'projects.music.title': 'Music Attention',
    'projects.music.desc': 'An audio analyzer utilizing self-attention mechanism layers in PyTorch to classify musical features and map spectral attention coefficients over time.',
    'projects.music.date': 'June 10, 2026 – June 11, 2026',
    
    // Project 5: Small language model
    'projects.slm.title': 'Small Language Model',
    'projects.slm.desc': 'An ongoing project building and pre-training a lightweight Transformer-based GPT style language model to understand structural text dependencies.',
    'projects.slm.date': 'June 14, 2026 – Ongoing',

    // Books
    'projects.atomic_habits.title': 'Atomic Habits',
    'projects.atomic_habits.desc': 'An extremely practical guide to building good habits and breaking bad ones by focusing on tiny, 1% daily improvements.',
    'projects.atomic_habits.date': 'Read: Jan 2024',
    
    'projects.clean_code.title': 'Clean Code',
    'projects.clean_code.desc': 'A handbook of agile software craftsmanship, describing principles of writing clean, maintainable, and readable code.',
    'projects.clean_code.date': 'Read: March 2025',

    'projects.design_things.title': 'The Design of Everyday Things',
    'projects.design_things.desc': 'A masterpiece exploring the cognitive psychology of design, showing why usability is the most critical feature of any product.',
    'projects.design_things.date': 'Read: June 2025',

    'projects.electrodynamics.title': 'Introduction to Electrodynamics',
    'projects.electrodynamics.desc': 'A classical physics textbook covering electromagnetic fields, Maxwell\'s equations, and electrodynamics principles.',
    'projects.electrodynamics.date': 'Reading',

    'projects.nineteen_eighty_four.title': '1984',
    'projects.nineteen_eighty_four.desc': 'George Orwell\'s classic dystopian novel exploring surveillance, totalitarianism, and the manipulation of truth.',
    'projects.nineteen_eighty_four.date': 'Read: 2023',

    'projects.bible_first_100_pages.title': 'The Bible (First 100 Pages)',
    'projects.bible_first_100_pages.desc': 'Reading and reflecting on the foundational historical, moral, and spiritual texts of the Old Testament.',
    'projects.bible_first_100_pages.date': 'Read: 2023',

    'projects.surely_youre_joking_feynman.title': 'Surely You\'re Joking, Mr. Feynman!',
    'projects.surely_youre_joking_feynman.desc': 'The brilliant and humorous autobiographical anecdotes of Nobel laureate physicist Richard Feynman.',
    'projects.surely_youre_joking_feynman.date': 'Read: 2024',

    'projects.feynman_lectures_vol1.title': 'Feynman\'s Lectures on Physics Vol. 1',
    'projects.feynman_lectures_vol1.desc': 'A comprehensive textbook covering mechanics, radiation, and heat from Feynman\'s famous undergraduate lectures.',
    'projects.feynman_lectures_vol1.date': 'Read: 2024',

    'projects.white_disease.title': 'The White Disease',
    'projects.white_disease.desc': 'Karel Čapek\'s visionary drama warning against totalitarianism, fanaticism, and the horrors of war.',
    'projects.white_disease.date': 'Read: 2022',

    'projects.war_with_the_newts.title': 'War with the Newts',
    'projects.war_with_the_newts.desc': 'A satirical sci-fi novel by Čapek depicting humans exploiting intelligent newts, leading to global catastrophe.',
    'projects.war_with_the_newts.date': 'Read: 2022',

    'projects.mother_capek.title': 'The Mother',
    'projects.mother_capek.desc': 'Karel Čapek\'s anti-war play depicting a mother wrestling with the sacrifice of her sons for their country.',
    'projects.mother_capek.date': 'Read: 2022',

    'projects.hitchhikers_guide.title': 'The Hitchhiker\'s Guide to the Galaxy',
    'projects.hitchhikers_guide.desc': 'Douglas Adams\' legendary sci-fi comedy following the absurd space adventures of Arthur Dent.',
    'projects.hitchhikers_guide.date': 'Read: 2023',

    'projects.handmaids_tale.title': 'The Handmaid\'s Tale',
    'projects.handmaids_tale.desc': 'Margaret Atwood\'s dystopian novel depicting Gilead, a near-future totalitarian state that subjugates women.',
    'projects.handmaids_tale.date': 'Read: 2023',

    'projects.to_kill_a_mockingbird.title': 'To Kill a Mockingbird',
    'projects.to_kill_a_mockingbird.desc': 'Harper Lee\'s classic novel exploring racial injustice, honor, and the loss of innocence in the American South.',
    'projects.to_kill_a_mockingbird.date': 'Read: 2022',

    'projects.ten_rules_for_life.title': '12 Rules for Life',
    'projects.ten_rules_for_life.desc': 'Jordan Peterson\'s bestselling guide offering practical wisdom and psychological rules for building personal order.',
    'projects.ten_rules_for_life.date': 'Read: 2024',

    'projects.beyond_order.title': 'Beyond Order: 12 More Rules',
    'projects.beyond_order.desc': 'Jordan Peterson\'s sequel offering twelve additional principles to balance creative change and personal structure.',
    'projects.beyond_order.date': 'Read: 2024',

    'projects.why_we_sleep.title': 'Why We Sleep',
    'projects.why_we_sleep.desc': 'Matthew Walker\'s fascinating exploration of the vital scientific importance of sleep and dreaming.',
    'projects.why_we_sleep.date': 'Read: 2024',

    'projects.structures_why_things_dont_fall.title': 'Structures: Or Why Things Don\'t Fall Down',
    'projects.structures_why_things_dont_fall.desc': 'J.E. Gordon\'s brilliant, accessible introduction to the mechanical engineering principles of structural design.',
    'projects.structures_why_things_dont_fall.date': 'Read: 2024',

    'projects.stiff_cadavers.title': 'Stiff: The Curious Lives of Human Cadavers',
    'projects.stiff_cadavers.desc': 'Mary Roach\'s humorous and deeply educational look at the contributions of human cadavers to science and history.',
    'projects.stiff_cadavers.date': 'Read: 2023',

    'projects.rich_dad_poor_dad.title': 'Rich Dad Poor Dad',
    'projects.rich_dad_poor_dad.desc': 'Robert Kiyosaki\'s classic personal finance book outlining different mindsets toward money, assets, and investing.',
    'projects.rich_dad_poor_dad.date': 'Read: 2023',

    'projects.modern_computer_graphics.title': 'Modern Computer Graphics',
    'projects.modern_computer_graphics.desc': 'A comprehensive Czech textbook by Žára, Beneš, and Felkel explaining the math, geometry, and algorithms of rendering.',
    'projects.modern_computer_graphics.date': 'Read: 2025',

    'projects.fahrenheit_451.title': 'Fahrenheit 451',
    'projects.fahrenheit_451.desc': 'Ray Bradbury\'s dystopian classic depicting a future society where books are outlawed and systematically burned.',
    'projects.fahrenheit_451.date': 'Read: 2022',

    'projects.antigone.title': 'Antigone',
    'projects.antigone.desc': 'Sophocles\' classic Greek tragedy exploring the moral conflict between civil laws and divine/familial duty.',
    'projects.antigone.date': 'Read: 2021',

    'projects.divine_comedy.title': 'The Divine Comedy',
    'projects.divine_comedy.desc': 'Dante Alighieri\'s epic poem detailing the soul\'s journey through Inferno, Purgatorio, and Paradiso.',
    'projects.divine_comedy.date': 'Read: 2022',

    'projects.day_of_the_jackal.title': 'The Day of the Jackal',
    'projects.day_of_the_jackal.desc': 'Frederick Forsyth\'s suspenseful thriller chronicling a professional assassin\'s plot to murder Charles de Gaulle.',
    'projects.day_of_the_jackal.date': 'Read: 2023',

    'projects.diary_of_anne_frank.title': 'The Diary of a Young Girl',
    'projects.diary_of_anne_frank.desc': 'The moving real-life diary written by Anne Frank while hiding from Nazi occupation in Amsterdam.',
    'projects.diary_of_anne_frank.date': 'Read: 2022',

    'projects.animal_farm.title': 'Animal Farm',
    'projects.animal_farm.desc': 'George Orwell\'s satirical allegorical novella exposing the corruption of revolutionary ideals and totalitarianism.',
    'projects.animal_farm.date': 'Read: 2022',

    'projects.ivanhoe.title': 'Ivanhoe',
    'projects.ivanhoe.desc': 'Sir Walter Scott\'s historical novel depicting medieval chivalry, crusades, and conflict in 12th-century England.',
    'projects.ivanhoe.date': 'Read: 2022',

    'projects.brave_new_world.title': 'Brave New World',
    'projects.brave_new_world.desc': 'Aldous Huxley\'s chilling dystopian masterpiece depicting a highly engineered, consumerist, and painless future society.',
    'projects.brave_new_world.date': 'Read: 2023',

    'projects.krakatit.title': 'Krakatit',
    'projects.krakatit.desc': 'Karel Čapek\'s novel warnings about the devastating dangers of a newly invented ultimate explosive.',
    'projects.krakatit.date': 'Read: 2022',

    'projects.ku_klux_klan.title': 'Ku-klux-klan: Where the Love Lives',
    'projects.ku_klux_klan.desc': 'Katarzyna Surmiak-Domańska\'s documentary reportage examining the modern members and ideology of the KKK.',
    'projects.ku_klux_klan.date': 'Read: 2023',

    'projects.butterball.title': 'Butterball (Boule de Suif)',
    'projects.butterball.desc': 'Guy de Maupassant\'s famous short story set during the Franco-Prussian War, satirizing bourgeois hypocrisy.',
    'projects.butterball.date': 'Read: 2022',

    'projects.a_bouquet.title': 'A Bouquet (Kytice)',
    'projects.a_bouquet.desc': 'Karel Jaromír Erben\'s classic collection of Czech ballads rich in mythology, moral codes, and dark themes.',
    'projects.a_bouquet.date': 'Read: 2021',

    'projects.the_miser.title': 'The Miser (Lakomec)',
    'projects.the_miser.desc': 'Molière\'s classic satirical comedy depicting the greedy Harpagon and his comedic conflicts with his children.',
    'projects.the_miser.date': 'Read: 2021',

    'projects.the_little_prince.title': 'The Little Prince',
    'projects.the_little_prince.desc': 'Antoine de Saint-Exupéry\'s philosophical tale about friendship, love, and the essential things invisible to the eye.',
    'projects.the_little_prince.date': 'Read: 2020',

    'projects.prayer_for_katerina_horovitzova.title': 'A Prayer for Katerina Horovitzova',
    'projects.prayer_for_katerina_horovitzova.desc': 'Arnošt Lustig\'s dramatic novella depicting Jewish hostages bargaining with Nazis during WWII, showing dignity in hopelessness.',
    'projects.prayer_for_katerina_horovitzova.date': 'Read: 2022',

    'projects.all_quiet_on_western_front.title': 'All Quiet on the Western Front',
    'projects.all_quiet_on_western_front.desc': 'Erich Maria Remarque\'s powerful anti-war masterpiece detailing the extreme physical and mental stress of WWI soldiers.',
    'projects.all_quiet_on_western_front.date': 'Read: 2022',

    'projects.lord_of_the_rings.title': 'The Lord of the Rings',
    'projects.lord_of_the_rings.desc': 'J.R.R. Tolkien\'s epic high-fantasy masterpiece following the quest to destroy the One Ring.',
    'projects.lord_of_the_rings.date': 'Read: 2023',

    'projects.persepolis.title': 'Persepolis',
    'projects.persepolis.desc': 'Marjane Satrapi\'s autobiographical graphic novel detailing her childhood growing up in Iran during the Islamic Revolution.',
    'projects.persepolis.date': 'Read: 2023',

    'projects.hound_of_the_baskervilles.title': 'The Hound of the Baskervilles',
    'projects.hound_of_the_baskervilles.desc': 'Arthur Conan Doyle\'s classic Sherlock Holmes mystery investigating a legendary supernatural beast in Devonshire.',
    'projects.hound_of_the_baskervilles.date': 'Read: 2022',

    'projects.tales_of_the_little_quarter.title': 'Tales of the Little Quarter',
    'projects.tales_of_the_little_quarter.desc': 'Jan Neruda\'s humorous and satirical short stories capturing 19th-century life in Prague\'s Malá Strana.',
    'projects.tales_of_the_little_quarter.date': 'Read: 2021',

    'projects.change_kafka.title': 'The Metamorphosis',
    'projects.change_kafka.desc': 'Franz Kafka\'s absurd and tragic novella about Gregor Samsa, who wakes up transformed into a giant insect.',
    'projects.change_kafka.date': 'Read: 2021',

    'projects.r_u_r.title': 'R.U.R. (Rossum\'s Universal Robots)',
    'projects.r_u_r.desc': 'Karel Čapek\'s landmark sci-fi play that introduced the word "robot" to the world, exploring artificial life.',
    'projects.r_u_r.date': 'Read: 2021',

    'projects.robinson_crusoe.title': 'Robinson Crusoe',
    'projects.robinson_crusoe.desc': 'Daniel Defoe\'s classic adventure novel depicting a castaway\'s 28-year survival on a remote island.',
    'projects.robinson_crusoe.date': 'Read: 2021',

    'projects.romeo_and_juliet.title': 'Romeo and Juliet',
    'projects.romeo_and_juliet.desc': 'William Shakespeare\'s timeless tragedy of two young star-crossed lovers from feuding families.',
    'projects.romeo_and_juliet.date': 'Read: 2021',

    'projects.saturnin.title': 'Saturnin',
    'projects.saturnin.desc': 'Zdeněk Jirotka\'s beloved Czech humorous novel about an eccentric butler who turns everyday life into an adventure.',
    'projects.saturnin.date': 'Read: 2022',

    'projects.great_gatsby.title': 'The Great Gatsby',
    'projects.great_gatsby.desc': 'F. Scott Fitzgerald\'s novel exploring wealth, love, and the disillusionment of the American Dream in the Roaring Twenties.',
    'projects.great_gatsby.date': 'Read: 2023',

    'projects.merry_wives_of_windsor.title': 'The Merry Wives of Windsor',
    'projects.merry_wives_of_windsor.desc': 'William Shakespeare\'s comedic play featuring the mischief of Sir John Falstaff and the clever wives.',
    'projects.merry_wives_of_windsor.date': 'Read: 2021',

    'projects.murder_on_orient_express.title': 'Murder on the Orient Express',
    'projects.murder_on_orient_express.desc': 'Agatha Christie\'s famous detective novel featuring Hercule Poirot resolving a complex train murder.',
    'projects.murder_on_orient_express.date': 'Read: 2022',

    'projects.cowards_skvorecky.title': 'The Cowards (Zbabělci)',
    'projects.cowards_skvorecky.desc': 'Josef Škvorecký\'s novel tracking a group of jazz-loving youth during the chaotic final days of WWII in a Czech town.',
    'projects.cowards_skvorecky.date': 'Read: 2022',

    'projects.crime_and_punishment.title': 'Crime and Punishment',
    'projects.crime_and_punishment.desc': 'Fyodor Dostoevsky\'s psychological masterpiece exploring Raskolnikov\'s moral dilemmas, murder, and redemption.',
    'projects.crime_and_punishment.date': 'Read: 2023',

    'projects.i_robot.title': 'I, Robot',
    'projects.i_robot.desc': 'Isaac Asimov\'s collection of sci-fi short stories exploring the interactions between humans, robots, and the Three Laws.',
    'projects.i_robot.date': 'Read: 2023',

    'projects.study_in_scarlet.title': 'A Study in Scarlet',
    'projects.study_in_scarlet.desc': 'Arthur Conan Doyle\'s novel introducing the legendary partnership of Sherlock Holmes and Dr. John Watson.',
    'projects.study_in_scarlet.date': 'Read: 2022',

    'projects.become_investor.title': 'Stát se investorem',
    'projects.become_investor.desc': 'Mikuláš Splítek\'s Czech guide to value investing, market psychology, and portfolio management.',
    'projects.become_investor.date': 'Read: 2024',

    'projects.sport_is_pain.title': 'Sport je bolest',
    'projects.sport_is_pain.desc': 'A look into how endurance sports test mental fortitude, discipline, and personal thresholds.',
    'projects.sport_is_pain.date': 'Read: 2023',

    'projects.fault_in_our_stars.title': 'The Fault in Our Stars',
    'projects.fault_in_our_stars.desc': 'John Green\'s popular novel depicting the emotional and romantic journey of two teenage cancer patients.',
    'projects.fault_in_our_stars.date': 'Read: 2022',

    'projects.ai_modern_approach.title': 'Artificial Intelligence: A Modern Approach',
    'projects.ai_modern_approach.desc': 'The leading global textbook on AI covering search, logic, machine learning, and deep neural architectures.',
    'projects.ai_modern_approach.date': 'Reading',

    'projects.flowers_for_algernon.title': 'Flowers for Algernon',
    'projects.flowers_for_algernon.desc': 'Daniel Keyes\' poignant sci-fi novel about a disabled man undergoing an experimental surgery to increase intelligence.',
    'projects.flowers_for_algernon.date': 'Read: 2023',

    'projects.contact_sagan.title': 'Contact',
    'projects.contact_sagan.desc': 'Carl Sagan\'s hard science fiction novel exploring humanity\'s first contact with an extraterrestrial intelligence.',
    'projects.contact_sagan.date': 'Read: 2023',

    'projects.safehold_series.title': 'Safehold Series',
    'projects.safehold_series.desc': 'David Weber\'s massive military science fiction series depicting humanity rebuilding technology on a hidden world.',
    'projects.safehold_series.date': 'Read: 2024',

    'projects.children_of_time.title': 'Children of Time',
    'projects.children_of_time.desc': 'Adrian Tchaikovsky\'s award-winning sci-fi novel detailing the evolution of a terraformed planet\'s arachnid civilization.',
    'projects.children_of_time.date': 'Read: 2024',

    'projects.rocket_propulsion_elements.title': 'Rocket Propulsion Elements',
    'projects.rocket_propulsion_elements.desc': 'George Sutton\'s definitive aerospace engineering guide covering liquid and solid rocket engine designs.',
    'projects.rocket_propulsion_elements.date': 'Reading',

    // YouTube Channels
    'projects.three_blue_one_brown.title': '3Blue1Brown',
    'projects.three_blue_one_brown.desc': 'Visual mathematics explaining complex topics in linear algebra, calculus, and neural networks using manim animations.',
    'projects.three_blue_one_brown.date': 'Recommended',

    'projects.mark_rober.title': 'Mark Rober',
    'projects.mark_rober.desc': 'Creative engineering and science experiments presented by a former NASA engineer, showcasing physics, mechanics, and design.',
    'projects.mark_rober.date': 'Recommended',

    'projects.veritasium.title': 'Veritasium',
    'projects.veritasium.desc': 'An amazing science channel featuring truth-seeking experiments, expert interviews, and counter-intuitive physics concepts.',
    'projects.veritasium.date': 'Recommended',

    'projects.stuff_made_here.title': 'Stuff Made Here',
    'projects.stuff_made_here.desc': 'A channel about building insanely complex mechanical parts, custom machines, robots, and programming them to solve hard challenges.',
    'projects.stuff_made_here.date': 'Recommended',

    'projects.nikhil_kamath.title': 'Nikhil Kamath',
    'projects.nikhil_kamath.desc': 'Insightful podcasts and discussions on business, economy, and entrepreneurship with industry leaders.',
    'projects.nikhil_kamath.date': 'Recommended',

    'projects.ivysilani.title': 'iVysílání',
    'projects.ivysilani.desc': 'Czech Television\'s online streaming archive, offering diverse documentaries, news, and cultural shows.',
    'projects.ivysilani.date': 'Recommended',

    'projects.andy_guitar.title': 'Andy Guitar',
    'projects.andy_guitar.desc': 'Excellent step-by-step guitar lessons for beginners and intermediate players.',
    'projects.andy_guitar.date': 'Recommended',

    'projects.herdyn.title': 'Herdyn',
    'projects.herdyn.desc': 'Popular Czech gaming streamer, let\'s player, and entertainer.',
    'projects.herdyn.date': 'Recommended',

    'projects.mit_ocw.title': 'MIT OpenCourseWare',
    'projects.mit_ocw.desc': 'Free, high-quality lecture recordings and educational resources from MIT courses.',
    'projects.mit_ocw.date': 'Recommended',

    'projects.revision_village.title': 'Revision Village',
    'projects.revision_village.desc': 'The ultimate resource for IB Mathematics preparation, featuring video solutions and practice exams.',
    'projects.revision_village.date': 'Recommended',

    'projects.cvutfel.title': 'CVUTFEL',
    'projects.cvutfel.desc': 'Official channel of the Faculty of Electrical Engineering at CTU Prague, featuring research and lectures.',
    'projects.cvutfel.date': 'Recommended',

    'projects.jaderka.title': 'Jaderka [fjfi]',
    'projects.jaderka.desc': 'Faculty of Nuclear Sciences and Physical Engineering at CTU Prague, sharing science talks and events.',
    'projects.jaderka.date': 'Recommended',

    'projects.kapitalista.title': 'Kapitalista',
    'projects.kapitalista.desc': 'Czech educational channel focusing on investing, finance, and financial literacy.',
    'projects.kapitalista.date': 'Recommended',

    'projects.steve_mould.title': 'Steve Mould',
    'projects.steve_mould.desc': 'Fun and engaging science experiments explaining physics and chemistry principles in everyday life.',
    'projects.steve_mould.date': 'Recommended',

    'projects.online_ucitel.title': 'Online Učitel',
    'projects.online_ucitel.desc': 'Czech educational channel helping students understand school mathematics and science subjects.',
    'projects.online_ucitel.date': 'Recommended',

    'projects.learntube.title': 'LearnTube.cz',
    'projects.learntube.desc': 'Czech platform providing online courses on programming, marketing, and self-improvement.',
    'projects.learntube.date': 'Recommended',

    'projects.artem_kirsanov.title': 'Artem Kirsanov',
    'projects.artem_kirsanov.desc': 'Visually stunning videos about neuroscience, cognitive science, and complex systems.',
    'projects.artem_kirsanov.date': 'Recommended',

    'projects.real_engineering.title': 'Real Engineering',
    'projects.real_engineering.desc': 'Detailed animated breakdowns of mechanical, civil, and aerospace engineering milestones.',
    'projects.real_engineering.date': 'Recommended',

    'projects.scott_manley.title': 'Scott Manley',
    'projects.scott_manley.desc': 'Space science, orbital mechanics, and rocket technology explained by an astrophysicist.',
    'projects.scott_manley.date': 'Recommended',

    'projects.gal_lahat.title': 'Gal Lahat',
    'projects.gal_lahat.desc': 'Informative videos analyzing software engineering, system design, and coding career tips.',
    'projects.gal_lahat.date': 'Recommended',

    'projects.alexander_amini.title': 'Alexander Amini',
    'projects.alexander_amini.desc': 'Lecturer of MIT Introduction to Deep Learning (6.S191), sharing cutting-edge AI research.',
    'projects.alexander_amini.date': 'Recommended',

    'projects.ai_explained.title': 'AI Explained',
    'projects.ai_explained.desc': 'Clear, in-depth analysis of the latest advancements, papers, and models in artificial intelligence.',
    'projects.ai_explained.date': 'Recommended',

    'projects.aleph_zero.title': 'Aleph 0',
    'projects.aleph_zero.desc': 'Beautiful math visualizations and explanations of challenging mathematical equations.',
    'projects.aleph_zero.date': 'Recommended',

    'projects.efficient_engineer.title': 'The Efficient Engineer',
    'projects.efficient_engineer.desc': 'Clear visualizations of mechanical engineering concepts like stress analysis and thermodynamics.',
    'projects.efficient_engineer.date': 'Recommended',

    'projects.cgp_grey.title': 'CGP Grey',
    'projects.cgp_grey.desc': 'Humorous and highly detailed animated explanations of politics, geography, and history.',
    'projects.cgp_grey.date': 'Recommended',

    'projects.quanta_magazine.title': 'Quanta Magazine',
    'projects.quanta_magazine.desc': 'Public-service science journalism covering mathematics, physics, and computer science breakthroughs.',
    'projects.quanta_magazine.date': 'Recommended',

    'projects.lemmino.title': 'LEMMiNO',
    'projects.lemmino.desc': 'Masterfully edited documentary-style videos investigating mysteries, space, and history.',
    'projects.lemmino.date': 'Recommended',

    'projects.andrej_karpathy.title': 'Andrej Karpathy',
    'projects.andrej_karpathy.desc': 'Outstanding deep-dive coding tutorials on neural networks and building GPT models from scratch.',
    'projects.andrej_karpathy.date': 'Recommended',

    'projects.integza.title': 'Integza',
    'projects.integza.desc': 'Building and 3D printing custom rocket engines, jet engines, and experimental turbines.',
    'projects.integza.date': 'Recommended',

    'projects.bps_space.title': 'BPS.space',
    'projects.bps_space.desc': 'Designing, building, and launching thrust-vector controlled model rockets and guidance computers.',
    'projects.bps_space.date': 'Recommended',

    'projects.sebastian_lague.title': 'Sebastian Lague',
    'projects.sebastian_lague.desc': 'Incredible coding adventures, game development, simulations, and graphics programming.',
    'projects.sebastian_lague.date': 'Recommended',

    'projects.hyperplexed.title': 'Hyperplexed',
    'projects.hyperplexed.desc': 'Brilliant web design tutorials, CSS masterclasses, and rebuilding creative layouts.',
    'projects.hyperplexed.date': 'Recommended',

    'projects.jirka_vysvetluje.title': 'Jirka vysvětluje věci',
    'projects.jirka_vysvetluje.desc': 'Czech documentary channel explaining diverse interesting topics about history, society, and technology.',
    'projects.jirka_vysvetluje.date': 'Recommended',

    'projects.everyday_astronaut.title': 'Everyday Astronaut',
    'projects.everyday_astronaut.desc': 'In-depth aerospace engineering and coverage of SpaceX, NASA, and global rocket launches.',
    'projects.everyday_astronaut.date': 'Recommended',

    'projects.vsauce.title': 'Vsauce',
    'projects.vsauce.desc': 'Mind-bending philosophical and scientific questions explored by Michael Stevens.',
    'projects.vsauce.date': 'Recommended',

    'projects.smarter_every_day.title': 'SmarterEveryDay',
    'projects.smarter_every_day.desc': 'Exploring the world using science, engineering, and ultra-high-speed photography.',
    'projects.smarter_every_day.date': 'Recommended',

    'projects.bycloud.title': 'bycloud',
    'projects.bycloud.desc': 'Documentary-style animations and stories about the history of computing and hardware engineering.',
    'projects.bycloud.date': 'Recommended',

    // Book Analysis general translations
    'analysis.back_to_library': 'Back to Showcase',
    'analysis.section_summary': 'Summary',
    'analysis.section_takeaways': 'Key Takeaways',
    'analysis.section_action': 'My Action Items',

    // Book Analysis: Atomic Habits
    'analysis.atomic-habits.title': 'Atomic Habits',
    'analysis.atomic-habits.author': 'James Clear',
    'analysis.atomic-habits.rating': '5 / 5',
    'analysis.atomic-habits.date': 'Read: January 2024',
    'analysis.atomic-habits.summary': 'This book is a roadmap for building habits that stick. James Clear introduces the concept of atomic habits—small, routine behaviors that compound over time to yield massive results. Instead of setting big goals that are hard to achieve and sustain, Clear argues that we should focus on the systems that lead to those goals. By making a 1% daily improvement in our behaviors, we can achieve transformational changes over months and years.',
    'analysis.atomic-habits.takeaways': '1. Focus on Systems, Not Goals: Goals tell you what you want to achieve, but systems are the processes that lead to those results. The system is what makes progress sustainable.\n2. Build Identity-Based Habits: To change your behavior permanently, change your identity first. Focus on who you want to become, not what you want to achieve (e.g., "I am a programmer" rather than "I want to write a book").\n3. The Four Laws of Behavior Change:\n   - Cue: Make it obvious.\n   - Craving: Make it attractive.\n   - Response: Make it easy.\n   - Reward: Make it satisfying.\n4. Design Your Environment: Build cues into your surroundings to trigger good habits (e.g., place a book on your pillow to read before sleep).',
    'analysis.atomic-habits.action': '1. Environment Design: Place my physics homework and mechanical engineering drawings directly on my desk at the start of each day to make starting work "obvious" and friction-free.\n2. Habit Stacking: Immediately after coming home from school (current habit), I will spend 15 minutes reviewing my CAD designs (new habit).\n3. 2-Minute Rule: When starting a new hard project, limit the initial session to just 2 minutes (e.g. just opening Fusion 360 and saving a new file) to build consistency without feeling overwhelmed.',

    // Book Analysis: Clean Code
    'analysis.clean-code.title': 'Clean Code',
    'analysis.clean-code.author': 'Robert C. Martin',
    'analysis.clean-code.rating': '4.5 / 5',
    'analysis.clean-code.date': 'Read: March 2025',
    'analysis.clean-code.summary': 'Clean Code is a guide for programmers who want to improve their craft. Robert C. Martin (Uncle Bob) presents coding standards and practices that make code clean, readable, and easy to maintain. He argues that writing code is like writing a story: the reader should understand it easily. He emphasizes that the cost of reading bad code is much higher than the cost of writing clean code in the first place, and describes refactoring techniques to transform sloppy code into clean structures.',
    'analysis.clean-code.takeaways': '1. Meaningful Names: Choose names that reveal intent. A variable, class, or function name should tell you why it exists, what it does, and how it is used.\n2. Functions Should Be Small: Functions should only do one thing, and they should do it well. They should have very few arguments (preferably zero or one).\n3. Don\'t Repeat Yourself (DRY): Duplication is the root of all software evil. Extract repetitive code into shared utilities or classes.\n4. Comment Only What Code Cannot Say: Good code is self-documenting. Use comments only to explain design decisions or technical warnings, not to explain bad code that should just be refactored.',
    'analysis.clean-code.action': '1. Boy Scout Rule: Always leave the code cleaner than I found it when working on my portfolio or school assignments.\n2. Function Refactoring: Ensure every function I write is less than 20 lines long and adheres to the Single Responsibility Principle (SRP).\n3. Name Reviews: Spend an extra 30 seconds thinking about proper variable/component naming in my projects to improve readability for open-source contributors.',

    // Footer Section
    'footer.contact': 'Contact Me',
    'footer.rights': 'All rights reserved.',
    'footer.designed_by': 'Designed & Built by Stanislav Růžička'
  },
  cs: {
    // Navigation / Header
    'nav.home': 'Domů',
    'nav.projects': 'Showcase',
    'header.title': 'STANISLAV RŮŽIČKA',

    // About Me Section
    'about.title': 'O mně',
    'about.subtitle': 'Kdo jsem',
    'about.p1': 'Ahoj, jsem Stanislav Růžička, student středního studia v programu International Baccalaureate Diploma Programme (IBDP).',
    'about.p2': 'Mým nadšením je inženýrství, programování a design. Rád tvořím v digitálním i fyzickém světě, od kódování aplikací až po navrhování a 3D tisk mechanických dílů.',
    'about.p3': 'Mé technické zázemí zahrnuje CAD design (Fusion 360, FreeCAD), návrh plošných spojů (KiCAD) a programování v Pythonu, Angularu, C a TypeScriptu.',

    // Showcase / Creative Space Section
    'creative.title': 'Můj kreativní prostor',
    'creative.subtitle': 'Sbírka mých programovacích, uměleckých a strojírenských projektů',
    'creative.view_code': 'Zobrazit kód',
    'creative.view_art': 'Zobrazit umění',
    'creative.view_prints': 'Zobrazit tisky',
    'creative.github_desc': 'Prozkoumejte mé open-source repozitáře, webové aplikace a programátorské projekty.',
    'creative.art_desc': 'Podívejte se na mé 2D umění, designy, skici a kreativní tvorbu.',
    'creative.printables_desc': 'Procházejte mé 3D tištěné designy, CAD modely a inženýrské díly.',

    // Timeline Section
    'timeline.title': 'Moje cesta',
    'timeline.subtitle': 'Časová osa mého vzdělání a pracovních zkušeností',
    'timeline.work': 'Pracovní zkušenosti',
    'timeline.edu': 'Vzdělání',
    'timeline.upcoming': 'Budoucí',
    'timeline.ongoing': 'Probíhá',
    
    // Timeline Card 1: Fontys
    'timeline.fontys.title': 'Univerzita aplikovaných věd Fontys',
    'timeline.fontys.sub': 'Bakalář věd v oboru mechatroniky',
    'timeline.fontys.date': 'Září 2026 – Budoucnost (Následující)',
    'timeline.fontys.b1': 'Zapsán do programu bakaláře věd v oboru mechatroniky.',
    'timeline.fontys.b2': 'Zaměření na propojení strojírenství, elektrotechniky a počítačových systémů.',
    'timeline.fontys.b3': 'Uplatňování praktických dovedností v CAD/CAM, softwarovém inženýrství a prototypování hardwaru v týmových projektech.',

    // Timeline Card 2: Viktoria
    'timeline.viktoria.title': 'Stadion Viktoria Plzeň',
    'timeline.viktoria.sub': 'Obsluha v pohostinství',
    'timeline.viktoria.date': '2025',
    'timeline.viktoria.b1': 'Poskytování rychlého a kvalitního zákaznického servisu v dynamickém prostředí sportovního stadionu.',
    'timeline.viktoria.b2': 'Příprava a prodej občerstvení, správa zásob a zpracování plateb během zápasů pro velké davy fanoušků.',
    'timeline.viktoria.b3': 'Udržování příjemné a efektivní atmosféry servisu pod časovým a kapacitním tlakem.',

    // Timeline Card 3: PPA Arena
    'timeline.ppa.title': 'PPA Arena',
    'timeline.ppa.sub': 'Pokladní & organizátor paintballových akcí',
    'timeline.ppa.date': '2023 – 2024',
    'timeline.ppa.b1': 'Správa denní logistiky, bezpečnostních školení a klientských vztahů pro paintballové skupiny od 6 do 90 účastníků denně.',
    'timeline.ppa.b2': 'Vysvětlování pravidel, výběr poplatků a navigace zahraničních návštěvníků (poskytování instrukcí v angličtině a němčině).',
    'timeline.ppa.b3': 'Obsluha pokladních terminálů POS, prodej občerstvení a lístků v energickém prostředí.',

    // Timeline Card 4: Rokycany
    'timeline.rokycany.title': 'Gymnázium Rokycany',
    'timeline.rokycany.sub': 'Program International Baccalaureate (IB) Diploma',
    'timeline.rokycany.date': 'Září 2022 – Červen 2026 (probíhá)',
    'timeline.rokycany.b1': 'Pokročilé kurzy: Matematická analýza a přístupy HL, Fyzika HL, Angličtina B HL, Chemie SL, Geografie SL a Česká literatura SL.',
    'timeline.rokycany.b2': 'Vývoj pokročilého matematicko-fyzikálního modelu pro výpočet stínových ploch konvexních tvarů pomocí 3D vektorové analýzy a L\'Huilierova vzorce (Math IA).',
    'timeline.rokycany.b3': 'Vyvažování náročného akademického studia se samostudiem inženýrských dovedností (CAD ve Fusion 360, DPS v KiCadu, AI architektury v PyTorchi).',

    // Personal Activities
    'act.art.label': 'Výtvarný kroužek & školní dobrovolnictví',
    'act.art.desc': 'Dobrovolná koordinace zakázek na fyzické a digitální umění, tvorba rozlučkových dárků pro školní komunitu (akrylové malby, pastely).',
    'act.physics.label': 'Výzkum v oblasti letectví a fyziky',
    'act.physics.desc': 'Návrh a simulace matematického modelu stínové projekce pro konvexní 3D tvary s využitím analytické geometrie, vektorové analýzy a Pythonu.',
    'act.sports.label': 'Týmové sporty (Fotbal/Florbal)',
    'act.sports.desc': 'Účast v soutěžních týmových sportech s cílem rozvíjet taktickou spolupráci, vůdčí schopnosti a rychlé rozhodování pod fyzickým a psychickým tlakem.',
    'act.trace': 'Klikněte pro návrat k: ',

    // Projects Page Translations
    'projects.title': 'Showcase & Knihovna',
    'projects.subtitle': 'Vybraná sbírka mých inženýrských projektů, knih, které čtu, a YouTube kanálů, které doporučuji.',
    'projects.featured_showcase': 'Vybrané projekty',
    'projects.library_resources': 'Knihovna a zdroje',
    'projects.search_placeholder': 'Hledat projekty, knihy nebo kanály podle názvu, autora, technologií...',
    'projects.filter_all': 'Všechny zdroje',
    'projects.filter_embedded': 'Vestavěné systémy / Inženýrství',
    'projects.filter_ai': 'AI Modely',
    'projects.filter_project': 'Projekty',
    'projects.filter_book': 'Knihy',
    'projects.filter_youtube': 'YouTube kanály',
    'projects.filter_podcast': 'Podcasty',
    'projects.ban_media_label': 'Skrýt média',
    'projects.ban_media_tooltip': 'Skrýt YouTube kanály a Podcasty',
    'projects.status_all': 'Všechny stavy',
    'projects.status_finished': 'Dokončeno',
    'projects.status_ongoing': 'Probíhá',
    
    // Project 1: RC Car
    'projects.rc_car.title': 'Dálkově ovládané auto',
    'projects.rc_car.desc': 'Chytré, na zakázku postavené dálkově ovládané vozidlo s integrovanými senzory pro vyhýbání se překážkám, optimalizovaným podvozkem a systémem pohonu se dvěma motory.',
    'projects.rc_car.date': 'Březen 2024 – Prosinec 2024',
    
    // Project 2: Train switches
    'projects.railway.title': 'Automatické výhybky pro modelovou železnici',
    'projects.railway.desc': 'Automatizovaný systém řízení a přepínání kolejí navržený k dynamickému směrování vlaků na základě logiky tras, zpětné vazby ze senzorů a integrovaných mikročipů.',
    'projects.railway.date': 'Listopad 2024 – Červen 2026',
    
    // Project 3: Digit recognizer
    'projects.digit.title': 'Rozpoznávání číslic',
    'projects.digit.desc': 'Hluboká neuronová síť (CNN) natrénovaná na klasifikaci ručně psaných číslic s vysokou přesností, doplněná o interaktivní kreslicí plátno pro okamžité rozpoznání.',
    'projects.digit.date': '9. června 2026',
    
    // Project 4: Music attention
    'projects.music.title': 'Hudební pozornost (Music Attention)',
    'projects.music.desc': 'Analyzátor zvuku využívající vrstvy mechanismu self-attention v PyTorch pro klasifikaci hudebních prvků a mapování spektrálních koeficientů pozornosti v čase.',
    'projects.music.date': '10. června 2026 – 11. června 2026',
    
    // Project 5: Small language model
    'projects.slm.title': 'Malý jazykový model',
    'projects.slm.desc': 'Probíhající projekt vývoje a předtrénování lehkého jazykového modelu založeného na architektuře Transformer (styl GPT) pro pochopení strukturních textových závislostí.',
    'projects.slm.date': '14. června 2026 – Probíhá',

    // Books
    'projects.atomic_habits.title': 'Atomové návyky',
    'projects.atomic_habits.desc': 'Mimořádně praktická příručka pro budování dobrých návyků a odstraňování špatných se zaměřením na drobná, 1% denní zlepšení.',
    'projects.atomic_habits.date': 'Přečteno: Led. 2024',

    'projects.clean_code.title': 'Čistý kód',
    'projects.clean_code.desc': 'Příručka agilního softwarového řemesla, která popisuje principy psaní čistého, udržovatelného a čitelného kódu.',
    'projects.clean_code.date': 'Přečteno: Bře. 2025',

    'projects.design_things.title': 'Design pro každý den',
    'projects.design_things.desc': 'Mistrovské dílo zkoumající kognitivní psychologii designu, ukazující, proč je použitelnost nejdůležitější vlastností každého produktu.',
    'projects.design_things.date': 'Přečteno: Čer. 2025',

    'projects.electrodynamics.title': 'Úvod do elektrodynamiky',
    'projects.electrodynamics.desc': 'Učebnice klasické fyziky pokrývající elektromagnetická pole, Maxwellovy rovnice a principy elektrodynamiky.',
    'projects.electrodynamics.date': 'Čtu právě teď',

    'projects.nineteen_eighty_four.title': '1984',
    'projects.nineteen_eighty_four.desc': 'Klasický dystopický román George Orwella zkoumající sledování, totalitu a manipulaci s pravdou.',
    'projects.nineteen_eighty_four.date': 'Přečteno: 2023',

    'projects.bible_first_100_pages.title': 'Bible (prvních 100 stran)',
    'projects.bible_first_100_pages.desc': 'Čtení a zamyšlení nad zakládajícími historickými, morálními a duchovními texty Starého zákona.',
    'projects.bible_first_100_pages.date': 'Přečteno: 2023',

    'projects.surely_youre_joking_feynman.title': 'To snad nemyslíte vážně, pane Feynmane!',
    'projects.surely_youre_joking_feynman.desc': 'Brilantní a humorné autobiografické historky a postřehy nositele Nobelovy ceny, fyzika Richarda Feynmana.',
    'projects.surely_youre_joking_feynman.date': 'Přečteno: 2024',

    'projects.feynman_lectures_vol1.title': 'Feynmanovy přednášky z fyziky 1',
    'projects.feynman_lectures_vol1.desc': 'Ucelená učebnice pokrývající mechaniku, záření a teplo z Feynmanových slavných přednášek pro vysokoškoláky.',
    'projects.feynman_lectures_vol1.date': 'Přečteno: 2024',

    'projects.white_disease.title': 'Bílá nemoc',
    'projects.white_disease.desc': 'Vizionářské drama Karla Čapka varující před totalitou, fanatismem a hrůzami války.',
    'projects.white_disease.date': 'Přečteno: 2022',

    'projects.war_with_the_newts.title': 'Válka s mloky',
    'projects.war_with_the_newts.desc': 'Satirický sci-fi román Karla Čapka líčící zneužívání inteligentních mloků lidstvem, vedoucí ke globální katastrofě.',
    'projects.war_with_the_newts.date': 'Přečteno: 2022',

    'projects.mother_capek.title': 'Matka',
    'projects.mother_capek.desc': 'Protiválečná divadelní hra Karla Čapka zobrazující matku bojující s obětí svých synů pro vlast.',
    'projects.mother_capek.date': 'Přečteno: 2022',

    'projects.hitchhikers_guide.title': 'Stopařův průvodce Galaxií',
    'projects.hitchhikers_guide.desc': 'Legendární sci-fi komedie Douglase Adamse sledující absurdní vesmírná dobrodružství Arthura Denta.',
    'projects.hitchhikers_guide.date': 'Přečteno: 2023',

    'projects.handmaids_tale.title': 'Příběh služebnice',
    'projects.handmaids_tale.desc': 'Dystopický román Margaret Atwoodové o Gileádu, totalitním státě blízké budoucnosti, který si podmaňuje ženy.',
    'projects.handmaids_tale.date': 'Přečteno: 2023',

    'projects.to_kill_a_mockingbird.title': 'Jako zabít ptáčka',
    'projects.to_kill_a_mockingbird.desc': 'Klasický román Harper Leeové zkoumající rasovou nespravedlnost, čest a ztrátu nevinnosti na americkém Jihu.',
    'projects.to_kill_a_mockingbird.date': 'Přečteno: 2022',

    'projects.ten_rules_for_life.title': '12 pravidel pro život',
    'projects.ten_rules_for_life.desc': 'Bestseller Jordana Petersona nabízející praktickou moudrost a psychologická pravidla pro budování osobního řádu.',
    'projects.ten_rules_for_life.date': 'Přečteno: 2024',

    'projects.beyond_order.title': 'Řád není všechno: 12 dalších pravidel',
    'projects.beyond_order.desc': 'Pokračování od Jordana Petersona nabízející dvanáct dalších principů k vyvážení kreativní změny a osobní struktury.',
    'projects.beyond_order.date': 'Přečteno: 2024',

    'projects.why_we_sleep.title': 'Proč spíme',
    'projects.why_we_sleep.desc': 'Fascinující zkoumání Matthew Walkera o zásadním vědeckém významu spánku a snění.',
    'projects.why_we_sleep.date': 'Přečteno: 2024',

    'projects.structures_why_things_dont_fall.title': 'Struktury: Anebo proč věci nespadnou',
    'projects.structures_why_things_dont_fall.desc': 'Brilantní a srozumitelný úvod J. E. Gordona do strojírenských principů strukturálního designu.',
    'projects.structures_why_things_dont_fall.date': 'Přečteno: 2024',

    'projects.stiff_cadavers.title': 'Stiff: Podivuhodné životy lidských mrtvol',
    'projects.stiff_cadavers.desc': 'Humorný a hluboce vzdělávací pohled Mary Roachové na přínos lidských těl vědě a historii.',
    'projects.stiff_cadavers.date': 'Přečteno: 2023',

    'projects.rich_dad_poor_dad.title': 'Bohatý táta, chudý táta',
    'projects.rich_dad_poor_dad.desc': 'Klasická kniha o osobních financích od Roberta Kiyosakiho popisující rozdílné uvažování o penězích, aktivech a investicích.',
    'projects.rich_dad_poor_dad.date': 'Přečteno: 2023',

    'projects.modern_computer_graphics.title': 'Moderní počítačová grafika',
    'projects.modern_computer_graphics.desc': 'Ucelená česká učebnice (Žára, Beneš, Felkel) vysvětlující matematiku, geometrii a algoritmy vykreslování.',
    'projects.modern_computer_graphics.date': 'Přečteno: 2025',

    'projects.fahrenheit_451.title': '451 stupňů Fahrenheita',
    'projects.fahrenheit_451.desc': 'Dystopická klasika Raye Bradburyho líčící budoucí společnost, v níž jsou knihy zakázány a systematicky páleny.',
    'projects.fahrenheit_451.date': 'Přečteno: 2022',

    'projects.antigone.title': 'Antigona',
    'projects.antigone.desc': 'Sofoklova klasická řecká tragédie zkoumající morální konflikt mezi světskými zákony a božskou či rodinnou povinností.',
    'projects.antigone.date': 'Přečteno: 2021',

    'projects.divine_comedy.title': 'Božská komedie',
    'projects.divine_comedy.desc': 'Epická báseň Dante Alighieriho popisující cestu duše Peklem, Očistcem a Rájem.',
    'projects.divine_comedy.date': 'Přečteno: 2022',

    'projects.day_of_the_jackal.title': 'Den pro Šakala',
    'projects.day_of_the_jackal.desc': 'Napínavý thriller Fredericka Forsytha líčící plán profesionálního atentátníka na zavraždění Charlese de Gaulla.',
    'projects.day_of_the_jackal.date': 'Přečteno: 2023',

    'projects.diary_of_anne_frank.title': 'Deník Anny Frankové',
    'projects.diary_of_anne_frank.desc': 'Dojemný skutečný deník, který si psala Anne Franková během skrývání před nacistickou okupací v Amsterdamu.',
    'projects.diary_of_anne_frank.date': 'Přečteno: 2022',

    'projects.animal_farm.title': 'Farma zvířat',
    'projects.animal_farm.desc': 'Satirická alegorická novela George Orwella odhalující korupci revolučních ideálů a totalitarismus.',
    'projects.animal_farm.date': 'Přečteno: 2022',

    'projects.ivanhoe.title': 'Ivanhoe',
    'projects.ivanhoe.desc': 'Historický román Sira Waltera Scotta zobrazující středověké rytířství, křížové výpravy a konflikty v Anglii 12. století.',
    'projects.ivanhoe.date': 'Přečteno: 2022',

    'projects.brave_new_world.title': 'Konec civilizace (Brave New World)',
    'projects.brave_new_world.desc': 'Dystopické mistrovské dílo Aldouse Huxleyho líčící vysoce inženýrskou, konzumní a bezbolestnou budoucí společnost.',
    'projects.brave_new_world.date': 'Přečteno: 2023',

    'projects.krakatit.title': 'Krakatit',
    'projects.krakatit.desc': 'Román Karla Čapka varující před ničivým nebezpečím nově vynalezené ničivé třaskaviny.',
    'projects.krakatit.date': 'Přečteno: 2022',

    'projects.ku_klux_klan.title': 'Ku-klux-klan: Tady bydlí láska',
    'projects.ku_klux_klan.desc': 'Dokumentární reportáž Katarzyny Surmiak-Domańské zkoumající moderní členy a ideologii KKK.',
    'projects.ku_klux_klan.date': 'Přečteno: 2023',

    'projects.butterball.title': 'Kulička',
    'projects.butterball.desc': 'Slavná povídka Guy de Maupassanta zasazená do prusko-francouzské války, satirizující měšťácké pokrytectví.',
    'projects.butterball.date': 'Přečteno: 2022',

    'projects.a_bouquet.title': 'Kytice',
    'projects.a_bouquet.desc': 'Klasická sbírka balad Karla Jaromíra Erbena plná mytologie, morálních kodexů a temných témat.',
    'projects.a_bouquet.date': 'Přečteno: 2021',

    'projects.the_miser.title': 'Lakomec',
    'projects.the_miser.desc': 'Klasická satirická komedie Molièra zobrazující chamtivého Harpagona a jeho komické spory s dětmi.',
    'projects.the_miser.date': 'Přečteno: 2021',

    'projects.the_little_prince.title': 'Malý princ',
    'projects.the_little_prince.desc': 'Filosofická pohádka Antoina de Saint-Exupéryho o přátelství, lásce a důležitých věcech neviditelných očím.',
    'projects.the_little_prince.date': 'Přečteno: 2020',

    'projects.prayer_for_katerina_horovitzova.title': 'Modlitba pro Kateřinu Horovitzovou',
    'projects.prayer_for_katerina_horovitzova.desc': 'Dramatická novela Arnošta Lustiga zobrazující židovské rukojmí vyjednávající s nacisty během druhé světové války, ukazující důstojnost v bezmoci.',
    'projects.prayer_for_katerina_horovitzova.date': 'Přečteno: 2022',

    'projects.all_quiet_on_western_front.title': 'Na západní frontě klid',
    'projects.all_quiet_on_western_front.desc': 'Protiválečné mistrovské dílo Ericha Maria Remarqua popisující extrémní fyzický a duševní tlak vojáků za 1. světové války.',
    'projects.all_quiet_on_western_front.date': 'Přečteno: 2022',

    'projects.lord_of_the_rings.title': 'Pán prstenů',
    'projects.lord_of_the_rings.desc': 'Epické high-fantasy mistrovské dílo J. R. R. Tolkiena sledující výpravu za zničením Jednoho prstenu.',
    'projects.lord_of_the_rings.date': 'Přečteno: 2023',

    'projects.persepolis.title': 'Persepolis',
    'projects.persepolis.desc': 'Autobiografický komiks Marjane Satrapiové popisující její dětství a dospívání v Íránu během islámské revoluce.',
    'projects.persepolis.date': 'Přečteno: 2023',

    'projects.hound_of_the_baskervilles.title': 'Pes baskervillský',
    'projects.hound_of_the_baskervilles.desc': 'Klasický detektivní román Arthura Conana Doylea o Sherlocku Holmesovi vyšetřujícím legendární nadpřirozenou bestii.',
    'projects.hound_of_the_baskervilles.date': 'Přečteno: 2022',

    'projects.tales_of_the_little_quarter.title': 'Povídky malostranské',
    'projects.tales_of_the_little_quarter.desc': 'Humorné a satirické povídky Jana Nerudy zachycující život v 19. století na pražské Malé Straně.',
    'projects.tales_of_the_little_quarter.date': 'Přečteno: 2021',

    'projects.change_kafka.title': 'Proměna',
    'projects.change_kafka.desc': 'Absurdní a tragická povídka Franze Kafky o Řehoři Samsovi, který se jednoho dne probudí proměněný v obří hmyz.',
    'projects.change_kafka.date': 'Přečteno: 2021',

    'projects.r_u_r.title': 'R.U.R.',
    'projects.r_u_r.desc': 'Průlomová sci-fi divadelní hra Karla Čapka, která dala světu slovo „robot“ a zkoumala umělý život.',
    'projects.r_u_r.date': 'Přečteno: 2021',

    'projects.robinson_crusoe.title': 'Robinson Crusoe',
    'projects.robinson_crusoe.desc': 'Klasický dobrodružný román Daniela Defoe o 28 letech přežívání trosečníka na opuštěném ostrově.',
    'projects.robinson_crusoe.date': 'Přečteno: 2021',

    'projects.romeo_and_juliet.title': 'Romeo a Julie',
    'projects.romeo_and_juliet.desc': 'Nadčasová tragédie Williama Shakespeara o dvou mladých milencích ze znepřátelených rodů.',
    'projects.romeo_and_juliet.date': 'Přečteno: 2021',

    'projects.saturnin.title': 'Saturnin',
    'projects.saturnin.desc': 'Oblíbený český humoristický román Zdeňka Jirotky o excentrickém sluhovi, který mění všední život v dobrodružství.',
    'projects.saturnin.date': 'Přečteno: 2022',

    'projects.great_gatsby.title': 'Velký Gatsby',
    'projects.great_gatsby.desc': 'Román F. Scotta Fitzgeralda zkoumající bohatství, lásku a rozčarování z amerického snu v bouřlivých dvacátých letech.',
    'projects.great_gatsby.date': 'Přečteno: 2023',

    'projects.merry_wives_of_windsor.title': 'Veselé paničky windsorské',
    'projects.merry_wives_of_windsor.desc': 'Komedie Williama Shakespeara o kouscích Sira Johna Falstaffa a chytrých paniček.',
    'projects.merry_wives_of_windsor.date': 'Přečteno: 2021',

    'projects.murder_on_orient_express.title': 'Vražda v Orient expresu',
    'projects.murder_on_orient_express.desc': 'Slavný detektivní román Agathy Christie, v němž Hercule Poirot řeší složitou vraždu ve vlaku.',
    'projects.murder_on_orient_express.date': 'Přečteno: 2022',

    'projects.cowards_skvorecky.title': 'Zbabělci',
    'projects.cowards_skvorecky.desc': 'Román Josefa Škvoreckého sledující skupinu jazzových mladíků během chaotických posledních dnů 2. světové války.',
    'projects.cowards_skvorecky.date': 'Přečteno: 2022',

    'projects.crime_and_punishment.title': 'Zločin a trest',
    'projects.crime_and_punishment.desc': 'Psychologické mistrovské dílo Fjodora Dostojevského zkoumající Raskolnikovovo morální dilema, vraždu a vykoupení.',
    'projects.crime_and_punishment.date': 'Přečteno: 2023',

    'projects.i_robot.title': 'Já, robot',
    'projects.i_robot.desc': 'Sbírka sci-fi povídek Isaaca Asimova zkoumajících interakce mezi lidmi, roboty a třemi zákony robotiky.',
    'projects.i_robot.date': 'Přečteno: 2023',

    'projects.study_in_scarlet.title': 'Studie v šarlatové',
    'projects.study_in_scarlet.desc': 'Román Arthura Conana Doylea, který světu představil legendární partnerství Sherlocka Holmese a Dr. Watsona.',
    'projects.study_in_scarlet.date': 'Přečteno: 2022',

    'projects.become_investor.title': 'Stát se investorem',
    'projects.become_investor.desc': 'Průvodce hodnotovým investováním, psychologií trhu a správou portfolia od Mikuláše Splítka.',
    'projects.become_investor.date': 'Přečteno: 2024',

    'projects.sport_is_pain.title': 'Sport je bolest',
    'projects.sport_is_pain.desc': 'Pohled na to, jak vytrvalostní sporty testují mentální odolnost, disciplínu a osobní limity.',
    'projects.sport_is_pain.date': 'Přečteno: 2023',

    'projects.fault_in_our_stars.title': 'Hvězdy nám nepřály',
    'projects.fault_in_our_stars.desc': 'Populární román Johna Greena zobrazující emotivní a romantickou cestu dvou dospívajících onkologických pacientů.',
    'projects.fault_in_our_stars.date': 'Přečteno: 2022',

    'projects.ai_modern_approach.title': 'Umělá inteligence: Moderní přístup',
    'projects.ai_modern_approach.desc': 'Přední světová učebnice o AI pokrývající prohledávání, logiku, strojové učení a architektury neuronových sítí.',
    'projects.ai_modern_approach.date': 'Čtu právě teď',

    'projects.flowers_for_algernon.title': 'Růže pro Algernon',
    'projects.flowers_for_algernon.desc': 'Dojemný sci-fi román Daniela Keyese o mentálně postiženém muži, který podstoupí experimentální operaci ke zvýšení inteligence.',
    'projects.flowers_for_algernon.date': 'Přečteno: 2023',

    'projects.contact_sagan.title': 'Kontakt',
    'projects.contact_sagan.desc': 'Vědecko-fantastický román Carla Sagana zkoumající první kontakt lidstva s mimozemskou inteligencí.',
    'projects.contact_sagan.date': 'Přečteno: 2023',

    'projects.safehold_series.title': 'Série Safehold',
    'projects.safehold_series.desc': 'Rozsáhlá vojenská sci-fi série Davida Webera líčící lidstvo obnovující technologie na skrytém světě.',
    'projects.safehold_series.date': 'Přečteno: 2024',

    'projects.children_of_time.title': 'Děti času',
    'projects.children_of_time.desc': 'Oceněný sci-fi román Adriana Tchaikovského popisující evoluci pavoučí civilizace na teraformované planetě.',
    'projects.children_of_time.date': 'Přečteno: 2024',

    'projects.rocket_propulsion_elements.title': 'Rocket Propulsion Elements',
    'projects.rocket_propulsion_elements.desc': 'Definitivní průvodce raketovým inženýrstvím od George Suttona pokrývající konstrukci motorů na kapalná i pevná paliva.',
    'projects.rocket_propulsion_elements.date': 'Čtu právě teď',

    // YouTube Channels
    'projects.three_blue_one_brown.title': '3Blue1Brown',
    'projects.three_blue_one_brown.desc': 'Vizuální matematika vysvětlující složitá témata v lineární algebře, kalkulu, neuronových sítích a fyzice pomocí animací.',
    'projects.three_blue_one_brown.date': 'Doporučeno',

    'projects.mark_rober.title': 'Mark Rober',
    'projects.mark_rober.desc': 'Kreativní inženýrství a vědecké experimenty prezentované bývalým inženýrem NASA, ukazující fyziku, mechaniku a design.',
    'projects.mark_rober.date': 'Doporučeno',

    'projects.veritasium.title': 'Veritasium',
    'projects.veritasium.desc': 'Úžasný vědecký kanál přinášející experimenty hledající pravdu, rozhovory s odborníky a protiintuitivní fyzikální koncepty.',
    'projects.veritasium.date': 'Doporučeno',

    'projects.stuff_made_here.title': 'Stuff Made Here',
    'projects.stuff_made_here.desc': 'Kanál o stavbě šíleně složitých mechanických součástí, vlastních strojů, robotů a jejich programování k řešení obtížných úkolů.',
    'projects.stuff_made_here.date': 'Doporučeno',

    'projects.nikhil_kamath.title': 'Nikhil Kamath',
    'projects.nikhil_kamath.desc': 'Podnětné podcasty a diskuse o byznysu, ekonomice a podnikání s lídry v oboru.',
    'projects.nikhil_kamath.date': 'Doporučeno',

    'projects.ivysilani.title': 'iVysílání',
    'projects.ivysilani.desc': 'Online videoarchiv České televize, nabízející širokou škálu dokumentů, zpráv a kulturních pořadů.',
    'projects.ivysilani.date': 'Doporučeno',

    'projects.andy_guitar.title': 'Andy Guitar',
    'projects.andy_guitar.desc': 'Vynikající kytarové lekce krok za krokem pro začátečníky i pokročilé hráče.',
    'projects.andy_guitar.date': 'Doporučeno',

    'projects.herdyn.title': 'Herdyn',
    'projects.herdyn.desc': 'Populární český herní streamer, let\'s player a bavič.',
    'projects.herdyn.date': 'Doporučeno',

    'projects.mit_ocw.title': 'MIT OpenCourseWare',
    'projects.mit_ocw.desc': 'Bezplatné, vysoce kvalitní záznamy přednášek a výukové materiály z kurzů MIT.',
    'projects.mit_ocw.date': 'Doporučeno',

    'projects.revision_village.title': 'Revision Village',
    'projects.revision_village.desc': 'Špičkový zdroj pro přípravu na IB matematiku, obsahující video řešení a cvičné zkoušky.',
    'projects.revision_village.date': 'Doporučeno',

    'projects.cvutfel.title': 'CVUTFEL',
    'projects.cvutfel.desc': 'Oficiální kanál Fakulty elektrotechnické ČVUT v Praze, představující výzkum a přednášky.',
    'projects.cvutfel.date': 'Doporučeno',

    'projects.jaderka.title': 'Jaderka [fjfi]',
    'projects.jaderka.desc': 'Fakulta jaderná a fyzikálně inženýrská ČVUT v Praze, sdílející vědecké přednášky a akce.',
    'projects.jaderka.date': 'Doporučeno',

    'projects.kapitalista.title': 'Kapitalista',
    'projects.kapitalista.desc': 'Český vzdělávací kanál zaměřený na investování, finance a finanční gramotnost.',
    'projects.kapitalista.date': 'Doporučeno',

    'projects.steve_mould.title': 'Steve Mould',
    'projects.steve_mould.desc': 'Zábavné a poutavé vědecké experimenty vysvětlující principy fyziky a chemie v každodenním životě.',
    'projects.steve_mould.date': 'Doporučeno',

    'projects.online_ucitel.title': 'Online Učitel',
    'projects.online_ucitel.desc': 'Český vzdělávací kanál pomáhající studentům porozumět školní matematice a přírodovědným předmětům.',
    'projects.online_ucitel.date': 'Doporučeno',

    'projects.learntube.title': 'LearnTube.cz',
    'projects.learntube.desc': 'Česká platforma poskytující online kurzy programování, marketingu a sebarozvoje.',
    'projects.learntube.date': 'Doporučeno',

    'projects.artem_kirsanov.title': 'Artem Kirsanov',
    'projects.artem_kirsanov.desc': 'Vizuálně úchvatná videa o neurovědě, kognitivní vědě a komplexních systémech.',
    'projects.artem_kirsanov.date': 'Doporučeno',

    'projects.real_engineering.title': 'Real Engineering',
    'projects.real_engineering.desc': 'Detailní animované rozbory milníků strojírenství, stavebnictví a letectví.',
    'projects.real_engineering.date': 'Doporučeno',

    'projects.scott_manley.title': 'Scott Manley',
    'projects.scott_manley.desc': 'Vesmírná věda, orbitální mechanika a raketové technologie vysvětlené astrofyzikem.',
    'projects.scott_manley.date': 'Doporučeno',

    'projects.gal_lahat.title': 'Gal Lahat',
    'projects.gal_lahat.desc': 'Informativní videa analyzující softwarové inženýrství, návrh systémů a tipy pro kariéru v kódování.',
    'projects.gal_lahat.date': 'Doporučeno',

    'projects.alexander_amini.title': 'Alexander Amini',
    'projects.alexander_amini.desc': 'Přednášející kurzu MIT Introduction to Deep Learning (6.S191), sdílející špičkový výzkum v oblasti AI.',
    'projects.alexander_amini.date': 'Doporučeno',

    'projects.ai_explained.title': 'AI Explained',
    'projects.ai_explained.desc': 'Jasná a hloubková analýza nejnovějších pokroků, vědeckých prací a modelů v oblasti umělé inteligence.',
    'projects.ai_explained.date': 'Doporučeno',

    'projects.aleph_zero.title': 'Aleph 0',
    'projects.aleph_zero.desc': 'Krásné vizualizace matematiky a vysvětlení náročných matematických rovnic.',
    'projects.aleph_zero.date': 'Doporučeno',

    'projects.efficient_engineer.title': 'The Efficient Engineer',
    'projects.efficient_engineer.desc': 'Jasné vizualizace konceptů strojírenství, jako je analýza napětí a termodynamika.',
    'projects.efficient_engineer.date': 'Doporučeno',

    'projects.cgp_grey.title': 'CGP Grey',
    'projects.cgp_grey.desc': 'Humorná a velmi podrobná animovaná vysvětlení politiky, geografie a historie.',
    'projects.cgp_grey.date': 'Doporučeno',

    'projects.quanta_magazine.title': 'Quanta Magazine',
    'projects.quanta_magazine.desc': 'Veřejnoprávní vědecká žurnalistika pokrývající průlomy v matematice, fyzice a informatice.',
    'projects.quanta_magazine.date': 'Doporučeno',

    'projects.lemmino.title': 'LEMMiNO',
    'projects.lemmino.desc': 'Mistrovsky sestříhaná dokumentární videa zkoumající záhady, vesmír a historii.',
    'projects.lemmino.date': 'Doporučeno',

    'projects.andrej_karpathy.title': 'Andrej Karpathy',
    'projects.andrej_karpathy.desc': 'Vynikající hloubkové programovací tutoriály o neuronových sítích a stavbě GPT modelů od nuly.',
    'projects.andrej_karpathy.date': 'Doporučeno',

    'projects.integza.title': 'Integza',
    'projects.integza.desc': 'Stavba a 3D tisk vlastních raketových motorů, proudových motorů a experimentálních turbín.',
    'projects.integza.date': 'Doporučeno',

    'projects.bps_space.title': 'BPS.space',
    'projects.bps_space.desc': 'Navrhování, stavba a starty modelů raket s řízeným vektorem tahu a naváděcími počítači.',
    'projects.bps_space.date': 'Doporučeno',

    'projects.sebastian_lague.title': 'Sebastian Lague',
    'projects.sebastian_lague.desc': 'Neuvěřitelná dobrodružství při kódování, vývoj her, simulace a programování grafiky.',
    'projects.sebastian_lague.date': 'Doporučeno',

    'projects.hyperplexed.title': 'Hyperplexed',
    'projects.hyperplexed.desc': 'Skvělé tutoriály o webdesignu, CSS masterclasses a předělávání kreativních rozvržení.',
    'projects.hyperplexed.date': 'Doporučeno',

    'projects.jirka_vysvetluje.title': 'Jirka vysvětluje věci',
    'projects.jirka_vysvetluje.desc': 'Český dokumentární kanál vysvětlující různá zajímavá témata o historii, společnosti a technologiích.',
    'projects.jirka_vysvetluje.date': 'Doporučeno',

    'projects.everyday_astronaut.title': 'Everyday Astronaut',
    'projects.everyday_astronaut.desc': 'Hloubkové letectví a zpravodajství o starttech raket SpaceX, NASA a dalších světových agentur.',
    'projects.everyday_astronaut.date': 'Doporučeno',

    'projects.vsauce.title': 'Vsauce',
    'projects.vsauce.desc': 'Fascinující filozofické a vědecké otázky zkoumané Michaelem Stevensem.',
    'projects.vsauce.date': 'Doporučeno',

    'projects.smarter_every_day.title': 'SmarterEveryDay',
    'projects.smarter_every_day.desc': 'Zkoumání světa pomocí vědy, inženýrství a ultra-vysokorychlostní fotografie.',
    'projects.smarter_every_day.date': 'Doporučeno',

    'projects.bycloud.title': 'bycloud',
    'projects.bycloud.desc': 'Dokumentární animace a příběhy o historii počítačů a hardwarovém inženýrství.',
    'projects.bycloud.date': 'Doporučeno',

    // Book Analysis general translations
    'analysis.back_to_library': 'Zpět do Showcase',
    'analysis.section_summary': 'Shrnutí',
    'analysis.section_takeaways': 'Klíčové poznatky',
    'analysis.section_action': 'Moje akční kroky',

    // Book Analysis: Atomic Habits
    'analysis.atomic-habits.title': 'Atomové návyky',
    'analysis.atomic-habits.author': 'James Clear',
    'analysis.atomic-habits.rating': '5 / 5',
    'analysis.atomic-habits.date': 'Přečteno: Leden 2024',
    'analysis.atomic-habits.summary': 'Tato kniha je plánem pro budování trvalých návyků. James Clear představuje koncept atomových návyků – malých, rutinních chování, která se časem sčítají a přinášejí obrovské výsledky. Místo stanovení velkých cílů, kterých je obtížné dosáhnout a udržet je, Clear tvrdí, že bychom se měli zaměřit na systémy, které k těmto cílům vedou. Tím, že v našem chování uděláme 1% denní zlepšení, můžeme dosáhnout transformačních změn v průběhu měsíců a let.',
    'analysis.atomic-habits.takeaways': '1. Zaměřte se na systémy, ne na cíle: Cíle vám říkají, čeho chcete dosáhnout, ale systémy jsou procesy, které k těmto výsledkům vedou. Systém je to, co činí pokrok udržitelným.\n2. Budujte návyky založené na identitě: Chcete-li trvale změnit své chování, změňte nejprve svou identitu. Zaměřte se na to, kým se chcete stát, ne na to, čeho chcete dosáhnout (např. "jsem programátor" spíše než "chci napsat knihu").\n3. Čtyři zákony změny chování:\n   - Podnět: Udělejte to zřejmé.\n   - Touha: Udělejte to přitažlivé.\n   - Reakce: Udělejte to snadné.\n   - Odměna: Udělejte to uspokojivé.\n4. Navrhněte své prostředí: Začleňte podněty do svého okolí, abyste spustili dobré návyky (např. položte si na polštář knihu ke čtení před spaním).',
    'analysis.atomic-habits.action': '1. Návrh prostředí: Umístím své úkoly z fyziky a výkresy ze strojírenství přímo na stůl na začátku každého dne, aby bylo zahájení práce "zřejmé" a bez zbytečného tření.\n2. Vrstvení návyků: Ihned po příchodu domů ze školy (stávající návyk) strávím 15 minut procházením svých návrhů CAD (nový návyk).\n3. Pravidlo 2 minut: Při zahájení nového obtížného projektu omezím úvodní relaci na pouhé 2 minuty (např. stačí otevřít Fusion 360 a uložit nový soubor), abych vybudoval konzistenci bez pocitu přetížení.',

    // Book Analysis: Clean Code
    'analysis.clean-code.title': 'Čistý kód',
    'analysis.clean-code.author': 'Robert C. Martin',
    'analysis.clean-code.rating': '4.5 / 5',
    'analysis.clean-code.date': 'Přečteno: Březen 2025',
    'analysis.clean-code.summary': 'Čistý kód je příručka pro programátory, kteří chtějí zlepšit své řemeslo. Robert C. Martin (Uncle Bob) představuje standardy kódování a postupy, díky nimž je kód čistý, čitelný a snadno udržovatelný. Tvrdí, že psaní kódu je jako psaní příběhu: čtenář by mu měl snadno porozumět. Zdůrazňuje, že náklady na čtení špatného kódu jsou mnohem vyšší než náklady na napsání čistého kódu hned napoprvé, a popisuje techniky refaktoringu pro transformaci neuspořádaného kódu na čisté struktury.',
    'analysis.clean-code.takeaways': '1. Výstižné názvy: Vybírejte názvy, které odhalují záměr. Název proměnné, třídy nebo funkce by měl říkat, proč existuje, co dělá a jak se používá.\n2. Funkce by měly být malé: Funkce by měly dělat pouze jednu věc a měly by ji dělat dobře. Měly by mít velmi málo argumentů (nejlépe žádný nebo jeden).\n3. Neopakujte se (DRY): Duplicita je kořenem všeho softwarového zla. Extrahujte opakující se kód do sdílených nástrojů nebo tříd.\n4. Komentujte pouze to, co kód nedokáže vyjádřit sám: Dobrý kód je samovysvětlující. Komentáře používejte pouze k vysvětlení návrhových rozhodnutí nebo technických varování, nikoli k vysvětlení špatného kódu, který by měl být jednoduše refaktorován.',
    'analysis.clean-code.action': '1. Pravidlo skautů: Vždy nechte kód o něco čistší, než jsem ho našel, když pracuji na svém portfoliu nebo školních úkolech.\n2. Refaktoring funkcí: Zajistím, aby každá funkce, kterou napíšu, měla méně než 20 řádků a dodržovala princip jediné odpovědnosti (SRP).\n3. Kontrola názvů: Strávím o 30 sekund více přemýšlením o správném pojmenování proměnných/komponent ve svých projektech, abych zlepšil čitelnost pro přispěvatele open-source.',

    // Footer Section
    'footer.contact': 'Kontaktujte mě',
    'footer.rights': 'Všechna práva vyhrazena.',
    'footer.designed_by': 'Navrhl a vytvořil Stanislav Růžička'
  }
};
