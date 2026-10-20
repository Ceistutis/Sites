# Referências — Super Premium V2

Análise local em 19/10/2026, antes da implementação. Pasta real: `../ref/` (o briefing chama-a references). Todos os 20 arquivos foram inventariados. Nenhuma referência foi incorporada como asset do site.

## Método e limites
FFprobe verificou formatos e duração. FFmpeg extraiu 12 quadros distribuídos por vídeo, em ordem de leitura, em `artifacts/reference-analysis/video-0.jpg` a `video-5.jpg`; inventário JSON na mesma pasta. Comparação temporal dos quadros permite identificar mudanças de posição, escala e atmosfera. Não temos eventos DOM, mouse wheel ou código dos sites: gatilhos e velocidades abaixo são inferências visuais, não medições do original. Filmagem de monitores acrescenta movimento de câmera, por isso não se inferem valores exatos de scrub ou perspectiva.

## Imagem principal
`157a959934b3469875ab67efb6c9c057.jpg`: residência horizontal sobre terreno inclinado, céu grafite, letras TERRA monumentais parcialmente encobertas pelo telhado; complemento serifado, informações menores e navegação periférica. O edifício atravessa os planos da tipografia. Adotar escala e enquadramento, não a marca, texto, dados, composição integral ou fotografia. Lume usará pavilhão original e wordmark próprio, sem painel de vidro sobre a imagem.

## Vídeos principais

### 0 — “20 Unique vision board…” — Wix Studio, 10,659 s, 720×1280, 30 fps
0–2,7 s: paisagem fantástica, céu ao fundo, montanhas intermediárias e figura no primeiro plano. Texto sobe enquanto a figura cresce/se aproxima relativamente ao fundo. 3,6–6,2 s: a borda rochosa introduz o ambiente de caverna. 7,1–9,8 s: segundo capítulo azul se estabiliza, texto permanece central. Mão no trackpad e deslocamento vertical sugerem scroll. Primeiro plano percorre maior distância aparente que o céu; ordem aproximada de velocidade: frente > título > fundo. Não há razão numérica comprovável.

Adaptação: fotografia arquitetônica com movimento interno limitado, wordmark em camada própria, passagem para margem mineral; featured aproxima/reabre seu enquadramento. Scroll nativo, sem sequestro ou pin global. Mobile mantém enquadramento fixo e entradas curtas; reduced motion remove scrub e deslocamentos.

### 3 — “Save this guide to budget-friendly…” — Sidekick, 23,083 s, 704×374, 60 fps
0–2 s: pintura renascentista, interferência circular e objetos contrastantes. 3,8–9,6 s: fundo noturno, personagem em grande escala, título Sidekick e parágrafo se deslocam em etapas. 11,5–17,3 s: ambiente claro, headlines e cartões se reorganizam em leque. 19,2–21,2 s: exemplos de interfaces compõem capítulos seguintes. Mudança vertical sugere scroll; partículas/portal aparentam também animação temporal. Imagem dominante e texto têm ritmos diferentes; UI permanece mais estável. Sem registro de input não é possível distinguir todos os gatilhos.

Adaptação: alternância mineral/grafite, manifesto com imagem pequena e tipografia ampla, materiais com fotos de escalas diferentes, processo em sequência vertical. Nada de pinturas, fantasia, partículas, marca ou personagens. Texto sempre disponível; revelações curtas de posição e opacidade parcial. Mobile empilha; reduced motion mantém composição estática.

### 4 — “Steal these 12 Refined bridesmaid…” — Voyage, 8,298 s, 720×540, 60 fps
0–2,8 s: cinco painéis verticais; Machu Picchu central mais alto, laterais menores inclinadas. 3,5–4,8 s: Chamonix passa ao centro; painéis deslizam horizontalmente e mudam de tamanho/ângulo, título atualiza. 5,5–6,9 s: Mimisa Rocks central; 7,6 s retorna ao primeiro projeto. Setas laterais e indicadores são visíveis. A sequência é compatível com clique ou reprodução programada: não comprova o gatilho. Centro avança perceptualmente, laterais recuam; há fundo atmosférico e névoa temporal independente.

Adaptação: três estudos arquitetônicos, centro dominante, laterais com escala 0,74 e rotação moderada. Setas, seleção direta, teclado e swipe. Títulos e texto sincronizados, sem autoplay/névoa. Mobile sem rotação 3D, painel central + pistas laterais. Reduced motion muda o estado instantaneamente. Tweens interrompíveis por overwrite; sem fila de animações.

## Outros vídeos examinados
| Arquivo (prefixo) | Conteúdo observado | Movimento/gatilho e decisão |
| --- | --- | --- |
| Grounding kindness… (1; 4,9 s) | Jupiter, garrafa horizontal sobre letras enormes, campos terracota/preto | Troca lateral de rótulo/garrafa, letras deformadas, inversão de fundo. Gatilho não verificável, provavelmente slider; objeto/texto deslizam em velocidades similares. Usar apenas hierarquia de escala, sem distorção tipográfica. Mobile e reduced: troca simples. |
| Instagram Growth Tips… (2; 10,055 s) | Aurelia Residences, fachada, hall, pavimentos e cobertura | Aproximação da câmera virtual, subida por pavimentos, interface relativamente fixa; gravação editada não permite afirmar controle por scroll. Adotar continuidade de enquadramento, sem simular tour 3D que não existe. Mobile/reduced: imagens fixas. |
| Upgrade these easy ways… (5; 28,6 s) | Tutorial Figma de flashlight sobre esculturas, elipse com gradiente e frame rolável | Abertura revela a escultura por região iluminada; depois mostra construção manual. Não é evidência de implementação web. Não adotar máscara que esconda conteúdo ou interação dependente de cursor; nenhuma versão especial necessária. |

## Outras imagens examinadas
| Arquivo | Observação e decisão |
| --- | --- |
| 0f683…jpg | Good Move, colagem renascentista, título sobre corpos, transição em nuvens. Reter continuidade entre capítulos, excluir universo figurativo. |
| 1d88…jpg | Chernobyl, personagem excede moldura, navegação por episódios. Reter hierarquia de plano, sem marca/personagem. |
| 211a…jpg | EOSAI, portal arquitetônico surreal, paisagem e figura. Reter amplitude e luz, excluir ficção espacial. |
| 232f…jpg | Velocity, página SaaS com laranja luminoso e cartões. Não corresponde à direção mineral; não incorporar efeitos de neon ou métricas. |
| 744f…jpg | Iceland, paisagem panorâmica com texto dividido e vidro. Reter fotografia dominante, não vidro decorativo. |
| 86fe…jpg | Architectortech, residência na floresta, fundo escuro e luz interna quente. Reter contraste atmosférico, evitar excesso de texto sobre fotografia. |
| fe015…jpg | Serenity, fotografia tátil, círculos e composição editorial. Reter ritmo e materialidade, não anatomia ou recortes circulares. |
| premium 2.jpg | Gazu: wordmark monumental com pessoa à frente; relação de planos confirma a linguagem, sem copiar moda. |
| premium.jpg | Enblox: tipografia grande e composições variadas; não usar gradiente ou produto de terceiro. |
| simples 2.jpg | Portfólio retrô Mac, estrutura convencional com contornos. Mantido como comparação histórica da Básica. |
| Simples.jpg | WizardZ: agência em seções e cartões. Mantido como referência histórica, não como modelo Super Premium. |

## Áudio e HTML
`freesound_community-road-noise-kwun-tong-road-19423.mp3`: FFprobe identifica MP3 mono, 44,1 kHz, 256 kbps, 504,999 s, 16,16 MB. Não foi realizada audição; não se afirma conteúdo sonoro pelo nome. O briefing não pede trilha, e não há documentação local da licença. Não embarcar o arquivo nem tocar áudio automático.

`download.htm`: HTML salvo do Pinterest, com scripts e recursos externos. Inspeção textual apenas, sem executar scripts; não contém uma referência de implementação reutilizável.

## Direção consolidada
“A luz evocada por Lume torna-se a escala e o intervalo entre planos.” Taste: name-as-monument, seed 516834966, tipografia existente preservada. O briefing fixa hero fotográfico e galeria espacial, portanto substitui os slots sorteados de anel de fotos e galeria de impressões. Conceito original: LUME — Space Beyond Form, traduzido no título comercial Além da forma. Uma experiência só, com sete capítulos e interação real sobre os projetos.
