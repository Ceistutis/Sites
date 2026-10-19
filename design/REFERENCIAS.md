# Análise das referências e imagens

Foram inspecionados os quatro JPG fornecidos em ../ref: Simples.jpg, simples 2.jpg, premium.jpg e premium 2.jpg. Eles são referências de composição, não assets de produção.

| Referência | Característica útil | Tradução para Lume |
| --- | --- | --- |
| Simples.jpg | Hero bipartido, leitura direta, ação principal | Básica com texto e imagem, serviços claros |
| simples 2.jpg | Navegação explícita e módulos previsíveis | Navegação por seções e hierarquia simples |
| premium.jpg | Escala e alternância entre texto e mídia | Narrativa editorial com ritmos diferentes |
| premium 2.jpg | Tipografia dominante e fotografia ampla | Headline grande, fotografia horizontal, footer monumental |

## Referência gerada antes da implementação
Arquivo: references/premium-hero.png. Ferramenta: ImageGen integrada, sem CLI/API externa. Extração: fundo pedra clara, tinta verde profunda, wordmark leve, título em duas linhas, margem aproximada de 5%, suporte em coluna menor, botão retangular e imagem na metade inferior. Texto principal preservado: “A luz desenha. Você habita.” e “Explore os projetos”. O código usa Manrope e DM Sans em vez de uma fonte apenas inferida visualmente. No celular, colunas empilham sem reduzir a legibilidade.

## Imagens de produção
Quatro imagens originais geradas com ImageGen, convertidas para WebP e hospedadas em public/images. Não foram extraídas de screenshots ou de obras de terceiros. O aviso de IA está no footer; projetos possuem legenda conceitual e esclarecimento adicional no diálogo.

- casa.webp: casa modernista brasileira imaginária, travertino, madeira ripada, vidro, jardim e sombras de folhas; fotografia editorial horizontal sem pessoas e sem texto.
- interior.webp: apartamento imaginário com carvalho, sofá de linho, mesa de travertino, cortinas leves e cadeira verde; luz natural, sem pessoas ou texto.
- atelier.webp: ateliê imaginário com bancada de carvalho, maquetes de papel, concreto e janela para jardim; luz da manhã, sem pessoas ou texto.
- detail.webp: estudo imaginário de escada e parede de pedra com abertura vertical, luz e sombras de folhas, pequena maquete; sem pessoas ou texto.

Os prompts solicitaram cenas fotorealistas editoriais, proporção horizontal, paleta natural e declaração explícita de estudo conceitual fictício. A referência do hero solicitou um mockup de seção única com navegação Lume, título, CTA e fotografia arquitetônica. As prévias preview-basica.webp e preview-premium.webp são capturas reais das páginas via Playwright CLI.

Não há fotografia licenciada de terceiros nas páginas. Manrope e DM Sans são distribuídas pelos pacotes @fontsource, com suas licenças nos respectivos diretórios node_modules.
