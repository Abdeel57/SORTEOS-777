/**
 * Formatea un número de boleto con ceros a la izquierda según el total de boletos de la rifa.
 * Ej: 99,999 boletos → 00001, 07089, 00456 (5 dígitos)
 * @param ticket - Número del boleto
 * @param totalTickets - Total de boletos en la rifa (define la cantidad de dígitos)
 * @returns Número formateado con padding de ceros
 */
export function formatTicketNumber(ticket: number, totalTickets: number): string {
  if (!totalTickets || totalTickets <= 0) {
    return String(ticket).padStart(4, '0'); // fallback a 4 dígitos
  }
  const digits = String(totalTickets).length;
  return String(ticket).padStart(digits, '0');
}
