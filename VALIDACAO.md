# Validação — 19/10/2026

## Execução
- Build TypeScript + Vite concluída com sucesso; saída em dist.
- Servidor de desenvolvimento: http://127.0.0.1:5173.
- Preview da build: http://127.0.0.1:4173.
- 21 testes Playwright aprovados em Chrome: sete cenários por largura (1440, 768 e 375 px).
- Axe-core: sem violações detectadas para WCAG 2 A/AA e 2.1 AA nas três rotas e larguras.
- Nenhum erro de console nos cenários finais; nenhuma imagem quebrada ou overflow horizontal.
- Foco visível, skip link, menu móvel, navegação entre rotas, âncoras, filtros com URL, diálogo com Escape e retorno de foco verificados.
- Formulários: obrigatoriedade, e-mail, checkbox, transição e retorno entre etapas, conclusão e reinício. Nenhuma requisição de escrita; localStorage e sessionStorage vazios.
- Animações respeitam prefers-reduced-motion; capturas finais com movimento reduzido para comparação consistente.

Evidências: artifacts/test-results.json, artifacts/tests-final.txt, artifacts/capture-final.txt, artifacts/screenshots. A captura via Playwright CLI cobre as três páginas nas três larguras. As prévias do showcase são screenshots reais.

## Correções durante a inspeção
1. Títulos do showcase e institucional quebravam demais no tablet/celular: encurtados ou recompostos com escala adequada.
2. Notas de 12 px foram elevadas a 13 px. Parágrafo institucional da básica passou a 24 px no mobile.
3. Imagem de detalhe ainda estava sendo gerada na primeira rodada; incluída localmente antes dos testes finais.
4. Seletor de teste ambíguo entre wordmark e retorno ao showcase passou a usar nome exato.
5. Uma rodada concorrente com o inspetor foi interrompida por recarga do Vite; repetição final com arquivos estáveis aprovou os 21 testes.

## Taste Skill
Lint inicial: 0 FAIL, 0 WARN. Inspetor final: básica 0 FAIL / 4 WARN; premium 0 FAIL / 3 WARN. Relatórios completos em .taste-skill/basica e .taste-skill/premium.

Exceção explícita --allow eyebrow: a barra superior contém navegação funcional entre versões, exigida pelo objetivo comercial; não é um kicker promocional. Não foram ocultados elementos do inspetor.

Avisos mantidos e justificados: a paleta de pedra clara é uma decisão original compartilhada, sem terracota; a contagem de tamanhos inclui wordmark, setas e variantes responsivas; não há vídeo porque não existe filmagem real do estúdio fictício; a animação mais discreta da básica é um requisito, com 12 elementos em movimento detectados.

## Crítica visual

ROUND 1
Seen in one second: arquitetura e comparação entre um site direto e um editorial.
Idea (one sentence): a luz evocada pelo nome Lume conecta materiais, espaços e escala tipográfica.
Live thing: filtros e detalhes de projetos na premium; formulário local na básica.
Layout words by section: hero=dividido/editorial / estúdio=imagem e texto / portfólio=galeria assimétrica / serviços=grid ou acordeão / contato=formulário.
Scores: design 7 · usability 7 · creativity 7 · content 7 → overall 7.0
Caps applied: rodada intermediária com imagens e títulos ainda em ajuste; avaliação provisória, não final.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. showcase-375: headline em três linhas; escala móvel ajustada.
2. basica-768: título institucional longo; texto encurtado.
3. premium-375: imagem de metodologia ausente; asset de detalhe final incluído.

ROUND 2
Seen in one second: identidade consistente, duas propostas distintas e CTAs identificáveis.
Idea (one sentence): a luz conecta o nome da marca à materialidade dos projetos conceituais.
Live thing: portfólio filtrável com diálogo e briefing em etapas, todos operáveis por teclado.
Layout words by section: básica=sequência objetiva / premium=abertura ampla, galeria desigual, campo verde, metodologia e contato / showcase=comparação lado a lado.
Scores: básica design 7 · usability 8 · creativity 6.5 · content 8 → overall 7.3; premium design 8 · usability 8 · creativity 7 · content 8 → overall 7.8
Caps applied: criatividade limitada pelo uso de uma linguagem editorial conhecida; avaliação própria, não de um júri externo.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. A galeria repete imagens do hero e serviços: repetição deliberada para continuidade; numa marca real, substituir por cobertura fotográfica de obras.
2. A versão premium tem rolagem extensa no mobile: seções mantidas por exigência do escopo, com navegação direta por âncoras.
3. As imagens são conceituais: identificação visível em legendas, diálogos e footer, sem fingir obras executadas.

Todas as folhas de inspeção desktop, tablet e mobile das duas versões foram abertas e revisadas. As três capturas do showcase também foram revisadas. O resultado conserva a leitura direta das referências simples e a escala/imagem das referências premium, com identidade própria.

## Limites
Testado em Chrome local, sem afirmar cobertura Safari/Firefox ou leitor de tela real. A auditoria automatizada não é certificação de acessibilidade. Vercel configurada, sem publicação nem validação de um domínio remoto. Não há integração de contatos a testar. Nenhuma operação Git ou criação de repositório foi realizada.
