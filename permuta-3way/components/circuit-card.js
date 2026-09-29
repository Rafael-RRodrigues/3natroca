/**
 * Componente CircuitCard B2C: Card de Oportunidade de Troca em Trio
 * Implementa a arquitetura Double-Bezel (High-End Visual Design) e ícones SVG de precisão.
 */

import { formatBRL } from '../data/mock-circuits.js';
import { 
  iconHeart, 
  iconPackage, 
  iconGift, 
  iconArrowRight, 
  iconKey, 
  iconCheck, 
  iconSparkles 
} from './icons.js';

export function renderCircuitCard(circuit, isSelected, { onSelect, onConfirmApproval, onOpenHandshake }) {
  const cardShell = document.createElement('div');
  cardShell.className = `double-bezel-shell b2c-circuit-card ${isSelected ? 'is-selected' : ''}`;
  cardShell.setAttribute('tabindex', '0');
  cardShell.setAttribute('role', 'article');
  cardShell.setAttribute('aria-label', `Oportunidade de troca: ${circuit.title}`);

  const youNode = circuit.nodes.find(n => n.isCurrentUser);
  const receiveNode = circuit.nodes.find(n => n.id === (circuit.id === 'cir-alpha-09' ? 'user-b' : 'user-e'));

  let statusBadgeHtml = '';
  let actionButtonHtml = '';

  if (circuit.status === 'PENDING_USER_APPROVAL') {
    statusBadgeHtml = `
      <span class="badge-pill badge-orange">
        2 de 3 confirmaram (Falta você)
      </span>
    `;
    actionButtonHtml = `
      <button class="btn btn-purple btn-confirm-action" data-circuit-id="${circuit.id}">
        <span>Confirmar Troca</span>
        <span class="btn-trailing-badge">
          ${iconArrowRight({ size: 13, color: '#ffffff' })}
        </span>
      </button>
    `;
  } else if (circuit.status === 'AWAITING_HANDSHAKE') {
    const verifiedCount = circuit.deliveries.filter(d => d.status === 'delivered').length;
    statusBadgeHtml = `
      <span class="badge-pill badge-green">
        3 de 3 confirmados (${verifiedCount}/3 entregues)
      </span>
    `;
    actionButtonHtml = `
      <button class="btn btn-orange btn-handshake-action" data-circuit-id="${circuit.id}">
        <span>Ver Código (${verifiedCount}/3)</span>
        <span class="btn-trailing-badge">
          ${iconKey({ size: 13, color: '#ffffff' })}
        </span>
      </button>
    `;
  } else if (circuit.status === 'COMPLETED') {
    statusBadgeHtml = `
      <span class="badge-pill badge-green">
        Troca Concluída com Sucesso
      </span>
    `;
    actionButtonHtml = `
      <button class="btn btn-outline" disabled>
        <span>${iconCheck({ size: 14, color: 'var(--trust-green)' })} Produtos Entregues</span>
      </button>
    `;
  }

  cardShell.innerHTML = `
    <style>
      .b2c-circuit-card {
        cursor: pointer;
        position: relative;
        margin-bottom: 20px;
      }
      .card-visual-hero {
        position: relative;
        border-radius: var(--radius-input);
        overflow: hidden;
        margin-bottom: 14px;
        background: #f1f5f9;
      }
      .trio-images-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3px;
        height: 180px;
      }
      .trio-img-half {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .floating-badge-top-left {
        position: absolute;
        top: 10px;
        left: 10px;
        background: var(--primary-purple);
        color: #ffffff;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: var(--radius-pill);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.02em;
        z-index: 5;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .floating-favorite-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 34px;
        height: 34px;
        background: #ffffff;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        z-index: 5;
        transition: transform var(--transition-fast);
      }
      .floating-favorite-btn:hover {
        transform: scale(1.1);
      }
      .floating-favorite-btn:active {
        transform: scale(0.92);
      }
      .card-status-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .code-tag {
        font-size: 0.72rem;
        color: var(--text-muted);
        font-weight: 600;
      }
      .card-title-b2c {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--text-headline);
        line-height: 1.35;
        margin-bottom: 8px;
      }
      .card-story-copy {
        font-size: 0.85rem;
        color: var(--text-body);
        line-height: 1.4;
        margin-bottom: 14px;
      }
      /* Resumo Você Dá / Você Recebe */
      .exchange-pills-box {
        background: var(--bg-subtle);
        border: 1px solid #eef0f3;
        border-radius: var(--radius-input);
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 14px;
      }
      .exchange-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.82rem;
      }
      .exchange-row-label {
        color: var(--text-muted);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .exchange-row-value {
        font-weight: 700;
        color: var(--text-headline);
        max-width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* Barra da Volta Financeira */
      .financial-difference-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: #faf5ff;
        border: 1px solid var(--primary-purple-border);
        border-radius: var(--radius-input);
        margin-bottom: 16px;
      }
      .diff-label {
        font-size: 0.78rem;
        color: var(--primary-purple);
        font-weight: 600;
      }
      .diff-value {
        font-size: 0.92rem;
        font-weight: 800;
        color: var(--primary-purple);
      }
      .card-footer-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-top: 4px;
      }
      .see-details-hint {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--primary-purple);
        display: flex;
        align-items: center;
        gap: 4px;
      }
    </style>

    <div class="double-bezel-core">
      <!-- Imagem em Destaque Inspirada em olx2.png -->
      <div class="card-visual-hero">
        <span class="floating-badge-top-left">
          ${iconSparkles({ size: 13, color: '#ffffff' })}
          Match em Trio
        </span>
        <button class="floating-favorite-btn" title="Salvar nos Favoritos" aria-label="Favoritar">
          ${iconHeart({ size: 16, color: 'var(--text-muted)' })}
        </button>

        <div class="trio-images-row">
          <img class="trio-img-half" src="${youNode.offeredItem.imageUrl}" alt="${youNode.offeredItem.title}" title="Seu item: ${youNode.offeredItem.title}" />
          <img class="trio-img-half" src="${receiveNode.offeredItem.imageUrl}" alt="${receiveNode.offeredItem.title}" title="Item que você recebe: ${receiveNode.offeredItem.title}" />
        </div>
      </div>

      <!-- Barra de Status Humana -->
      <div class="card-status-bar">
        <span class="code-tag">ID: ${circuit.code} (${circuit.category})</span>
        ${statusBadgeHtml}
      </div>

      <h3 class="card-title-b2c">${circuit.title}</h3>
      <p class="card-story-copy">${circuit.friendlyStory}</p>

      <!-- Resumo de Entrega e Recebimento -->
      <div class="exchange-pills-box">
        <div class="exchange-row">
          <span class="exchange-row-label">
            ${iconPackage({ size: 14, color: 'var(--text-muted)' })}
            Você entrega:
          </span>
          <span class="exchange-row-value" title="${youNode.offeredItem.title}">
            ${youNode.offeredItem.title.split('(')[0]}
          </span>
        </div>

        <div class="exchange-row">
          <span class="exchange-row-label" style="color: var(--trust-green-dark)">
            ${iconGift({ size: 14, color: 'var(--trust-green-dark)' })}
            Você recebe:
          </span>
          <span class="exchange-row-value" style="color: var(--trust-green-dark)" title="${receiveNode.offeredItem.title}">
            ${receiveNode.offeredItem.title.split('+')[0]} (${receiveNode.firstName})
          </span>
        </div>
      </div>

      <!-- Diferença em Dinheiro (Volta) -->
      <div class="financial-difference-box">
        <span class="diff-label">Diferença em dinheiro (Volta):</span>
        <span class="diff-value">
          ${circuit.financialSummary.userDifferenceType === 'PAY' 
            ? `Você paga ${formatBRL(circuit.financialSummary.differenceAmount)}`
            : `Você recebe ${formatBRL(circuit.financialSummary.differenceAmount)}`}
        </span>
      </div>

      <!-- Rodapé e Botão de Ação -->
      <div class="card-footer-action">
        <span class="see-details-hint">
          Ver circuito completo &rarr;
        </span>
        <div>${actionButtonHtml}</div>
      </div>
    </div>
  `;

  // Listeners
  cardShell.addEventListener('click', (e) => {
    const confirmBtn = e.target.closest('.btn-confirm-action');
    if (confirmBtn) {
      e.stopPropagation();
      onConfirmApproval(circuit.id);
      return;
    }

    const handshakeBtn = e.target.closest('.btn-handshake-action');
    if (handshakeBtn) {
      e.stopPropagation();
      onOpenHandshake(circuit);
      return;
    }

    const favBtn = e.target.closest('.floating-favorite-btn');
    if (favBtn) {
      e.stopPropagation();
      const isFav = favBtn.classList.toggle('is-favorited');
      favBtn.innerHTML = isFav 
        ? iconHeart({ filled: true, size: 16 }) 
        : iconHeart({ filled: false, size: 16, color: 'var(--text-muted)' });
      return;
    }

    onSelect(circuit);
  });

  return cardShell;
}
