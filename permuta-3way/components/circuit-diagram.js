/**
 * Componente CircuitDiagram B2C: "Troca em Trio: Como funciona o circuito"
 * Totalmente alinhado às diretrizes de design da taste-skill, ui-ux-pro-max e high-end-visual-design.
 */

import { formatBRL } from '../data/mock-circuits.js';
import { 
  iconSparkles, 
  iconExchange, 
  iconPackage, 
  iconGift, 
  iconLocation, 
  iconUserCheck, 
  iconShield, 
  iconKey, 
  iconCheck, 
  iconArrowRight 
} from './icons.js';

export function renderCircuitDiagram(circuit, { onConfirmApproval, onOpenHandshake }) {
  const container = document.createElement('div');
  container.className = 'consumer-card circuit-detail-view';

  const nodeA = circuit.nodes.find(n => n.id === 'user-a' || n.id === 'user-d');
  const nodeB = circuit.nodes.find(n => n.id === 'user-b' || n.id === 'user-e');
  const nodeYou = circuit.nodes.find(n => n.isCurrentUser);

  const deliv1 = circuit.deliveries[0];
  const deliv2 = circuit.deliveries[1];
  const deliv3 = circuit.deliveries[2];

  const isDeliv1Done = deliv1.status === 'delivered';
  const isDeliv2Done = deliv2.status === 'delivered';
  const isDeliv3Done = deliv3.status === 'delivered';

  container.innerHTML = `
    <style>
      .circuit-detail-view {
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-outer);
        padding: 32px;
        box-shadow: var(--shadow-card);
      }
      .detail-header-badge-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        flex-wrap: wrap;
        gap: 16px;
      }
      .story-title {
        font-size: 1.45rem;
        font-weight: 800;
        color: var(--text-headline);
        letter-spacing: -0.025em;
        line-height: 1.25;
        margin-bottom: 6px;
      }
      .story-subtitle {
        font-size: 0.92rem;
        color: var(--text-body);
        line-height: 1.45;
      }
      /* Card Hero Central com Destaque de Ação do Usuário */
      .user-action-highlight-box {
        background: linear-gradient(135deg, #fbf7ff 0%, #ffffff 100%);
        border: 2px solid var(--primary-purple-border);
        border-radius: var(--radius-inner);
        padding: 24px;
        margin-bottom: 32px;
        box-shadow: var(--shadow-sm);
      }
      .highlight-box-title {
        font-size: 0.88rem;
        font-weight: 800;
        text-transform: uppercase;
        color: var(--primary-purple);
        letter-spacing: 0.05em;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .action-columns-trio {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 20px;
        align-items: center;
      }
      @media (max-width: 768px) {
        .action-columns-trio {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }
      .product-action-card {
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-input);
        padding: 16px;
        display: flex;
        gap: 16px;
        align-items: center;
        box-shadow: var(--shadow-sm);
      }
      .action-prod-thumb {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-input);
        object-fit: cover;
        flex-shrink: 0;
      }
      .action-prod-meta {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .action-role-tag {
        font-size: 0.72rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .action-prod-name {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text-headline);
        line-height: 1.3;
      }
      .action-user-target {
        font-size: 0.8rem;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .loop-exchange-arrow-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--primary-purple);
      }
      /* Circuito Visual em Trio com os 3 Participantes */
      .trio-story-loop-container {
        margin-bottom: 32px;
      }
      .trio-loop-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--text-headline);
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .trio-loop-subtitle {
        font-size: 0.84rem;
        color: var(--text-muted);
        margin-bottom: 18px;
      }
      .trio-members-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      @media (max-width: 860px) {
        .trio-members-grid {
          grid-template-columns: 1fr;
        }
      }
      .trio-member-card {
        background: var(--bg-subtle);
        border: 1px solid var(--border-card);
        border-radius: var(--radius-inner);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform var(--transition-fast);
      }
      .trio-member-card:hover {
        transform: translateY(-2px);
      }
      .trio-member-card.is-you {
        border-color: var(--primary-purple);
        background: #ffffff;
        box-shadow: 0 0 0 1px var(--primary-purple-tint), var(--shadow-sm);
      }
      .member-prod-photo-wrap {
        position: relative;
        height: 140px;
        overflow: hidden;
      }
      .member-prod-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .condition-floating-badge {
        position: absolute;
        bottom: 8px;
        left: 8px;
        background: rgba(17, 24, 39, 0.78);
        backdrop-filter: blur(4px);
        color: #ffffff;
        font-size: 0.68rem;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: var(--radius-pill);
      }
      .member-card-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 8px;
      }
      .member-profile-header {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .member-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #ffffff;
        box-shadow: var(--shadow-sm);
      }
      .member-name-group {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }
      .member-name {
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--text-headline);
      }
      .member-trust-badge {
        font-size: 0.72rem;
        color: var(--trust-green-dark);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .member-location-row {
        font-size: 0.75rem;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .delivery-step-pill {
        margin-top: auto;
        padding: 8px 12px;
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-input);
        font-size: 0.76rem;
        line-height: 1.35;
      }
      .delivery-step-pill.done {
        background: var(--trust-green-tint);
        border-color: var(--trust-green-border);
        color: var(--trust-green-dark);
        font-weight: 600;
      }
      /* Guia Ilustrado em 3 Passos de Segurança (Airbnb / Vinted Style) */
      .safety-guide-section {
        background: #f8fafc;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-inner);
        padding: 24px;
      }
      .safety-guide-title {
        font-size: 1rem;
        font-weight: 800;
        color: var(--text-headline);
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .safety-guide-desc {
        font-size: 0.84rem;
        color: var(--text-body);
        margin-bottom: 18px;
      }
      .safety-steps-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      @media (max-width: 768px) {
        .safety-steps-grid {
          grid-template-columns: 1fr;
        }
      }
      .safety-step-card {
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-input);
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: var(--shadow-sm);
      }
      .step-icon-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--primary-purple-tint);
        color: var(--primary-purple);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.95rem;
        font-weight: 800;
      }
      .step-card-title {
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--text-headline);
      }
      .step-card-text {
        font-size: 0.78rem;
        color: var(--text-body);
        line-height: 1.45;
      }
    </style>

    <!-- Cabeçalho do Card de Detalhes -->
    <div class="detail-header-badge-row">
      <div>
        <h2 class="story-title">O algoritmo conectou você, o ${nodeA.firstName} e a ${nodeB.firstName}!</h2>
        <p class="story-subtitle">${circuit.friendlyStory}</p>
      </div>

      <div>
        ${circuit.status === 'PENDING_USER_APPROVAL' ? `
          <button class="btn btn-purple btn-confirm-trigger">
            <span>Confirmar Minha Participação</span>
            <span class="btn-trailing-badge">
              ${iconArrowRight({ size: 13, color: '#ffffff' })}
            </span>
          </button>
        ` : circuit.status === 'AWAITING_HANDSHAKE' ? `
          <button class="btn btn-orange btn-handshake-trigger">
            <span>Ver Código de Entrega (${circuit.deliveries.filter(d => d.status === 'delivered').length}/3)</span>
            <span class="btn-trailing-badge">
              ${iconKey({ size: 13, color: '#ffffff' })}
            </span>
          </button>
        ` : `
          <span class="badge-pill badge-green" style="font-size: 0.85rem; padding: 8px 16px;">
            ${iconCheck({ size: 15, color: 'var(--trust-green-dark)' })}
            Troca em Trio Concluída
          </span>
        `}
      </div>
    </div>

    <!-- Destaque Central: Ação Exata do Usuário -->
    <div class="user-action-highlight-box">
      <div class="highlight-box-title">
        ${iconSparkles({ size: 16, color: 'var(--primary-purple)' })}
        Sua Troca em 1 Minuto: O que você dá e o que você recebe
      </div>

      <div class="action-columns-trio">
        <!-- O que Você Entrega -->
        <div class="product-action-card">
          <img class="action-prod-thumb" src="${nodeYou.offeredItem.imageUrl}" alt="${nodeYou.offeredItem.title}" />
          <div class="action-prod-meta">
            <span class="action-role-tag" style="color: var(--primary-purple)">Você Entrega</span>
            <span class="action-prod-name">${nodeYou.offeredItem.title}</span>
            <span class="action-user-target">
              ${iconLocation({ size: 13, color: 'var(--text-muted)' })}
              Para <strong>${nodeA.fullName}</strong> (${nodeA.location.split(',')[1] || nodeA.location})
            </span>
          </div>
        </div>

        <div class="loop-exchange-arrow-center">
          ${iconExchange({ size: 28, color: 'var(--primary-purple)' })}
        </div>

        <!-- O que Você Recebe -->
        <div class="product-action-card" style="border-color: var(--trust-green-border); background: #fafdfa;">
          <img class="action-prod-thumb" src="${nodeB.offeredItem.imageUrl}" alt="${nodeB.offeredItem.title}" />
          <div class="action-prod-meta">
            <span class="action-role-tag" style="color: var(--trust-green)">Você Recebe</span>
            <span class="action-prod-name">${nodeB.offeredItem.title}</span>
            <span class="action-user-target" style="color: var(--trust-green-dark)">
              ${iconGift({ size: 13, color: 'var(--trust-green-dark)' })}
              De <strong>${nodeB.fullName}</strong> (${nodeB.location.split(',')[1] || nodeB.location})
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Troca em Trio: Como Funciona o Circuito Completo -->
    <div class="trio-story-loop-container">
      <h3 class="trio-loop-title">
        ${iconExchange({ size: 18, color: 'var(--primary-purple)' })}
        Troca em Trio: Como funciona o circuito entre os 3 participantes
      </h3>
      <p class="trio-loop-subtitle">
        Todos os participantes são verificados com CPF e a entrega é feita em locais públicos com código no celular.
      </p>

      <div class="trio-members-grid">
        <!-- Participante 1: Você -->
        <div class="trio-member-card is-you">
          <div class="member-prod-photo-wrap">
            <img class="member-prod-photo" src="${nodeYou.offeredItem.imageUrl}" alt="${nodeYou.offeredItem.title}" />
            <span class="condition-floating-badge">${nodeYou.offeredItem.condition.split('&bull;')[0]}</span>
          </div>
          <div class="member-card-content">
            <div class="member-profile-header">
              <img class="member-avatar" src="${nodeYou.avatarUrl}" alt="${nodeYou.fullName}" />
              <div class="member-name-group">
                <span class="member-name">${nodeYou.fullName}</span>
                <span class="member-trust-badge">
                  ★ ${nodeYou.rating} (${nodeYou.tradesCount} trocas)
                </span>
              </div>
            </div>
            <div class="member-location-row">
              ${iconLocation({ size: 13, color: 'var(--text-muted)' })}
              <span>${nodeYou.location}</span>
            </div>
            <div class="delivery-step-pill ${isDeliv1Done ? 'done' : ''}">
              ${isDeliv1Done ? '✓ Entregue ao Marcos' : `Passo 1: Você entrega para o <strong>${nodeA.firstName}</strong>`}
            </div>
          </div>
        </div>

        <!-- Participante 2: Marcos -->
        <div class="trio-member-card">
          <div class="member-prod-photo-wrap">
            <img class="member-prod-photo" src="${nodeA.offeredItem.imageUrl}" alt="${nodeA.offeredItem.title}" />
            <span class="condition-floating-badge">${nodeA.offeredItem.condition.split('&bull;')[0]}</span>
          </div>
          <div class="member-card-content">
            <div class="member-profile-header">
              <img class="member-avatar" src="${nodeA.avatarUrl}" alt="${nodeA.fullName}" />
              <div class="member-name-group">
                <span class="member-name">${nodeA.fullName}</span>
                <span class="member-trust-badge">
                  ${iconUserCheck({ size: 13, color: 'var(--trust-green-dark)' })}
                  CPF Verificado
                </span>
              </div>
            </div>
            <div class="member-location-row">
              ${iconLocation({ size: 13, color: 'var(--text-muted)' })}
              <span>${nodeA.location}</span>
            </div>
            <div class="delivery-step-pill ${isDeliv2Done ? 'done' : ''}">
              ${isDeliv2Done ? '✓ Entregue à Camila' : `Passo 2: Marcos entrega para a <strong>${nodeB.firstName}</strong>`}
            </div>
          </div>
        </div>

        <!-- Participante 3: Camila -->
        <div class="trio-member-card">
          <div class="member-prod-photo-wrap">
            <img class="member-prod-photo" src="${nodeB.offeredItem.imageUrl}" alt="${nodeB.offeredItem.title}" />
            <span class="condition-floating-badge">${nodeB.offeredItem.condition.split('&bull;')[0]}</span>
          </div>
          <div class="member-card-content">
            <div class="member-profile-header">
              <img class="member-avatar" src="${nodeB.avatarUrl}" alt="${nodeB.fullName}" />
              <div class="member-name-group">
                <span class="member-name">${nodeB.fullName}</span>
                <span class="member-trust-badge">
                  ${iconUserCheck({ size: 13, color: 'var(--trust-green-dark)' })}
                  CPF Verificado
                </span>
              </div>
            </div>
            <div class="member-location-row">
              ${iconLocation({ size: 13, color: 'var(--text-muted)' })}
              <span>${nodeB.location}</span>
            </div>
            <div class="delivery-step-pill ${isDeliv3Done ? 'done' : ''}">
              ${isDeliv3Done ? '✓ Entregue a Você' : `Passo 3: Camila entrega para <strong>Você</strong>`}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Passo a Passo de Segurança na Entrega -->
    <div class="safety-guide-section" id="como-funciona">
      <h4 class="safety-guide-title">
        ${iconShield({ size: 18, color: 'var(--trust-green)' })}
        Como Funciona a Entrega Segura (3 Passos Simples)
      </h4>
      <p class="safety-guide-desc">
        A troca é presencial e protegida por código de confirmação. Você nunca entrega nem recebe nada às cegas.
      </p>

      <div class="safety-steps-grid">
        <div class="safety-step-card">
          <div class="step-icon-circle">1</div>
          <h5 class="step-card-title">Encontro em Local Público</h5>
          <p class="step-card-text">
            Marquem o encontro em um shopping, estação de metrô ou ponto de troca seguro sugerido pelo app.
          </p>
        </div>

        <div class="safety-step-card">
          <div class="step-icon-circle">2</div>
          <h5 class="step-card-title">Confiram os Itens Juntos</h5>
          <p class="step-card-text">
            Verifique o estado físico, ligue o aparelho e teste todos os acessórios com calma antes de confirmar.
          </p>
        </div>

        <div class="safety-step-card">
          <div class="step-icon-circle">3</div>
          <h5 class="step-card-title">Troquem o Código no Celular</h5>
          <p class="step-card-text">
            Cada um digita o código de 4 dígitos no app. A troca é concluída e a Garantia Permuta libera o pagamento seguro.
          </p>
        </div>
      </div>
    </div>
  `;

  // Listeners
  const confirmBtn = container.querySelector('.btn-confirm-trigger');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => onConfirmApproval(circuit.id));
  }

  const handshakeBtn = container.querySelector('.btn-handshake-trigger');
  if (handshakeBtn) {
    handshakeBtn.addEventListener('click', () => onOpenHandshake(circuit));
  }

  return container;
}
