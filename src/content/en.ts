import type { Content } from './types';
import { enProjects } from './en.projects';

/* -------------------------------------------------------------------------
   INGLÊS.

   É o idioma em que o site foi escrito primeiro, e é o de referência: se uma
   frase precisar ser reescrita, começa aqui e desce pros outros dois.

   Nenhum travessão em texto visível, de propósito. Ponto, vírgula e dois
   pontos fazem o mesmo trabalho e não deixam a página com aquela cadência
   uniforme de coisa gerada.
   ------------------------------------------------------------------------- */

export const en: Content = {
  meta: {
    role: 'Full-Stack Developer & UX·UI Designer',
    tagline: 'I design experiences. I engineer systems.',
    description:
      'Portfolio of a full-stack developer and UX/UI designer based in Bern, Switzerland. Five products with the full case study, the stack running in production, and studies that run live.',
    country: 'Switzerland',
    availability: 'Available for selected projects',
    colophon: 'Set in Archivo and Instrument Sans. Hand-written in Next.js and TypeScript.',
  },

  ui: {
    skipToContent: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    open: 'Open',
    available: 'Available',
    sections: 'Sections',
    navigation: 'Navigation',
    caseStudyLabel: 'Case study',
    roleLabel: 'Full-stack · UX·UI',
    language: 'Language',
    cursor: { case: 'CASE', open: 'OPEN', look: 'LOOK', close: 'CLOSE', back: 'BACK', home: 'HOME' },
  },

  sections: {
    about: { name: 'About', nav: 'About', note: 'One person, two disciplines' },
    work: { name: 'Selected Work', nav: 'Work', note: 'Five products, start to ship' },
    capabilities: { name: 'Capabilities', nav: 'Skills', note: 'From interface to infrastructure' },
    experience: { name: 'Experience', nav: 'Experience', note: 'In reverse order' },
    contact: { name: 'Contact', nav: 'Contact', note: 'Where this ends and something starts' },
  },

  hero: {
    lines: ['I build', 'digital', 'experiences.'],
    lead: 'Full-Stack Developer & UX/UI Designer creating digital products where design and technology work as one system.',
    ctaWork: 'Selected work',
    ctaContact: 'Start a conversation',
    basedIn: 'Based in',
    localTime: 'Local time',
    disciplines: 'Disciplines',
    disciplinesValue: 'Design · Engineering',
    languages: 'Languages',
    languagesValue: 'EN · DE · PT',
    scroll: 'Scroll to begin',
  },

  manifesto: {
    lines: ['Code is', 'my material.'],
    paragraphs: [
      'I work between design systems, interfaces, front-end architecture and digital experiences. My process connects strategy, UX, visual design and engineering, because I learned both halves at the same time, with nobody to hand the other one to.',
      'That used to be a limitation. Now it is the argument: the interface decision is made already knowing what it costs to build, and the code is written already knowing what it has to feel like. Nothing is lost in translation, because there is no translation.',
    ],
    methodLabel: 'The method, every time',
    chain: [
      { step: 'Design', note: 'Research, flows, interface. Decided while it is still cheap to change.' },
      { step: 'System', note: 'Tokens and components, so the second screen costs a fraction of the first.' },
      { step: 'Build', note: 'Written by hand. No builder, no theme, no handoff between two people.' },
      { step: 'Ship', note: 'Domain, metrics, and the first visit from someone who is not me.' },
    ],
    stats: {
      shipped: 'Products shipped',
      years: 'Years building',
      tools: 'Tools in production',
      languages: 'Languages spoken',
    },
  },

  work: {
    lines: ['Selected', 'work.'],
    intro:
      'Five products, each one carried from the first conversation to the day someone who is not me opened it. Every one of them can be opened right here, running, without leaving this page.',
    roleLabel: 'Role',
    stackLabel: 'Stack',
    yearLabel: 'Year',
    seeLive: 'See it live',
    caseStudy: 'Case study',
    openCase: 'Open the {title} case study',
    readCase: 'Read the {title} case study',
    statements: [
      { lines: ['Design with', 'intention.'], align: 'left' },
      { lines: ['Build with', 'precision.'], align: 'right' },
    ],
  },

  capabilities: {
    lines: ['What', 'I do.'],
    intro:
      'Six things, and only six. A services page with eleven items does not say “I do everything”. It says nobody decided what this is.',
    deliverablesLabel: 'What you get',
    items: {
      'ux-ui': {
        title: 'UX / UI Design',
        summary: 'Research, user flows, wireframes, interfaces and design systems.',
        text: 'It starts before the first screen. What did the person come here to do, in what order, and what is standing in the way. Structure gets settled first and interface second, because a screen that looks right and answers the wrong question still has to be thrown away.',
        deliverables: ['User flows', 'Wireframes', 'UI design in Figma', 'Prototypes', 'Handoff specs'],
      },
      frontend: {
        title: 'Frontend Development',
        summary: 'Responsive interfaces, animations, performance and accessibility.',
        text: 'Most design decisions die during the build. I write the interface myself so the thing agreed in the file is the thing that ships, down to the parts nobody notices until they break: keyboard order, focus rings, contrast, and the second a page takes to appear on bad mobile data.',
        deliverables: ['React / Next.js interfaces', 'Motion and scroll systems', 'Core Web Vitals', 'WCAG 2.2 AA'],
      },
      'full-stack': {
        title: 'Full-Stack Development',
        summary: 'APIs, databases, authentication and scalable applications.',
        text: 'The half nobody sees decides whether the product exists at all. Schema first, then the API, then the interface that consumes it. Done in that order the data model stays a decision, rather than an accident that hardened over three sprints.',
        deliverables: ['PostgreSQL schemas', 'REST endpoints', 'Auth and sessions', 'Stripe subscriptions', 'Deployment'],
      },
      'design-systems': {
        title: 'Design Systems',
        summary: 'Reusable components and consistent product ecosystems.',
        text: 'Tokens, components, and the written rule for when to reach for each one. What makes it a system is the decisions already taken, and the component library is just where they are stored. Built right, the second screen costs an afternoon and the tenth costs an hour.',
        deliverables: ['Token architecture', 'Component library', 'Usage documentation', 'Accessibility baseline'],
      },
      ai: {
        title: 'AI Engineering',
        summary: 'LLM features in production, and AI as part of how the work gets made.',
        text: 'Two separate things, and I do both. Shipping features on top of language models: streaming responses, context that fits the budget, output you can actually trust in front of a paying customer. And using AI daily in my own workflow, on the parts of the job where it is genuinely faster: scaffolding, refactors, test coverage, second opinions at 2am. It writes drafts. The decisions are still mine, and so is every line that survives review.',
        deliverables: [
          'LLM API integration',
          'Prompt and context design',
          'Streaming chat interfaces',
          'Evaluation and guardrails',
          'AI-assisted build workflow',
        ],
      },
      creative: {
        title: 'Creative Development',
        summary: 'Interactive experiences, motion and experimental interfaces.',
        text: 'WebGL, canvas, scroll-driven narrative, generative type. The three sculptures on this page are here because of it. This is also where the unpaid hours go, which is the reason everything above keeps getting better.',
        deliverables: ['Three.js scenes', 'Scroll choreography', 'Generative visuals', 'Interactive prototypes'],
      },
    },
  },

  stack: {
    lines: ['Tools are', 'just the beginning.'],
    intro:
      'Not a list of everything I have opened once. This is what is running in production right now, and what each piece is actually doing there.',
    toolsWord: 'tools',
    layersWord: 'layers',
    primaryTool: 'Primary tool in this layer',
    layers: {
      frontend: {
        title: 'Frontend',
        summary: 'What the person sees and touches. Where design and code are the same decision.',
      },
      backend: {
        title: 'Backend',
        summary: 'The half nobody sees, and the one that decides whether the product is real.',
      },
      design: {
        title: 'Design',
        summary: 'Where the decision gets made while it is still cheap to change.',
      },
      ai: {
        title: 'AI',
        summary: 'Shipping features on top of models, and using them to build faster.',
      },
      workflow: {
        title: 'Workflow',
        summary: 'How the work leaves my machine and stays alive on someone else’s.',
      },
    },
    notes: {
      React: 'the base of everything I have built since 2022',
      'Next.js': 'routing, server rendering, and the build behind this site',
      TypeScript: 'contract before execution, which is what lets me sleep',
      JavaScript: 'the parts that predate the framework, and still ship',
      'Tailwind CSS': 'speed without the mess, with design tokens on top',
      CSS: 'grid, type and motion by hand when it matters',
      'Node.js': 'APIs, build scripts, everything outside the browser',
      PostgreSQL: 'a table thought through solves the problem before it exists',
      Supabase: 'auth, storage and realtime without building infrastructure',
      'REST APIs': 'typed contracts between the two halves of the same product',
      Authentication: 'sessions, roles and the parts that must never leak',
      Stripe: 'subscriptions and webhooks in production on knifes.me',
      Figma: 'I think before I code, because being wrong here costs nothing',
      'UX Research': 'reading what people already do before drawing what they should',
      Prototyping: 'ugly and fast, because an honest prototype is an ugly one',
      'Design Systems': 'tokens, components and the rule for when to use each',
      'Three.js': 'the sculptures on this page, no framework on top',
      Blender: 'preparing and decimating meshes before they reach the web',
      'Claude API': 'the model I build features on and the one I work alongside',
      'OpenAI API': 'when a project already runs on it, or the pricing decides',
      'Prompt design': 'context budgets, structured output, failure modes written down',
      'Streaming UI': 'token-by-token responses that stay readable while they arrive',
      Evaluations: 'a test suite for output, because "it looked fine" is not a check',
      'AI-assisted build': 'scaffolding, refactors and coverage: the drafts, never the decisions',
      Git: 'the ctrl+z that actually works',
      GitHub: 'where every project in this portfolio lives',
      'CI/CD': 'build, check and publish without a human in the loop',
      Agile: 'short cycles, visible increments, no ceremony for its own sake',
      'Accessibility audits': 'keyboard, screen reader and contrast, before launch not after',
      'Performance budgets': 'a number agreed up front is the only budget that holds',
    },
  },

  journey: {
    lines: ['The', 'journey.'],
    intro:
      'From the first client to my own product, most recent first. Open any entry for the decision that made it worth listing.',
    turningPoint: 'Turning point',
    detail: 'Detail',
    less: 'Less',
    entries: {
      now: {
        period: '2026 / Now',
        title: 'Full-Stack Developer & Product Designer',
        org: 'Independent · Bern, Switzerland',
        summary:
          'Designing and building digital products end to end, for clients across Switzerland and Brazil, and for myself.',
        details: [
          'Working in three languages: German, English and Portuguese.',
          'Every project runs from research through design, build and deployment with one person accountable for all of it.',
          'Available for selected freelance work and product collaborations.',
        ],
        roles: ['Product', 'UX/UI', 'Full-stack', 'Deployment'],
      },
      knifes: {
        period: '2026',
        title: 'knifes.me',
        org: 'Own product · SaaS',
        summary:
          'Moved from frontend to an entire product: database, accounts, subscriptions, and the decision about what not to build.',
        details: [
          'Theme engine built on CSS custom properties stored as database rows, so new themes cost bytes, not bundle size.',
          'Stripe subscriptions with webhook reconciliation running in production.',
          'The hardest work was scope: three features were cut after being built.',
        ],
        roles: ['Product', 'Full-stack', 'Database', 'Subscriptions'],
      },
      phobia: {
        period: '2026',
        title: 'PHOBIACORI',
        org: 'Client · Independent artist',
        summary:
          'The first store I built from nothing. The problem was never selling. It was making a small-run catalogue not look like factory stock.',
        details: [
          'Cart state lives entirely in the browser: no accounts, no database, no running cost.',
          'The product list is a typed data file the artist edits herself.',
          'Static export on GitHub Pages: nothing to go down, nothing to renew.',
        ],
        roles: ['Art direction', 'UI design', 'Frontend', 'Content architecture'],
      },
      truffle: {
        period: '2025',
        title: 'Truffle N.B. Tricolore',
        org: 'Client · Switzerland',
        summary:
          'A seasonal product forced me to design for content that ages by itself. The catalogue had to go out of date without breaking.',
        details: [
          'Availability drives the layout: what is out of season becomes information, not a dead end.',
          'React and Vite, first paint under one second on 4G.',
          'The client edits the season file; the delivery copy follows it automatically.',
        ],
        roles: ['UI design', 'React frontend', 'Content integration'],
      },
      sandra: {
        period: '2025',
        title: 'Sandra Hair Salon',
        org: 'Client · Buchs SG',
        summary:
          'Three languages across the same counter. This is where I stopped treating translation as a layer and started treating it as architecture.',
        details: [
          'Language is state, not a route: switching keeps scroll position and rewrites currency, hours and date format.',
          'One dictionary file, no build step, no CMS.',
          'Booking composes a pre-written message in the language currently selected.',
        ],
        roles: ['UI design', 'Frontend', 'i18n architecture'],
      },
      thayse: {
        period: '2025',
        title: 'Dra. Thayse Marques',
        org: 'Client · Rio de Janeiro',
        summary:
          'The first project where content work outweighed interface work: eight practice areas, each with its own copy and its own search intent.',
        details: [
          'A year of incoming enquiries was clustered by need, and those clusters became the site architecture.',
          'The form composes a message already classified by practice area.',
          'Eight indexed pages replaced a single one, and the ranking followed the content, not the other way round.',
        ],
        roles: ['Research and content', 'UI design', 'Frontend', 'Technical SEO'],
      },
      foundations: {
        period: '2021 / 2024',
        title: 'Learning both halves at once',
        org: 'Self-taught',
        summary:
          'I learned design and engineering in the same period, because there was nobody to hand the other half to.',
        details: [
          'Started with HTML, CSS and Figma in 2021; React in 2022; TypeScript and Next.js in 2023.',
          'Databases and authentication came in 2024, when a personal project stopped fitting in the browser.',
          'What was once a limitation is now the argument: no handoff, no telephone game.',
        ],
        roles: ['Foundations', 'Self-directed practice'],
      },
    },
  },

  interludes: {
    label: 'Interlude',
    items: {
      klio: {
        title: 'Klio',
        caption:
          'The muse of history, holding a scroll. Every project starts the same way: someone needs a thing recorded before it disappears.',
        technique: 'Photogrammetry · mesh decimated to 6%',
      },
      daphne: {
        title: 'Daphne',
        caption:
          'She turns into a tree mid-escape. Which is roughly what happens to an idea between the sketch and the deploy. It arrives on the other side as something else.',
        technique: 'Point-cloud scan · vertex colour · no texture',
      },
      'saint-andre': {
        title: 'Saint André',
        caption:
          'Five centuries on, the fold of the cloth is still right. It is the shortest argument I know for doing things slowly and by hand.',
        technique: 'Photogrammetry · 1024px texture',
      },
    },
  },

  philosophy: {
    label: 'Philosophy',
    lines: ['Good design', 'should feel', 'inevitable.'],
    text: 'The best digital experiences are not only beautiful. They are clear, useful, fast and built to evolve. By the time you notice the design, it should already feel like the only way it could have been done.',
  },

  contact: {
    lines: ['Let’s build', 'something', 'that matters.'],
    lead: 'Available for freelance, product collaborations and creative digital projects.',
    cta: 'Start a conversation',
    emailSubject: 'Project enquiry',
    basedIn: 'Based in',
    coordinates: 'Coordinates',
    responseTime: 'Response time',
    responseValue: 'Within two days',
    working: 'Working',
    workingValue: 'Remote or on site',
  },

  footer: {
    role: 'Full-Stack Developer',
    socialLinks: 'Social links',
  },

  livePreview: {
    viewport: 'Viewport',
    openInNewTab: 'Open in new tab',
    close: 'Close',
    loading: 'Loading the live site…',
    blockedTitle: 'This one refuses to be framed.',
    blockedText:
      'Its security policy blocks embedding, which is the correct setting for a product that handles accounts and payments. I set it that way myself.',
    blockedCta: 'Open it in a new tab',
    screenshots: '{title} screenshots',
    liveSite: '{title} live site',
    label: '{title} live preview',
  },

  project: {
    back: 'Work',
    year: 'Year',
    role: 'Role',
    disciplines: 'Disciplines',
    status: 'Status',
    live: 'Live',
    archived: 'Archived',
    challengeLabel: 'The challenge',
    challengeLines: ['What was', 'broken.'],
    approachLabel: 'The approach',
    approachLines: ['How it', 'was made.'],
    systemLabel: 'Design system',
    systemLines: ['The rules', 'behind it.'],
    palette: 'Palette',
    typography: 'Typography',
    components: 'Components',
    grid: 'Grid',
    spacing: 'Spacing',
    developmentLabel: 'Development',
    developmentLines: ['What it', 'runs on.'],
    outcome: 'Outcome',
    experienceLabel: 'Final experience',
    experienceLines: ['See it', 'running.'],
    galleryHint: 'Drag, scroll or use the arrow keys.',
    visitLive: 'Visit live project',
    source: 'Source',
    privateRepo: 'Repository is private. The code belongs to the client.',
    nextProject: 'Next project',
  },

  notFound: {
    label: 'Not found',
    title: 'This page does not exist.',
    text: 'Or it did, and it went offline. The way back is the same either way.',
    cta: 'Back to the start',
  },

  projects: enProjects,
};
