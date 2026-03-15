import { defineConfig, devices } from "@playwright/test";

const playwrightPort = 45173;
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${playwrightPort}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `./node_modules/.bin/webpack serve --config webpack.dev.js --hot --host 127.0.0.1 --port ${playwrightPort}`,
        url: `http://127.0.0.1:${playwrightPort}`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
