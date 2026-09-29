/**
 * Componente Icons: Catálogo de ícones SVG vetoriais de alta precisão
 * Conformidade com as skills ui-ux-pro-max ("No emojis as icons, use SVG") 
 * e high-end-visual-design ("Ultra-light, precise 1.75px stroke lines").
 */

export function createSvgIcon(svgContent, { size = 18, color = 'currentColor', className = '' } = {}) {
  return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="${color}" 
      stroke-width="1.75" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="svg-icon ${className}"
      aria-hidden="true"
    >
      ${svgContent}
    </svg>
  `.trim();
}

// 1. Escudo de Proteção / Pagamento Seguro (Garantia Permuta)
export function iconShield(options) {
  return createSvgIcon(`
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  `, options);
}

// 2. Chave de Segurança / Código PIN de Entrega
export function iconKey(options) {
  return createSvgIcon(`
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="m21 2-9.6 9.6"/>
    <path d="m15.5 7.5 3 3"/>
    <path d="m18.5 4.5 3 3"/>
  `, options);
}

// 3. Busca / Lupa
export function iconSearch(options) {
  return createSvgIcon(`
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  `, options);
}

// 4. Coração / Favoritos / Lista de Desejos
export function iconHeart({ filled = false, ...options } = {}) {
  return `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${options.size || 18}" 
      height="${options.size || 18}" 
      viewBox="0 0 24 24" 
      fill="${filled ? '#f43f5e' : 'none'}" 
      stroke="${filled ? '#f43f5e' : (options.color || 'currentColor')}" 
      stroke-width="1.75" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      class="svg-icon ${options.className || ''}"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  `.trim();
}

// 5. Chat / Conversas
export function iconChat(options) {
  return createSvgIcon(`
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  `, options);
}

// 6. Troca Triangular / Ciclo de Permuta
export function iconExchange(options) {
  return createSvgIcon(`
    <path d="M21 8H7a4 4 0 0 0 0 8h1"/>
    <path d="m17 4 4 4-4 4"/>
    <path d="M3 16h14a4 4 0 0 0 0-8h-1"/>
    <path d="m7 20-4-4 4-4"/>
  `, options);
}

// 7. Check / Concluído
export function iconCheck(options) {
  return createSvgIcon(`
    <polyline points="20 6 9 17 4 12"/>
  `, options);
}

// 8. Pacote / Você Entrega
export function iconPackage(options) {
  return createSvgIcon(`
    <path d="m7.5 4.27 9 5.15"/>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 22V12"/>
  `, options);
}

// 9. Presente / Você Recebe
export function iconGift(options) {
  return createSvgIcon(`
    <rect x="3" y="8" width="18" height="4" rx="1"/>
    <path d="M12 8v13"/>
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
  `, options);
}

// 10. Localização / Ponto de Encontro
export function iconLocation(options) {
  return createSvgIcon(`
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  `, options);
}

// 11. Seta Direita (Trailing Arrow para Button-in-Button)
export function iconArrowRight(options) {
  return createSvgIcon(`
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  `, options);
}

// 12. Seta Diagonal (High-End Trailing Icon)
export function iconArrowUpRight(options) {
  return createSvgIcon(`
    <path d="M7 17 17 7"/>
    <path d="M7 7h10v10"/>
  `, options);
}

// 13. Brilho / Destaque / Match Perfeito
export function iconSparkles(options) {
  return createSvgIcon(`
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  `, options);
}

// 14. Usuário / Perfil Verificado
export function iconUserCheck(options) {
  return createSvgIcon(`
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <polyline points="16 11 18 13 22 9"/>
  `, options);
}

// 15. Carteira / Saldo
export function iconWallet(options) {
  return createSvgIcon(`
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
  `, options);
}

// 16. Ícones de Categorias do Marketplace
export function iconCategory(category, options) {
  switch (category) {
    case 'tech':
      return createSvgIcon(`
        <rect width="20" height="14" x="2" y="3" rx="2"/>
        <line x1="8" x2="16" y1="21" y2="21"/>
        <line x1="12" x2="12" y1="17" y2="21"/>
      `, options);
    case 'camera':
      return createSvgIcon(`
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
        <circle cx="12" cy="13" r="3"/>
      `, options);
    case 'drone':
      return createSvgIcon(`
        <path d="M12 12v6"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="m4.93 4.93 4.24 4.24"/>
        <path d="m14.83 14.83 4.24 4.24"/>
        <path d="m14.83 9.17 4.24-4.24"/>
        <path d="m4.93 19.07 4.24-4.24"/>
      `, options);
    case 'phone':
      return createSvgIcon(`
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
        <line x1="12" x2="12.01" y1="18" y2="18"/>
      `, options);
    case 'game':
      return createSvgIcon(`
        <line x1="6" x2="10" y1="12" y2="12"/>
        <line x1="8" x2="8" y1="10" y2="14"/>
        <line x1="15" x2="15.01" y1="13" y2="13"/>
        <line x1="18" x2="18.01" y1="11" y2="11"/>
        <rect width="20" height="12" x="2" y="6" rx="2"/>
      `, options);
    case 'audio':
      return createSvgIcon(`
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
      `, options);
    default:
      return createSvgIcon(`
        <path d="m6 2 3 6h6l3-6"/>
        <path d="M3 6h18l-2 13H5L3 6Z"/>
      `, options);
  }
}
