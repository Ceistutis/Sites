import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testIgnore: 'super-premium.spec.ts',
  fullyParallel: true,
  reporter: [["list"], ["json", { outputFile: "artifacts/test-results.json" }]],
  use: {
    baseURL: "http://127.0.0.1:5173",
    channel: "chrome",
    reducedMotion: "reduce",
  },
  projects: [1440, 768, 375].map((width) => ({
    name: `${width}px`,
    use: { viewport: { width, height: 1000 } },
  })),
});
