import type { Content } from './types';
import { ptProjects } from './pt.projects';

/* -------------------------------------------------------------------------
   PORTUGUÊS DO BRASIL.

   Não é tradução literal do inglês, e não deveria ser. O registro é o mesmo
   — direto, sem adjetivo de agência — mas as frases foram reescritas pra
   soar como alguém falando, que é o ponto do site inteiro. Onde a versão
   inglesa usa uma construção que só funciona em inglês, aqui entra outra
   coisa que diz o mesmo.

   >>> AS QUEBRAS DE LINHA <<<
   Os títulos são array, e as quebras são escolhidas por idioma. "I build /
   digital / experiences." tem três linhas curtas em inglês; em português a
   mesma frase é bem mais longa, e quebrar no mesmo lugar daria uma linha
   estourando a tela e duas quase vazias. Cada idioma compõe o próprio
   retângulo.

   Nenhum travessão em texto visível, igual ao inglês.
   ------------------------------------------------------------------------- */

export const pt: Content = {
  meta: {
    role: 'Desenvolvedor Full-Stack & Designer UX·UI',
    tagline: 'Desenho experiências. Construo sistemas.',
    description:
      'Portfólio de um desenvolvedor full-stack e designer de produto baseado em Berna, Suíça. Cinco produtos com o estudo de caso inteiro, a stack em produção, e estudos que rodam ao vivo.',
    country: 'Suíça',
    availability: 'Disponível para projetos selecionados',
    colophon: 'Composto em Archivo e Instrument Sans. Escrito à mão em Next.js e TypeScript.',
  },

  ui: {
    skipToContent: 'Pular para o conteúdo',
    menu: 'Menu',
    close: 'Fechar',
    open: 'Abrir',
    available: 'Disponível',
    sections: 'Seções',
    navigation: 'Navegação',
    caseStudyLabel: 'Estudo de caso',
    roleLabel: 'Full-stack · UX·UI',
    language: 'Idioma',
    cursor: { case: 'CASO', open: 'ABRIR', look: 'OLHAR', close: 'FECHAR', back: 'VOLTAR', home: 'INÍCIO' },
  },

  sections: {
    about: { name: 'Sobre', nav: 'Sobre', note: 'Uma pessoa, duas metades' },
    work: { name: 'Trabalho Selecionado', nav: 'Trabalho', note: 'Cinco produtos, do início ao ar' },
    capabilities: { name: 'Capacidades', nav: 'Capacidades', note: 'Da interface à infraestrutura' },
    experience: { name: 'Trajetória', nav: 'Trajetória', note: 'Em ordem inversa' },
    contact: { name: 'Contato', nav: 'Contato', note: 'Onde isto acaba e outra coisa começa' },
  },

  hero: {
    lines: ['Desenho', 'e construo', 'um produto.'],
    lead: 'Uma pessoa da pesquisa ao deploy. A decisão de interface já nasce sabendo o que custa construir, e o código já nasce sabendo o que precisa parecer.',
    proof: 'Cinco produtos no ar. Dá pra abrir todos aqui dentro, sem sair da página.',
    productsLabel: 'No ar',
    basedIn: 'Base',
    localTime: 'Hora local',
    languages: 'Idiomas',
    languagesValue: 'PT · DE · EN',
    scroll: 'Role para começar',
  },

  manifesto: {
    lines: ['Código é', 'meu material.'],
    paragraphs: [
      'Eu trabalho entre design systems, interfaces, arquitetura de front-end e experiências digitais. Meu processo liga estratégia, UX, design visual e engenharia, porque aprendi as duas metades na mesma época, sem ter para quem passar a outra.',
      'Isso já foi limitação. Hoje é o argumento: a decisão de interface é tomada já sabendo o que ela custa para construir, e o código é escrito já sabendo o que ele precisa parecer. Nada se perde na tradução, porque não existe tradução.',
    ],
    methodLabel: 'O método, sempre o mesmo',
    chain: [
      { step: 'Design', note: 'Pesquisa, fluxos, interface. Decidido enquanto ainda é barato mudar.' },
      { step: 'Sistema', note: 'Tokens e componentes, pra segunda tela custar uma fração da primeira.' },
      { step: 'Código', note: 'Escrito à mão. Sem construtor, sem tema pronto, sem handoff entre duas pessoas.' },
      { step: 'Deploy', note: 'Domínio, métrica, e o primeiro acesso de alguém que não sou eu.' },
    ],
    stats: {
      shipped: 'Produtos entregues',
      years: 'Anos construindo',
      tools: 'Ferramentas em produção',
      languages: 'Idiomas falados',
    },
  },

  work: {
    lines: ['Trabalho', 'selecionado.'],
    intro:
      'Cinco produtos, cada um levado da primeira conversa até o dia em que alguém que não sou eu abriu. Todos podem ser abertos aqui mesmo, rodando, sem sair desta página.',
    roleLabel: 'Papel',
    stackLabel: 'Stack',
    yearLabel: 'Ano',
    ctaAfter: 'Seu problema se parece com algum destes?',
    ctaAfterLink: 'Me conta',
    seeLive: 'Ver rodando',
    caseStudy: 'Estudo de caso',
    openCase: 'Abrir o estudo de caso de {title}',
    readCase: 'Ler o estudo de caso de {title}',
    statements: [
      { lines: ['Desenhar com', 'intenção.'], align: 'left' },
      { lines: ['Construir com', 'precisão.'], align: 'right' },
    ],
  },

  capabilities: {
    lines: ['O que', 'eu faço.'],
    intro:
      'Seis coisas, e só seis. Uma página de serviços com onze itens não diz “faço tudo”. Diz que ninguém decidiu o que isto é.',
    ctaAfter: 'Precisa das duas metades na mesma pessoa?',
    ctaAfterLink: 'Começar uma conversa',
    deliverablesLabel: 'O que você recebe',
    items: {
      'ux-ui': {
        title: 'Design UX / UI',
        summary: 'Pesquisa, fluxos de usuário, wireframes, interfaces e design systems.',
        text: 'Começa antes da primeira tela. O que a pessoa veio fazer aqui, em que ordem, e o que está no caminho. Estrutura se resolve primeiro e interface depois, porque uma tela bonita que responde a pergunta errada continua indo pro lixo.',
        deliverables: ['Fluxos de usuário', 'Wireframes', 'Design de UI no Figma', 'Protótipos', 'Especificação de handoff'],
      },
      frontend: {
        title: 'Desenvolvimento Frontend',
        summary: 'Interfaces responsivas, animação, performance e acessibilidade.',
        text: 'A maior parte das decisões de design morre durante o build. Eu escrevo a interface pra que o que foi combinado no arquivo seja o que vai pro ar, incluindo as partes que ninguém nota até quebrarem: ordem do teclado, anel de foco, contraste, e o segundo que a página leva pra aparecer em internet ruim.',
        deliverables: ['Interfaces em React / Next.js', 'Sistemas de movimento e rolagem', 'Core Web Vitals', 'WCAG 2.2 AA'],
      },
      'full-stack': {
        title: 'Desenvolvimento Full-Stack',
        summary: 'APIs, bancos de dados, autenticação e aplicações que escalam.',
        text: 'A metade que ninguém vê decide se o produto existe. Schema primeiro, depois a API, depois a interface que consome. Nessa ordem o modelo de dados continua sendo uma decisão, em vez de um acidente que endureceu ao longo de três sprints.',
        deliverables: ['Schemas em PostgreSQL', 'Endpoints REST', 'Autenticação e sessão', 'Assinaturas com Stripe', 'Publicação'],
      },
      'design-systems': {
        title: 'Design Systems',
        summary: 'Componentes reutilizáveis e ecossistemas de produto consistentes.',
        text: 'Tokens, componentes, e a regra escrita de quando usar cada um. O que faz virar sistema são as decisões já tomadas, e a biblioteca de componentes é só onde elas ficam guardadas. Bem feito, a segunda tela custa uma tarde e a décima custa uma hora.',
        deliverables: ['Arquitetura de tokens', 'Biblioteca de componentes', 'Documentação de uso', 'Base de acessibilidade'],
      },
      ai: {
        title: 'Engenharia de IA',
        summary: 'Recursos com LLM em produção, e IA como parte de como o trabalho é feito.',
        text: 'São duas coisas separadas, e eu faço as duas. Entregar recursos em cima de modelos de linguagem: resposta em streaming, contexto que cabe no orçamento, saída em que dá pra confiar na frente de um cliente pagante. E usar IA todo dia no meu próprio fluxo, nas partes do trabalho em que ela é de fato mais rápida: esqueleto de código, refatoração, cobertura de teste, segunda opinião às duas da manhã. Ela escreve rascunho. As decisões continuam minhas, e cada linha que sobrevive à revisão também.',
        deliverables: [
          'Integração com APIs de LLM',
          'Design de prompt e contexto',
          'Interfaces de chat em streaming',
          'Avaliação e barreiras de segurança',
          'Fluxo de build assistido por IA',
        ],
      },
      creative: {
        title: 'Desenvolvimento Criativo',
        summary: 'Experiências interativas, movimento e interfaces experimentais.',
        text: 'WebGL, canvas, narrativa guiada por rolagem, tipografia generativa. As três esculturas desta página estão aqui por causa disso. É também onde vão as horas que ninguém paga, que é a razão de tudo acima ir ficando melhor.',
        deliverables: ['Cenas em Three.js', 'Coreografia de rolagem', 'Visuais generativos', 'Protótipos interativos'],
      },
    },
  },

  stack: {
    lines: ['Ferramentas são', 'só o começo.'],
    intro:
      'Não é a lista de tudo que eu já abri uma vez. É o que está em produção agora, e o que cada peça está fazendo lá.',
    toolsWord: 'ferramentas',
    layersWord: 'camadas',
    primaryTool: 'Ferramenta principal desta camada',
    layers: {
      frontend: {
        title: 'Frontend',
        summary: 'O que a pessoa vê e toca. Onde design e código são a mesma decisão.',
      },
      backend: {
        title: 'Backend',
        summary: 'A metade que ninguém vê, e a que decide se o produto é real.',
      },
      design: {
        title: 'Design',
        summary: 'Onde a decisão é tomada enquanto ainda é barato mudar.',
      },
      ai: {
        title: 'IA',
        summary: 'Entregar recursos em cima de modelos, e usá-los pra construir mais rápido.',
      },
      workflow: {
        title: 'Fluxo',
        summary: 'Como o trabalho sai da minha máquina e continua vivo na de outra pessoa.',
      },
    },
    notes: {
      React: 'a base de tudo que eu construo desde 2022',
      'Next.js': 'roteamento, render no servidor, e o build deste site',
      TypeScript: 'contrato antes de execução, que é o que me deixa dormir',
      JavaScript: 'as partes anteriores ao framework, que continuam no ar',
      'Tailwind CSS': 'velocidade sem virar bagunça, com tokens por cima',
      CSS: 'grade, tipografia e movimento na unha quando importa',
      'Node.js': 'API, script de build, tudo que roda fora do navegador',
      PostgreSQL: 'uma tabela bem pensada resolve antes de virar problema',
      Supabase: 'auth, storage e realtime sem montar infraestrutura',
      'REST APIs': 'contrato tipado entre as duas metades do mesmo produto',
      Authentication: 'sessão, papéis, e as partes que não podem vazar',
      Stripe: 'assinatura e webhook em produção no knifes.me',
      Figma: 'penso antes de codar, porque errar aqui não custa nada',
      'UX Research': 'ler o que as pessoas já fazem antes de desenhar o que deveriam',
      Prototyping: 'feio e rápido, porque protótipo honesto é protótipo feio',
      'Design Systems': 'tokens, componentes e a regra de quando usar cada um',
      'Three.js': 'as esculturas desta página, sem framework por cima',
      Blender: 'preparar e reduzir malha antes de ela chegar na web',
      'Claude API': 'o modelo em que construo recursos e com quem eu trabalho junto',
      'OpenAI API': 'quando o projeto já roda nela, ou quando o preço decide',
      'Prompt design': 'orçamento de contexto, saída estruturada, modos de falha escritos',
      'Streaming UI': 'resposta token a token que continua legível enquanto chega',
      Evaluations: 'suíte de teste pra saída, porque "pareceu ok" não é verificação',
      'AI-assisted build': 'esqueleto, refatoração e cobertura: o rascunho, nunca a decisão',
      Git: 'o ctrl+z que funciona de verdade',
      GitHub: 'onde mora cada projeto deste portfólio',
      'CI/CD': 'buildar, conferir e publicar sem humano no meio',
      Agile: 'ciclo curto, incremento visível, sem cerimônia por cerimônia',
      'Accessibility audits': 'teclado, leitor de tela e contraste, antes do lançamento e não depois',
      'Performance budgets': 'um número combinado antes é o único orçamento que se sustenta',
    },
  },

  journey: {
    lines: ['A', 'trajetória.'],
    intro:
      'Do primeiro cliente ao produto próprio, do mais recente pro começo. Abra qualquer entrada pra ver a decisão que fez valer a pena listar.',
    turningPoint: 'Virada',
    detail: 'Detalhe',
    less: 'Menos',
    entries: {
      now: {
        period: '2026 / Hoje',
        title: 'Desenvolvedor Full-Stack & Designer de Produto',
        org: 'Independente · Berna, Suíça',
        summary:
          'Desenhando e construindo produtos digitais de ponta a ponta, para clientes na Suíça e no Brasil, e para mim.',
        details: [
          'Trabalhando em três idiomas: alemão, inglês e português.',
          'Cada projeto vai da pesquisa ao design, ao código e à publicação, com uma pessoa só respondendo por tudo.',
          'Disponível para freelas selecionados e colaborações de produto.',
        ],
        roles: ['Produto', 'UX/UI', 'Full-stack', 'Publicação'],
      },
      knifes: {
        period: '2026',
        title: 'knifes.me',
        org: 'Produto próprio · SaaS',
        summary:
          'Saí de front-end para o produto inteiro: banco, contas, assinatura, e a decisão do que não construir.',
        details: [
          'Motor de temas feito com variáveis CSS guardadas como linha no banco, então tema novo custa bytes, não bundle.',
          'Assinaturas Stripe com reconciliação por webhook rodando em produção.',
          'O trabalho mais difícil foi escopo: três recursos foram cortados depois de prontos.',
        ],
        roles: ['Produto', 'Full-stack', 'Banco de dados', 'Assinaturas'],
      },
      phobia: {
        period: '2026',
        title: 'PHOBIACORI',
        org: 'Cliente · Artista independente',
        summary:
          'A primeira loja que montei do zero. O problema nunca foi vender. Era fazer um catálogo de tiragem pequena não parecer estoque de fábrica.',
        details: [
          'O carrinho vive inteiro no navegador: sem conta, sem banco, sem custo mensal.',
          'A lista de produtos é um arquivo de dados tipado que a artista edita sozinha.',
          'Export estático no GitHub Pages: nada pra cair, nada pra renovar.',
        ],
        roles: ['Direção de arte', 'Design de UI', 'Front-end', 'Arquitetura de conteúdo'],
      },
      truffle: {
        period: '2025',
        title: 'Truffle N.B. Tricolore',
        org: 'Cliente · Suíça',
        summary:
          'Produto sazonal me obrigou a projetar para conteúdo que envelhece sozinho. O catálogo tinha que se desatualizar sem quebrar.',
        details: [
          'A disponibilidade comanda o layout: o que saiu da safra vira informação, não beco sem saída.',
          'React e Vite, primeira pintura abaixo de um segundo no 4G.',
          'O cliente edita o arquivo da safra; o texto de entrega acompanha sozinho.',
        ],
        roles: ['Design de UI', 'Front-end em React', 'Integração de conteúdo'],
      },
      sandra: {
        period: '2025',
        title: 'Sandra Hair Salon',
        org: 'Cliente · Buchs SG',
        summary:
          'Três idiomas no mesmo balcão. Foi aqui que parei de tratar tradução como camada e passei a tratar como arquitetura.',
        details: [
          'Idioma é estado, não rota: a troca mantém a posição de rolagem e reescreve moeda, horário e formato de data.',
          'Um arquivo de dicionário, sem etapa de build, sem CMS.',
          'O agendamento monta uma mensagem pronta no idioma que está selecionado.',
        ],
        roles: ['Design de UI', 'Front-end', 'Arquitetura de i18n'],
      },
      thayse: {
        period: '2025',
        title: 'Dra. Thayse Marques',
        org: 'Cliente · Rio de Janeiro',
        summary:
          'O primeiro projeto em que o trabalho de conteúdo pesou mais que o de interface: oito áreas do direito, cada uma com texto e intenção de busca próprios.',
        details: [
          'Um ano de contatos recebidos foi agrupado por necessidade, e esses grupos viraram a arquitetura do site.',
          'O formulário monta uma mensagem já classificada por área.',
          'Oito páginas indexadas substituíram uma só, e o ranking veio atrás do conteúdo, não o contrário.',
        ],
        roles: ['Pesquisa e conteúdo', 'Design de UI', 'Front-end', 'SEO técnico'],
      },
      foundations: {
        period: '2021 / 2024',
        title: 'Aprendendo as duas metades ao mesmo tempo',
        org: 'Autodidata',
        summary:
          'Aprendi design e engenharia no mesmo período, porque não tinha para quem passar a outra metade.',
        details: [
          'Comecei com HTML, CSS e Figma em 2021; React em 2022; TypeScript e Next.js em 2023.',
          'Banco de dados e autenticação chegaram em 2024, quando um projeto pessoal deixou de caber no navegador.',
          'O que já foi limitação hoje é o argumento: sem handoff, sem telefone sem fio.',
        ],
        roles: ['Fundamentos', 'Prática autodirigida'],
      },
    },
  },

  interludes: {
    label: 'Intervalo',
    items: {
      klio: {
        title: 'Klio',
        caption:
          'A musa da história, segurando um rolo de papel. Todo projeto começa assim: alguém precisa registrar uma coisa antes que ela se perca.',
        technique: 'Fotogrametria · malha reduzida a 6%',
      },
      daphne: {
        title: 'Daphne',
        caption:
          'Ela vira árvore no meio da fuga. É mais ou menos o que acontece com uma ideia entre o rascunho e o deploy. Chega do outro lado sendo outra coisa.',
        technique: 'Scan em nuvem de pontos · cor por vértice · sem textura',
      },
      'saint-andre': {
        title: 'Saint André',
        caption:
          'Cinco séculos depois, a dobra do tecido ainda está certa. É o argumento mais curto que eu conheço a favor de fazer devagar e à mão.',
        technique: 'Fotogrametria · textura de 1024px',
      },
    },
  },

  philosophy: {
    label: 'Filosofia',
    lines: ['Bom design', 'deve parecer', 'inevitável.'],
    text: 'As melhores experiências digitais não são só bonitas. São claras, úteis, rápidas e feitas pra evoluir. Quando você percebe o design, ele já devia parecer o único jeito possível de ter sido feito.',
  },

  contact: {
    lines: ['Vamos fazer', 'alguma coisa', 'que importa.'],
    lead: 'Disponível para freelas, colaborações de produto e projetos digitais criativos.',
    cta: 'Começar uma conversa',
    emailSubject: 'Contato sobre projeto',
    howItWorks:
      'Como funciona: você manda o problema em duas linhas. Eu respondo em até dois dias com o que eu faria, quanto tempo leva e quanto custa. Sem reunião de descoberta, sem proposta de trinta páginas.',
    basedIn: 'Base',
    coordinates: 'Coordenadas',
    responseTime: 'Tempo de resposta',
    responseValue: 'Em até dois dias',
    working: 'Formato',
    workingValue: 'Remoto ou presencial',
  },

  footer: {
    role: 'Desenvolvedor Full-Stack',
    socialLinks: 'Redes sociais',
  },

  livePreview: {
    viewport: 'Tela',
    openInNewTab: 'Abrir em nova aba',
    close: 'Fechar',
    loading: 'Carregando o site…',
    blockedTitle: 'Este aqui se recusa a ser embutido.',
    blockedText:
      'A política de segurança dele bloqueia embed, que é a configuração certa para um produto que lida com conta e pagamento. Fui eu que configurei assim.',
    blockedCta: 'Abrir em nova aba',
    screenshots: 'Capturas de {title}',
    liveSite: 'Site de {title} no ar',
    label: 'Visualização ao vivo de {title}',
  },

  project: {
    back: 'Trabalho',
    year: 'Ano',
    role: 'Papel',
    disciplines: 'Frentes',
    status: 'Estado',
    live: 'No ar',
    archived: 'Arquivado',
    challengeLabel: 'O desafio',
    challengeLines: ['O que estava', 'quebrado.'],
    approachLabel: 'A abordagem',
    approachLines: ['Como foi', 'feito.'],
    systemLabel: 'Design system',
    systemLines: ['As regras', 'por trás.'],
    palette: 'Paleta',
    typography: 'Tipografia',
    components: 'Componentes',
    grid: 'Grade',
    spacing: 'Espaçamento',
    developmentLabel: 'Desenvolvimento',
    developmentLines: ['Sobre o que', 'ele roda.'],
    outcome: 'Resultado',
    experienceLabel: 'Experiência final',
    experienceLines: ['Veja', 'rodando.'],
    galleryHint: 'Arraste, role ou use as setas.',
    visitLive: 'Ver o projeto no ar',
    source: 'Código',
    privateRepo: 'Repositório fechado. O código é do cliente.',
    ctaEnd: 'Foi assim que eu resolvi este. Me conta o seu.',
    ctaEndLink: 'Começar uma conversa',
    nextProject: 'Próximo projeto',
  },

  notFound: {
    label: 'Não encontrado',
    title: 'Esta página não existe.',
    text: 'Ou existiu, e saiu do ar. O caminho de volta é o mesmo nos dois casos.',
    cta: 'Voltar ao início',
  },

  projects: ptProjects,
};
