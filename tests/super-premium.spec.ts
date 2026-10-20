import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("layout, assets, contrast, keyboard focus and console", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/super-premium");
  await expect(page.locator("h1")).toHaveText("Além da forma.");
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const i of document.images) i.loading = "eager";
    await Promise.all([...document.images].map((i) => i.decode()));
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page
      .locator(".sp-hero-copy .sp-button")
      .evaluate((e) => e.getBoundingClientRect().bottom <= innerHeight),
  ).toBe(true);
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  expect(
    await page
      .locator(":focus")
      .evaluate((e) => getComputedStyle(e).outlineStyle),
  ).not.toBe("none");
  expect(errors).toEqual([]);
});

test("gallery: rapid input, keyboard, deep links and details", async ({
  page,
}) => {
  await page.goto("/super-premium?projeto=essencia");
  await expect(page.locator(".sp-project-caption h3")).toHaveText(
    "Interior Essência",
  );
  await page
    .getByRole("button", { name: "Próximo projeto", exact: true })
    .click();
  await expect(page.locator(".sp-project-caption h3")).toHaveText(
    "Ateliê Aberto",
  );
  const next = page.getByRole("button", {
    name: "Próximo projeto",
    exact: true,
  });
  await next.evaluate((button) => {
    for (let i = 0; i < 10; i++) (button as HTMLButtonElement).click();
  });
  await expect(page.locator(".sp-project-caption h3")).toHaveText("Casa Pátio");
  await next.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".sp-project-caption h3")).toHaveText(
    "Ateliê Aberto",
  );
  await page.keyboard.press("Home");
  await expect(page.locator(".sp-project-caption h3")).toHaveText("Casa Pátio");
  await page.keyboard.press("End");
  await expect(page.locator(".sp-project-caption h3")).toHaveText(
    "Ateliê Aberto",
  );
  await page.locator(".sp-study summary").click();
  await expect(
    page.getByText("Reorganização de um ambiente de trabalho criativo.", {
      exact: false,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Ir para Casa Pátio", exact: true })
    .click();
  await expect(page).toHaveURL(/projeto=patio/);
  await page.reload();
  await expect(page.locator(".sp-project-caption h3")).toHaveText("Casa Pátio");
  expect(
    await page
      .locator('.sp-depth-card[data-active="true"]')
      .evaluate((e) => e.getAttribute("aria-pressed")),
  ).toBe("true");
});

test("local form: errors, focus, valid confirmation and no submission", async ({
  page,
}) => {
  const outgoing: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET") outgoing.push(r.url());
  });
  await page.goto("/super-premium#contato");
  await page.getByRole("button", { name: "Experimentar a conversa" }).click();
  await expect(page.getByLabel("Seu nome", { exact: true })).toBeFocused();
  await expect(page.locator(".sp-error")).toHaveCount(4);
  await page.getByLabel("Seu nome", { exact: true }).fill("Pessoa de teste");
  await page
    .getByLabel("Seu e-mail", { exact: true })
    .fill("teste@example.com");
  await page
    .getByLabel("O que vamos imaginar?")
    .selectOption({ label: "Design de interiores" });
  await page
    .getByLabel("Conte um pouco da sua ideia")
    .fill("Um espaço de leitura com luz natural.");
  await page.getByRole("button", { name: "Experimentar a conversa" }).click();
  await expect(page.locator(".sp-form-status")).toContainText(
    "Nenhum dado foi enviado ou armazenado",
  );
  await expect(page.locator(".sp-error")).toHaveCount(0);
  expect(outgoing).toEqual([]);
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0);
});

test("navigation, mobile menu and materials", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "Abrir Landing Page Super Premium",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/super-premium/);
  if (page.viewportSize()!.width <= 700) {
    const menu = page.locator(".sp-menu-toggle");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await page
      .locator("#sp-nav")
      .getByRole("link", { name: "Projetos", exact: true })
      .click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  } else
    await page
      .locator("#sp-nav")
      .getByRole("link", { name: "Projetos", exact: true })
      .click();
  await expect(page).toHaveURL(/#projetos/);
  await page.getByRole("button", { name: "Madeira", exact: true }).click();
  await expect(page.locator(".sp-material-description")).toContainText(
    "Calor que se percebe de perto.",
  );
  await page.getByRole("button", { name: "Luz e vidro", exact: true }).click();
  await expect(page.locator(".sp-material-description")).toContainText(
    "A luz transforma o mesmo lugar.",
  );
  await page.getByRole("link", { name: "Comparar as experiências" }).click();
  await expect(page).toHaveURL("/");
});

test("motion responds to scroll, reduced motion and route cleanup", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/super-premium");
  await expect(page.locator(".sp-wordmark")).toBeVisible();
  await page.waitForTimeout(1450);
  const before = await page
    .locator(".sp-hero-back")
    .evaluate((e) => getComputedStyle(e).transform);
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: "instant" }));
  await page.waitForTimeout(850);
  const after = await page
    .locator(".sp-hero-back")
    .evaluate((e) => getComputedStyle(e).transform);
  if (page.viewportSize()!.width > 1000) expect(after).not.toBe(before);
  else expect(after).toBe(before);
  await page
    .getByRole("button", { name: "Próximo projeto", exact: true })
    .click();
  await page.waitForTimeout(800);
  await expect(page.locator(".sp-project-caption h3")).toHaveText(
    "Interior Essência",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".sp-hero-back")
        .evaluate((e) => getComputedStyle(e).transform),
    )
    .toBe("none");
  await page.getByRole("link", { name: "Comparar as experiências" }).click();
  await page
    .getByRole("link", {
      name: "Abrir Landing Page Super Premium",
      exact: true,
    })
    .click();
  await expect(page.locator("h1")).toHaveText("Além da forma.");
  expect(
    await page.evaluate(() => document.querySelectorAll(".pin-spacer").length),
  ).toBe(0);
});

test("touch swipe changes project without blocking vertical scrolling", async ({
  page,
  context,
}) => {
  test.skip(
    page.viewportSize()!.width > 700,
    "Touch scenario for the two phone viewports.",
  );
  await page.goto("/super-premium");
  const stage = page.locator(".sp-depth-stage");
  await stage.scrollIntoViewIfNeeded();
  const box = (await stage.boundingBox())!;
  const client = await context.newCDPSession(page);
  const y = box.y + box.height / 2;
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 290, y }],
  });
  for (const x of [270, 240, 210, 180, 150, 110]) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y }],
    });
  }
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.locator(".sp-project-caption h3")).toHaveText(
    "Interior Essência",
  );
  expect(
    await stage.evaluate((e) => getComputedStyle(e).touchAction),
  ).toContain("pan-y");
  await client.detach();
});
