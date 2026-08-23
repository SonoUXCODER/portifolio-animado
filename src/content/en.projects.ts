import type { ProjectCopy } from './types';

/* -------------------------------------------------------------------------
   OS ESTUDOS DE CASO, EM INGLÊS.

   Separados de en.ts porque são dois terços do texto do site inteiro, e um
   arquivo de setecentas linhas onde a metade de cima é interface e a de
   baixo é reportagem não se edita bem.

   A estrutura (slug, URL, hex, dimensão de imagem) mora em shared.ts. Aqui
   é só prosa. Dois arrays são casados **por índice** com os de lá:

     system.palette  <->  paletteHex
     system.type     <->  typeFamilies

   Tirar uma cor num lugar sem tirar no outro produz amostra sem legenda. A
   conferência em content/index.ts estoura no build se isso acontecer.
   ------------------------------------------------------------------------- */

export const enProjects: Record<string, ProjectCopy> = {
  phobiacori: {
    title: 'PHOBIACORI',
    kind: 'E-commerce / Digital Product',
    badge: 'Client work',
    summary: 'A store for an ink illustrator. Small runs, no warehouse, no checkout account.',
    intro:
      'PHOBIACORI has been drawing strange creatures in ink since 2019 and selling them one direct message at a time. The store had to fit that way of working: small runs, packed by hand, nothing resembling a conveyor belt.',
    note: 'the cart lives in the visitor’s browser. no account, no sign-up, no database.',
    disciplines: ['ART DIRECTION', 'UX/UI', 'FRONTEND'],
    role: ['Art direction', 'UI design', 'Frontend', 'Content architecture', 'Deployment'],
    challenge:
      'Selling art in small runs has nothing to do with running a generic shop. The catalogue changes every week, half the pieces are one of a kind, and a marketplace layout made her work look like factory stock. On top of that: no budget for a backend, and no appetite for a platform that takes a cut of every sale.',
    approach: [
      {
        step: 'Research',
        title: 'Reading two years of direct messages',
        text: 'Before any interface, I read how she was already selling. Buyers never asked for a size chart. They asked whether the piece was still available and how it would be packed. That single finding decided the whole information hierarchy.',
      },
      {
        step: 'UX Strategy',
        title: 'A catalogue, not a shop window',
        text: 'Each piece became a record card: the drawing large, the text next to it, availability stated in plain language. Buying is three taps and never asks who you are. The cart lives in local storage and the order leaves as a written message.',
      },
      {
        step: 'Wireframes',
        title: 'One page, two jobs',
        text: 'Store and archive share a single scroll. Splitting them into separate routes tested worse: people came to look, and only decided to buy after looking. Sold-out work stays visible as archive instead of disappearing.',
      },
      {
        step: 'UI Design',
        title: 'Photocopy, tape, ink',
        text: 'The interface borrows the material language of the work itself: paper white, ink black, one red for alerts. Nothing is centred, nothing is rounded, and every image sits slightly off the grid on purpose.',
      },
      {
        step: 'Development',
        title: 'Static, and therefore permanent',
        text: 'Next.js with a static export on GitHub Pages. There is no server to go down, no monthly bill, and no database to migrate. The product list is a typed data file she edits herself.',
      },
    ],
    system: {
      palette: ['Ink', 'Paper', 'Newsprint', 'Alert red', 'Ochre'],
      type: [
        { role: 'Display', note: 'Poster weight, used at three sizes only' },
        { role: 'Technical', note: 'Prices, stock state, order numbers' },
        { role: 'Text', note: 'Descriptions and shipping copy' },
      ],
      components: ['Piece card', 'Cart drawer', 'Availability tag', 'Taped figure', 'Order composer'],
      grid: '12 columns, 24px gutter, 1180px max. Pieces break the grid by design',
      spacing: '4 / 8 / 16 / 32 / 64. One scale, no loose values',
    },
    outcome: [
      'She updates the catalogue without calling me',
      'Sold-out work leaves the shelf on its own',
      'Zero running cost: no server, no platform fee',
    ],
    coverAlt: 'PHOBIACORI home page, with ink drawings taped to a paper background',
    gallery: [
      {
        alt: 'Full PHOBIACORI page, from the cover down to the footer, store and archive together',
        caption: 'Store and archive on the same page',
      },
      {
        alt: 'Detail of the store header, with the menu and the cart counter',
        caption: 'Ink, xerox and stubbornness',
      },
    ],
  },

  'knifes-me': {
    title: 'knifes.me',
    kind: 'SaaS / Own Product',
    badge: 'Own product',
    summary: 'My product: a link-in-bio where the page actually belongs to the person.',
    intro:
      'I started it because every link-in-bio tool looked like the same page wearing a different colour. Here the person picks the palette, the background, the music and the layout, and the result still reads as theirs, not as the template’s.',
    note: 'the hard part was never building. it was deciding what not to build.',
    disciplines: ['PRODUCT', 'UX/UI', 'FULL-STACK'],
    role: ['Product', 'UI design', 'Frontend', 'Backend', 'Database', 'Subscriptions'],
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
        text: 'Every control sits next to the thing it changes, and the preview is the real page, not an approximation of it. Nothing to publish, nothing to confirm: the save is the deploy.',
      },
      {
        step: 'UI Design',
        title: 'A dark chrome that disappears',
        text: 'The interface is deliberately near-monochrome so it never competes with the page being built inside it. The single violet accent marks state and nothing else.',
      },
      {
        step: 'Development',
        title: 'The theme is data, not code',
        text: 'A theme is a handful of CSS custom properties stored as a row. The public profile renders on the server with those values already inlined, so a new theme costs bytes in a database, not kilobytes in a bundle.',
      },
    ],
    system: {
      palette: ['Void', 'Plum', 'Signal violet', 'Deep violet', 'White'],
      type: [
        { role: 'Display', note: 'Tight tracking, used for profile names' },
        { role: 'Interface', note: 'Editor labels, forms, dashboard' },
        { role: 'Technical', note: 'Slugs, keys, analytics figures' },
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
      spacing: '4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Driven by design tokens',
    },
    outcome: [
      'Public profile live at knifes.me/name',
      'Themes editable without touching code',
      'Accounts, ranking and Stripe subscriptions in production',
    ],
    coverAlt: 'A knifes.me profile page, top to bottom',
    gallery: [
      {
        alt: 'knifes.me editor screen, with the live preview beside the controls',
        caption: 'Change it here, see it immediately',
      },
      { alt: 'A complete profile generated by knifes.me', caption: 'knifes.me/yourname' },
    ],
  },

  'sandra-hair-salon': {
    title: 'Sandra Hair Salon',
    kind: 'Brand Site / Multilingual',
    badge: 'Client work',
    summary: 'A Swiss salon in three languages, with CHF pricing and booking from the phone.',
    intro:
      'A salon in Buchs (SG) serves German, English and Portuguese across the same counter. The site had to do exactly that, without turning into three sites maintained by one person who does not write code.',
    note: 'this is where I stopped treating translation as a layer and started treating it as architecture.',
    disciplines: ['UX/UI', 'FRONTEND', 'I18N'],
    role: ['UI design', 'Frontend', 'i18n architecture', 'Deployment'],
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
        text: 'Everything else supports it. Service, duration, price in CHF, and a booking button attached to each row, because the question a salon site has to answer is always “how much, how long”.',
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
      palette: ['Espresso', 'Gold', 'Bronze', 'Champagne', 'Cream'],
      type: [
        { role: 'Display', note: 'Salon name and section titles' },
        { role: 'Text', note: 'Service copy in three languages' },
        { role: 'Technical', note: 'CHF prices and durations, aligned' },
      ],
      components: ['Language switch', 'Service row', 'Price tag', 'Booking composer', 'Opening-hours block'],
      grid: '12 columns, 20px gutter, 1140px max. Single column below 720px',
      spacing: '8 / 16 / 24 / 40 / 64. Larger steps than usual, for thumb reach',
    },
    outcome: [
      'Three languages without three pages',
      'Service table the salon updates on its own',
      'Booking requests arrive already written, from the phone',
    ],
    coverAlt: 'Sandra Hair Salon home page, in gold on near-black',
    gallery: [
      {
        alt: 'The full salon page, with the service table and the booking block',
        caption: 'Prices in CHF, no small print',
      },
      {
        alt: 'Detail of the salon site header with the language switch',
        caption: 'DE / EN / PT behind one control',
      },
    ],
  },

  'thayse-marques': {
    title: 'Dra. Thayse Marques',
    kind: 'Brand Site / Lead Routing',
    badge: 'Client work',
    summary: 'A law firm site where the form reads the case and routes it to the right practice.',
    intro:
      'A Rio de Janeiro practice was receiving family, labour and social-security cases through the same phone number, with no context attached. The idea was to turn the first conversation inside out: the triage happens before the contact, not during it.',
    note: 'eight pages instead of one was a content decision. the search ranking came along for free.',
    disciplines: ['CONTENT STRATEGY', 'UX/UI', 'FRONTEND'],
    role: ['Research and content', 'UI design', 'Frontend', 'Technical SEO', 'Deployment'],
    challenge:
      'Everything arrived through one channel with no context. The lawyer spent the first half hour of every conversation working out what the case was even about, and a good share of those cases were not hers to take.',
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
      palette: ['Near-black', 'Bone', 'Sand', 'Muted rose', 'White'],
      type: [
        { role: 'Display', note: 'Practice names and headlines' },
        { role: 'Text', note: 'Long-form legal copy, 62ch measure' },
        { role: 'Technical', note: 'Deadlines, article numbers, dates' },
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
    coverAlt: 'Dra. Thayse Marques home page, with a portrait and the practice-area menu',
    gallery: [
      { alt: 'The whole law firm page, top to bottom', caption: 'The full page, top to bottom' },
      { alt: 'Detail of the law firm site header', caption: 'Where the first minute is decided' },
    ],
  },

  'truffle-nb': {
    title: 'Truffle N.B.',
    kind: 'Catalogue / Seasonal Product',
    badge: 'Client work',
    summary: 'A catalogue of fresh Italian truffle, delivered across Switzerland.',
    intro:
      'Fresh truffle lasts days, not months. The site had to say what exists today and how long it takes to arrive, and nothing beyond that, because everything beyond that goes out of date faster than anyone can edit it.',
    note: 'designing for content that ages by itself changed how I think about shelf life.',
    disciplines: ['UX/UI', 'FRONTEND'],
    role: ['UI design', 'Frontend in React', 'Content integration', 'Deployment'],
    challenge:
      'Seasonal produce ages on screen. A static page still advertising a truffle that ran out three weeks ago is worse than having no page at all. It costs trust, and trust is the entire product when someone is spending CHF 200 on something they cannot see.',
    approach: [
      {
        step: 'Research',
        title: 'How the season actually moves',
        text: 'Three varieties, three windows, and a delivery radius that changes with the calendar. I mapped the whole year before drawing anything, because the calendar is the real information architecture here.',
      },
      {
        step: 'UX Strategy',
        title: 'Availability is the top-level filter',
        text: 'The page opens on what is in season right now. Everything else is one scroll below, marked with the month it returns. Out of stock becomes information rather than a dead end.',
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
        text: 'React and Vite, with the product list in a typed file the client edits. Anything out of season drops off the list and the delivery copy changes with it. The site expires correctly, on its own.',
      },
    ],
    system: {
      palette: ['Rust', 'Gold', 'Wheat', 'Linen', 'Off-white'],
      type: [
        { role: 'Display', note: 'Product names, large and sparse' },
        { role: 'Text', note: 'Origin, weight, delivery windows' },
        { role: 'Technical', note: 'Prices per gram and lead times' },
      ],
      components: ['Product card', 'Season badge', 'Delivery estimator', 'Origin note', 'Order composer'],
      grid: '12 columns, 32px gutter, 1240px max',
      spacing: '8 / 16 / 32 / 64 / 96. Generous, because the photography carries it',
    },
    outcome: [
      'A catalogue that expires correctly, on its own',
      'Under one second to first paint on 4G',
      'The client updates it without calling me',
    ],
    coverAlt: 'Truffle N.B. Tricolore home page',
    gallery: [
      { alt: 'Top of the Truffle N.B. site', caption: 'Rust, earth and one breath of space' },
      { alt: 'The full Truffle N.B. Tricolore page', caption: 'Only what the season actually has' },
    ],
  },
};
