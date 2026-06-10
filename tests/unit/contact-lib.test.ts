import { describe, it, expect } from "vitest";
import { WHATSAPP_NUMBER, buildWhatsappUrl } from "@/lib/contact";

describe("buildWhatsappUrl", () => {
  it("retorna o link wa.me sem query quando não há texto", () => {
    expect(buildWhatsappUrl()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
  });

  it("mantém o mesmo href usado pelo botão flutuante (regressão)", () => {
    // O WhatsappButton e seu teste fixam exatamente esta URL.
    expect(buildWhatsappUrl()).toBe("https://wa.me/5527992018590");
  });

  it("anexa a mensagem pré-preenchida codificada para URL", () => {
    const url = buildWhatsappUrl("Olá, Pedro! Tudo bem?");
    expect(url).toBe(
      "https://wa.me/5527992018590?text=Ol%C3%A1%2C%20Pedro!%20Tudo%20bem%3F"
    );
  });

  it("codifica caracteres reservados (& = ?) sem quebrar a query", () => {
    const url = buildWhatsappUrl("a=1 & b=2?");
    expect(url.startsWith("https://wa.me/5527992018590?text=")).toBe(true);
    expect(url).not.toContain("=1 &");
    expect(url).toContain("%3D1%20%26%20b%3D2%3F");
  });
});
