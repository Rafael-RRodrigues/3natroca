/**
 * Componente HandshakeModal B2C: "Código de Segurança na Entrega"
 * Substitui o antigo modal técnico por uma experiência calorosa, moderna e simples
 * de confirmação de código de 4 dígitos entre as partes no momento do encontro presencial.
 * Aplica física de Emil Kowalski (scale 0.95 -> 1) e ícones SVG de precisão.
 */

import { iconKey, iconCheck, iconLocation, iconShield, iconSparkles, iconArrowRight } from './icons.js';

export function renderHandshakeModal(circuit, { onConfirmPin, onClose }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop is-open';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-labelledby', 'modal-security-title');

  const deliveries = circuit.deliveries;
  const completedCount = deliveries.filter(d => d.status === 'delivered').length;
  const progressPercent = Math.round((completedCount / 3) * 100);
  const isCircuitDone = completedCount === 3;

  const currentStep = deliveries.find(d => d.status === 'pending');

  backdrop.innerHTML = `
    <style>
      .handshake-modal-b2c {
        background: #ffffff;
      }
      .b2c-progress-track {
        width: 100%;
        height: 8px;
        background: var(--bg-subtle);
        border-radius: var(--radius-pill);
        overflow: hidden;
        margin: 12px 0 24px;
      }
      .b2c-progress-bar-fill {
        height: 100%;
        background: var(--trust-green);
        transition: width var(--transition-smooth);
      }
      .delivery-steps-list-b2c {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }
      .delivery-step-card-b2c {
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-card);
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        transition: all var(--transition-fast);
      }
      .delivery-step-card-b2c.is-active {
        border-color: var(--primary-purple);
        background: #fdfafe;
        box-shadow: 0 0 0 1px var(--primary-purple-subtle), var(--shadow-sm);
      }
      .delivery-step-card-b2c.is-completed {
        border-color: var(--trust-green-border);
        background: var(--trust-green-subtle);
      }
      .step-icon-badge {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--bg-subtle);
        border: 1px solid var(--border-card);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 0.85rem;
        color: var(--text-muted);
        flex-shrink: 0;
      }
      .delivery-step-card-b2c.is-active .step-icon-badge {
        background: var(--primary-purple);
        color: #ffffff;
        border-color: var(--primary-purple);
      }
      .delivery-step-card-b2c.is-completed .step-icon-badge {
        background: var(--trust-green);
        color: #ffffff;
        border-color: var(--trust-green);
      }
      .step-text-wrap {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .step-main-title {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--text-headline);
      }
      .step-sub-desc {
        font-size: 0.78rem;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .pin-input-b2c {
        width: 100px;
        padding: 8px 12px;
        font-family: var(--font-mono);
        font-size: 1.15rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-align: center;
        border: 2px solid var(--border-card);
        border-radius: var(--radius-input);
        outline: none;
        background: #ffffff;
        color: var(--text-headline);
        transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
      }
      .pin-input-b2c:focus {
        border-color: var(--primary-purple);
        box-shadow: 0 0 0 3px var(--primary-purple-subtle);
      }
      .pin-test-button-hint {
        font-size: 0.72rem;
        color: var(--primary-purple);
        cursor: pointer;
        text-decoration: underline;
        margin-top: 4px;
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-weight: 600;
      }
      .celebration-box-b2c {
        background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
        border: 1px solid var(--trust-green-border);
        border-radius: var(--radius-card);
        padding: 28px;
        text-align: center;
        margin-bottom: 20px;
        animation: scale-in 240ms var(--ease-out);
      }
      @keyframes scale-in {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .celebration-icon-wrap {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: var(--trust-green-tint);
        border: 1px solid var(--trust-green-border);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 12px;
      }
      .celebration-title {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--trust-green-dark);
        margin-bottom: 8px;
      }
      .celebration-desc {
        font-size: 0.88rem;
        color: var(--text-body);
        line-height: 1.5;
        max-width: 440px;
        margin: 0 auto;
      }
      .pin-error-text {
        font-size: 0.74rem;
        color: #dc2626;
        margin-top: 4px;
        display: none;
        font-weight: 600;
      }
    </style>

    <div class="modal-panel handshake-modal-b2c">
      <div class="modal-header">
        <div>
          <h3 id="modal-security-title" style="font-size: 1.15rem; font-weight: 800; color: var(--text-headline); display: flex; align-items: center; gap: 8px;">
            ${iconKey({ size: 20, color: 'var(--primary-purple)' })}
            <span>Código de Segurança na Entrega</span>
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-muted);">
            Circuito ${circuit.code} &bull; Confirmação presencial segura
          </span>
        </div>
        <button class="btn btn-outline btn-sm btn-close-modal" aria-label="Fechar Janela">✕</button>
      </div>

      <div class="modal-body">
        <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; color: var(--text-body);">
          <span>Progresso das Entregas Presenciais</span>
          <span style="color: var(--trust-green-dark);">${completedCount} de 3 concluídas (${progressPercent}%)</span>
        </div>

        <div class="b2c-progress-track">
          <div class="b2c-progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>

        ${isCircuitDone ? `
          <div class="celebration-box-b2c">
            <div class="celebration-icon-wrap">
              ${iconSparkles({ size: 28, color: 'var(--trust-green)' })}
            </div>
            <h4 class="celebration-title">Troca em Trio Concluída com Sucesso!</h4>
            <p class="celebration-desc">
              Todos os 3 participantes já receberam e conferiram seus produtos em mãos.
              A Garantia Permuta liberou a diferença em dinheiro e atualizou o saldo da carteira de todos com total segurança!
            </p>
          </div>
        ` : `
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px; line-height: 1.45;">
            No momento do encontro presencial, confira o produto com calma e informe o código de 4 dígitos para validar a entrega no aplicativo:
          </p>

          <div class="delivery-steps-list-b2c">
            ${deliveries.map(deliv => {
              const isDone = deliv.status === 'delivered';
              const isActive = currentStep && currentStep.id === deliv.id;

              return `
                <div class="delivery-step-card-b2c ${isDone ? 'is-completed' : isActive ? 'is-active' : ''}">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="step-icon-badge">
                      ${isDone ? iconCheck({ size: 16, color: '#ffffff' }) : deliv.stepIndex}
                    </div>
                    <div class="step-text-wrap">
                      <span class="step-main-title">${deliv.title}</span>
                      <span class="step-sub-desc">Item: <strong>${deliv.itemGiven}</strong></span>
                      <span class="step-sub-desc">
                        ${iconLocation({ size: 12, color: 'var(--text-muted)' })}
                        <span>${deliv.suggestedMeetingPoint}</span>
                      </span>
                      ${isActive ? `
                        <span class="pin-test-button-hint" data-fill-pin="${deliv.pin}">
                          ${iconKey({ size: 12, color: 'var(--primary-purple)' })}
                          <span>Simulação rápida: Digitar código (${deliv.pin})</span>
                        </span>
                      ` : ''}
                    </div>
                  </div>

                  <div>
                    ${isDone ? `
                      <span class="badge-pill badge-green">
                        ${iconCheck({ size: 13, color: 'var(--trust-green-dark)' })}
                        Entregue
                      </span>
                    ` : isActive ? `
                      <div style="display: flex; flex-direction: column; align-items: flex-end;">
                        <div style="display: flex; gap: 8px;">
                          <input 
                            type="text" 
                            maxlength="4" 
                            placeholder="••••" 
                            class="pin-input-b2c" 
                            data-step-id="${deliv.id}" 
                            aria-label="Código de 4 dígitos"
                          />
                          <button class="btn btn-purple btn-sm btn-submit-pin" data-step-id="${deliv.id}">
                            <span>Confirmar</span>
                            <span class="btn-trailing-badge">
                              ${iconArrowRight({ size: 11, color: '#ffffff' })}
                            </span>
                          </button>
                        </div>
                        <span class="pin-error-text" id="error-${deliv.id}">Código incorreto</span>
                      </div>
                    ` : `
                      <span class="badge-pill" style="background: var(--bg-subtle); color: var(--text-muted);">
                        Aguardando
                      </span>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <div class="modal-footer">
        <button class="btn btn-outline btn-close-modal">
          ${isCircuitDone ? 'Concluir e Voltar ao Início' : 'Fechar'}
        </button>
      </div>
    </div>
  `;

  // Listeners
  const closeButtons = backdrop.querySelectorAll('.btn-close-modal');
  closeButtons.forEach(btn => btn.addEventListener('click', onClose));

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) onClose();
  });

  const hintLinks = backdrop.querySelectorAll('.pin-test-button-hint');
  hintLinks.forEach(link => {
    link.addEventListener('click', () => {
      const pin = link.dataset.fillPin;
      const input = backdrop.querySelector('.pin-input-b2c');
      if (input) {
        input.value = pin;
        input.focus();
      }
    });
  });

  const submitBtn = backdrop.querySelector('.btn-submit-pin');
  if (submitBtn) {
    const handleVerify = () => {
      const stepId = submitBtn.dataset.stepId;
      const input = backdrop.querySelector(`input[data-step-id="${stepId}"]`);
      const errorEl = backdrop.querySelector(`#error-${stepId}`);
      const val = input ? input.value.trim() : '';

      if (currentStep && val === currentStep.pin) {
        onConfirmPin(circuit.id, stepId);
      } else {
        if (errorEl) errorEl.style.display = 'block';
        if (input) {
          input.style.borderColor = '#dc2626';
          input.focus();
        }
      }
    };

    submitBtn.addEventListener('click', handleVerify);

    const inputEl = backdrop.querySelector('.pin-input-b2c');
    if (inputEl) {
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleVerify();
      });
      setTimeout(() => inputEl.focus(), 80);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      document.removeEventListener('keydown', handleKeyDown);
      onClose();
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  return backdrop;
}
