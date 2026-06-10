/**
 * Canais de contato direto.
 *
 * Centraliza o número de WhatsApp e a construção de links `wa.me` para
 * evitar literais duplicados entre o botão flutuante e o estado de sucesso
 * do formulário de contato.
 */

/** Número de WhatsApp em formato internacional, sem símbolos (padrão wa.me). */
export const WHATSAPP_NUMBER = "5527992018590";

/**
 * Monta um link `https://wa.me/...` opcionalmente pré-preenchido.
 *
 * @param text Mensagem inicial (será codificada para URL). Quando omitida,
 *             retorna o link sem query string — abre o chat em branco.
 */
export function buildWhatsappUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
