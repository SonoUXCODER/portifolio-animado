import type { Dictionary } from "../types";

/* Copy do site em en. So o idioma da pagina atual chega ao navegador. */
export const en: Dictionary = {
  meta: {
    role: "Full-Stack Developer & UX·UI Designer",
    tagline: "I design experiences. I engineer systems.",
    description:
      "Portfolio of a full-stack developer and UX/UI designer based in Bern, Switzerland. Five products with the full case study, the stack running in production, and studies that run live.",
    country: "Switzerland",
    availability: "Available for selected projects",
    colophon: "Set in Archivo and Instrument Sans. Hand-written in Next.js and TypeScript.",
  },
  ui: {
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    open: "Open",
    available: "Available",
    sections: "Sections",
    navigation: "Navigation",
    caseStudyLabel: "Case study",
    roleLabel: "Full-stack · UX·UI",
    language: "Language",
    cursor: {
      case: "CASE",
      open: "OPEN",
      look: "LOOK",
      close: "CLOSE",
      back: "BACK",
      home: "HOME",
    },
  },
  sections: {
    about: {
      name: "About",
      nav: "About",
      note: "One person, two disciplines",
    },
    work: {
      name: "Selected Work",
      nav: "Work",
      note: "Five products, start to ship",
    },
    capabilities: {
      name: "Capabilities",
      nav: "Capabilities",
      note: "From image to infrastructure",
    },
    contact: {
      name: "Contact",
      nav: "Contact",
      note: "Where this ends and something starts",
    },
  },
  hero: {
    lines: ["I design", "and build", "one product."],
    lead: "One person from research to deploy. The interface decision is made already knowing what it costs to build, and the code is written already knowing what it has to feel like.",
    proof:
      "Five products in production. You can open every one of them right here, without leaving the page.",
    productsLabel: "In production",
    basedIn: "Based in",
    localTime: "Local time",
    languages: "Languages",
    languagesValue: "EN · DE · PT",
    scroll: "Scroll to begin",
  },
  manifesto: {
    lines: ["Code is", "my material."],
    paragraphs: [
      "I work between design systems, interfaces, front-end architecture and digital experiences. My process connects strategy, UX, visual design and engineering, because I learned both halves at the same time, with nobody to hand the other one to.",
      "That used to be a limitation. Now it is the argument: the interface decision is made already knowing what it costs to build, and the code is written already knowing what it has to feel like. Nothing is lost in translation, because there is no translation.",
    ],
    methodLabel: "The method, every time",
    chain: [
      {
        step: "Design",
        note: "Research, flows, interface. Decided while it is still cheap to change.",
      },
      {
        step: "System",
        note: "Tokens and components, so the second screen costs a fraction of the first.",
      },
      {
        step: "Build",
        note: "Written by hand. No builder, no theme, no handoff between two people.",
      },
      {
        step: "Ship",
        note: "Domain, metrics, and the first visit from someone who is not me.",
      },
    ],
    stats: {
      shipped: "Products shipped",
      years: "Years building",
      tools: "Tools in production",
      languages: "Languages spoken",
    },
  },
  work: {
    lines: ["Selected", "work."],
    intro:
      "Five products, each one carried from the first conversation to the day someone who is not me opened it. Every one of them can be opened right here, running, without leaving this page.",
    roleLabel: "Role",
    stackLabel: "Stack",
    yearLabel: "Year",
    ctaAfter: "Does your problem look like one of these?",
    ctaAfterLink: "Tell me about it",
    seeLive: "See it live",
    caseStudy: "Case study",
    openCase: "Open the {title} case study",
    readCase: "Read the {title} case study",
    statements: [
      {
        lines: ["Design with", "intention."],
        align: "left",
      },
      {
        lines: ["Build with", "precision."],
        align: "right",
      },
    ],
  },
  capabilities: {
    lines: ["What", "I do."],
    intro:
      "Eight things, and only eight. A services page with twenty items does not say “I do everything”. It says nobody decided what this is.",
    ctaAfter: "Need both halves in one person?",
    ctaAfterLink: "Start a conversation",
    deliverablesLabel: "What you get",
    items: {
      "ux-ui": {
        title: "UX / UI Design",
        summary: "Research, user flows, wireframes, interfaces and design systems.",
        text: "It starts before the first screen. What did the person come here to do, in what order, and what is standing in the way. Structure gets settled first and interface second, because a screen that looks right and answers the wrong question still has to be thrown away.",
        deliverables: [
          "User flows",
          "Wireframes",
          "UI design in Figma",
          "Prototypes",
          "Handoff specs",
        ],
      },
      frontend: {
        title: "Frontend Development",
        summary: "Responsive interfaces, animations, performance and accessibility.",
        text: "Most design decisions die during the build. I write the interface myself so the thing agreed in the file is the thing that ships, down to the parts nobody notices until they break: keyboard order, focus rings, contrast, and the second a page takes to appear on bad mobile data.",
        deliverables: [
          "React / Next.js interfaces",
          "Motion and scroll systems",
          "Core Web Vitals",
          "WCAG 2.2 AA",
        ],
      },
      "full-stack": {
        title: "Full-Stack Development",
        summary: "APIs, databases, authentication and scalable applications.",
        text: "The half nobody sees decides whether the product exists at all. Schema first, then the API, then the interface that consumes it. Done in that order the data model stays a decision, rather than an accident that hardened over three sprints.",
        deliverables: [
          "PostgreSQL schemas",
          "REST endpoints",
          "Auth and sessions",
          "Stripe subscriptions",
          "Deployment",
        ],
      },
      "design-systems": {
        title: "Design Systems",
        summary: "Reusable components and consistent product ecosystems.",
        text: "Tokens, components, and the written rule for when to reach for each one. What makes it a system is the decisions already taken, and the component library is just where they are stored. Built right, the second screen costs an afternoon and the tenth costs an hour.",
        deliverables: [
          "Token architecture",
          "Component library",
          "Usage documentation",
          "Accessibility baseline",
        ],
      },
      ai: {
        title: "AI Engineering",
        summary: "LLM features in production, and AI as part of how the work gets made.",
        text: "Two separate things, and I do both. Shipping features on top of language models: streaming responses, context that fits the budget, output you can actually trust in front of a paying customer. And using AI daily in my own workflow, on the parts of the job where it is genuinely faster: scaffolding, refactors, test coverage, second opinions at 2am. It writes drafts. The decisions are still mine, and so is every line that survives review.",
        deliverables: [
          "LLM API integration",
          "Prompt and context design",
          "Streaming chat interfaces",
          "Evaluation and guardrails",
          "AI-assisted build workflow",
        ],
      },
      creative: {
        title: "Creative Development",
        summary: "Interactive experiences, motion and experimental interfaces.",
        text: "WebGL, canvas, scroll-driven narrative, generative type. The three sculptures on this page are here because of it. This is also where the unpaid hours go, which is the reason everything above keeps getting better.",
        deliverables: [
          "Three.js scenes",
          "Scroll choreography",
          "Generative visuals",
          "Interactive prototypes",
        ],
      },
      "creative-design": {
        title: "Creative Design",
        summary: "Art direction, image-making, and the pieces that give a product a face.",
        text: "Before there is an interface there is a visual decision: what this thing looks like it is. Reference, palette, image treatment, composition. I make the piece and the system behind it, so the tenth image looks like the first without anyone having to remember why.",
        deliverables: [
          "Art direction",
          "Image creation and composition",
          "Retouching and treatment",
          "Graphics and banners",
          "Brand visual kit",
        ],
      },
      "social-media": {
        title: "Social Media",
        summary: "Carousels, posts and visual content built for a feed, not for a portfolio.",
        text: "A carousel is an argument in slides: the first frame holds, the middle ones deliver, the last one asks for something. I write the sequence and design the frames as templates, so the team can repeat it next week without calling me.",
        deliverables: [
          "Carousels",
          "Posts and stories",
          "Covers and banners",
          "Editable templates",
          "Feed grid",
        ],
      },
    },
  },
  interludes: {
    label: "Interlude",
    items: {
      klio: {
        title: "Klio",
        caption:
          "The muse of history, holding a scroll. Every project starts the same way: someone needs a thing recorded before it disappears.",
        technique: "Photogrammetry · mesh decimated to 6%",
      },
      daphne: {
        title: "Daphne",
        caption:
          "She turns into a tree mid-escape. Which is roughly what happens to an idea between the sketch and the deploy. It arrives on the other side as something else.",
        technique: "Point-cloud scan · vertex colour · no texture",
      },
    },
  },
  philosophy: {
    label: "Philosophy",
    lines: ["Good design", "should feel", "inevitable."],
    text: "The best digital experiences are not only beautiful. They are clear, useful, fast and built to evolve. By the time you notice the design, it should already feel like the only way it could have been done.",
  },
  contact: {
    lines: ["Let’s build", "something", "that matters."],
    lead: "Available for freelance, product collaborations and creative digital projects.",
    cta: "Start a conversation",
    emailSubject: "Project enquiry",
    howItWorks:
      "How it works: send me the problem in two lines. I answer within two days with what I would do, how long it takes and what it costs. No discovery call, no thirty-page proposal.",
    basedIn: "Based in",
    coordinates: "Coordinates",
    responseTime: "Response time",
    responseValue: "Within two days",
    working: "Working",
    workingValue: "Remote or on site",
  },
  footer: {
    role: "Full-Stack Developer",
    socialLinks: "Social links",
  },
  livePreview: {
    viewport: "Viewport",
    openInNewTab: "Open in new tab",
    close: "Close",
    loading: "Loading the live site…",
    blockedTitle: "This one refuses to be framed.",
    blockedText:
      "Its security policy blocks embedding, which is the correct setting for a product that handles accounts and payments. I set it that way myself.",
    blockedCta: "Open it in a new tab",
    screenshots: "{title} screenshots",
    liveSite: "{title} live site",
    label: "{title} live preview",
  },
  project: {
    back: "Work",
    year: "Year",
    role: "Role",
    disciplines: "Disciplines",
    status: "Status",
    live: "Live",
    archived: "Archived",
    challengeLabel: "The challenge",
    challengeLines: ["What was", "broken."],
    approachLabel: "The approach",
    approachLines: ["How it", "was made."],
    systemLabel: "Design system",
    systemLines: ["The rules", "behind it."],
    palette: "Palette",
    typography: "Typography",
    components: "Components",
    grid: "Grid",
    spacing: "Spacing",
    developmentLabel: "Development",
    developmentLines: ["What it", "runs on."],
    outcome: "Outcome",
    experienceLabel: "Final experience",
    experienceLines: ["See it", "running."],
    galleryHint: "Drag, scroll or use the arrow keys.",
    visitLive: "Visit live project",
    source: "Source",
    privateRepo: "Repository is private. The code belongs to the client.",
    ctaEnd: "That is how I solved this one. Tell me about yours.",
    ctaEndLink: "Start a conversation",
    nextProject: "Next project",
  },
  notFound: {
    label: "Not found",
    title: "This page does not exist.",
    text: "Or it did, and it went offline. The way back is the same either way.",
    cta: "Back to the start",
  },
  projects: {
    phobiacori: {
      title: "PHOBIACORI",
      kind: "E-commerce / Digital Product",
      badge: "Client work",
      summary: "A store for an ink illustrator. Small runs, no warehouse, no checkout account.",
      intro:
        "PHOBIACORI has been drawing strange creatures in ink since 2019 and selling them one direct message at a time. The store had to fit that way of working: small runs, packed by hand, nothing resembling a conveyor belt.",
      note: "the cart lives in the visitor’s browser. no account, no sign-up, no database.",
      disciplines: ["ART DIRECTION", "UX/UI", "FRONTEND"],
      role: ["Art direction", "UI design", "Frontend", "Content architecture", "Deployment"],
      challenge:
        "Selling art in small runs has nothing to do with running a generic shop. The catalogue changes every week, half the pieces are one of a kind, and a marketplace layout made her work look like factory stock. On top of that: no budget for a backend, and no appetite for a platform that takes a cut of every sale.",
      approach: [
        {
          step: "Research",
          title: "Reading two years of direct messages",
          text: "Before any interface, I read how she was already selling. Buyers never asked for a size chart. They asked whether the piece was still available and how it would be packed. That single finding decided the whole information hierarchy.",
        },
        {
          step: "UX Strategy",
          title: "A catalogue, not a shop window",
          text: "Each piece became a record card: the drawing large, the text next to it, availability stated in plain language. Buying is three taps and never asks who you are. The cart lives in local storage and the order leaves as a written message.",
        },
        {
          step: "Wireframes",
          title: "One page, two jobs",
          text: "Store and archive share a single scroll. Splitting them into separate routes tested worse: people came to look, and only decided to buy after looking. Sold-out work stays visible as archive instead of disappearing.",
        },
        {
          step: "UI Design",
          title: "Photocopy, tape, ink",
          text: "The interface borrows the material language of the work itself: paper white, ink black, one red for alerts. Nothing is centred, nothing is rounded, and every image sits slightly off the grid on purpose.",
        },
        {
          step: "Development",
          title: "Static, and therefore permanent",
          text: "Next.js with a static export on GitHub Pages. There is no server to go down, no monthly bill, and no database to migrate. The product list is a typed data file she edits herself.",
        },
      ],
      system: {
        palette: ["Ink", "Paper", "Newsprint", "Alert red", "Ochre"],
        type: [
          {
            role: "Display",
            note: "Poster weight, used at three sizes only",
          },
          {
            role: "Technical",
            note: "Prices, stock state, order numbers",
          },
          {
            role: "Text",
            note: "Descriptions and shipping copy",
          },
        ],
        components: [
          "Piece card",
          "Cart drawer",
          "Availability tag",
          "Taped figure",
          "Order composer",
        ],
        grid: "12 columns, 24px gutter, 1180px max. Pieces break the grid by design",
        spacing: "4 / 8 / 16 / 32 / 64. One scale, no loose values",
      },
      outcome: [
        "She updates the catalogue without calling me",
        "Sold-out work leaves the shelf on its own",
        "Zero running cost: no server, no platform fee",
      ],
      coverAlt: "PHOBIACORI home page, with ink drawings taped to a paper background",
      gallery: [
        {
          alt: "Full PHOBIACORI page, from the cover down to the footer, store and archive together",
          caption: "Store and archive on the same page",
        },
      ],
    },
    "knifes-me": {
      title: "knifes.me",
      kind: "SaaS / Own Product",
      badge: "Own product",
      summary: "My product: a link-in-bio where the page actually belongs to the person.",
      intro:
        "I started it because every link-in-bio tool looked like the same page wearing a different colour. Here the person picks the palette, the background, the music and the layout, and the result still reads as theirs, not as the template’s.",
      note: "the hard part was never building. it was deciding what not to build.",
      disciplines: ["PRODUCT", "UX/UI", "FULL-STACK"],
      role: ["Product", "UI design", "Frontend", "Backend", "Database", "Subscriptions"],
      challenge:
        "Real customisation is expensive in performance: every new theme becomes more CSS shipped to someone who only wanted to tap a link. The product had to let people change almost everything without making the public page slower for the visitor who changes nothing.",
      approach: [
        {
          step: "Research",
          title: "Where the existing tools stop",
          text: "I catalogued what competing products let people change, and where they hard-stop. The wall is always the same: colour yes, structure no. Structure is exactly what makes a page look like someone.",
        },
        {
          step: "UX Strategy",
          title: "Editor for the owner, nothing for the visitor",
          text: "The two audiences never share code. The owner gets a live editor behind auth; the visitor gets a server-rendered page with no editor bundle, no framework state and no client-side theme resolution.",
        },
        {
          step: "Wireframes",
          title: "Preview beside the control, always",
          text: "Every control sits next to the thing it changes, and the preview is the real page, not an approximation of it. Nothing to publish, nothing to confirm: the save is the deploy.",
        },
        {
          step: "UI Design",
          title: "A dark chrome that disappears",
          text: "The interface is deliberately near-monochrome so it never competes with the page being built inside it. The single violet accent marks state and nothing else.",
        },
        {
          step: "Development",
          title: "The theme is data, not code",
          text: "A theme is a handful of CSS custom properties stored as a row. The public profile renders on the server with those values already inlined, so a new theme costs bytes in a database, not kilobytes in a bundle.",
        },
      ],
      system: {
        palette: ["Void", "Plum", "Signal violet", "Deep violet", "White"],
        type: [
          {
            role: "Display",
            note: "Tight tracking, used for profile names",
          },
          {
            role: "Interface",
            note: "Editor labels, forms, dashboard",
          },
          {
            role: "Technical",
            note: "Slugs, keys, analytics figures",
          },
        ],
        components: [
          "Link block",
          "Theme token editor",
          "Live preview frame",
          "Auth flow",
          "Plan gate",
          "Analytics tile",
        ],
        grid: "12 columns on the dashboard, single 520px column on the public profile",
        spacing: "4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Driven by design tokens",
      },
      outcome: [
        "Public profile live at knifes.me/name",
        "Themes editable without touching code",
        "Accounts, ranking and Stripe subscriptions in production",
      ],
      coverAlt: "A knifes.me profile page, top to bottom",
      gallery: [
        {
          alt: "knifes.me editor screen, with the live preview beside the controls",
          caption: "Change it here, see it immediately",
        },
      ],
    },
    "sandra-hair-salon": {
      title: "Sandra Hair Salon",
      kind: "Brand Site / Multilingual",
      badge: "Client work",
      summary: "A Swiss salon in three languages, with CHF pricing and booking from the phone.",
      intro:
        "A salon in Buchs (SG) serves German, English and Portuguese across the same counter. The site had to do exactly that, without turning into three sites maintained by one person who does not write code.",
      note: "this is where I stopped treating translation as a layer and started treating it as architecture.",
      disciplines: ["UX/UI", "FRONTEND", "I18N"],
      role: ["UI design", "Frontend", "i18n architecture", "Deployment"],
      challenge:
        "The neighbourhood is trilingual. Translating afterwards, as a layer on top, always breaks something: a price renders wrong, a button overflows, someone lands on half a page in German. And the salon needed to change its own prices without opening a code editor.",
      approach: [
        {
          step: "Research",
          title: "Which language actually walks in",
          text: "Three days of counter observation, not analytics. German for appointments, Portuguese for the long conversations, English for everyone passing through. That order became the order of the language switch.",
        },
        {
          step: "UX Strategy",
          title: "One page, three readings",
          text: "Language is state, not a route. Switching happens in place, keeps the scroll position, and rewrites currency, opening hours and date format along with the words.",
        },
        {
          step: "Wireframes",
          title: "The price table is the page",
          text: "Everything else supports it. Service, duration, price in CHF, and a booking button attached to each row, because the question a salon site has to answer is always “how much, how long”.",
        },
        {
          step: "UI Design",
          title: "Gold on espresso",
          text: "The salon’s own interior is dark wood and warm brass, so the site is too. Type is generous, contrast is high, and the tap targets are sized for a wet-handed thumb in a mirror-lit room.",
        },
        {
          step: "Development",
          title: "One dictionary, no build step",
          text: "Every string lives in a single dictionary keyed by language. The service table reads a plain data file the salon edits directly; the booking button composes a pre-written WhatsApp message in the language currently selected.",
        },
      ],
      system: {
        palette: ["Espresso", "Gold", "Bronze", "Champagne", "Cream"],
        type: [
          {
            role: "Display",
            note: "Salon name and section titles",
          },
          {
            role: "Text",
            note: "Service copy in three languages",
          },
          {
            role: "Technical",
            note: "CHF prices and durations, aligned",
          },
        ],
        components: [
          "Language switch",
          "Service row",
          "Price tag",
          "Booking composer",
          "Opening-hours block",
        ],
        grid: "12 columns, 20px gutter, 1140px max. Single column below 720px",
        spacing: "8 / 16 / 24 / 40 / 64. Larger steps than usual, for thumb reach",
      },
      outcome: [
        "Three languages without three pages",
        "Service table the salon updates on its own",
        "Booking requests arrive already written, from the phone",
      ],
      coverAlt: "Sandra Hair Salon home page, in gold on near-black",
      gallery: [
        {
          alt: "The full salon page, with the service table and the booking block",
          caption: "Prices in CHF, no small print",
        },
      ],
    },
    "thayse-marques": {
      title: "Dra. Thayse Marques",
      kind: "Brand Site / Lead Routing",
      badge: "Client work",
      summary: "A law firm site where the form reads the case and routes it to the right practice.",
      intro:
        "A Rio de Janeiro practice was receiving family, labour and social-security cases through the same phone number, with no context attached. The idea was to turn the first conversation inside out: the triage happens before the contact, not during it.",
      note: "eight pages instead of one was a content decision. the search ranking came along for free.",
      disciplines: ["CONTENT STRATEGY", "UX/UI", "FRONTEND"],
      role: ["Research and content", "UI design", "Frontend", "Technical SEO", "Deployment"],
      challenge:
        "Everything arrived through one channel with no context. The lawyer spent the first half hour of every conversation working out what the case was even about, and a good share of those cases were not hers to take.",
      approach: [
        {
          step: "Research",
          title: "Sorting a year of first messages",
          text: "I grouped the incoming enquiries by what the person actually needed, not by how they phrased it. Eight clusters came out, and those eight clusters became the architecture of the site.",
        },
        {
          step: "UX Strategy",
          title: "Triage before contact",
          text: "Each practice area is its own page with its own language, so people self-select before writing anything. The short form at the end of each page composes a message that already says which area it belongs to.",
        },
        {
          step: "Wireframes",
          title: "One answer per screen",
          text: "Legal copy is dense by nature, so each screen carries one idea and one exit. The route from “I have this problem” to “message written” is four screens with no dead ends.",
        },
        {
          step: "UI Design",
          title: "Serious without being cold",
          text: "Bone paper, near-black text, a single muted rose for emphasis. The portrait is large and warm on purpose: for this kind of decision people are choosing a person, not a firm.",
        },
        {
          step: "Development",
          title: "Eight static pages, indexed properly",
          text: "Hand-written HTML and CSS, structured data for the practice, one script for the form. It loads in under a second on mobile data, which is where most of the traffic comes from.",
        },
      ],
      system: {
        palette: ["Near-black", "Bone", "Sand", "Muted rose", "White"],
        type: [
          {
            role: "Display",
            note: "Practice names and headlines",
          },
          {
            role: "Text",
            note: "Long-form legal copy, 62ch measure",
          },
          {
            role: "Technical",
            note: "Deadlines, article numbers, dates",
          },
        ],
        components: [
          "Practice card",
          "Case form",
          "Message composer",
          "Credential block",
          "FAQ row",
        ],
        grid: "12 columns, 24px gutter, 1120px max",
        spacing: "4 / 8 / 16 / 24 / 40 / 72",
      },
      outcome: [
        "Enquiries arrive written and already sorted by practice",
        "Eight indexed pages instead of one",
        "Scheduling without the back-and-forth",
      ],
      coverAlt: "Dra. Thayse Marques home page, with a portrait and the practice-area menu",
      gallery: [
        {
          alt: "The whole law firm page, top to bottom",
          caption: "The full page, top to bottom",
        },
      ],
    },
    "truffle-nb": {
      title: "Truffle N.B.",
      kind: "Catalogue / Seasonal Product",
      badge: "Client work",
      summary: "A catalogue of fresh Italian truffle, delivered across Switzerland.",
      intro:
        "Fresh truffle lasts days, not months. The site had to say what exists today and how long it takes to arrive, and nothing beyond that, because everything beyond that goes out of date faster than anyone can edit it.",
      note: "designing for content that ages by itself changed how I think about shelf life.",
      disciplines: ["UX/UI", "FRONTEND"],
      role: ["UI design", "Frontend in React", "Content integration", "Deployment"],
      challenge:
        "Seasonal produce ages on screen. A static page still advertising a truffle that ran out three weeks ago is worse than having no page at all. It costs trust, and trust is the entire product when someone is spending CHF 200 on something they cannot see.",
      approach: [
        {
          step: "Research",
          title: "How the season actually moves",
          text: "Three varieties, three windows, and a delivery radius that changes with the calendar. I mapped the whole year before drawing anything, because the calendar is the real information architecture here.",
        },
        {
          step: "UX Strategy",
          title: "Availability is the top-level filter",
          text: "The page opens on what is in season right now. Everything else is one scroll below, marked with the month it returns. Out of stock becomes information rather than a dead end.",
        },
        {
          step: "Wireframes",
          title: "Three cards and a delivery line",
          text: "The whole catalogue is short by design. Adding filters, sorting and a search field to nine products would be interface for its own sake.",
        },
        {
          step: "UI Design",
          title: "Earth, rust, linen",
          text: "Colours taken from the product itself. Photography runs large and uncropped; type stays small and quiet, so nothing competes with what is being sold.",
        },
        {
          step: "Development",
          title: "The catalogue reads a data file",
          text: "React and Vite, with the product list in a typed file the client edits. Anything out of season drops off the list and the delivery copy changes with it. The site expires correctly, on its own.",
        },
      ],
      system: {
        palette: ["Rust", "Gold", "Wheat", "Linen", "Off-white"],
        type: [
          {
            role: "Display",
            note: "Product names, large and sparse",
          },
          {
            role: "Text",
            note: "Origin, weight, delivery windows",
          },
          {
            role: "Technical",
            note: "Prices per gram and lead times",
          },
        ],
        components: [
          "Product card",
          "Season badge",
          "Delivery estimator",
          "Origin note",
          "Order composer",
        ],
        grid: "12 columns, 32px gutter, 1240px max",
        spacing: "8 / 16 / 32 / 64 / 96. Generous, because the photography carries it",
      },
      outcome: [
        "A catalogue that expires correctly, on its own",
        "Under one second to first paint on 4G",
        "The client updates it without calling me",
      ],
      coverAlt: "Truffle N.B. Tricolore home page",
      gallery: [
        {
          alt: "The full Truffle N.B. Tricolore page",
          caption: "Only what the season actually has",
        },
      ],
    },
  },
};
