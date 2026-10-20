import { mkdir, copyFile, writeFile } from 'node:fs/promises';
// Static entries keep direct navigation and refresh working on GitHub Pages.
for (const route of ['basica', 'premium', 'super-premium']) {
  await mkdir(`docs/${route}`, { recursive: true });
  await copyFile('docs/index.html', `docs/${route}/index.html`);
}
await copyFile('docs/index.html', 'docs/404.html');
await writeFile('docs/.nojekyll', '');
