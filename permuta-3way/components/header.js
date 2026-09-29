/**
 * Componente Header B2C: Inspirado no gabarito OLX com diretrizes da taste-skill e ui-ux-pro-max
 * Nav de linha única com altura ≤ 80px, busca ergonômica com localização, ícones SVG e ação de destaque.
 */

import { formatBRL } from '../data/mock-circuits.js';
import { 
  iconSearch, 
  iconLocation, 
  iconHeart, 
  iconChat, 
  iconWallet, 
  iconArrowUpRight, 
  iconExchange 
} from './icons.js';

export function renderHeader(currentUser, { onSearch } = {}) {
  const headerWrapper = document.createElement('header');
  headerWrapper.className = 'marketplace-header';

  headerWrapper.innerHTML = `
    <style>
      .marketplace-header {
        background: #ffffff;
        border-bottom: 1px solid var(--border-card);
        position: sticky;
        top: 0;
        z-index: 100;
        box-shadow: 0 1px 3px rgba(17, 24, 39, 0.03);
      }
      .header-main-row {
        max-width: 1320px;
        margin: 0 auto;
        padding: 10px 24px;
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
      .brand-link {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: var(--text-headline);
        flex-shrink: 0;
      }
      .brand-logo-mark {
        width: 38px;
        height: 38px;
        border-radius: var(--radius-input);
        background: var(--primary-purple);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-purple-btn);
      }
      .brand-title-wrap {
        display: flex;
        flex-direction: column;
      }
      .brand-name {
        font-size: 1.15rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.1;
      }
      .brand-name span {
        color: var(--primary-purple);
      }
      .brand-tagline {
        font-size: 0.65rem;
        color: var(--text-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      /* Barra de Busca Estilo Gabarito OLX */
      .search-bar-consumer {
        flex: 1;
        max-width: 540px;
        display: flex;
        align-items: center;
        background: var(--bg-subtle);
        border: 1px solid var(--border-card);
        border-radius: var(--radius-pill);
        padding: 4px 6px 4px 16px;
        transition: border-color var(--transition-fast), background var(--transition-fast);
      }
      .search-bar-consumer:focus-within {
        border-color: var(--primary-purple);
        background: #ffffff;
        box-shadow: 0 0 0 3px var(--primary-purple-tint);
      }
      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        font-family: var(--font-sans);
        font-size: 0.86rem;
        color: var(--text-headline);
        outline: none;
      }
      .search-input::placeholder {
        color: var(--text-light);
      }
      .location-pill {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        font-size: 0.76rem;
        font-weight: 600;
        color: var(--text-body);
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-pill);
        margin: 0 4px;
        cursor: pointer;
        user-select: none;
      }
      .search-submit-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--primary-purple);
        border: none;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background var(--transition-fast), transform var(--transition-fast);
      }
      .search-submit-btn:hover {
        background: var(--primary-purple-hover);
      }
      .search-submit-btn:active {
        transform: scale(0.95);
      }
      /* Ações à Direita em Linha Única */
      .header-actions-right {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-shrink: 0;
      }
      .nav-action-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--text-body);
        text-decoration: none;
        cursor: pointer;
        transition: color var(--transition-fast);
      }
      .nav-action-item:hover {
        color: var(--primary-purple);
      }
      .nav-action-item:hover .svg-icon {
        stroke: var(--primary-purple);
      }
      .badge-counter {
        background: var(--accent-orange);
        color: #ffffff;
        font-size: 0.68rem;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: var(--radius-pill);
      }
      .user-account-widget {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 12px 4px 4px;
        border-radius: var(--radius-pill);
        border: 1px solid var(--border-card);
        background: #ffffff;
        cursor: pointer;
        transition: border-color var(--transition-fast);
      }
      .user-account-widget:hover {
        border-color: #cbd5e1;
      }
      .user-avatar-small {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
      }
      .user-account-text {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
      }
      .user-account-name {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text-headline);
      }
      .user-account-wallet {
        font-size: 0.7rem;
        color: var(--trust-green-dark);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .btn-anunciar-troca {
        background: var(--primary-purple);
        color: #ffffff;
        font-size: 0.84rem;
        font-weight: 700;
        padding: 8px 18px;
        border-radius: var(--radius-pill);
        text-decoration: none;
        box-shadow: var(--shadow-purple-btn);
        display: flex;
        align-items: center;
        gap: 8px;
        transition: var(--transition-button);
        white-space: nowrap;
      }
      .btn-anunciar-troca:hover {
        background: var(--primary-purple-hover);
        transform: translateY(-1px);
      }
      .btn-anunciar-troca:active {
        transform: scale(0.97);
      }
      @media (max-width: 900px) {
        .search-bar-consumer, .nav-action-item {
          display: none;
        }
      }
    </style>

    <!-- Faixa Promocional Superior -->
    <div class="promo-strip-top">
      <span>Novidade: Troca em Trio sem custos adicionais com a Garantia Permuta.</span>
      <a href="#como-funciona">
        <span>Ver como funciona</span>
        ${iconArrowUpRight({ size: 12, color: '#ffffff' })}
      </a>
    </div>

    <!-- Barra Principal com Altura Controlada (68px) -->
    <div class="header-main-row">
      <a href="./" class="brand-link" aria-label="3NaTroca Início">
        <div class="brand-logo-mark">
          ${iconExchange({ size: 20, color: '#ffffff' })}
        </div>
        <div class="brand-title-wrap">
          <span class="brand-name">3Na<span>Troca</span></span>
          <span class="brand-tagline">Permuta em Trio P2P</span>
        </div>
      </a>

      <!-- Barra de Busca com Seletor de Região -->
      <div class="search-bar-consumer" role="search">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Buscar produtos para trocar (ex: Drone, MacBook, Câmera)..." 
          aria-label="Buscar produtos para trocar"
        />
        <div class="location-pill" title="Região ativa">
          ${iconLocation({ size: 13, color: 'var(--primary-purple)' })}
          <span>SP e Região</span>
        </div>
        <button class="search-submit-btn" aria-label="Executar Pesquisa">
          ${iconSearch({ size: 16, color: '#ffffff' })}
        </button>
      </div>

      <!-- Links de Ação em Linha Única -->
      <div class="header-actions-right">
        <div class="nav-action-item" tabindex="0" role="button" aria-label="Desejos">
          ${iconHeart({ size: 17, color: 'var(--text-body)' })}
          <span>Desejos</span>
          <span class="badge-counter">3</span>
        </div>

        <div class="nav-action-item" tabindex="0" role="button" aria-label="Chat">
          ${iconChat({ size: 17, color: 'var(--text-body)' })}
          <span>Chat</span>
          <span class="badge-counter">2</span>
        </div>

        <!-- Widget do Usuário -->
        <div class="user-account-widget" tabindex="0" role="button" aria-label="Ver perfil de Rafael">
          <img class="user-avatar-small" src="${currentUser.avatarUrl}" alt="${currentUser.fullName}" />
          <div class="user-account-text">
            <span class="user-account-name">${currentUser.firstName}</span>
            <span class="user-account-wallet">
              ${iconWallet({ size: 12, color: 'var(--trust-green-dark)' })}
              ${formatBRL(currentUser.walletBalance)}
            </span>
          </div>
        </div>

        <a href="#anunciar" class="btn-anunciar-troca">
          <span>+</span> Anunciar Troca
        </a>
      </div>
    </div>
  `;

  // Search input event listener
  const inputEl = headerWrapper.querySelector('.search-input');
  if (inputEl && onSearch) {
    inputEl.addEventListener('input', (e) => {
      onSearch(e.target.value);
    });
  }

  return headerWrapper;
}
