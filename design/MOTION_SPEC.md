# Motion specification — Super Premium

Registro do código em 19/10/2026. Fonte: src/super-premium/SuperPremiumPage.tsx, super-premium.css e src/index.css. Esta especificação descreve movimentos existentes; não promete animações vistas nos vídeos de referência.

## Contrato

Scroll nativo, sem pin, scroll hijack, loop contínuo ou autoplay do carrossel. GSAP anima transforms e opacidade; CSS cuida de feedback de cor e sublinhado. Não há animação de blur ou máscara cobrindo conteúdo. Layout inicial em CSS mantém leitura; entradas partem de opacidade parcial, nunca zero. O nome decorativo pode ter letras animadas; títulos de conteúdo permanecem texto integral acessível.

## Sequências e gatilhos

| Elemento | Início → fim | Tempo / gatilho |
| --- | --- | --- |
| Letras LUME | yPercent 35, opacity .45 → natural | 1.1s, stagger .07s, power3.out; timeline na montagem, t=0 |
| Cabeçalho | y -8px, opacity .6 → natural | .7s, power3.out; t=.1s |
| Texto do hero | y 20px, opacity .7 → natural | .85s, power3.out; t=.2s |
| data-reveal | y 24px, opacity .65 → natural | .85s, power3.out; top 92%, once |
| data-image-reveal | y 34px → natural | 1.1s, power3.out; top 95%, once |
| Fundo + recorte do hero | yPercent 0 → 8 | desktop >1000px; hero top top → bottom top; scrub .65, ease none |
| Wordmark inteiro | y 0 → -70px | mesmo intervalo do hero; scrub .65, ease none |
| Janela featured | scale .92 → 1 | desktop >1000px; featured top 85% → top 15%; scrub .7 |
| Imagem featured | yPercent -3 → 3, scale 1.1 → 1.04 | desktop >1000px; janela top bottom → bottom top; scrub .7 |
| Material selecionado | opacity .65, scale 1.025 → 1, 1 | .55s, power3.out; seleção inicial e mudança de material |

Foto e foreground do hero têm o mesmo movimento para preservar alinhamento do recorte. A diferença de plano vem da palavra, que sobe. A implementação não reproduz literalmente velocidades de primeiro plano inferidas dos vídeos.

## Galeria em profundidade

Estado deriva de `projeto` na URL. Cada cartão recebe offset -1, 0 ou 1, com xPercent `-50 + offset * 83` no desktop (>=701px), yPercent -50, x/y zero. Centro: scale 1, opacity 1, z 0. Laterais: scale .74, opacity .6, rotationY `offset * -14deg`, z -110px. Palco CSS usa perspective 1400px; o cartão ativo tem z-index 3 e laterais 1.

No mobile (<=700px): xPercent `-50 + offset * 106`, laterais scale .9, sem rotationY, z 0 e sem perspective. A primeira aplicação de posição tem duração zero. Mudanças subsequentes: .7s desktop ou .45s mobile, power3.out, overwrite true. Seleção rápida interrompe tween anterior em vez de acumular uma fila; a legenda e aria-pressed atualizam pelo estado React, sem esperar o término visual. Não existe temporizador de reprodução automática.

## Feedback CSS

Botões principais e redondos transitam background-color/color em .2s. Setas de links e botões transitam transform em .25s e deslocam 4px no hover. Indicador selecionado passa de linha 2px para 4px com transição .2s de altura e fundo; essa pequena transição CSS não é parte dos tweens GSAP. Sublinhado/seleção e foco permanecem compreensíveis sem movimento. Summary abre conteúdo nativamente; indicador visual segue o estado aberto, sem esconder o texto em uma timeline.

## Movimento reduzido e mudanças de viewport

`gsap.matchMedia` habilita entradas e troca de material apenas em prefers-reduced-motion: no-preference. Scrub exige também min-width 1001px. Galeria observa preferência em useSyncExternalStore: duração zero, rotationY/z removidos, perspective none. Escala/posição estáticas de centro/laterais continuam comunicando a seleção. Não confundir transform estático com animação.

CSS global remove todas as animations/transitions e troca scroll-behavior para auto quando reduce está ativo. CSS da rota remove o deslocamento de seta no hover. Logo, links, menu, materiais, details, formulário e carrossel continuam operáveis em versão estática. Até 1000px não há scrub, mas entradas curtas continuam quando movimento é permitido.

## Ciclo de vida e limpeza

useGSAP delimita seletores ao root da rota ou do componente. Na rota, mm.revert é retornado; reversão do contexto na desmontagem limpa timelines e ScrollTriggers associados. Na materialidade, dependencies [active] com revertOnUpdate true e mm.revert limpam a troca anterior. Na galeria, dependencies [active, desktop, reduce] atualizam posições; os tweens pertencem ao contexto useGSAP e usam overwrite. Listeners matchMedia são removidos pelo unsubscribe de useSyncExternalStore. Listener Escape só existe enquanto o menu está aberto e é removido no cleanup. O requestAnimationFrame de âncora inicial é cancelado na desmontagem.

Não há listener wheel, RAF permanente, ticker manual ou áudio. ScrollTriggers sem pin não criam espaçadores de layout. Efeitos não dependem de movimento de cursor.

## Evidência e limites

Fonte e composições internas revisadas; artefatos da tarefa incluem capturas em seis larguras e testes de interação em Chrome. Reavaliar navegação entre rotas, resize, mudança de preferência, seleção rápida, teclado e swipe quando alterar esta lógica. Não foram coletados dados de FPS em dispositivos físicos nem métricas reais de usuários. Vídeos externos foram analisados por quadros: duração, sensação de plano e provável gatilho são referência visual, não prova da implementação original.
