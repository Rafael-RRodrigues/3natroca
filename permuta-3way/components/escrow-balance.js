/**
 * Componente EscrowBalance B2C: "Pagamento Seguro e Garantia Permuta"
 * Resumo de checkout limpo, humano e transparente, em total conformidade com a taste-skill e ui-ux-pro-max.
 */

import { formatBRL } from '../data/mock-circuits.js';
import { iconShield, iconCheck, iconSparkles, iconWallet } from './icons.js';

export function renderEscrowBalance(circuit) {
  const container = document.createElement('div');
  container.className = 'consumer-card escrow-consumer-card';

  const fin = circuit.financialSummary;

  container.innerHTML = `
    <style>
      .escrow-consumer-card {
        margin-top: 24px;
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-outer);
        padding: 28px;
        box-shadow: var(--shadow-card);
      }
      .escrow-b2c-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        flex-wrap: wrap;
        gap: 12px;
        border-bottom: 1px solid var(--border-subtle);
        padding-bottom: 16px;
      }
      .escrow-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .escrow-shield-icon {
        width: 44px;
        height: 44px;
        border-radius: var(--radius-input);
        background: var(--trust-green-tint);
        border: 1px solid var(--trust-green-border);
        color: var(--trust-green);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .escrow-b2c-title {
        font-size: 1.15rem;
        font-weight: 800;
        color: var(--text-headline);
      }
      .escrow-b2c-subtitle {
        font-size: 0.82rem;
        color: var(--text-muted);
      }
      /* Resumo em Estilo Checkout de E-commerce */
      .checkout-summary-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 24px;
        margin-bottom: 24px;
      }
      @media (max-width: 860px) {
        .checkout-summary-grid {
          grid-template-columns: 1fr;
        }
      }
      .receipt-box {
        background: var(--bg-subtle);
        border: 1px solid var(--border-card);
        border-radius: var(--radius-inner);
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .receipt-title {
        font-size: 0.86rem;
        font-weight: 700;
        color: var(--text-headline);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      }
      .receipt-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.85rem;
        color: var(--text-body);
      }
      .receipt-row.highlight-total {
        border-top: 1px solid var(--border-card);
        padding-top: 12px;
        margin-top: 4px;
        font-size: 0.95rem;
        font-weight: 800;
        color: var(--primary-purple);
      }
      .receipt-row.highlight-total span:last-child {
        font-size: 1.2rem;
      }
      .receipt-badge-free {
        background: var(--trust-green-tint);
        color: var(--trust-green-dark);
        font-weight: 700;
        font-size: 0.72rem;
        padding: 2px 8px;
        border-radius: var(--radius-pill);
      }
      /* Caixa de Garantia */
      .guarantee-info-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #fbf7ff;
        border: 1px solid var(--primary-purple-border);
        border-radius: var(--radius-inner);
        padding: 20px;
      }
      .guarantee-headline {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--primary-purple);
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .guarantee-copy {
        font-size: 0.84rem;
        color: var(--text-body);
        line-height: 1.5;
        margin-bottom: 16px;
      }
      .guarantee-trust-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 0.78rem;
        color: var(--text-muted);
      }
      .guarantee-item-check {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .escrow-action-pill-bar {
        background: #f0fdf4;
        border: 1px solid var(--trust-green-border);
        border-radius: var(--radius-pill);
        padding: 10px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.82rem;
        color: var(--trust-green-dark);
        font-weight: 600;
      }
    </style>

    <div class="escrow-b2c-header">
      <div class="escrow-header-left">
        <div class="escrow-shield-icon">
          ${iconShield({ size: 24, color: 'var(--trust-green)' })}
        </div>
        <div>
          <h3 class="escrow-b2c-title">Pagamento Seguro com Garantia Permuta</h3>
          <p class="escrow-b2c-subtitle">
            Transparência total: você só paga ou recebe a diferença acordada. Sem tarifas escondidas.
          </p>
        </div>
      </div>

      <span class="badge-pill badge-green">
        ${iconShield({ size: 12, color: 'var(--trust-green-dark)' })}
        100% Protegido
      </span>
    </div>

    <div class="checkout-summary-grid">
      <!-- Recibo Claro do Usuário -->
      <div class="receipt-box">
        <span class="receipt-title">Resumo Financeiro da Troca</span>

        <div class="receipt-row">
          <span>Valor estimado do seu produto:</span>
          <strong>${formatBRL(circuit.financialSummary.userItemValue)}</strong>
        </div>

        <div class="receipt-row">
          <span>Valor do item que você recebe:</span>
          <strong>${formatBRL(circuit.financialSummary.receivedItemValue)}</strong>
        </div>

        <div class="receipt-row">
          <span>Taxa de intermediação da plataforma:</span>
          <span class="receipt-badge-free">GRÁTIS NO BETA</span>
        </div>

        <div class="receipt-row highlight-total">
          <span>${fin.userDifferenceType === 'PAY' ? 'Volta a pagar:' : 'Volta a receber:'}</span>
          <span>
            ${fin.userDifferenceType === 'PAY' ? '-' : '+'} ${formatBRL(fin.differenceAmount)}
          </span>
        </div>
      </div>

      <!-- Explicação de Confiança da Garantia -->
      <div class="guarantee-info-panel">
        <div>
          <h4 class="guarantee-headline">
            ${iconSparkles({ size: 16, color: 'var(--primary-purple)' })}
            Como a Garantia Permuta te protege:
          </h4>
          <p class="guarantee-copy">
            A diferença em dinheiro fica retida em conta de pagamento segura. O valor só é liberado para o destinatário após a confirmação presencial de entrega de todos os 3 participantes.
          </p>
        </div>

        <div class="guarantee-trust-list">
          <div class="guarantee-item-check">
            ${iconCheck({ size: 13, color: 'var(--trust-green)' })}
            <span>Devolução integral se alguém desistir do encontro</span>
          </div>
          <div class="guarantee-item-check">
            ${iconCheck({ size: 13, color: 'var(--trust-green)' })}
            <span>Suporte humanizado em caso de qualquer imprevisto</span>
          </div>
          <div class="guarantee-item-check">
            ${iconCheck({ size: 13, color: 'var(--trust-green)' })}
            <span>Pagamento instantâneo via Pix logo após a entrega</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra de Conclusão Informativa -->
    <div class="escrow-action-pill-bar">
      <span style="display: flex; align-items: center; gap: 8px;">
        ${iconWallet({ size: 16, color: 'var(--trust-green-dark)' })}
        <span>Saldo disponível na sua carteira: <strong>R$ 1.250,00</strong></span>
      </span>
      <span>${circuit.financialSummary.explanation}</span>
    </div>
  `;

  return container;
}
