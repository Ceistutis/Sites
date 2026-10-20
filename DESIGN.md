---
name: Lume Arquitetura
description: Uma identidade, três níveis de experiência demonstrativa.
colors:
  ground: "#f0f0e9"
  paper: "#fafaf6"
  ink: "#223a30"
  accent: "#314e3e"
  muted: "#536156"
  sage: "#dce2d7"
  focus: "#a36e16"
  sp-paper: "#eeeae2"
  sp-ink: "#202c25"
  sp-night: "#202723"
  sp-muted: "#536056"
  sp-line: "#a4a99e"
  sp-light-muted: "#c5ccc4"
  sp-focus: "#b58430"
  sp-focus-dark: "#e1c382"
typography:
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 64px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.055em"
  body:
    fontFamily: "DM Sans, sans-serif"
    lineHeight: 1.65
  sp-display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(140px, 27vw, 530px)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  sp-headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(42px, 6.6vw, 108px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  sp-lead:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(24px, 2.3vw, 34px)"
    lineHeight: 1.4
    letterSpacing: "-0.025em"
rounded:
  square: "0"
  circular: "50%"
spacing:
  gutter: "clamp(22px, 5.5vw, 88px)"
  section: "clamp(76px, 10vw, 144px)"
  sp-gutter: "clamp(24px, 5vw, 96px)"
  sp-section: "clamp(88px, 10vw, 172px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  sp-button-primary:
    backgroundColor: "{colors.sp-ink}"
    textColor: "{colors.sp-paper}"
    padding: "17px 24px"
    rounded: "{rounded.square}"
  sp-input:
    backgroundColor: "#f6f3ed"
    textColor: "{colors.sp-ink}"
    padding: "12px"
    rounded: "{rounded.square}"
---

# Design System: Lume Arquitetura

## Overview

**Creative North Star: "A luz como fio narrativo"**

Lume é uma marca fictícia. A luz liga aberturas, materiais naturais e espaços para o cotidiano. O tom permanece calmo, preciso e acolhedor nas três experiências. Básica prioriza leitura direta; Premium aumenta escala, variedade de composição e profundidade de interação; Super Premium acrescenta planos fotográficos, capítulos editoriais e galeria espacial em `/super-premium`.

Esta é uma extensão explícita do sistema existente: os tokens sem prefixo e as decisões da Básica/Premium continuam vigentes. A família `sp-` pertence somente à nova rota e não redefine as páginas anteriores. Identidade, serviços e honestidade do conteúdo permanecem compartilhados; a Super Premium acrescenta a Casa Horizonte às imagens conceituais existentes.

Inventário do conceito preservado: nome Lume; luz natural; pátio; sombra de folhas; travertino; carvalho; linho; espaços de escuta; desenho de interiores; jardim como limite; decisões de projeto; rotina de quem habita.

**Key Characteristics:**

- Luz, fotografia e espaço vazio organizam a narrativa.
- Manrope e DM Sans mantêm a identidade entre os três níveis.
- Superfícies minerais e verdes profundos sustentam imagens de cantos retos.
- Conteúdo conceitual identificado e interações locais acessíveis.

## Colors

A base preserva pedra clara, papel, verde escuro e sálvia; a extensão torna o papel mais quente e os capítulos escuros mais minerais. Valores normativos no frontmatter.

### Primary

`ink` conduz texto e ações, com `accent` no hover da Básica/Premium. Na Super Premium, `sp-ink` conduz texto, ações e processo; `sp-night` distingue galeria e rodapé.

### Neutral

`ground` é o fundo da Premium e do showcase; `paper` serve à Básica e aos campos. `muted` sustenta informação secundária e `sage` as superfícies de contato/comparação. Na extensão, `sp-paper` é o fundo claro, `sp-muted` o texto secundário, `sp-line` a borda de campo e `sp-light-muted` o texto secundário em fundo escuro.

`focus` preserva o contorno original. A extensão usa `sp-focus` em superfícies claras e `sp-focus-dark` no hero, galeria, processo e rodapé. Erros de campo têm texto e borda próprios, descritos em SUPER_PREMIUM.md.

## Typography

Manrope regular para títulos e wordmark; DM Sans para textos e formulários. Fontes hospedadas localmente, com font-display swap. Headline Premium até 136 px; Básica até 76 px. Corpo 16–18 px; notas a partir de 13 px. Títulos principais curtos e até duas linhas. Hierarquia por escala e espaço, sem depender de cor.

Na Super Premium, o wordmark decorativo usa peso 500; títulos de conteúdo mantêm 400. O h1 usa `clamp(50px, 5.6vw, 94px)` e entrelinha 1.08. A escala de h2 e lead consta no frontmatter; h3 geral usa `clamp(26px, 3vw, 44px)`. Corpo editorial 17 px, reduzido a 16 px no celular; legendas e categorias 13 px. Parágrafos do manifesto ficam até 49ch. Overrides de processo, contato e mobile estão documentados em SUPER_PREMIUM.md.

**The Shared Type Rule.** Preservar as duas famílias entre as três rotas; aumentar a escala e variar composição sem substituir a identidade.

## Layout

Básica/Premium preservam margens fluidas de 22 a 88 px, largura máxima de 1800 px e seções de 76 a 144 px de respiro vertical. A Básica usa grids diretos; a Premium alterna imagem horizontal, colunas editoriais, galeria assimétrica, campo verde, lista de metodologia e formulário. A página inicial agora usa três opções comparáveis e tabela semântica em região horizontalmente navegável.

A Super Premium usa margens e ritmo próprios no frontmatter, imagens de largura total e grids assimétricos. Acima de 1920 px as margens passam a `max(96px, calc((100vw - 1728px) / 2))`. Os sete capítulos são hero, manifesto, arquitetura em destaque, galeria, materialidade, processo e contato; rodapé encerra a página.

Básica/Premium: até 700 px, menu recolhido, colunas empilhadas e mídia com recortes próprios; entre 701 e 1000 px, escalas e espaços ajustados, comparação textual empilhada. Super Premium: até 1000 px, gaps e cabeçalho diminuem e os campos de nome/e-mail empilham; até 700 px, menu recolhido, seções empilhadas, hero com CTA de largura total e galeria sem perspectiva. Parallax existe somente acima de 1000 px. Dimensões específicas e comportamento de imagem constam no documento da rota.

## Elevation & Depth

Superfícies sólidas, sem sombras em elementos estáticos. A sombra do menu móvel comunica sobreposição real. Sem gradientes decorativos, sem cards aninhados. O formulário usa bordas funcionais. Na Super Premium, a sombra do menu é `0 14px 28px #0c170e33`.

A extensão acrescenta profundidade através de fotografia, tipografia entre planos e perspectiva da galeria (1400 px). O hero usa um gradiente funcional de contraste sobre a fotografia, não um ornamento de superfície: sua finalidade é manter o texto inferior legível. Fotografia e recorte frontal avançam juntos; o wordmark desloca-se em sentido oposto. Não se promete uma câmera 3D real.

**The Readable Depth Rule.** Planos decorativos nunca substituem os títulos, descrições e controles em HTML.

## Shapes

Imagens, campos e botões principais conservam cantos retos. Na extensão, controles anterior/próximo são círculos contornados de 58 px, com 48 px no celular; o atalho de contato usa 88 px e desaparece no celular. Linhas separam processo, estudo expandido e seleção de materiais. Nenhum cartão envolvente é necessário para criar grupos de conteúdo.

## Components

### Básica e Premium preservadas

Botões retangulares, mínimo 54 px de altura, preenchimento verde e seta. Hover com deslocamento de 2 px; active com retorno; foco visível independente de hover. Links de texto sublinhados. Imagens com cantos retos e dimensões declaradas. Diálogo nativo com foco contido, Escape e retorno ao acionador. Filtros são botões com aria-pressed e estado refletido na URL. Formulários possuem rótulos, tipos nativos, validação e confirmação local acessível.

IntersectionObserver apenas adiciona uma revelação, sem esconder conteúdo inicialmente. Movimento de entrada, zoom de foto de 2,4 s e feedback nos controles; prefers-reduced-motion remove movimentos. Não há loops automáticos.

### Extensão Super Premium

Botão principal tem mínimo 56 px, hover de fundo e seta SVG deslocada 4 px. A variante clara do hero usa fundo translúcido e contorno claro. Foco tem contorno de 3 px, offset 6 px; links textuais têm mínimo 48 px. Menu móvel informa aria-expanded, fecha em seleção, Escape ou saída do foco do cabeçalho; Escape retorna ao acionador.

Galeria contém três estudos, seleção pela URL `projeto`, botões anterior/próximo, indicadores, cartões clicáveis, setas/Home/End e swipe horizontal por toque. Não há autoplay. A legenda anuncia atualizações com aria-live; estudo usa details/summary nativos. Materialidade é um grupo de quatro botões aria-pressed, não um tablist; Pedra é a seleção inicial. Troca atualiza imagem, título e descrição.

Formulário possui quatro campos rotulados, mensagens ligadas por aria-describedby, aria-invalid, foco no primeiro erro e status de validação local. Não há envio ou armazenamento. Movimentos GSAP são limitados a transforms/opacidade, com matchMedia e limpeza via useGSAP; comportamento completo em MOTION_SPEC.md.

## Do's and Don'ts

### Do:

- **Do** preservar as regras da Básica/Premium e manter tokens Super Premium no escopo da nova rota.
- **Do** identificar estudos conceituais e a origem gerada por IA das imagens.
- **Do** manter conteúdo legível em repouso, foco visível e equivalentes de teclado/toque.
- **Do** testar as composições em desktop, tablet e celular e respeitar movimento reduzido.

### Don't:

- **Don't** inventar clientes, números de resultados ou depoimentos.
- **Don't** sugerir que o formulário enviou dados ou que imagens conceituais representam obras executadas.
- **Don't** carregar analytics, recursos remotos ou integrações para esta demonstração.
- **Don't** adicionar pin, scroll hijack, autoplay contínuo ou áudio automático à extensão.

### Manutenção e histórico preservados

Tokens compartilhados em src/index.css; regras da Básica/Premium/showcase em src/App.css; conteúdo compartilhado em src/App.tsx. A extensão reside em src/super-premium/SuperPremiumPage.tsx, super-premium.css e data.ts e entra por lazy import com Suspense. Toda nova imagem precisa de alt, proporção explícita e identificação de origem. Conservar semântica e estados de foco. A recomendação original de testar 1440, 768 e 375 px permanece; a extensão amplia a revisão para 1920, 1440, 1366, 768, 390 e 375 px.

A versão anterior deste documento seguia os nove grupos do Awesome DESIGN.md e citava as Web Interface Guidelines. Esta atualização preserva suas decisões nos oito grupos canônicos DESIGN.md. Taste Skill original: Photographs at uneven sizes, seed 48078024; galeria assimétrica na Premium, hero orientado pela referência gerada, Básica deliberadamente convencional para comparação de escopo. Sem redraws. A barra superior original é navegação entre versões, não eyebrow promocional; o falso positivo do inspetor foi documentado com --allow eyebrow. A extensão usa a direção name-as-monument, seed 516834966, ajustada ao briefing.

Veja design/BASICA.md, design/PREMIUM.md, design/REFERENCIAS.md, design/SUPER_PREMIUM.md e design/MOTION_SPEC.md. Referências visuais não são assets finais nem prova de comportamento do código. Não canonizado: eventuais ícones em glifos do legado não estabelecem padrão para novas superfícies; a extensão usa ícones SVG. Verificação desta atualização por fonte e composições; testes de navegador e seus limites estão registrados nos artefatos da tarefa, sem alegar métricas de campo.
