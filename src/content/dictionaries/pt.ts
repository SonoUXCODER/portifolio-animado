import type { Dictionary } from "../types";

/* Copy do site em pt. So o idioma da pagina atual chega ao navegador. */
export const pt: Dictionary = {
  meta: {
    role: "Desenvolvedor Full-Stack & Designer UX·UI",
    tagline: "Desenho experiências. Construo sistemas.",
    description:
      "Portfólio de um desenvolvedor full-stack e designer de produto baseado em Berna, Suíça. Cinco produtos com o estudo de caso inteiro, a stack em produção, e estudos que rodam ao vivo.",
    country: "Suíça",
    availability: "Disponível para projetos selecionados",
    colophon: "Composto em Archivo e Instrument Sans. Escrito à mão em Next.js e TypeScript.",
  },
  ui: {
    skipToContent: "Pular para o conteúdo",
    menu: "Menu",
    close: "Fechar",
    open: "Abrir",
    available: "Disponível",
    sections: "Seções",
    navigation: "Navegação",
    caseStudyLabel: "Estudo de caso",
    roleLabel: "Full-stack · UX·UI",
    language: "Idioma",
    cursor: {
      case: "CASO",
      open: "ABRIR",
      look: "OLHAR",
      close: "FECHAR",
      back: "VOLTAR",
      home: "INÍCIO",
    },
  },
  sections: {
    about: {
      name: "Sobre",
      nav: "Sobre",
      note: "Uma pessoa, duas metades",
    },
    work: {
      name: "Trabalho Selecionado",
      nav: "Trabalho",
      note: "Cinco produtos, do início ao ar",
    },
    capabilities: {
      name: "Capacidades",
      nav: "Capacidades",
      note: "Da imagem à infraestrutura",
    },
    contact: {
      name: "Contato",
      nav: "Contato",
      note: "Onde isto acaba e outra coisa começa",
    },
  },
  hero: {
    lines: ["Desenho", "e construo", "um produto."],
    lead: "Uma pessoa da pesquisa ao deploy. A decisão de interface já nasce sabendo o que custa construir, e o código já nasce sabendo o que precisa parecer.",
    proof: "Cinco produtos no ar. Dá pra abrir todos aqui dentro, sem sair da página.",
    productsLabel: "No ar",
    basedIn: "Base",
    localTime: "Hora local",
    languages: "Idiomas",
    languagesValue: "PT · DE · EN",
    scroll: "Role para começar",
  },
  manifesto: {
    lines: ["Código é", "meu material."],
    paragraphs: [
      "Eu trabalho entre design systems, interfaces, arquitetura de front-end e experiências digitais. Meu processo liga estratégia, UX, design visual e engenharia, porque aprendi as duas metades na mesma época, sem ter para quem passar a outra.",
      "Isso já foi limitação. Hoje é o argumento: a decisão de interface é tomada já sabendo o que ela custa para construir, e o código é escrito já sabendo o que ele precisa parecer. Nada se perde na tradução, porque não existe tradução.",
    ],
    methodLabel: "O método, sempre o mesmo",
    chain: [
      {
        step: "Design",
        note: "Pesquisa, fluxos, interface. Decidido enquanto ainda é barato mudar.",
      },
      {
        step: "Sistema",
        note: "Tokens e componentes, pra segunda tela custar uma fração da primeira.",
      },
      {
        step: "Código",
        note: "Escrito à mão. Sem construtor, sem tema pronto, sem handoff entre duas pessoas.",
      },
      {
        step: "Deploy",
        note: "Domínio, métrica, e o primeiro acesso de alguém que não sou eu.",
      },
    ],
    stats: {
      shipped: "Produtos entregues",
      years: "Anos construindo",
      tools: "Ferramentas em produção",
      languages: "Idiomas falados",
    },
  },
  work: {
    lines: ["Trabalho", "selecionado."],
    intro:
      "Cinco produtos, cada um levado da primeira conversa até o dia em que alguém que não sou eu abriu. Todos podem ser abertos aqui mesmo, rodando, sem sair desta página.",
    roleLabel: "Papel",
    stackLabel: "Stack",
    yearLabel: "Ano",
    ctaAfter: "Seu problema se parece com algum destes?",
    ctaAfterLink: "Me conta",
    seeLive: "Ver rodando",
    caseStudy: "Estudo de caso",
    openCase: "Abrir o estudo de caso de {title}",
    readCase: "Ler o estudo de caso de {title}",
    statements: [
      {
        lines: ["Desenhar com", "intenção."],
        align: "left",
      },
      {
        lines: ["Construir com", "precisão."],
        align: "right",
      },
    ],
  },
  capabilities: {
    lines: ["O que", "eu faço."],
    intro:
      "Oito coisas, e só oito. Uma página de serviços com vinte itens não diz “faço tudo”. Diz que ninguém decidiu o que isto é.",
    ctaAfter: "Precisa das duas metades na mesma pessoa?",
    ctaAfterLink: "Começar uma conversa",
    deliverablesLabel: "O que você recebe",
    items: {
      "ux-ui": {
        title: "Design UX / UI",
        summary: "Pesquisa, fluxos de usuário, wireframes, interfaces e design systems.",
        text: "Começa antes da primeira tela. O que a pessoa veio fazer aqui, em que ordem, e o que está no caminho. Estrutura se resolve primeiro e interface depois, porque uma tela bonita que responde a pergunta errada continua indo pro lixo.",
        deliverables: [
          "Fluxos de usuário",
          "Wireframes",
          "Design de UI no Figma",
          "Protótipos",
          "Especificação de handoff",
        ],
      },
      frontend: {
        title: "Desenvolvimento Frontend",
        summary: "Interfaces responsivas, animação, performance e acessibilidade.",
        text: "A maior parte das decisões de design morre durante o build. Eu escrevo a interface pra que o que foi combinado no arquivo seja o que vai pro ar, incluindo as partes que ninguém nota até quebrarem: ordem do teclado, anel de foco, contraste, e o segundo que a página leva pra aparecer em internet ruim.",
        deliverables: [
          "Interfaces em React / Next.js",
          "Sistemas de movimento e rolagem",
          "Core Web Vitals",
          "WCAG 2.2 AA",
        ],
      },
      "full-stack": {
        title: "Desenvolvimento Full-Stack",
        summary: "APIs, bancos de dados, autenticação e aplicações que escalam.",
        text: "A metade que ninguém vê decide se o produto existe. Schema primeiro, depois a API, depois a interface que consome. Nessa ordem o modelo de dados continua sendo uma decisão, em vez de um acidente que endureceu ao longo de três sprints.",
        deliverables: [
          "Schemas em PostgreSQL",
          "Endpoints REST",
          "Autenticação e sessão",
          "Assinaturas com Stripe",
          "Publicação",
        ],
      },
      "design-systems": {
        title: "Design Systems",
        summary: "Componentes reutilizáveis e ecossistemas de produto consistentes.",
        text: "Tokens, componentes, e a regra escrita de quando usar cada um. O que faz virar sistema são as decisões já tomadas, e a biblioteca de componentes é só onde elas ficam guardadas. Bem feito, a segunda tela custa uma tarde e a décima custa uma hora.",
        deliverables: [
          "Arquitetura de tokens",
          "Biblioteca de componentes",
          "Documentação de uso",
          "Base de acessibilidade",
        ],
      },
      ai: {
        title: "Engenharia de IA",
        summary: "Recursos com LLM em produção, e IA como parte de como o trabalho é feito.",
        text: "São duas coisas separadas, e eu faço as duas. Entregar recursos em cima de modelos de linguagem: resposta em streaming, contexto que cabe no orçamento, saída em que dá pra confiar na frente de um cliente pagante. E usar IA todo dia no meu próprio fluxo, nas partes do trabalho em que ela é de fato mais rápida: esqueleto de código, refatoração, cobertura de teste, segunda opinião às duas da manhã. Ela escreve rascunho. As decisões continuam minhas, e cada linha que sobrevive à revisão também.",
        deliverables: [
          "Integração com APIs de LLM",
          "Design de prompt e contexto",
          "Interfaces de chat em streaming",
          "Avaliação e barreiras de segurança",
          "Fluxo de build assistido por IA",
        ],
      },
      creative: {
        title: "Desenvolvimento Criativo",
        summary: "Experiências interativas, movimento e interfaces experimentais.",
        text: "WebGL, canvas, narrativa guiada por rolagem, tipografia generativa. As três esculturas desta página estão aqui por causa disso. É também onde vão as horas que ninguém paga, que é a razão de tudo acima ir ficando melhor.",
        deliverables: [
          "Cenas em Three.js",
          "Coreografia de rolagem",
          "Visuais generativos",
          "Protótipos interativos",
        ],
      },
      "creative-design": {
        title: "Design Criativo",
        summary: "Direção de arte, criação de imagem e as peças que dão cara ao produto.",
        text: "Antes de existir interface existe uma decisão visual: com o que essa coisa se parece. Referência, paleta, tratamento de imagem, composição. Eu faço a peça e faço o sistema atrás dela, então a décima imagem sai parecida com a primeira sem ninguém precisar lembrar por quê.",
        deliverables: [
          "Direção de arte",
          "Criação e composição de imagem",
          "Tratamento e retoque",
          "Peças gráficas e banners",
          "Kit visual da marca",
        ],
      },
      "social-media": {
        title: "Social Media",
        summary: "Carrosséis, posts e conteúdo visual feito pra feed, não pra portfólio.",
        text: "Carrossel é argumento em slides: o primeiro quadro segura, os do meio entregam, o último pede alguma coisa. Eu escrevo a sequência e desenho os quadros em template, para a equipe repetir na semana seguinte sem precisar me chamar.",
        deliverables: [
          "Carrosséis",
          "Posts e stories",
          "Capas e banners",
          "Templates editáveis",
          "Grade de feed",
        ],
      },
    },
  },
  interludes: {
    label: "Intervalo",
    items: {
      klio: {
        title: "Klio",
        caption:
          "A musa da história, segurando um rolo de papel. Todo projeto começa assim: alguém precisa registrar uma coisa antes que ela se perca.",
        technique: "Fotogrametria · malha reduzida a 6%",
      },
      daphne: {
        title: "Daphne",
        caption:
          "Ela vira árvore no meio da fuga. É mais ou menos o que acontece com uma ideia entre o rascunho e o deploy. Chega do outro lado sendo outra coisa.",
        technique: "Scan em nuvem de pontos · cor por vértice · sem textura",
      },
    },
  },
  philosophy: {
    label: "Filosofia",
    lines: ["Bom design", "deve parecer", "inevitável."],
    text: "As melhores experiências digitais não são só bonitas. São claras, úteis, rápidas e feitas pra evoluir. Quando você percebe o design, ele já devia parecer o único jeito possível de ter sido feito.",
  },
  contact: {
    lines: ["Vamos fazer", "alguma coisa", "que importa."],
    lead: "Disponível para freelas, colaborações de produto e projetos digitais criativos.",
    cta: "Começar uma conversa",
    emailSubject: "Contato sobre projeto",
    howItWorks:
      "Como funciona: você manda o problema em duas linhas. Eu respondo em até dois dias com o que eu faria, quanto tempo leva e quanto custa. Sem reunião de descoberta, sem proposta de trinta páginas.",
    basedIn: "Base",
    coordinates: "Coordenadas",
    responseTime: "Tempo de resposta",
    responseValue: "Em até dois dias",
    working: "Formato",
    workingValue: "Remoto ou presencial",
  },
  footer: {
    role: "Desenvolvedor Full-Stack",
    socialLinks: "Redes sociais",
  },
  livePreview: {
    viewport: "Tela",
    openInNewTab: "Abrir em nova aba",
    close: "Fechar",
    loading: "Carregando o site…",
    blockedTitle: "Este aqui se recusa a ser embutido.",
    blockedText:
      "A política de segurança dele bloqueia embed, que é a configuração certa para um produto que lida com conta e pagamento. Fui eu que configurei assim.",
    blockedCta: "Abrir em nova aba",
    screenshots: "Capturas de {title}",
    liveSite: "Site de {title} no ar",
    label: "Visualização ao vivo de {title}",
  },
  project: {
    back: "Trabalho",
    year: "Ano",
    role: "Papel",
    disciplines: "Frentes",
    status: "Estado",
    live: "No ar",
    archived: "Arquivado",
    challengeLabel: "O desafio",
    challengeLines: ["O que estava", "quebrado."],
    approachLabel: "A abordagem",
    approachLines: ["Como foi", "feito."],
    systemLabel: "Design system",
    systemLines: ["As regras", "por trás."],
    palette: "Paleta",
    typography: "Tipografia",
    components: "Componentes",
    grid: "Grade",
    spacing: "Espaçamento",
    developmentLabel: "Desenvolvimento",
    developmentLines: ["Sobre o que", "ele roda."],
    outcome: "Resultado",
    experienceLabel: "Experiência final",
    experienceLines: ["Veja", "rodando."],
    galleryHint: "Arraste, role ou use as setas.",
    visitLive: "Ver o projeto no ar",
    source: "Código",
    privateRepo: "Repositório fechado. O código é do cliente.",
    ctaEnd: "Foi assim que eu resolvi este. Me conta o seu.",
    ctaEndLink: "Começar uma conversa",
    nextProject: "Próximo projeto",
  },
  notFound: {
    label: "Não encontrado",
    title: "Esta página não existe.",
    text: "Ou existiu, e saiu do ar. O caminho de volta é o mesmo nos dois casos.",
    cta: "Voltar ao início",
  },
  projects: {
    phobiacori: {
      title: "PHOBIACORI",
      kind: "E-commerce / Produto Digital",
      badge: "Cliente",
      summary: "Loja de uma ilustradora de nanquim. Tiragem pequena, sem estoque, sem cadastro.",
      intro:
        "A PHOBIACORI desenha bicho estranho a nanquim desde 2019 e vendia por mensagem direta, uma de cada vez. A loja tinha que caber nesse jeito de trabalhar: tiragem pequena, embalagem na mão, nada parecido com esteira.",
      note: "o carrinho vive no navegador de quem visita. sem conta, sem cadastro, sem banco de dados.",
      disciplines: ["DIREÇÃO DE ARTE", "UX/UI", "FRONT-END"],
      role: [
        "Direção de arte",
        "Design de UI",
        "Front-end",
        "Arquitetura de conteúdo",
        "Publicação",
      ],
      challenge:
        "Vender arte em tiragem pequena não tem nada a ver com tocar uma loja genérica. O catálogo muda toda semana, metade das peças é única, e um layout de marketplace fazia o trabalho dela parecer estoque de fábrica. Somado a isso: sem orçamento para backend, e sem paciência para uma plataforma que fica com uma parte de cada venda.",
      approach: [
        {
          step: "Pesquisa",
          title: "Lendo dois anos de mensagens diretas",
          text: "Antes de qualquer interface, eu li como ela já vendia. Ninguém nunca perguntou tabela de tamanho. Perguntavam se a peça ainda estava disponível e como ela seria embalada. Essa única descoberta decidiu toda a hierarquia de informação.",
        },
        {
          step: "Estratégia de UX",
          title: "Um acervo, não uma vitrine",
          text: "Cada peça virou uma ficha: o desenho grande, o texto ao lado, a disponibilidade escrita em português claro. Comprar são três toques e nunca pergunta quem você é. O carrinho vive no armazenamento local e o pedido sai como mensagem escrita.",
        },
        {
          step: "Wireframes",
          title: "Uma página, dois trabalhos",
          text: "Loja e arquivo dividem a mesma rolagem. Separar em rotas diferentes testou pior: as pessoas chegavam para olhar, e só decidiam comprar depois de olhar. Peça esgotada continua visível como arquivo em vez de sumir.",
        },
        {
          step: "Design de UI",
          title: "Xerox, fita e nanquim",
          text: "A interface empresta a linguagem material do próprio trabalho: branco de papel, preto de nanquim, um vermelho para alerta. Nada é centralizado, nada é arredondado, e toda imagem fica levemente fora da grade de propósito.",
        },
        {
          step: "Desenvolvimento",
          title: "Estático, e por isso permanente",
          text: "Next.js com export estático no GitHub Pages. Não existe servidor para cair, conta mensal, nem banco para migrar. A lista de produtos é um arquivo de dados tipado que ela edita sozinha.",
        },
      ],
      system: {
        palette: ["Nanquim", "Papel", "Jornal", "Vermelho de alerta", "Ocre"],
        type: [
          {
            role: "Display",
            note: "Peso de cartaz, usado em três tamanhos só",
          },
          {
            role: "Técnica",
            note: "Preço, estado de estoque, número de pedido",
          },
          {
            role: "Texto",
            note: "Descrição e informação de envio",
          },
        ],
        components: [
          "Ficha da peça",
          "Gaveta do carrinho",
          "Selo de disponibilidade",
          "Figura colada",
          "Montador de pedido",
        ],
        grid: "12 colunas, medianiz de 24px, máximo de 1180px. As peças furam a grade de propósito",
        spacing: "4 / 8 / 16 / 32 / 64. Uma escala só, sem valor solto",
      },
      outcome: [
        "Ela atualiza o catálogo sem me chamar",
        "Peça esgotada sai da vitrine sozinha",
        "Custo zero de operação: sem servidor, sem taxa de plataforma",
      ],
      coverAlt: "Home da PHOBIACORI, com desenhos a nanquim colados com fita sobre fundo de papel",
      gallery: [
        {
          alt: "Página inteira da PHOBIACORI, da capa até o rodapé, loja e arquivo juntos",
          caption: "Loja e arquivo na mesma página",
        },
      ],
    },
    "knifes-me": {
      title: "knifes.me",
      kind: "SaaS / Produto Próprio",
      badge: "Produto próprio",
      summary: "Meu produto: um link na bio em que a página é de fato da pessoa.",
      intro:
        "Comecei porque toda ferramenta de link na bio parecia a mesma página vestindo outra cor. Aqui a pessoa escolhe a paleta, o fundo, a música e o layout, e o resultado continua sendo dela, não do template.",
      note: "a parte difícil nunca foi construir. foi decidir o que não construir.",
      disciplines: ["PRODUTO", "UX/UI", "FULL-STACK"],
      role: ["Produto", "Design de UI", "Front-end", "Back-end", "Banco de dados", "Assinaturas"],
      challenge:
        "Personalização de verdade custa caro em performance: cada tema novo vira mais CSS entregue a quem só queria tocar num link. O produto tinha que deixar mudar quase tudo sem deixar a página pública mais lenta para quem não muda nada.",
      approach: [
        {
          step: "Pesquisa",
          title: "Onde as ferramentas existentes param",
          text: "Cataloguei o que os concorrentes deixam mudar, e onde travam. A parede é sempre a mesma: cor sim, estrutura não. Estrutura é exatamente o que faz uma página parecer com alguém.",
        },
        {
          step: "Estratégia de UX",
          title: "Editor para o dono, nada para quem visita",
          text: "Os dois públicos nunca dividem código. O dono recebe um editor ao vivo atrás de autenticação; quem visita recebe uma página renderizada no servidor, sem bundle de editor, sem estado de framework e sem resolver tema no cliente.",
        },
        {
          step: "Wireframes",
          title: "Prévia ao lado do controle, sempre",
          text: "Cada controle fica ao lado da coisa que ele muda, e a prévia é a página de verdade, não uma aproximação dela. Nada para publicar, nada para confirmar: salvar é o deploy.",
        },
        {
          step: "Design de UI",
          title: "Uma moldura escura que desaparece",
          text: "A interface é quase monocromática de propósito, para nunca competir com a página que está sendo montada dentro dela. O único acento violeta marca estado, e nada além disso.",
        },
        {
          step: "Desenvolvimento",
          title: "O tema é dado, não código",
          text: "Um tema é um punhado de variáveis CSS guardadas como linha. O perfil público renderiza no servidor já com esses valores dentro, então tema novo custa bytes num banco, não kilobytes num bundle.",
        },
      ],
      system: {
        palette: ["Vazio", "Ameixa", "Violeta de sinal", "Violeta profundo", "Branco"],
        type: [
          {
            role: "Display",
            note: "Tracking fechado, usado no nome do perfil",
          },
          {
            role: "Interface",
            note: "Rótulo do editor, formulário, painel",
          },
          {
            role: "Técnica",
            note: "Slug, chave, número de analytics",
          },
        ],
        components: [
          "Bloco de link",
          "Editor de tokens de tema",
          "Moldura de prévia ao vivo",
          "Fluxo de autenticação",
          "Trava de plano",
          "Cartão de analytics",
        ],
        grid: "12 colunas no painel, coluna única de 520px no perfil público",
        spacing: "4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Guiado por design tokens",
      },
      outcome: [
        "Perfil público no ar em knifes.me/nome",
        "Tema editável sem tocar em código",
        "Contas, ranking e assinatura Stripe em produção",
      ],
      coverAlt: "Página de perfil do knifes.me, do topo ao rodapé",
      gallery: [
        {
          alt: "Tela do editor do knifes.me, com a prévia ao vivo ao lado dos controles",
          caption: "Muda aqui, vê na hora",
        },
      ],
    },
    "sandra-hair-salon": {
      title: "Sandra Hair Salon",
      kind: "Site Institucional / Multilíngue",
      badge: "Cliente",
      summary: "Um salão suíço em três idiomas, com preço em CHF e agendamento pelo celular.",
      intro:
        "Um salão em Buchs (SG) atende alemão, inglês e português no mesmo balcão. O site tinha que fazer exatamente isso, sem virar três sites mantidos por uma pessoa que não escreve código.",
      note: "foi aqui que parei de tratar tradução como camada e passei a tratar como arquitetura.",
      disciplines: ["UX/UI", "FRONT-END", "I18N"],
      role: ["Design de UI", "Front-end", "Arquitetura de i18n", "Publicação"],
      challenge:
        "O bairro é trilíngue. Traduzir depois, como camada por cima, sempre quebra alguma coisa: o preço sai errado, o botão estoura, alguém cai em meia página em alemão. E o salão precisava mudar os próprios preços sem abrir editor de código.",
      approach: [
        {
          step: "Pesquisa",
          title: "Qual idioma de fato entra pela porta",
          text: "Três dias de observação no balcão, não de analytics. Alemão para marcar horário, português para as conversas longas, inglês para quem está de passagem. Essa ordem virou a ordem do seletor de idioma.",
        },
        {
          step: "Estratégia de UX",
          title: "Uma página, três leituras",
          text: "Idioma é estado, não rota. A troca acontece no lugar, mantém a posição de rolagem, e reescreve moeda, horário de funcionamento e formato de data junto com as palavras.",
        },
        {
          step: "Wireframes",
          title: "A tabela de preço é a página",
          text: "Todo o resto existe para sustentar ela. Serviço, duração, preço em CHF, e um botão de agendamento grudado em cada linha, porque a pergunta que um site de salão precisa responder é sempre “quanto custa, quanto demora”.",
        },
        {
          step: "Design de UI",
          title: "Dourado sobre café",
          text: "O interior do salão é madeira escura e latão quente, então o site também é. A tipografia é generosa, o contraste é alto, e os alvos de toque foram dimensionados para um polegar molhado numa sala de espelho.",
        },
        {
          step: "Desenvolvimento",
          title: "Um dicionário, sem etapa de build",
          text: "Cada texto vive num dicionário único indexado por idioma. A tabela de serviços lê um arquivo de dados que o salão edita direto; o botão de agendamento monta uma mensagem de WhatsApp pronta no idioma que estiver selecionado.",
        },
      ],
      system: {
        palette: ["Café", "Dourado", "Bronze", "Champanhe", "Creme"],
        type: [
          {
            role: "Display",
            note: "Nome do salão e títulos de seção",
          },
          {
            role: "Texto",
            note: "Descrição de serviço em três idiomas",
          },
          {
            role: "Técnica",
            note: "Preço em CHF e duração, alinhados",
          },
        ],
        components: [
          "Seletor de idioma",
          "Linha de serviço",
          "Etiqueta de preço",
          "Montador de agendamento",
          "Bloco de horários",
        ],
        grid: "12 colunas, medianiz de 20px, máximo de 1140px. Coluna única abaixo de 720px",
        spacing: "8 / 16 / 24 / 40 / 64. Passos maiores que o normal, por causa do polegar",
      },
      outcome: [
        "Três idiomas sem três páginas",
        "Tabela de serviços que o salão atualiza sozinho",
        "Pedido de horário chega escrito, direto do celular",
      ],
      coverAlt: "Home do Sandra Hair Salon, em dourado sobre quase preto",
      gallery: [
        {
          alt: "Página inteira do salão, com a tabela de serviços e o bloco de agendamento",
          caption: "Preço em CHF, sem letra miúda",
        },
      ],
    },
    "thayse-marques": {
      title: "Dra. Thayse Marques",
      kind: "Site Institucional / Triagem de Contato",
      badge: "Cliente",
      summary: "Site de advocacia em que o formulário lê o caso e manda para a área certa.",
      intro:
        "Um escritório no Rio recebia caso de família, trabalhista e previdenciário pelo mesmo número, sem contexto nenhum junto. A ideia foi virar a primeira conversa do avesso: a triagem acontece antes do contato, não durante.",
      note: "oito páginas em vez de uma foi decisão de conteúdo. o ranking veio junto, de brinde.",
      disciplines: ["ESTRATÉGIA DE CONTEÚDO", "UX/UI", "FRONT-END"],
      role: ["Pesquisa e conteúdo", "Design de UI", "Front-end", "SEO técnico", "Publicação"],
      challenge:
        "Tudo chegava pelo mesmo canal, sem contexto. A advogada gastava a primeira meia hora de cada conversa descobrindo do que o caso se tratava, e boa parte deles nem era dela para pegar.",
      approach: [
        {
          step: "Pesquisa",
          title: "Separando um ano de primeiras mensagens",
          text: "Agrupei os contatos recebidos pelo que a pessoa de fato precisava, não pelo jeito como ela escreveu. Saíram oito grupos, e esses oito grupos viraram a arquitetura do site.",
        },
        {
          step: "Estratégia de UX",
          title: "Triagem antes do contato",
          text: "Cada área do direito é uma página com linguagem própria, então as pessoas se classificam antes de escrever qualquer coisa. O formulário curto no fim de cada página monta uma mensagem que já diz a que área ela pertence.",
        },
        {
          step: "Wireframes",
          title: "Uma resposta por tela",
          text: "Texto jurídico é denso por natureza, então cada tela carrega uma ideia e uma saída. O caminho de “tenho este problema” até “mensagem escrita” são quatro telas, sem beco sem saída.",
        },
        {
          step: "Design de UI",
          title: "Sério sem ser frio",
          text: "Papel osso, texto quase preto, um único rosa suave para ênfase. O retrato é grande e quente de propósito: numa decisão dessas as pessoas estão escolhendo uma pessoa, não um escritório.",
        },
        {
          step: "Desenvolvimento",
          title: "Oito páginas estáticas, indexadas direito",
          text: "HTML e CSS escritos à mão, dados estruturados para o escritório, um script para o formulário. Carrega em menos de um segundo em internet de celular, que é de onde vem a maior parte do acesso.",
        },
      ],
      system: {
        palette: ["Quase preto", "Osso", "Areia", "Rosa suave", "Branco"],
        type: [
          {
            role: "Display",
            note: "Nome das áreas e manchetes",
          },
          {
            role: "Texto",
            note: "Texto jurídico longo, medida de 62ch",
          },
          {
            role: "Técnica",
            note: "Prazo, número de artigo, data",
          },
        ],
        components: [
          "Cartão de área",
          "Formulário de caso",
          "Montador de mensagem",
          "Bloco de credenciais",
          "Linha de FAQ",
        ],
        grid: "12 colunas, medianiz de 24px, máximo de 1120px",
        spacing: "4 / 8 / 16 / 24 / 40 / 72",
      },
      outcome: [
        "O contato chega escrito e já separado por área",
        "Oito páginas indexadas em vez de uma",
        "Agendamento sem ida e volta de mensagem",
      ],
      coverAlt: "Home do site da Dra. Thayse Marques, com retrato e o menu das áreas do direito",
      gallery: [
        {
          alt: "Página inteira do escritório, do topo ao rodapé",
          caption: "A página inteira, de cima a baixo",
        },
      ],
    },
    "truffle-nb": {
      title: "Truffle N.B.",
      kind: "Catálogo / Produto Sazonal",
      badge: "Cliente",
      summary: "Catálogo de trufa fresca italiana, entregue em toda a Suíça.",
      intro:
        "Trufa fresca dura dias, não meses. O site tinha que dizer o que existe hoje e quanto tempo demora para chegar, e nada além disso, porque tudo além disso envelhece mais rápido do que alguém consegue editar.",
      note: "projetar para conteúdo que envelhece sozinho mudou como eu penso prazo de validade.",
      disciplines: ["UX/UI", "FRONT-END"],
      role: ["Design de UI", "Front-end em React", "Integração de conteúdo", "Publicação"],
      challenge:
        "Produto sazonal envelhece na tela. Uma página estática ainda anunciando uma trufa que acabou há três semanas é pior do que não ter página nenhuma. Custa confiança, e confiança é o produto inteiro quando alguém está gastando CHF 200 em algo que não pode ver.",
      approach: [
        {
          step: "Pesquisa",
          title: "Como a safra realmente anda",
          text: "Três variedades, três janelas, e um raio de entrega que muda com o calendário. Mapeei o ano inteiro antes de desenhar qualquer coisa, porque o calendário é a arquitetura de informação de verdade aqui.",
        },
        {
          step: "Estratégia de UX",
          title: "Disponibilidade é o filtro principal",
          text: "A página abre no que está na safra agora. Todo o resto fica uma rolagem abaixo, marcado com o mês em que volta. Fora de estoque vira informação em vez de beco sem saída.",
        },
        {
          step: "Wireframes",
          title: "Três cartões e uma linha de entrega",
          text: "O catálogo inteiro é curto de propósito. Acrescentar filtro, ordenação e campo de busca a nove produtos seria interface por interface.",
        },
        {
          step: "Design de UI",
          title: "Terra, ferrugem, linho",
          text: "Cores tiradas do próprio produto. A fotografia corre grande e sem corte; a tipografia fica pequena e quieta, para nada competir com o que está sendo vendido.",
        },
        {
          step: "Desenvolvimento",
          title: "O catálogo lê um arquivo de dados",
          text: "React e Vite, com a lista de produtos num arquivo tipado que o cliente edita. O que sai da safra some da lista e o texto de entrega muda junto. O site expira direito, sozinho.",
        },
      ],
      system: {
        palette: ["Ferrugem", "Dourado", "Trigo", "Linho", "Quase branco"],
        type: [
          {
            role: "Display",
            note: "Nome dos produtos, grande e espaçado",
          },
          {
            role: "Texto",
            note: "Origem, peso, janela de entrega",
          },
          {
            role: "Técnica",
            note: "Preço por grama e prazo",
          },
        ],
        components: [
          "Cartão de produto",
          "Selo de safra",
          "Estimador de entrega",
          "Nota de origem",
          "Montador de pedido",
        ],
        grid: "12 colunas, medianiz de 32px, máximo de 1240px",
        spacing: "8 / 16 / 32 / 64 / 96. Generoso, porque a fotografia carrega",
      },
      outcome: [
        "Um catálogo que expira direito, sozinho",
        "Menos de um segundo até a primeira pintura no 4G",
        "O cliente atualiza sem me chamar",
      ],
      coverAlt: "Home da Truffle N.B. Tricolore",
      gallery: [
        {
          alt: "Página inteira da Truffle N.B. Tricolore",
          caption: "Só o que a safra tem de verdade",
        },
      ],
    },
  },
};
