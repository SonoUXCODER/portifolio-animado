/* -------------------------------------------------------------------------
   Os projetos. Nada de conteúdo preso em componente: a home, as páginas
   /work/[slug], o sitemap e a metadata leem tudo daqui.

   A ordem do array é a ordem da seção, e o número de cada projeto sai do
   índice — não existe campo `num`. Inserir um projeto no meio renumera os
   outros sozinho.

   >>> SOBRE O `system` <<<
   As paletas não são inventadas: cada hex foi lido do CSS que está no ar
   naquele domínio. Um estudo de caso que mostra uma cor que o site não usa
   é a primeira coisa que um contratante confere e a única que ele precisa
   conferir. Ao trocar um projeto, leia os valores do projeto — não escolha
   valores que combinem com esta página.

   `layout` decide a composição na listagem, e é ele que impede a seção de
   virar grade — nenhuma entrada tem a proporção da anterior:
     wide    -> chapa larga, sangrando, texto embaixo
     offset  -> texto à esquerda, chapa menor deslocada à direita
     tall    -> print vertical comprido, texto ao lado
     split   -> duas chapas montadas em alturas diferentes
   ------------------------------------------------------------------------- */

export type ProjectLayout = 'wide' | 'offset' | 'tall' | 'split';

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** legenda curta, ao lado da imagem */
  caption?: string;
};

export type ApproachStep = {
  /** o nome da etapa como ela aparece no estudo — Research, UI Design… */
  step: string;
  title: string;
  text: string;
};

export type DesignSystem = {
  palette: { name: string; hex: string }[];
  type: { role: string; family: string; note: string }[];
  components: string[];
  grid: string;
  spacing: string;
};

export type Project = {
  title: string;
  slug: string;
  /** o que a coisa é — vira `DIGITAL PRODUCT / 2026` no topo do estudo */
  kind: string;
  year: string;
  /** uma linha, na listagem */
  summary: string;
  /** parágrafo de abertura do estudo de caso */
  intro: string;
  /** as frentes que couberam a mim — `UX/UI — FRONTEND — FULL-STACK` */
  disciplines: string[];
  role: string[];
  stack: string[];
  cover: Media;
  gallery: Media[];
  /** o endereço no ar, quando existe */
  live: string | null;
  github: string | null;
  /** carimbo curto: client work, own product */
  badge: string;
  layout: ProjectLayout;
  /**
   * A observação em minúscula que aparece junto da entrada.
   *
   * Não é resumo nem argumento de venda — para isso já existem `summary` e
   * `challenge`. É a coisa que só quem construiu saberia dizer: o que quase
   * deu errado, o que mudou de ideia no meio. Uma linha, sempre. É o que
   * impede a listagem de virar catálogo.
   */
  note: string;
  challenge: string;
  approach: ApproachStep[];
  system: DesignSystem;
  outcome: string[];
};

export const projects: Project[] = [
  {
    title: 'PHOBIACORI',
    slug: 'phobiacori',
    kind: 'E-commerce / Digital Product',
    year: '2026',
    badge: 'Client work',
    summary: 'A store for an ink illustrator. Small runs, no warehouse, no checkout account.',
    intro:
      'PHOBIACORI has been drawing strange creatures in ink since 2019 and selling them one direct message at a time. The store had to fit that way of working: small runs, packed by hand, nothing resembling a conveyor belt.',
    note: 'the cart lives in the visitor’s browser. no account, no sign-up, no database.',
    disciplines: ['ART DIRECTION', 'UX/UI', 'FRONTEND'],
    role: ['Art direction', 'UI design', 'Frontend', 'Content architecture', 'Deployment'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Static Export'],
    layout: 'wide',
    cover: {
      src: '/assets/projetos/phobia-cover.webp',
      alt: 'PHOBIACORI home page, with ink drawings taped to a paper background',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/phobia-long.webp',
        alt: 'Full PHOBIACORI page, from the cover down to the footer, store and archive together',
        width: 1400,
        height: 4400,
        caption: 'Store and archive on the same page',
      },
      {
        src: '/assets/projetos/phobia-cover.webp',
        alt: 'Detail of the store header, with the menu and the cart counter',
        width: 3150,
        height: 1969,
        caption: 'Ink, xerox and stubbornness',
      },
    ],
    live: 'https://sonouxcoder.github.io/phobiacore/',
    github: null,
    challenge:
      'Selling art in small runs has nothing to do with running a generic shop. The catalogue changes every week, half the pieces are one of a kind, and a marketplace layout made her work look like factory stock. On top of that: no budget for a backend, and no appetite for a platform that takes a cut of every sale.',
    approach: [
      {
        step: 'Research',
        title: 'Reading two years of direct messages',
        text: 'Before any interface, I read how she was already selling. Buyers never asked for a size chart — they asked whether the piece was still available and how it would be packed. That single finding decided the whole information hierarchy.',
      },
      {
        step: 'UX Strategy',
        title: 'A catalogue, not a shop window',
        text: 'Each piece became a record card: the drawing large, the text next to it, availability stated in plain language. Buying is three taps and never asks who you are — the cart lives in local storage and the order leaves as a written message.',
      },
      {
        step: 'Wireframes',
        title: 'One page, two jobs',
        text: 'Store and archive share a single scroll. Splitting them into separate routes tested worse: people came to look, and only decided to buy after looking. Sold-out work stays visible as archive instead of disappearing.',
      },
      {
        step: 'UI Design',
        title: 'Photocopy, tape, ink',
        text: 'The interface borrows the material language of the work itself — paper white, ink black, one red for alerts. Nothing is centred, nothing is rounded, and every image sits slightly off the grid on purpose.',
      },
      {
        step: 'Development',
        title: 'Static, and therefore permanent',
        text: 'Next.js with a static export on GitHub Pages. There is no server to go down, no monthly bill, and no database to migrate. The product list is a typed data file she edits herself.',
      },
    ],
    system: {
      palette: [
        { name: 'Ink', hex: '#0B0A09' },
        { name: 'Paper', hex: '#F4F0E6' },
        { name: 'Newsprint', hex: '#E6E0D2' },
        { name: 'Alert red', hex: '#B8352A' },
        { name: 'Ochre', hex: '#D9A520' },
      ],
      type: [
        { role: 'Display', family: 'Archivo Black', note: 'Poster weight, used at three sizes only' },
        { role: 'Technical', family: 'Space Mono', note: 'Prices, stock state, order numbers' },
        { role: 'Text', family: 'Inter', note: 'Descriptions and shipping copy' },
      ],
      components: ['Piece card', 'Cart drawer', 'Availability tag', 'Taped figure', 'Order composer'],
      grid: '12 columns, 24px gutter, 1180px max — pieces break the grid by design',
      spacing: '4 / 8 / 16 / 32 / 64 — one scale, no loose values',
    },
    outcome: [
      'She updates the catalogue without calling me',
      'Sold-out work leaves the shelf on its own',
      'Zero running cost: no server, no platform fee',
    ],
  },

  {
    title: 'knifes.me',
    slug: 'knifes-me',
    kind: 'SaaS / Own Product',
    year: '2026',
    badge: 'Own product',
    summary: 'My product: a link-in-bio where the page actually belongs to the person.',
    intro:
      'I started it because every link-in-bio tool looked like the same page wearing a different colour. Here the person picks the palette, the background, the music and the layout — and the result still reads as theirs, not as the template’s.',
    note: 'the hard part was never building. it was deciding what not to build.',
    disciplines: ['PRODUCT', 'UX/UI', 'FULL-STACK'],
    role: ['Product', 'UI design', 'Frontend', 'Backend', 'Database', 'Subscriptions'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    layout: 'tall',
    cover: {
      src: '/assets/projetos/knifes-long.webp',
      alt: 'A knifes.me profile page, top to bottom',
      width: 1400,
      height: 4400,
    },
    gallery: [
      {
        src: '/assets/projetos/knifes-cover.webp',
        alt: 'knifes.me editor screen, with the live preview beside the controls',
        width: 3150,
        height: 1969,
        caption: 'Change it here, see it immediately',
      },
      {
        src: '/assets/projetos/knifes-long.webp',
        alt: 'A complete profile generated by knifes.me',
        width: 1400,
        height: 4400,
        caption: 'knifes.me/yourname',
      },
    ],
    live: 'https://knifes.me/',
    github: 'https://github.com/SonoUXCODER',
    challenge:
      'Real customisation is expensive in performance: every new theme becomes more CSS shipped to someone who only wanted to tap a link. The product had to let people change almost everything without making the public page slower for the visitor who changes nothing.',
    approach: [
      {
        step: 'Research',
        title: 'Where the existing tools stop',
        text: 'I catalogued what competing products let people change, and where they hard-stop. The wall is always the same: colour yes, structure no. Structure is exactly what makes a page look like someone.',
      },
      {
        step: 'UX Strategy',
        title: 'Editor for the owner, nothing for the visitor',
        text: 'The two audiences never share code. The owner gets a live editor behind auth; the visitor gets a server-rendered page with no editor bundle, no framework state and no client-side theme resolution.',
      },
      {
        step: 'Wireframes',
        title: 'Preview beside the control, always',
        text: 'Every control sits next to the thing it changes, and the preview is the real page — not an approximation of it. Nothing to publish, nothing to confirm: the save is the deploy.',
      },
      {
        step: 'UI Design',
        title: 'A dark chrome that disappears',
        text: 'The interface is deliberately near-monochrome so it never competes with the page being built inside it. The single violet accent marks state and nothing else.',
      },
      {
        step: 'Development',
        title: 'The theme is data, not code',
        text: 'A theme is a handful of CSS custom properties stored as a row. The public profile renders on the server with those values already inlined — so a new theme costs bytes in a database, not kilobytes in a bundle.',
      },
    ],
    system: {
      palette: [
        { name: 'Void', hex: '#050507' },
        { name: 'Plum', hex: '#1B0A33' },
        { name: 'Signal violet', hex: '#A94DFF' },
        { name: 'Deep violet', hex: '#7300FF' },
        { name: 'White', hex: '#FFFFFF' },
      ],
      type: [
        { role: 'Display', family: 'Inter Tight', note: 'Tight tracking, used for profile names' },
        { role: 'Interface', family: 'Inter', note: 'Editor labels, forms, dashboard' },
        { role: 'Technical', family: 'System mono', note: 'Slugs, keys, analytics figures' },
      ],
      components: [
        'Link block',
        'Theme token editor',
        'Live preview frame',
        'Auth flow',
        'Plan gate',
        'Analytics tile',
      ],
      grid: '12 columns on the dashboard, single 520px column on the public profile',
      spacing: '4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 — driven by design tokens',
    },
    outcome: [
      'Public profile live at knifes.me/name',
      'Themes editable without touching code',
      'Accounts, ranking and Stripe subscriptions in production',
    ],
  },

  {
    title: 'Sandra Hair Salon',
    slug: 'sandra-hair-salon',
    kind: 'Brand Site / Multilingual',
    year: '2025',
    badge: 'Client work',
    summary: 'A Swiss salon in three languages, with CHF pricing and booking from the phone.',
    intro:
      'A salon in Buchs (SG) serves German, English and Portuguese across the same counter. The site had to do exactly that, without turning into three sites maintained by one person who does not write code.',
    note: 'this is where I stopped treating translation as a layer and started treating it as architecture.',
    disciplines: ['UX/UI', 'FRONTEND', 'I18N'],
    role: ['UI design', 'Frontend', 'i18n architecture', 'Deployment'],
    stack: ['HTML', 'CSS', 'JavaScript', 'i18n', 'WhatsApp API'],
    layout: 'split',
    cover: {
      src: '/assets/projetos/sandra-cover.webp',
      alt: 'Sandra Hair Salon home page, in gold on near-black',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/sandra-long.webp',
        alt: 'The full salon page, with the service table and the booking block',
        width: 1400,
        height: 4400,
        caption: 'Prices in CHF, no small print',
      },
      {
        src: '/assets/projetos/sandra-cover.webp',
        alt: 'Detail of the salon site header with the language switch',
        width: 3150,
        height: 1969,
        caption: 'DE / EN / PT behind one control',
      },
    ],
    live: 'https://sandrahairsalon.ch/',
    github: null,
    challenge:
      'The neighbourhood is trilingual. Translating afterwards, as a layer on top, always breaks something: a price renders wrong, a button overflows, someone lands on half a page in German. And the salon needed to change its own prices without opening a code editor.',
    approach: [
      {
        step: 'Research',
        title: 'Which language actually walks in',
        text: 'Three days of counter observation, not analytics. German for appointments, Portuguese for the long conversations, English for everyone passing through. That order became the order of the language switch.',
      },
      {
        step: 'UX Strategy',
        title: 'One page, three readings',
        text: 'Language is state, not a route. Switching happens in place, keeps the scroll position, and rewrites currency, opening hours and date format along with the words.',
      },
      {
        step: 'Wireframes',
        title: 'The price table is the page',
        text: 'Everything else supports it. Service, duration, price in CHF, and a booking button attached to each row — because the question a salon site has to answer is always “how much, how long”.',
      },
      {
        step: 'UI Design',
        title: 'Gold on espresso',
        text: 'The salon’s own interior is dark wood and warm brass, so the site is too. Type is generous, contrast is high, and the tap targets are sized for a wet-handed thumb in a mirror-lit room.',
      },
      {
        step: 'Development',
        title: 'One dictionary, no build step',
        text: 'Every string lives in a single dictionary keyed by language. The service table reads a plain data file the salon edits directly; the booking button composes a pre-written WhatsApp message in the language currently selected.',
      },
    ],
    system: {
      palette: [
        { name: 'Espresso', hex: '#120C09' },
        { name: 'Gold', hex: '#C9A15B' },
        { name: 'Bronze', hex: '#B4883E' },
        { name: 'Champagne', hex: '#E8CE96' },
        { name: 'Cream', hex: '#FFF7E4' },
      ],
      type: [
        { role: 'Display', family: 'Serif display', note: 'Salon name and section titles' },
        { role: 'Text', family: 'Humanist sans', note: 'Service copy in three languages' },
        { role: 'Technical', family: 'Tabular sans', note: 'CHF prices and durations, aligned' },
      ],
      components: ['Language switch', 'Service row', 'Price tag', 'Booking composer', 'Opening-hours block'],
      grid: '12 columns, 20px gutter, 1140px max — single column below 720px',
      spacing: '8 / 16 / 24 / 40 / 64 — larger steps than usual, for thumb reach',
    },
    outcome: [
      'Three languages without three pages',
      'Service table the salon updates on its own',
      'Booking requests arrive already written, from the phone',
    ],
  },

  {
    title: 'Dra. Thayse Marques',
    slug: 'thayse-marques',
    kind: 'Brand Site / Lead Routing',
    year: '2025',
    badge: 'Client work',
    summary: 'A law firm site where the form reads the case and routes it to the right practice.',
    intro:
      'A Rio de Janeiro practice was receiving family, labour and social-security cases through the same phone number, with no context attached. The idea was to turn the first conversation inside out: the triage happens before the contact, not during it.',
    note: 'eight pages instead of one was a content decision. the search ranking came along for free.',
    disciplines: ['CONTENT STRATEGY', 'UX/UI', 'FRONTEND'],
    role: ['Research and content', 'UI design', 'Frontend', 'Technical SEO', 'Deployment'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Structured data', 'WhatsApp API'],
    layout: 'offset',
    cover: {
      src: '/assets/projetos/thayse-cover.webp',
      alt: 'Dra. Thayse Marques home page, with a portrait and the practice-area menu',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/thayse-long.webp',
        alt: 'The whole law firm page, top to bottom',
        width: 1400,
        height: 4400,
        caption: 'The full page, top to bottom',
      },
      {
        src: '/assets/projetos/thayse-cover.webp',
        alt: 'Detail of the law firm site header',
        width: 3150,
        height: 1969,
        caption: 'Where the first minute is decided',
      },
    ],
    live: 'https://drathaysemarques.adv.br/',
    github: null,
    challenge:
      'Everything arrived through one channel with no context. The lawyer spent the first half hour of every conversation working out what the case was even about — and a good share of those cases were not hers to take.',
    approach: [
      {
        step: 'Research',
        title: 'Sorting a year of first messages',
        text: 'I grouped the incoming enquiries by what the person actually needed, not by how they phrased it. Eight clusters came out, and those eight clusters became the architecture of the site.',
      },
      {
        step: 'UX Strategy',
        title: 'Triage before contact',
        text: 'Each practice area is its own page with its own language, so people self-select before writing anything. The short form at the end of each page composes a message that already says which area it belongs to.',
      },
      {
        step: 'Wireframes',
        title: 'One answer per screen',
        text: 'Legal copy is dense by nature, so each screen carries one idea and one exit. The route from “I have this problem” to “message written” is four screens with no dead ends.',
      },
      {
        step: 'UI Design',
        title: 'Serious without being cold',
        text: 'Bone paper, near-black text, a single muted rose for emphasis. The portrait is large and warm on purpose: for this kind of decision people are choosing a person, not a firm.',
      },
      {
        step: 'Development',
        title: 'Eight static pages, indexed properly',
        text: 'Hand-written HTML and CSS, structured data for the practice, one script for the form. It loads in under a second on mobile data, which is where most of the traffic comes from.',
      },
    ],
    system: {
      palette: [
        { name: 'Near-black', hex: '#120E0D' },
        { name: 'Bone', hex: '#F3EFE7' },
        { name: 'Sand', hex: '#E9E1D3' },
        { name: 'Muted rose', hex: '#E88A96' },
        { name: 'White', hex: '#FCFAF6' },
      ],
      type: [
        { role: 'Display', family: 'Transitional serif', note: 'Practice names and headlines' },
        { role: 'Text', family: 'Neutral sans', note: 'Long-form legal copy, 62ch measure' },
        { role: 'Technical', family: 'Tabular sans', note: 'Deadlines, article numbers, dates' },
      ],
      components: ['Practice card', 'Case form', 'Message composer', 'Credential block', 'FAQ row'],
      grid: '12 columns, 24px gutter, 1120px max',
      spacing: '4 / 8 / 16 / 24 / 40 / 72',
    },
    outcome: [
      'Enquiries arrive written and already sorted by practice',
      'Eight indexed pages instead of one',
      'Scheduling without the back-and-forth',
    ],
  },

  {
    title: 'Truffle N.B.',
    slug: 'truffle-nb',
    kind: 'Catalogue / Seasonal Product',
    year: '2025',
    badge: 'Client work',
    summary: 'A catalogue of fresh Italian truffle, delivered across Switzerland.',
    intro:
      'Fresh truffle lasts days, not months. The site had to say what exists today and how long it takes to arrive — and nothing beyond that, because everything beyond that goes out of date faster than anyone can edit it.',
    note: 'designing for content that ages by itself changed how I think about shelf life.',
    disciplines: ['UX/UI', 'FRONTEND'],
    role: ['UI design', 'Frontend in React', 'Content integration', 'Deployment'],
    stack: ['React', 'Vite', 'TypeScript', 'CSS Modules'],
    layout: 'offset',
    cover: {
      src: '/assets/projetos/fg-cover.webp',
      alt: 'Truffle N.B. Tricolore home page',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/fg-cover.webp',
        alt: 'Top of the Truffle N.B. site',
        width: 3150,
        height: 1969,
        caption: 'Rust, earth and one breath of space',
      },
      {
        src: '/assets/projetos/fg-long.webp',
        alt: 'The full Truffle N.B. Tricolore page',
        width: 1400,
        height: 4400,
        caption: 'Only what the season actually has',
      },
    ],
    live: 'https://kyso1.github.io/fg-systems/',
    github: 'https://github.com/kyso1/fg-systems',
    challenge:
      'Seasonal produce ages on screen. A static page still advertising a truffle that ran out three weeks ago is worse than having no page at all — it costs trust, and trust is the entire product when someone is spending CHF 200 on something they cannot see.',
    approach: [
      {
        step: 'Research',
        title: 'How the season actually moves',
        text: 'Three varieties, three windows, and a delivery radius that changes with the calendar. I mapped the whole year before drawing anything, because the calendar is the real information architecture here.',
      },
      {
        step: 'UX Strategy',
        title: 'Availability is the top-level filter',
        text: 'The page opens on what is in season right now. Everything else is one scroll below, marked with the month it returns — out of stock becomes information rather than a dead end.',
      },
      {
        step: 'Wireframes',
        title: 'Three cards and a delivery line',
        text: 'The whole catalogue is short by design. Adding filters, sorting and a search field to nine products would be interface for its own sake.',
      },
      {
        step: 'UI Design',
        title: 'Earth, rust, linen',
        text: 'Colours taken from the product itself. Photography runs large and uncropped; type stays small and quiet, so nothing competes with what is being sold.',
      },
      {
        step: 'Development',
        title: 'The catalogue reads a data file',
        text: 'React and Vite, with the product list in a typed file the client edits. Anything out of season drops off the list and the delivery copy changes with it — the site expires correctly, on its own.',
      },
    ],
    system: {
      palette: [
        { name: 'Rust', hex: '#8C3227' },
        { name: 'Gold', hex: '#C89B4B' },
        { name: 'Wheat', hex: '#E8C87E' },
        { name: 'Linen', hex: '#F7F1E3' },
        { name: 'Off-white', hex: '#FFFDF7' },
      ],
      type: [
        { role: 'Display', family: 'Didone serif', note: 'Product names, large and sparse' },
        { role: 'Text', family: 'Grotesque sans', note: 'Origin, weight, delivery windows' },
        { role: 'Technical', family: 'Tabular sans', note: 'Prices per gram and lead times' },
      ],
      components: ['Product card', 'Season badge', 'Delivery estimator', 'Origin note', 'Order composer'],
      grid: '12 columns, 32px gutter, 1240px max',
      spacing: '8 / 16 / 32 / 64 / 96 — generous, because the photography carries it',
    },
    outcome: [
      'A catalogue that expires correctly, on its own',
      'Under one second to first paint on 4G',
      'The client updates it without calling me',
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** o número de exibição sai da posição na lista, não de um campo */
export const projectNumber = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return String(i + 1).padStart(2, '0');
};

export const projectTotal = String(projects.length).padStart(2, '0');
