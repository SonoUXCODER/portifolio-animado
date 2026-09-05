import type { ProjectCopy } from './types';

/* -------------------------------------------------------------------------
   OS ESTUDOS DE CASO, EM PORTUGUÊS.

   Ver en.projects.ts para o porquê da separação e para a regra dos arrays
   casados por índice com shared.ts.
   ------------------------------------------------------------------------- */

export const ptProjects: Record<string, ProjectCopy> = {
  phobiacori: {
    title: 'PHOBIACORI',
    kind: 'E-commerce / Produto Digital',
    badge: 'Cliente',
    summary: 'Loja de uma ilustradora de nanquim. Tiragem pequena, sem estoque, sem cadastro.',
    intro:
      'A PHOBIACORI desenha bicho estranho a nanquim desde 2019 e vendia por mensagem direta, uma de cada vez. A loja tinha que caber nesse jeito de trabalhar: tiragem pequena, embalagem na mão, nada parecido com esteira.',
    note: 'o carrinho vive no navegador de quem visita. sem conta, sem cadastro, sem banco de dados.',
    disciplines: ['DIREÇÃO DE ARTE', 'UX/UI', 'FRONT-END'],
    role: ['Direção de arte', 'Design de UI', 'Front-end', 'Arquitetura de conteúdo', 'Publicação'],
    challenge:
      'Vender arte em tiragem pequena não tem nada a ver com tocar uma loja genérica. O catálogo muda toda semana, metade das peças é única, e um layout de marketplace fazia o trabalho dela parecer estoque de fábrica. Somado a isso: sem orçamento para backend, e sem paciência para uma plataforma que fica com uma parte de cada venda.',
    approach: [
      {
        step: 'Pesquisa',
        title: 'Lendo dois anos de mensagens diretas',
        text: 'Antes de qualquer interface, eu li como ela já vendia. Ninguém nunca perguntou tabela de tamanho. Perguntavam se a peça ainda estava disponível e como ela seria embalada. Essa única descoberta decidiu toda a hierarquia de informação.',
      },
      {
        step: 'Estratégia de UX',
        title: 'Um acervo, não uma vitrine',
        text: 'Cada peça virou uma ficha: o desenho grande, o texto ao lado, a disponibilidade escrita em português claro. Comprar são três toques e nunca pergunta quem você é. O carrinho vive no armazenamento local e o pedido sai como mensagem escrita.',
      },
      {
        step: 'Wireframes',
        title: 'Uma página, dois trabalhos',
        text: 'Loja e arquivo dividem a mesma rolagem. Separar em rotas diferentes testou pior: as pessoas chegavam para olhar, e só decidiam comprar depois de olhar. Peça esgotada continua visível como arquivo em vez de sumir.',
      },
      {
        step: 'Design de UI',
        title: 'Xerox, fita e nanquim',
        text: 'A interface empresta a linguagem material do próprio trabalho: branco de papel, preto de nanquim, um vermelho para alerta. Nada é centralizado, nada é arredondado, e toda imagem fica levemente fora da grade de propósito.',
      },
      {
        step: 'Desenvolvimento',
        title: 'Estático, e por isso permanente',
        text: 'Next.js com export estático no GitHub Pages. Não existe servidor para cair, conta mensal, nem banco para migrar. A lista de produtos é um arquivo de dados tipado que ela edita sozinha.',
      },
    ],
    system: {
      palette: ['Nanquim', 'Papel', 'Jornal', 'Vermelho de alerta', 'Ocre'],
      type: [
        { role: 'Display', note: 'Peso de cartaz, usado em três tamanhos só' },
        { role: 'Técnica', note: 'Preço, estado de estoque, número de pedido' },
        { role: 'Texto', note: 'Descrição e informação de envio' },
      ],
      components: ['Ficha da peça', 'Gaveta do carrinho', 'Selo de disponibilidade', 'Figura colada', 'Montador de pedido'],
      grid: '12 colunas, medianiz de 24px, máximo de 1180px. As peças furam a grade de propósito',
      spacing: '4 / 8 / 16 / 32 / 64. Uma escala só, sem valor solto',
    },
    outcome: [
      'Ela atualiza o catálogo sem me chamar',
      'Peça esgotada sai da vitrine sozinha',
      'Custo zero de operação: sem servidor, sem taxa de plataforma',
    ],
    coverAlt: 'Home da PHOBIACORI, com desenhos a nanquim colados com fita sobre fundo de papel',
    gallery: [
      {
        alt: 'Página inteira da PHOBIACORI, da capa até o rodapé, loja e arquivo juntos',
        caption: 'Loja e arquivo na mesma página',
      },
    ],
  },

  'knifes-me': {
    title: 'knifes.me',
    kind: 'SaaS / Produto Próprio',
    badge: 'Produto próprio',
    summary: 'Meu produto: um link na bio em que a página é de fato da pessoa.',
    intro:
      'Comecei porque toda ferramenta de link na bio parecia a mesma página vestindo outra cor. Aqui a pessoa escolhe a paleta, o fundo, a música e o layout, e o resultado continua sendo dela, não do template.',
    note: 'a parte difícil nunca foi construir. foi decidir o que não construir.',
    disciplines: ['PRODUTO', 'UX/UI', 'FULL-STACK'],
    role: ['Produto', 'Design de UI', 'Front-end', 'Back-end', 'Banco de dados', 'Assinaturas'],
    challenge:
      'Personalização de verdade custa caro em performance: cada tema novo vira mais CSS entregue a quem só queria tocar num link. O produto tinha que deixar mudar quase tudo sem deixar a página pública mais lenta para quem não muda nada.',
    approach: [
      {
        step: 'Pesquisa',
        title: 'Onde as ferramentas existentes param',
        text: 'Cataloguei o que os concorrentes deixam mudar, e onde travam. A parede é sempre a mesma: cor sim, estrutura não. Estrutura é exatamente o que faz uma página parecer com alguém.',
      },
      {
        step: 'Estratégia de UX',
        title: 'Editor para o dono, nada para quem visita',
        text: 'Os dois públicos nunca dividem código. O dono recebe um editor ao vivo atrás de autenticação; quem visita recebe uma página renderizada no servidor, sem bundle de editor, sem estado de framework e sem resolver tema no cliente.',
      },
      {
        step: 'Wireframes',
        title: 'Prévia ao lado do controle, sempre',
        text: 'Cada controle fica ao lado da coisa que ele muda, e a prévia é a página de verdade, não uma aproximação dela. Nada para publicar, nada para confirmar: salvar é o deploy.',
      },
      {
        step: 'Design de UI',
        title: 'Uma moldura escura que desaparece',
        text: 'A interface é quase monocromática de propósito, para nunca competir com a página que está sendo montada dentro dela. O único acento violeta marca estado, e nada além disso.',
      },
      {
        step: 'Desenvolvimento',
        title: 'O tema é dado, não código',
        text: 'Um tema é um punhado de variáveis CSS guardadas como linha. O perfil público renderiza no servidor já com esses valores dentro, então tema novo custa bytes num banco, não kilobytes num bundle.',
      },
    ],
    system: {
      palette: ['Vazio', 'Ameixa', 'Violeta de sinal', 'Violeta profundo', 'Branco'],
      type: [
        { role: 'Display', note: 'Tracking fechado, usado no nome do perfil' },
        { role: 'Interface', note: 'Rótulo do editor, formulário, painel' },
        { role: 'Técnica', note: 'Slug, chave, número de analytics' },
      ],
      components: [
        'Bloco de link',
        'Editor de tokens de tema',
        'Moldura de prévia ao vivo',
        'Fluxo de autenticação',
        'Trava de plano',
        'Cartão de analytics',
      ],
      grid: '12 colunas no painel, coluna única de 520px no perfil público',
      spacing: '4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Guiado por design tokens',
    },
    outcome: [
      'Perfil público no ar em knifes.me/nome',
      'Tema editável sem tocar em código',
      'Contas, ranking e assinatura Stripe em produção',
    ],
    coverAlt: 'Página de perfil do knifes.me, do topo ao rodapé',
    gallery: [
      {
        alt: 'Tela do editor do knifes.me, com a prévia ao vivo ao lado dos controles',
        caption: 'Muda aqui, vê na hora',
      },
    ],
  },

  'sandra-hair-salon': {
    title: 'Sandra Hair Salon',
    kind: 'Site Institucional / Multilíngue',
    badge: 'Cliente',
    summary: 'Um salão suíço em três idiomas, com preço em CHF e agendamento pelo celular.',
    intro:
      'Um salão em Buchs (SG) atende alemão, inglês e português no mesmo balcão. O site tinha que fazer exatamente isso, sem virar três sites mantidos por uma pessoa que não escreve código.',
    note: 'foi aqui que parei de tratar tradução como camada e passei a tratar como arquitetura.',
    disciplines: ['UX/UI', 'FRONT-END', 'I18N'],
    role: ['Design de UI', 'Front-end', 'Arquitetura de i18n', 'Publicação'],
    challenge:
      'O bairro é trilíngue. Traduzir depois, como camada por cima, sempre quebra alguma coisa: o preço sai errado, o botão estoura, alguém cai em meia página em alemão. E o salão precisava mudar os próprios preços sem abrir editor de código.',
    approach: [
      {
        step: 'Pesquisa',
        title: 'Qual idioma de fato entra pela porta',
        text: 'Três dias de observação no balcão, não de analytics. Alemão para marcar horário, português para as conversas longas, inglês para quem está de passagem. Essa ordem virou a ordem do seletor de idioma.',
      },
      {
        step: 'Estratégia de UX',
        title: 'Uma página, três leituras',
        text: 'Idioma é estado, não rota. A troca acontece no lugar, mantém a posição de rolagem, e reescreve moeda, horário de funcionamento e formato de data junto com as palavras.',
      },
      {
        step: 'Wireframes',
        title: 'A tabela de preço é a página',
        text: 'Todo o resto existe para sustentar ela. Serviço, duração, preço em CHF, e um botão de agendamento grudado em cada linha, porque a pergunta que um site de salão precisa responder é sempre “quanto custa, quanto demora”.',
      },
      {
        step: 'Design de UI',
        title: 'Dourado sobre café',
        text: 'O interior do salão é madeira escura e latão quente, então o site também é. A tipografia é generosa, o contraste é alto, e os alvos de toque foram dimensionados para um polegar molhado numa sala de espelho.',
      },
      {
        step: 'Desenvolvimento',
        title: 'Um dicionário, sem etapa de build',
        text: 'Cada texto vive num dicionário único indexado por idioma. A tabela de serviços lê um arquivo de dados que o salão edita direto; o botão de agendamento monta uma mensagem de WhatsApp pronta no idioma que estiver selecionado.',
      },
    ],
    system: {
      palette: ['Café', 'Dourado', 'Bronze', 'Champanhe', 'Creme'],
      type: [
        { role: 'Display', note: 'Nome do salão e títulos de seção' },
        { role: 'Texto', note: 'Descrição de serviço em três idiomas' },
        { role: 'Técnica', note: 'Preço em CHF e duração, alinhados' },
      ],
      components: ['Seletor de idioma', 'Linha de serviço', 'Etiqueta de preço', 'Montador de agendamento', 'Bloco de horários'],
      grid: '12 colunas, medianiz de 20px, máximo de 1140px. Coluna única abaixo de 720px',
      spacing: '8 / 16 / 24 / 40 / 64. Passos maiores que o normal, por causa do polegar',
    },
    outcome: [
      'Três idiomas sem três páginas',
      'Tabela de serviços que o salão atualiza sozinho',
      'Pedido de horário chega escrito, direto do celular',
    ],
    coverAlt: 'Home do Sandra Hair Salon, em dourado sobre quase preto',
    gallery: [
      {
        alt: 'Página inteira do salão, com a tabela de serviços e o bloco de agendamento',
        caption: 'Preço em CHF, sem letra miúda',
      },
    ],
  },

  'thayse-marques': {
    title: 'Dra. Thayse Marques',
    kind: 'Site Institucional / Triagem de Contato',
    badge: 'Cliente',
    summary: 'Site de advocacia em que o formulário lê o caso e manda para a área certa.',
    intro:
      'Um escritório no Rio recebia caso de família, trabalhista e previdenciário pelo mesmo número, sem contexto nenhum junto. A ideia foi virar a primeira conversa do avesso: a triagem acontece antes do contato, não durante.',
    note: 'oito páginas em vez de uma foi decisão de conteúdo. o ranking veio junto, de brinde.',
    disciplines: ['ESTRATÉGIA DE CONTEÚDO', 'UX/UI', 'FRONT-END'],
    role: ['Pesquisa e conteúdo', 'Design de UI', 'Front-end', 'SEO técnico', 'Publicação'],
    challenge:
      'Tudo chegava pelo mesmo canal, sem contexto. A advogada gastava a primeira meia hora de cada conversa descobrindo do que o caso se tratava, e boa parte deles nem era dela para pegar.',
    approach: [
      {
        step: 'Pesquisa',
        title: 'Separando um ano de primeiras mensagens',
        text: 'Agrupei os contatos recebidos pelo que a pessoa de fato precisava, não pelo jeito como ela escreveu. Saíram oito grupos, e esses oito grupos viraram a arquitetura do site.',
      },
      {
        step: 'Estratégia de UX',
        title: 'Triagem antes do contato',
        text: 'Cada área do direito é uma página com linguagem própria, então as pessoas se classificam antes de escrever qualquer coisa. O formulário curto no fim de cada página monta uma mensagem que já diz a que área ela pertence.',
      },
      {
        step: 'Wireframes',
        title: 'Uma resposta por tela',
        text: 'Texto jurídico é denso por natureza, então cada tela carrega uma ideia e uma saída. O caminho de “tenho este problema” até “mensagem escrita” são quatro telas, sem beco sem saída.',
      },
      {
        step: 'Design de UI',
        title: 'Sério sem ser frio',
        text: 'Papel osso, texto quase preto, um único rosa suave para ênfase. O retrato é grande e quente de propósito: numa decisão dessas as pessoas estão escolhendo uma pessoa, não um escritório.',
      },
      {
        step: 'Desenvolvimento',
        title: 'Oito páginas estáticas, indexadas direito',
        text: 'HTML e CSS escritos à mão, dados estruturados para o escritório, um script para o formulário. Carrega em menos de um segundo em internet de celular, que é de onde vem a maior parte do acesso.',
      },
    ],
    system: {
      palette: ['Quase preto', 'Osso', 'Areia', 'Rosa suave', 'Branco'],
      type: [
        { role: 'Display', note: 'Nome das áreas e manchetes' },
        { role: 'Texto', note: 'Texto jurídico longo, medida de 62ch' },
        { role: 'Técnica', note: 'Prazo, número de artigo, data' },
      ],
      components: ['Cartão de área', 'Formulário de caso', 'Montador de mensagem', 'Bloco de credenciais', 'Linha de FAQ'],
      grid: '12 colunas, medianiz de 24px, máximo de 1120px',
      spacing: '4 / 8 / 16 / 24 / 40 / 72',
    },
    outcome: [
      'O contato chega escrito e já separado por área',
      'Oito páginas indexadas em vez de uma',
      'Agendamento sem ida e volta de mensagem',
    ],
    coverAlt: 'Home do site da Dra. Thayse Marques, com retrato e o menu das áreas do direito',
    gallery: [
      { alt: 'Página inteira do escritório, do topo ao rodapé', caption: 'A página inteira, de cima a baixo' },

    ],
  },

  'truffle-nb': {
    title: 'Truffle N.B.',
    kind: 'Catálogo / Produto Sazonal',
    badge: 'Cliente',
    summary: 'Catálogo de trufa fresca italiana, entregue em toda a Suíça.',
    intro:
      'Trufa fresca dura dias, não meses. O site tinha que dizer o que existe hoje e quanto tempo demora para chegar, e nada além disso, porque tudo além disso envelhece mais rápido do que alguém consegue editar.',
    note: 'projetar para conteúdo que envelhece sozinho mudou como eu penso prazo de validade.',
    disciplines: ['UX/UI', 'FRONT-END'],
    role: ['Design de UI', 'Front-end em React', 'Integração de conteúdo', 'Publicação'],
    challenge:
      'Produto sazonal envelhece na tela. Uma página estática ainda anunciando uma trufa que acabou há três semanas é pior do que não ter página nenhuma. Custa confiança, e confiança é o produto inteiro quando alguém está gastando CHF 200 em algo que não pode ver.',
    approach: [
      {
        step: 'Pesquisa',
        title: 'Como a safra realmente anda',
        text: 'Três variedades, três janelas, e um raio de entrega que muda com o calendário. Mapeei o ano inteiro antes de desenhar qualquer coisa, porque o calendário é a arquitetura de informação de verdade aqui.',
      },
      {
        step: 'Estratégia de UX',
        title: 'Disponibilidade é o filtro principal',
        text: 'A página abre no que está na safra agora. Todo o resto fica uma rolagem abaixo, marcado com o mês em que volta. Fora de estoque vira informação em vez de beco sem saída.',
      },
      {
        step: 'Wireframes',
        title: 'Três cartões e uma linha de entrega',
        text: 'O catálogo inteiro é curto de propósito. Acrescentar filtro, ordenação e campo de busca a nove produtos seria interface por interface.',
      },
      {
        step: 'Design de UI',
        title: 'Terra, ferrugem, linho',
        text: 'Cores tiradas do próprio produto. A fotografia corre grande e sem corte; a tipografia fica pequena e quieta, para nada competir com o que está sendo vendido.',
      },
      {
        step: 'Desenvolvimento',
        title: 'O catálogo lê um arquivo de dados',
        text: 'React e Vite, com a lista de produtos num arquivo tipado que o cliente edita. O que sai da safra some da lista e o texto de entrega muda junto. O site expira direito, sozinho.',
      },
    ],
    system: {
      palette: ['Ferrugem', 'Dourado', 'Trigo', 'Linho', 'Quase branco'],
      type: [
        { role: 'Display', note: 'Nome dos produtos, grande e espaçado' },
        { role: 'Texto', note: 'Origem, peso, janela de entrega' },
        { role: 'Técnica', note: 'Preço por grama e prazo' },
      ],
      components: ['Cartão de produto', 'Selo de safra', 'Estimador de entrega', 'Nota de origem', 'Montador de pedido'],
      grid: '12 colunas, medianiz de 32px, máximo de 1240px',
      spacing: '8 / 16 / 32 / 64 / 96. Generoso, porque a fotografia carrega',
    },
    outcome: [
      'Um catálogo que expira direito, sozinho',
      'Menos de um segundo até a primeira pintura no 4G',
      'O cliente atualiza sem me chamar',
    ],
    coverAlt: 'Home da Truffle N.B. Tricolore',
    gallery: [

      { alt: 'Página inteira da Truffle N.B. Tricolore', caption: 'Só o que a safra tem de verdade' },
    ],
  },
};
