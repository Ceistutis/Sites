export const asset = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}.webp`;

export type ConceptProject = {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  intention: string;
  materials: string;
};

export const selectedWorks: ConceptProject[] = [
  {
    id: "patio",
    name: "Casa Pátio",
    category: "Arquitetura residencial",
    image: "casa",
    alt: "Casa conceitual em concreto e madeira, aberta para um jardim interno.",
    description: "Um jardim no centro. A vida acontece ao redor.",
    intention:
      "Um pátio organiza os percursos e aproxima os ambientes da paisagem. Aberturas generosas conectam a casa ao jardim; os espaços de descanso encontram abrigo nos volumes mais reservados.",
    materials:
      "Concreto aparente, madeira natural e vidro. Luz filtrada pela vegetação.",
  },
  {
    id: "essencia",
    name: "Interior Essência",
    category: "Design de interiores",
    image: "interior",
    alt: "Interior conceitual com sofá claro, madeira e luz natural ampla.",
    description: "Texturas que acolhem. Espaço para o que importa.",
    intention:
      "Integração entre estar, leitura e convívio. O mobiliário baixo mantém a vista livre, enquanto texturas naturais trazem proximidade a uma composição de linhas precisas.",
    materials:
      "Carvalho, linho, pedra clara e luz indireta. Um equilíbrio entre precisão e conforto.",
  },
  {
    id: "atelier",
    name: "Ateliê Aberto",
    category: "Consultoria de espaços",
    image: "atelier",
    alt: "Ateliê conceitual iluminado por grandes janelas, com mesa e vegetação.",
    description: "Um lugar para criar, encontrar e recomeçar.",
    intention:
      "Reorganização de um ambiente de trabalho criativo. A mesa compartilhada concentra encontros; as laterais acomodam materiais, pausas e trabalho individual.",
    materials:
      "Madeira, superfícies minerais e vegetação. Flexibilidade sem perder a identidade.",
  },
];

export const materials = [
  {
    id: "concreto",
    name: "Concreto",
    image: "horizonte",
    position: "48% 52%",
    title: "A estrutura também é expressão.",
    text: "Planos contínuos e marcas de textura dão presença à arquitetura. A sombra revela a profundidade de cada encontro.",
  },
  {
    id: "madeira",
    name: "Madeira",
    image: "interior",
    position: "60% 50%",
    title: "Calor que se percebe de perto.",
    text: "Veios, tons e superfícies naturais aproximam o espaço de quem o habita. O desenho da marcenaria faz parte da arquitetura.",
  },
  {
    id: "pedra",
    name: "Pedra",
    image: "detail",
    position: "75% 50%",
    title: "O tempo inscrito na matéria.",
    text: "A pedra cria continuidade entre piso, parede e detalhe. Suas variações naturais tornam cada superfície singular.",
  },
  {
    id: "luz",
    name: "Luz e vidro",
    image: "atelier",
    position: "30% 50%",
    title: "A luz transforma o mesmo lugar.",
    text: "O vidro aproxima interior e paisagem. A orientação das aberturas e a iluminação fazem a matéria mudar ao longo do dia.",
  },
];

export const processSteps = [
  {
    title: "Conceito",
    text: "Antes do desenho, a escuta. Sua rotina, o lugar e o que você deseja viver orientam as primeiras possibilidades.",
    output: "Programa de necessidades · Estudos de implantação",
    image: "casa",
  },
  {
    title: "Desenvolvimento",
    text: "As ideias ganham proporção. Layout, luz e materiais são estudados juntos, com clareza para decidir cada escolha.",
    output: "Estudo espacial · Materiais · Compatibilização",
    image: "interior",
  },
  {
    title: "Materialização",
    text: "O cuidado chega ao detalhe. Organizamos as definições do projeto para que a intenção acompanhe sua realização.",
    output: "Detalhamento · Especificações · Orientação",
    image: "detail",
  },
];
