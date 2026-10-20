# Super Premium — implementação documentada

Rota `/super-premium`, Lume Arquitetura. Registro de 19/10/2026 derivado de SuperPremiumPage.tsx, super-premium.css, data.ts, App.tsx e index.css. PRODUCT.md confirma marca fictícia, português brasileiro, três serviços, projetos conceituais e formulário local. DESIGN.md continua sendo a autoridade compartilhada; valores `sp-` não alteram Básica/Premium.

## Direção e composição

“Além da forma.” / “Space Beyond Form” transforma a luz evocada pelo nome em escala e intervalo entre planos. A implementação preserva Manrope e DM Sans e alterna papel mineral com verde grafite. Os três comps em references/super-premium foram inspecionados como referências de direção, não screenshots do resultado. IMAGE_PROMPTS.md conserva os prompts.

Hero: o comp estabelece fotografia total, nome monumental parcialmente oculto pelo telhado e CTA inferior. O código mantém essas relações em camadas HTML; não usa a imagem do comp com texto embutido. Galeria: conserva centro dominante e laterais recuadas, mas usa três projetos conceituais existentes e legenda sincronizada com a seleção real. Materialidade: mantém duas escalas de imagem e seleção por sublinhado, mas substitui as fotografias do comp pelas imagens locais disponíveis e elimina o eyebrow e a navegação duplicada desenhados no comp. Não se promete fidelidade fotográfica aos comps.

## Sete capítulos existentes

| Capítulo | Composição e função |
| --- | --- |
| Hero | Casa Horizonte em tela inteira; nome entre fotografia e recorte; título HTML, CTA para projetos e identificação conceitual. |
| Manifesto | h2 amplo; grid 4fr/5fr com gap 16vw; imagem até 430 px, texto até 49ch; apresentação dos três serviços. |
| Arquitetura em destaque | Cabeçalho dividido; janela de imagem `clamp(460px, 54vw, 900px)`; legenda em duas colunas, gap 16vw. |
| Galeria | Fundo grafite, três painéis de profundidade, controles e descrição ativa, estudo expansível. |
| Materialidade | Grid 4fr/7fr com gap 8vw; imagem vertical à esquerda e imagem selecionável à direita; quatro materiais. |
| Processo | Fundo verde profundo; três linhas numeradas — Conceito, Desenvolvimento, Materialização — com texto, entregáveis e imagem; grid 1.15fr/1fr e gap 9vw. |
| Contato | Título amplo, texto e formulário em 1fr/1.25fr com gap 13vw; confirmação explicitamente demonstrativa. |

Rodapé escuro reúne marca, retorno ao topo, links Básica/Premium/showcase e aviso de ficção/imagens IA. A home mostra três opções e tabela dos recursos implementados.

## Tokens e escala efetivos

Cores e famílias normativas no frontmatter de DESIGN.md. Margem `clamp(24px, 5vw, 96px)`; respiro vertical `clamp(88px, 10vw, 172px)`; padding lateral usa também safe-area-inset-left. Acima de 1920 px o conteúdo textual segue margem `max(96px, calc((100vw - 1728px) / 2))`; fotografias podem continuar sangradas.

| Papel | Desktop | Até 700 px |
| --- | --- | --- |
| Wordmark | clamp(140px, 27vw, 530px), 500, entrelinha .95 | 30vw; tracking -.04em |
| h1 | clamp(50px, 5.6vw, 94px), entrelinha 1.08 | clamp(41px, 11.5vw, 70px) |
| h2 geral | clamp(42px, 6.6vw, 108px), entrelinha 1.05 | clamp(36px, 10.2vw, 64px), entrelinha 1.1 |
| Processo h2 | clamp(40px, 5.7vw, 96px) | 9.2vw |
| Contato h2 | clamp(42px, 7vw, 118px) | 9.2vw |
| Lead | clamp(24px, 2.3vw, 34px), entrelinha 1.4 | 24px |
| Corpo editorial | 17px, entrelinha herdada 1.65 | 16px |
| Legendas/categorias | 13px | 13px |

Títulos usam tracking -.04em, salvo overrides explícitos. Título do projeto no celular usa 25px/1.15; etapas 30px; descrição de material 23px. Sem escala nova de fontes por seção.

## Hero e imagens

Hero com `height: 100svh`, mínimo 720 px; entre 701 e 1000 px mínimo 850 px; até 700 px mínimo 760 px. Pode ultrapassar a altura de um dispositivo curto para preservar leitura, em vez de comprimir os controles.

Ordem interna: fotografia de fundo (z0), sombra uniforme do céu (z1), wordmark (z2), recorte frontal com alpha (z3), gradiente funcional de contraste (z4). Cena decorativa inteira tem aria-hidden. Conteúdo inferior e legenda ficam em z5; cabeçalho z10. Gradiente: 180deg, #101b1945 no início, transparente a 25% e 50%, #111b199c ao fim. O título acessível é o h1, não as quatro letras decorativas.

horizonte.webp e horizonte-front.webp derivam de ImageGen; o segundo é recorte transparente alinhado à fotografia, ambos declarados 1536×1024. Foto e recorte usam object-fit cover e o mesmo object-position: 50% 50% desktop, 45% 50% até 1000 px, 44% 50% até 700 px. O movimento mantém as duas camadas fotográficas alinhadas.

Photo fornece srcSet somente para Horizonte: horizonte-small 768w e horizonte 1536w, sizes 100vw. O recorte frontal permanece um arquivo único; casa, interior, detail e atelier também. Não afirmar que todas as imagens têm variantes responsivas. Imagens abaixo da dobra são lazy e decoding async; fundo do hero é eager/high, recorte high. Os estudos existentes também são imagens conceituais IA; gravações e imagens de referência externas não foram embarcadas. Dimensões declaradas reservam proporção; CSS adapta o recorte por contexto. Campos `position` em materials ainda não são consumidos pelo componente Photo: não constituem regra efetiva de enquadramento.

## Estados e acesso

Botões principais: mínimo 56 px, padding 17px 24px, gap 40 px; fundo verde, hover #3d5143 e active #111e17. Botão claro do hero: fundo #18231c80, texto/contorno #fff9f0; hover inverte para papel/verde. Setas SVG andam 4 px no hover com movimento permitido. Links sublinhados, mínimo 48 px. Foco: outline 3 px, offset 6 px, cor clara específica em seções escuras. Botões redondos têm 58 px e passam a 48 px na galeria móvel; indicadores têm alvo 44×44 px.

Menu móvel não é um modal: conteúdo segue na ordem de foco. Botão informa aria-expanded e aria-controls; Escape fecha e retorna foco ao botão. Link selecionado fecha; sair do cabeçalho por foco fecha. Links de seção usam âncoras nativas, sem interceptação de wheel. Skip link compartilhado aponta para main. Fragmento inicial é aplicado depois da montagem lazy com requestAnimationFrame cancelável.

Galeria circular de Casa Pátio, Interior Essência e Ateliê Aberto. Parâmetro `projeto` guarda id com replace e preserva outros parâmetros; ausente/inválido mostra o primeiro. Anterior/próximo, indicadores, clique lateral, ArrowLeft/ArrowRight, Home/End e swipe touch selecionam. Teclas da galeria não interceptam links ou summary. Só o cartão ativo entra em Tab; indicadores e setas continuam disponíveis. Swipe exige deslocamento horizontal maior que 45 px e maior que 1.4 vezes o vertical; pointer capture acompanha o gesto, pan-y/pinch-zoom preservam navegação vertical e zoom. Clique após swipe é suprimido. Legenda usa aria-live polite/atomic e contador; details é reiniciado ao mudar projeto. Não existe autoplay.

Materiais: Concreto, Madeira, Pedra (inicial) e Luz e vidro. Botões comuns em role group com aria-pressed; seleção por Tab + Enter/Espaço ou toque, sem contrato de teclado tablist. Imagem/título/texto atualizam juntos; descrição usa aria-live. Linha inferior de 2px comunica seleção; min-height 48px. Alt é atualizado junto com a imagem.

## Formulário local

Nome (mínimo 2 caracteres após trim, máximo 100), e-mail (validade nativa, máximo 254), interesse obrigatório e mensagem (mínimo 10 após trim, máximo 2000). Form usa noValidate com validação explícita no submit; cada erro tem id associado, aria-invalid e texto #913c2c, além da borda. Foco vai ao primeiro erro; status informa revisão necessária. Campos têm fundo #f6f3ed, borda 1px, padding 12px, mínimo 48px, cantos retos. Textarea permite resize vertical.

Sucesso muda o botão para “Validar novamente” e anuncia validação local sem envio/armazenamento. Não limpa os campos; nova edição remove o estado de sucesso. Erros são recalculados no próximo submit, não a cada tecla. Nenhum backend, envio de e-mail ou persistência é implementado.

## Responsividade e entrega

Até 1000 px: cabeçalho 94 px, menores gaps, wordmark 28vw a 18% do topo, hero copy vertical, campos empilhados. Até 700 px: cabeçalho 90 px, menu recolhido, wordmark 30vw, CTA do hero total, grids empilhados. Manifesto mantém imagem menor (68%, até 310 px); featured tem 470 px de altura e recorte 46% 50%; galeria tem palco 340 px e cartão `calc(100% - 64px)`; materialidade mantém uma pequena imagem de apoio ao lado do título e foto principal em proporção .95. Processo preserva recuo de 36 px nas figuras. Contato dispensa seta circular extra, sem perder acesso ao formulário.

App.tsx usa lazy import da rota e Suspense com status “Abrindo a experiência Lume…”. CSS da rota e dependências GSAP pertencem ao módulo importado, permitindo divisão pelo build Vite; não afirmar tamanho de bundle sem medir o build atual. Assets usam BASE_URL; Vite tem base / no modo normal e /Sites/ no modo pages. O suporte existente ao modo pages não representa publicação nesta etapa.

Revisão de composição da tarefa cobre 1920, 1440, 1366, 768, 390 e 375 px (artifacts/sp-*). Evidência de interação é de Chrome; isso não prova compatibilidade de todos os navegadores ou dispositivos físicos. Não há métricas de campo/Core Web Vitals coletadas. Áudio de referência não foi ouvido nem usado; vídeos analisados por quadros não provam triggers originais. Consulte REFERENCE_ANALYSIS.md para esses limites e MOTION_SPEC.md para movimentos efetivos.
