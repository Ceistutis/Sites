import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const route of ["/", "/basica", "/premium"]) {
  test(`${route}: layout, imagens, acessibilidade e console`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(async () => {
      for (const i of document.images) i.loading = "eager";
      await Promise.all(Array.from(document.images).map((i) => i.decode()));
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
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
        .getByRole("link", { name: "Pular para o conteúdo" })
        .evaluate((e) => getComputedStyle(e).outlineStyle),
    ).not.toBe("none");
    expect(errors).toEqual([]);
  });
}
test("navegação entre versões, âncoras e menu móvel", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Abrir Landing Page Básica" }).click();
  await expect(page).toHaveURL(/basica/);
  await page.getByRole("link", { name: "Vamos planejar seu espaço" }).click();
  await expect(page).toHaveURL(/#contato/);
  await page.getByRole("link", { name: "Ver Premium" }).click();
  await expect(page).toHaveURL(/premium/);
  if ((page.viewportSize()?.width || 0) < 701) {
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(
      page.getByRole("button", { name: "Fechar", exact: false }),
    ).toHaveAttribute("aria-expanded", "true");
  }
  await page.getByRole("link", { name: "Serviços", exact: true }).click();
  await expect(page).toHaveURL(/#servicos/);
  await page
    .getByRole("link", { name: "← Voltar ao showcase", exact: true })
    .click();
  await expect(page).toHaveURL("http://127.0.0.1:5173/");
});
test("portfólio: filtros, URL, diálogo e retorno de foco", async ({ page }) => {
  await page.goto("/premium");
  await page.getByRole("button", { name: "Interiores", exact: true }).click();
  await expect(page.locator(".project")).toHaveCount(2);
  await expect(page).toHaveURL(/categoria=Interiores/);
  await page.reload();
  await expect(page.locator(".project")).toHaveCount(2);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await expect(page.locator(".project")).toHaveCount(3);
  const opener = page.getByRole("button", { name: "Ver projeto Casa Pátio" });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
  await page.getByRole("button", { name: "Design de interiores" }).click();
  await expect(
    page.getByRole("button", { name: "Design de interiores" }),
  ).toHaveAttribute("aria-expanded", "true");
});
for (const route of ["basica", "premium"])
  test(`${route}: formulário valida e conclui sem enviar`, async ({ page }) => {
    let writes = 0;
    page.on("request", (r) => {
      if (["POST", "PUT", "PATCH"].includes(r.method())) writes++;
    });
    await page.goto("/" + route);
    await page.locator("form button[type=submit]").click();
    await expect(page.locator("#tipo")).toBeFocused();
    await page.locator("#tipo").selectOption("Design de interiores");
    if (route === "premium") {
      await page.locator("#fase").selectOption("Estou explorando ideias");
      await page.locator("#ideia").fill("Uma casa com luz natural.");
      await page.getByRole("button", { name: "Continuar" }).click();
      await expect(page.locator("#nome")).toBeFocused();
      await page.getByRole("button", { name: "Voltar", exact: false }).click();
      await expect(page.locator("#ideia")).toHaveValue(
        "Uma casa com luz natural.",
      );
      await page.getByRole("button", { name: "Continuar" }).click();
    }
    await page.locator("#nome").fill("Pessoa de Teste");
    await page.locator("#email").fill("pessoa@example.com");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Concluir demonstração" }).click();
    await expect(
      page.getByRole("heading", { name: "Demonstração concluída." }),
    ).toBeVisible();
    expect(writes).toBe(0);
    expect(
      await page.evaluate(() => localStorage.length + sessionStorage.length),
    ).toBe(0);
    await page.getByRole("button", { name: "Experimentar novamente" }).click();
    await expect(page.locator("#tipo")).toHaveValue("");
  });
