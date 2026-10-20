# Landing Page Showcase — Lume Arquitetura

Showcase em Vite, React, TypeScript e Tailwind CSS. Sem backend ou banco de dados.


## Super Premium V2

A nova experiência **LUME — Space Beyond Form** integra o showcase com três versões. Prévia local: http://127.0.0.1:5173/super-premium.

Hero em camadas, movimentos GSAP, galeria com profundidade e controle por teclado/toque, seleção de materiais e formulário exclusivamente local. As imagens finais são assets gerados, sem incorporar as referências de terceiros.

## Visualização pública

- [Showcase](https://ceistutis.github.io/Sites/)
- [Básica](https://ceistutis.github.io/Sites/basica/)
- [Premium](https://ceistutis.github.io/Sites/premium/)
- [Super Premium](https://ceistutis.github.io/Sites/super-premium/)

GitHub Pages publica a pasta `docs` da branch `main`. Para atualizar: executar `npm run build:pages`, versionar o código e a pasta `docs`, fazer commit e push. O build inclui entradas estáticas para as três landings, permitindo abrir links diretos e recarregar a página. A build normal para Vercel continua disponível em `npm run build`.
## Executar

Requer Node.js 22.12+ e npm.

```powershell
cd E:\__Guilherme\Develop\Sites\landing-page-showcase
npm ci
npm run dev -- --host 127.0.0.1
```

Abra http://127.0.0.1:5173. Rotas: `/` (comparação), `/basica`, `/premium` e `/super-premium`.

## Verificar

Com o servidor local ativo e Chrome instalado:

```powershell
npm test
npm run test:super
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
```

Os testes cobrem as três larguras, navegação, filtros, diálogo, foco, validação dos formulários, ausência de envio e armazenamento, overflow, imagens, console e axe-core. Testes em Chrome; não equivalem a certificação integral de acessibilidade ou teste em todos os navegadores.

A suíte Super Premium cobre 1920×1080, 1440×900, 1366×768, 768×1024, 390×844 e 375×812, incluindo movimento reduzido, desmontagem da rota, sequência rápida de cliques e swipe nos dois celulares. Capturas: `artifacts/sp-*.png`. Gravações: `artifacts/super-motion/lume-1440.webm` e `lume-375.webm`. Para reproduzir a gravação com a build servida em 4173: `node scripts/validate-super-production.mjs` (requer `npx playwright install ffmpeg`).

Capturas em `artifacts/screenshots`. Para reproduzir pelo Playwright CLI:

```powershell
playwright-cli open http://127.0.0.1:5173
playwright-cli run-code --filename=scripts/capture.cjs
```

## Publicar na Vercel sem GitHub

O projeto está preparado, mas não foi publicado. `vercel.json` define Vite, saída dist e fallback das rotas. Na pasta do projeto:

```powershell
npx vercel login
npx vercel
# Depois de revisar o preview:
npx vercel --prod
```

Os comandos solicitam autenticação e associação a um projeto da sua conta. Não precisam de repositório Git. Referência: https://vercel.com/docs/cli/deploying-from-cli

## Organização

- src/App.tsx: páginas, componentes e dados compartilhados.
- src/index.css: tokens, fontes e estilos globais, Tailwind.
- src/App.css: composições e responsividade.
- public/images: imagens geradas e prévias locais.
- DESIGN.md, design/BASICA.md, design/PREMIUM.md: direção visual.
- design/REFERENCIAS.md: análise e origem dos assets.
- src/super-premium: componentes, dados e estilos isolados da nova experiência.
- design/SUPER_PREMIUM.md, design/MOTION_SPEC.md: direção visual e movimentos implementados.
- design/REFERENCE_ANALYSIS.md, design/IMAGE_PROMPTS.md: análise das referências e criação das imagens.
- VALIDACAO.md: resultados e limites da inspeção.

Lume é fictícia. Projetos são conceituais. Formulários só validam e mostram confirmação local; não enviam mensagens, não armazenam dados e não prometem retorno. Antes de adaptar para uma empresa real, substituir textos, imagens e informações institucionais, definir escopo, privacidade e uma integração real de contato.

