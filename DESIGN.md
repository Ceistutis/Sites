# Lume Arquitetura — sistema de design

## Tema visual e atmosfera
Lume é uma marca fictícia. A luz é o fio narrativo: aberturas, materiais naturais e espaços para o cotidiano. Tom calmo, preciso e acolhedor. As duas páginas compartilham identidade, serviços, imagens e compromisso com clareza. A básica prioriza leitura direta; a premium aumenta escala, variedade de composição e profundidade de interação.

Inventário do conceito: nome Lume; luz natural; pátio; sombra de folhas; travertino; carvalho; linho; espaços de escuta; desenho de interiores; jardim como limite; decisões de projeto; rotina de quem habita. Na página, a luz evocada pelo nome Lume se torna o fio que liga fotografias, espaços vazios e mudanças de escala.

## Paleta e papéis
| Token | Valor | Uso |
| --- | --- | --- |
| ground | #f0f0e9 | Pedra clara, fundo premium e showcase |
| paper | #fafaf6 | Fundo básico e campos |
| ink | #223a30 | Texto, ações e seções profundas |
| accent | #314e3e | Hover das ações |
| muted | #536156 | Informação secundária |
| sage | #dce2d7 | Superfícies de contato e comparação |
| focus | #a36e16 | Contorno de foco de 3 px |

## Tipografia
Manrope regular para títulos e wordmark; DM Sans para textos e formulários. Fontes hospedadas localmente, com font-display swap. Headline premium até 136 px; básica até 76 px. Corpo 16–18 px; notas a partir de 13 px. Títulos principais curtos e até duas linhas. Hierarquia por escala e espaço, sem depender de cor.

## Componentes e estados
Botões retangulares, mínimo 54 px de altura, preenchimento verde e seta. Hover com deslocamento de 2 px; active com retorno; foco visível independente de hover. Links de texto sublinhados. Imagens com cantos retos e dimensões declaradas. Diálogo nativo com foco contido, Escape e retorno ao acionador. Filtros são botões com aria-pressed e estado refletido na URL. Formulários possuem rótulos, tipos nativos, validação e confirmação local acessível.

## Layout e espaçamento
Margens fluidas de 22 a 88 px; largura máxima de 1800 px. Seções de 76 a 144 px de respiro vertical. A básica usa grids diretos; a premium alterna imagem horizontal, colunas editoriais, galeria assimétrica, campo verde, lista de metodologia e formulário. A página inicial usa duas opções comparáveis e tabela semântica.

## Profundidade
Superfícies sólidas, sem sombras em elementos estáticos. A sombra do menu móvel comunica sobreposição real. Sem gradientes decorativos, sem cards aninhados. O formulário usa bordas funcionais.

## Regras
Preservar conteúdo honesto: sem clientes, números de resultados ou depoimentos inventados. Identificar estudos conceituais. Nunca sugerir que o formulário enviou dados. Não carregar analytics, recursos remotos ou integrações. Imagens geradas por IA não devem ser tratadas como fotografias de obras executadas.

## Responsividade e movimento
Até 700 px: menu recolhido, colunas empilhadas, mídia com recortes próprios. Entre 701 e 1000 px: escalas e espaços ajustados, comparação textual empilhada. Conteúdo permanece legível sem animação; IntersectionObserver apenas adiciona uma revelação, sem esconder conteúdo inicialmente. Movimento de entrada, zoom de foto de 2,4 s e feedback nos controles; prefers-reduced-motion remove todos os movimentos. Não há loops automáticos.

## Guia de manutenção
Alterar tokens em src/index.css e regras em src/App.css. Conteúdo compartilhado e projetos em src/App.tsx. Toda nova imagem precisa de alt, proporção explícita e identificação de origem. Conservar semântica e estados de foco. Testar 1440, 768 e 375 px antes de publicar.

## Referências e decisões
A estrutura deste documento segue os nove grupos de informação do [Awesome DESIGN.md](https://github.com/VoltAgent/awesome-design-md), sem copiar a identidade de nenhuma marca. Auditoria baseada nas [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md).

Taste Skill: direção Photographs at uneven sizes, seed 48078024. A galeria assimétrica é aplicada na premium. O hero segue a referência gerada, priorizando o pedido de impacto visual. A básica conserva deliberadamente sua composição convencional para tornar a diferença de escopo visível. Sem redraws. A barra superior é navegação entre versões, não eyebrow promocional; esse falso positivo do inspetor é documentado e permitido com --allow eyebrow.

Veja design/BASICA.md, design/PREMIUM.md e design/REFERENCIAS.md.
