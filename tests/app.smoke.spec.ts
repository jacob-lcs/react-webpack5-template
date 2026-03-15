import { expect, test } from "@playwright/test";

test("renders the countdown page without runtime errors", async ({ page }) => {
  const runtimeErrors: string[] = [];

  page.on("pageerror", (error) => {
    runtimeErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("Countdown")).toBeVisible();
  await expect(page.getByText("Million Seconds")).toBeVisible();
  await expect(page.getByText("Day Level")).toBeVisible();
  await expect(page.getByTestId("timer-grid")).toBeVisible();

  const countdownText = page
    .getByTestId("timer-countdown")
    .locator(".ant-statistic-content");

  const firstValue = await countdownText.textContent();
  await page.waitForTimeout(1_100);
  const secondValue = await countdownText.textContent();

  expect(firstValue).not.toBeNull();
  expect(secondValue).not.toBeNull();
  expect(secondValue).not.toBe(firstValue);

  const boxShadow = await page
    .getByTestId("timer-grid")
    .evaluate((element) => getComputedStyle(element).boxShadow);

  expect(boxShadow).not.toBe("none");
  expect(runtimeErrors).toEqual([]);
});
