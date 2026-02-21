/**
 * Estilos de tarjetas bancarias para bancos mexicanos
 * Cada banco tiene su color característico y diseño
 */

export interface BankStyle {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  gradient: string;
  logo?: string;
  textColor: string;
  accentColor: string;
}

export const BANK_STYLES: Record<string, BankStyle> = {
  // BBVA
  'BBVA': {
    name: 'BBVA',
    primaryColor: '#004481',
    secondaryColor: '#0066CC',
    gradient: 'linear-gradient(135deg, #004481 0%, #0066CC 50%, #004481 100%)',
    textColor: '#FFFFFF',
    accentColor: '#00D4FF',
  },
  'bbva': {
    name: 'BBVA',
    primaryColor: '#004481',
    secondaryColor: '#0066CC',
    gradient: 'linear-gradient(135deg, #004481 0%, #0066CC 50%, #004481 100%)',
    textColor: '#FFFFFF',
    accentColor: '#00D4FF',
  },

  // Banorte
  'Banorte': {
    name: 'Banorte',
    primaryColor: '#E60012',
    secondaryColor: '#FF1A2E',
    gradient: 'linear-gradient(135deg, #E60012 0%, #FF1A2E 50%, #E60012 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  'banorte': {
    name: 'Banorte',
    primaryColor: '#E60012',
    secondaryColor: '#FF1A2E',
    gradient: 'linear-gradient(135deg, #E60012 0%, #FF1A2E 50%, #E60012 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },

  // Santander
  'Santander': {
    name: 'Santander',
    primaryColor: '#EC0000',
    secondaryColor: '#FF0000',
    gradient: 'linear-gradient(135deg, #EC0000 0%, #FF0000 50%, #EC0000 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  'santander': {
    name: 'Santander',
    primaryColor: '#EC0000',
    secondaryColor: '#FF0000',
    gradient: 'linear-gradient(135deg, #EC0000 0%, #FF0000 50%, #EC0000 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },

  // Banamex / Citibanamex
  'Banamex': {
    name: 'Banamex',
    primaryColor: '#1E3A8A',
    secondaryColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FBBF24',
  },
  'banamex': {
    name: 'Banamex',
    primaryColor: '#1E3A8A',
    secondaryColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FBBF24',
  },
  'Citibanamex': {
    name: 'Citibanamex',
    primaryColor: '#1E3A8A',
    secondaryColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FBBF24',
  },
  'citibanamex': {
    name: 'Citibanamex',
    primaryColor: '#1E3A8A',
    secondaryColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FBBF24',
  },

  // HSBC
  'HSBC': {
    name: 'HSBC',
    primaryColor: '#DC143C',
    secondaryColor: '#FF1744',
    gradient: 'linear-gradient(135deg, #DC143C 0%, #FF1744 50%, #DC143C 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  'hsbc': {
    name: 'HSBC',
    primaryColor: '#DC143C',
    secondaryColor: '#FF1744',
    gradient: 'linear-gradient(135deg, #DC143C 0%, #FF1744 50%, #DC143C 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },

  // Scotiabank
  'Scotiabank': {
    name: 'Scotiabank',
    primaryColor: '#E31837',
    secondaryColor: '#FF1F3D',
    gradient: 'linear-gradient(135deg, #E31837 0%, #FF1F3D 50%, #E31837 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  'scotiabank': {
    name: 'Scotiabank',
    primaryColor: '#E31837',
    secondaryColor: '#FF1F3D',
    gradient: 'linear-gradient(135deg, #E31837 0%, #FF1F3D 50%, #E31837 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },

  // Banregio
  'Banregio': {
    name: 'Banregio',
    primaryColor: '#0066CC',
    secondaryColor: '#0080FF',
    gradient: 'linear-gradient(135deg, #0066CC 0%, #0080FF 50%, #0066CC 100%)',
    textColor: '#FFFFFF',
    accentColor: '#00D4FF',
  },
  'banregio': {
    name: 'Banregio',
    primaryColor: '#0066CC',
    secondaryColor: '#0080FF',
    gradient: 'linear-gradient(135deg, #0066CC 0%, #0080FF 50%, #0066CC 100%)',
    textColor: '#FFFFFF',
    accentColor: '#00D4FF',
  },

  // Inbursa
  'Inbursa': {
    name: 'Inbursa',
    primaryColor: '#003366',
    secondaryColor: '#004D99',
    gradient: 'linear-gradient(135deg, #003366 0%, #004D99 50%, #003366 100%)',
    textColor: '#FFFFFF',
    accentColor: '#66B2FF',
  },
  'inbursa': {
    name: 'Inbursa',
    primaryColor: '#003366',
    secondaryColor: '#004D99',
    gradient: 'linear-gradient(135deg, #003366 0%, #004D99 50%, #003366 100%)',
    textColor: '#FFFFFF',
    accentColor: '#66B2FF',
  },

  // Banco Azteca
  'Banco Azteca': {
    name: 'Banco Azteca',
    primaryColor: '#FF6B00',
    secondaryColor: '#FF8C00',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FF6B00 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  'banco azteca': {
    name: 'Banco Azteca',
    primaryColor: '#FF6B00',
    secondaryColor: '#FF8C00',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FF6B00 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },

  // Bancoppel
  'Bancoppel': {
    name: 'Bancoppel',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8800',
    gradient: 'linear-gradient(135deg, #FF6600 0%, #FF8800 50%, #FF6600 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },
  'bancoppel': {
    name: 'Bancoppel',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8800',
    gradient: 'linear-gradient(135deg, #FF6600 0%, #FF8800 50%, #FF6600 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  },

  // OXXO Pay / SPEI
  'OXXO': {
    name: 'OXXO',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8800',
    gradient: 'linear-gradient(135deg, #FF6600 0%, #FF8800 50%, #FF6600 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFFFFF',
  },
  'oxxo': {
    name: 'OXXO',
    primaryColor: '#FF6600',
    secondaryColor: '#FF8800',
    gradient: 'linear-gradient(135deg, #FF6600 0%, #FF8800 50%, #FF6600 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFFFFF',
  },
  'SPEI': {
    name: 'SPEI',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #1E40AF 100%)',
    textColor: '#FFFFFF',
    accentColor: '#60A5FA',
  },
  'spei': {
    name: 'SPEI',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #1E40AF 100%)',
    textColor: '#FFFFFF',
    accentColor: '#60A5FA',
  },
};

/**
 * Obtiene el estilo de un banco por su nombre
 */
export function getBankStyle(bankName: string): BankStyle {
  const normalizedName = bankName.trim();
  return BANK_STYLES[normalizedName] || BANK_STYLES[normalizedName.toLowerCase()] || getDefaultStyle();
}

/**
 * Estilo por defecto para bancos no reconocidos
 */
function getDefaultStyle(): BankStyle {
  return {
    name: 'Banco',
    primaryColor: '#1f2937',
    secondaryColor: '#374151',
    gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
    textColor: '#FFFFFF',
    accentColor: '#0ea5e9',
  };
}

/**
 * Lista de bancos disponibles para el selector
 */
export const AVAILABLE_BANKS = [
  'BBVA',
  'Banorte',
  'Santander',
  'Banamex',
  'Citibanamex',
  'HSBC',
  'Scotiabank',
  'Banregio',
  'Inbursa',
  'Banco Azteca',
  'Bancoppel',
  'OXXO',
  'SPEI',
  'Otro',
];


