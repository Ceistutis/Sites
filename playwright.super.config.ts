import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "super-premium.spec.ts",
  fullyParallel: true,
  reporter: [
    ["list"],
    ["json", { outputFile: "artifacts/super-test-results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:5173",
    channel: "chrome",
    reducedMotion: "reduce",
  },
  projects: [
    [1920, 1080],
    [1440, 900],
    [1366, 768],
    [768, 1024],
    [390, 844],
    [375, 812],
  ].map(([width, height]) => ({
    name: `${width}x${height}`,
    use: { viewport: { width, height } },
  })),
});
