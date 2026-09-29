/**
 * app.js - Ponto de entrada B2C da plataforma 3NaTroca
 * Interface 100% voltada ao consumidor final, sem termos de terminal ou dashboards técnicos.
 * Construído com a coleção de skills em ~/.agents/skills/ (ui-ux-pro-max, high-end-visual-design, emil-design-eng, taste-skill).
 */

import { CURRENT_USER, MOCK_CIRCUITS } from './data/mock-circuits.js';
import { renderHeader } from './components/header.js';
import { renderCircuitCard } from './components/circuit-card.js';
import { renderCircuitDiagram } from './components/circuit-diagram.js';
import { renderEscrowBalance } from './components/escrow-balance.js';
import { renderHandshakeModal } from './components/handshake-modal.js';
import { 
  iconExchange, 
  iconShield, 
  iconUserCheck, 
  iconKey, 
  iconChat, 
  iconCategory, 
  iconArrowRight, 
  iconSparkles,
  iconCheck
} from './components/icons.js';

class PermutaConsumerApp {
  constructor() {
    this.state = {
      currentUser: { ...CURRENT_USER },
      circuits: JSON.parse(JSON.stringify(MOCK_CIRCUITS)),
      selectedCircuitId: MOCK_CIRCUITS[0].id,
      isHandshakeModalOpen: false,
      celebrationToastVisible: false,
      activeCategory: 'Tudo',
      searchQuery: '',
    };

    this.root = document.getElementById('app-root');
    this.init();
  }

  init() {
    this.render();
  }

  getFilteredCircuits() {
    return this.state.circuits.filter(circuit => {
      // Filtro por Categoria
      const matchesCategory = 
        this.state.activeCategory === 'Tudo' || 
        circuit.category.toLowerCase().includes(this.state.activeCategory.toLowerCase().split(' ')[0]) ||
        (this.state.activeCategory === 'Informática & PCs' && circuit.category.includes('Tech')) ||
        (this.state.activeCategory === 'Câmeras & Vídeo' && circuit.category.includes('Foto')) ||
        (this.state.activeCategory === 'Drones & Aéreos' && (circuit.title.includes('Drone') || circuit.friendlyStory.includes('Drone')));

      // Filtro por Busca
      const query = this.state.searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        circuit.title.toLowerCase().includes(query) ||
        circuit.code.toLowerCase().includes(query) ||
        circuit.category.toLowerCase().includes(query) ||
        circuit.friendlyStory.toLowerCase().includes(query) ||
        circuit.nodes.some(n => n.offeredItem.title.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }

  getSelectedCircuit() {
    const filtered = this.getFilteredCircuits();
    if (filtered.some(c => c.id === this.state.selectedCircuitId)) {
      return this.state.circuits.find(c => c.id === this.state.selectedCircuitId);
    }
    return filtered[0] || this.state.circuits[0];
  }

  handleSelectCircuit(circuit) {
    this.state.selectedCircuitId = circuit.id;
    this.render();
  }

  handleCategoryChange(categoryLabel) {
    this.state.activeCategory = categoryLabel;
    this.render();
  }

  handleSearch(query) {
    this.state.searchQuery = query;
    this.render();
  }

  // Confirmação de Participação (2/3 -> 3/3)
  handleConfirmApproval(circuitId) {
    const circuit = this.state.circuits.find(c => c.id === circuitId);
    if (!circuit || circuit.status !== 'PENDING_USER_APPROVAL') return;

    circuit.status = 'AWAITING_HANDSHAKE';
    circuit.humanStatusText = '3 de 3 confirmados! Combinem o encontro';
    circuit.approvals.current = 3;
    if (!circuit.approvals.approvedUsers.includes('user-you')) {
      circuit.approvals.approvedUsers.push('user-you');
    }

    const youNode = circuit.nodes.find(n => n.isCurrentUser);
    if (youNode) youNode.approvalConfirmed = true;

    // Abre o modal amigável para guiar os próximos passos
    this.state.selectedCircuitId = circuitId;
    this.state.isHandshakeModalOpen = true;

    this.render();
  }

  handleOpenHandshake(circuit) {
    this.state.selectedCircuitId = circuit.id;
    this.state.isHandshakeModalOpen = true;
    this.render();
  }

  handleCloseHandshake() {
    this.state.isHandshakeModalOpen = false;
    this.render();
  }

  // Confirmação de PIN sequencial (1 -> 2 -> 3)
  handleConfirmPin(circuitId, stepId) {
    const circuit = this.state.circuits.find(c => c.id === circuitId);
    if (!circuit) return;

    const delivery = circuit.deliveries.find(d => d.id === stepId);
    if (!delivery || delivery.status === 'delivered') return;

    delivery.status = 'delivered';

    const allDone = circuit.deliveries.every(d => d.status === 'delivered');
    if (allDone) {
      circuit.status = 'COMPLETED';
      circuit.humanStatusText = 'Troca 100% Concluída e Entregue!';
      this.state.celebrationToastVisible = true;
    }

    this.render();
  }

  handleDismissToast() {
    this.state.celebrationToastVisible = false;
    this.render();
  }

  render() {
    this.root.innerHTML = '';
    const selectedCircuit = this.getSelectedCircuit();
    const filteredCircuits = this.getFilteredCircuits();

    const shell = document.createElement('div');
    shell.className = 'app-shell';

    // 1. Header do Marketplace com Busca Reativa
    const headerNode = renderHeader(this.state.currentUser, {
      onSearch: (q) => this.handleSearch(q)
    });
    shell.appendChild(headerNode);

    // 2. Conteúdo Principal
    const main = document.createElement('main');
    main.className = 'main-content';

    // 2.1 Faixa / Toast Comemorativo quando o circuito for liquidado
    if (this.state.celebrationToastVisible && selectedCircuit && selectedCircuit.status === 'COMPLETED') {
      const toast = document.createElement('div');
      toast.className = 'success-toast-banner';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--trust-green-tint); border: 1px solid var(--trust-green-border); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${iconSparkles({ size: 22, color: 'var(--trust-green)' })}
          </div>
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--trust-green-dark);">
              Parabéns! Sua Troca em Trio (${selectedCircuit.code}) foi concluída com sucesso!
            </h4>
            <p style="font-size: 0.85rem; color: var(--text-body);">
              Todos os 3 produtos foram conferidos e entregues pessoalmente. A <strong>Garantia Permuta</strong> liberou a diferença em dinheiro e os saldos já estão disponíveis nas carteiras.
            </p>
          </div>
        </div>
        <button class="btn btn-outline btn-sm btn-dismiss-toast">Dispensar</button>
      `;

      toast.querySelector('.btn-dismiss-toast').addEventListener('click', () => this.handleDismissToast());
      main.appendChild(toast);
    }

    // 2.2 Hero Asymmetric Split (Taste-Skill Anti-Center Bias & High-End Visual Design)
    const heroSection = document.createElement('section');
    heroSection.className = 'hero-asymmetric-split';
    heroSection.innerHTML = `
      <div class="hero-left-column">
        <span class="hero-eyebrow-pill">
          ${iconExchange({ size: 14, color: '#ffffff' })}
          Permuta em Trio
        </span>
        <h1 class="hero-headline">
          Troque o que você tem <span>pelo que você quer</span>
        </h1>
        <p class="hero-subtext">
          Conectamos você e outras duas pessoas para trocar produtos com segurança e garantia de pagamento.
        </p>
        <div class="hero-cta-group">
          <a href="#oportunidades" class="btn btn-purple">
            <span>Ver Matches Prontos</span>
            <span class="btn-trailing-badge">
              ${iconArrowRight({ size: 13, color: '#ffffff' })}
            </span>
          </a>
          <a href="#como-funciona" class="btn btn-outline">Como Funciona</a>
        </div>
      </div>

      <div class="hero-right-preview">
        <div class="hero-preview-top-badge">
          <span class="badge-pill badge-green">
            ${iconSparkles({ size: 12, color: 'var(--trust-green-dark)' })}
            Match em Destaque
          </span>
          <span style="color: var(--text-muted); font-size: 0.74rem;">Circuito #3T-8821</span>
        </div>
        <div class="hero-preview-trio">
          <img class="hero-preview-img" src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80" alt="MacBook Pro M2" />
          <img class="hero-preview-img" src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80" alt="Canon EOS R6" />
        </div>
        <div class="hero-preview-caption">
          <strong>Você entrega:</strong> MacBook Pro M2 &bull; <strong>Você recebe:</strong> Canon EOS R6 + R$ 300
        </div>
      </div>
    `;
    main.appendChild(heroSection);

    // 2.3 Faixa de Confiança Dedicada Abaixo do Hero (Taste-Skill Trust Bar)
    const trustBar = document.createElement('div');
    trustBar.className = 'trust-bar-dedicated';
    trustBar.innerHTML = `
      <div class="trust-item">
        <span class="trust-item-icon">
          ${iconShield({ size: 18, color: 'var(--trust-green)' })}
        </span>
        <span>Pagamento Seguro via Garantia Permuta</span>
      </div>
      <div class="trust-item">
        <span class="trust-item-icon">
          ${iconUserCheck({ size: 18, color: 'var(--trust-green)' })}
        </span>
        <span>Perfis Verificados com CPF</span>
      </div>
      <div class="trust-item">
        <span class="trust-item-icon">
          ${iconKey({ size: 18, color: 'var(--trust-green)' })}
        </span>
        <span>Código de Confirmação na Entrega</span>
      </div>
      <div class="trust-item">
        <span class="trust-item-icon">
          ${iconChat({ size: 18, color: 'var(--trust-green)' })}
        </span>
        <span>Chat com Suporte Humanizado</span>
      </div>
    `;
    main.appendChild(trustBar);

    // 2.4 Barra de Categorias com Ícones SVG e Filtro Reativo
    const categoriesStrip = document.createElement('div');
    categoriesStrip.className = 'categories-nav-strip';
    const categories = [
      { label: 'Tudo', key: 'all' },
      { label: 'Informática & PCs', key: 'tech' },
      { label: 'Câmeras & Vídeo', key: 'camera' },
      { label: 'Drones & Aéreos', key: 'drone' },
      { label: 'Celulares & Tablets', key: 'phone' },
      { label: 'Games & Consoles', key: 'game' },
      { label: 'Áudio & Fones', key: 'audio' },
    ];

    categories.forEach(cat => {
      const isActive = this.state.activeCategory === cat.label;
      const btn = document.createElement('button');
      btn.className = `category-nav-pill ${isActive ? 'is-active' : ''}`;
      btn.innerHTML = `
        ${iconCategory(cat.key, { size: 16, color: isActive ? '#ffffff' : 'var(--text-body)' })}
        <span>${cat.label}</span>
      `;
      btn.addEventListener('click', () => this.handleCategoryChange(cat.label));
      categoriesStrip.appendChild(btn);
    });
    main.appendChild(categoriesStrip);

    // 2.5 Grid Principal B2C
    const marketplaceGrid = document.createElement('div');
    marketplaceGrid.className = 'marketplace-grid';

    // Coluna 1: Feed de Oportunidades de Troca
    const feedCol = document.createElement('section');
    feedCol.id = 'oportunidades';
    feedCol.className = 'feed-col-b2c';

    const feedHeader = document.createElement('div');
    feedHeader.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;';
    feedHeader.innerHTML = `
      <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-headline); display: flex; align-items: center; gap: 8px;">
        ${iconSparkles({ size: 18, color: 'var(--primary-purple)' })}
        <span>Suas Oportunidades de Troca em Trio</span>
      </h2>
      <span class="badge-pill badge-purple-subtle">${filteredCircuits.length} ${filteredCircuits.length === 1 ? 'Match Pronto' : 'Matches Prontos'}</span>
    `;
    feedCol.appendChild(feedHeader);

    // Renderiza cards do feed
    if (filteredCircuits.length === 0) {
      const emptyCard = document.createElement('div');
      emptyCard.className = 'consumer-card';
      emptyCard.style.padding = '36px 24px';
      emptyCard.style.textAlign = 'center';
      emptyCard.innerHTML = `
        <div style="margin-bottom: 12px; color: var(--text-muted);">
          ${iconExchange({ size: 36, color: 'var(--text-muted)' })}
        </div>
        <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 6px;">Nenhum match encontrado para esta categoria ou busca</h3>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px;">Tente pesquisar por outro termo ou clique em "Tudo" para ver todas as oportunidades disponíveis.</p>
        <button class="btn btn-purple btn-sm btn-reset-filters">Ver Todas as Trocas</button>
      `;
      emptyCard.querySelector('.btn-reset-filters').addEventListener('click', () => {
        this.state.activeCategory = 'Tudo';
        this.state.searchQuery = '';
        this.render();
      });
      feedCol.appendChild(emptyCard);
    } else {
      filteredCircuits.forEach(circuit => {
        const isSelected = selectedCircuit && circuit.id === selectedCircuit.id;
        const card = renderCircuitCard(circuit, isSelected, {
          onSelect: (c) => this.handleSelectCircuit(c),
          onConfirmApproval: (id) => this.handleConfirmApproval(id),
          onOpenHandshake: (c) => this.handleOpenHandshake(c),
        });
        feedCol.appendChild(card);
      });
    }

    marketplaceGrid.appendChild(feedCol);

    // Coluna 2: Detalhes do Match Selecionado & Garantia
    const detailCol = document.createElement('section');
    detailCol.id = 'como-funciona';
    detailCol.className = 'detail-col-b2c';

    if (selectedCircuit) {
      // 1. História e Funcionamento do Circuito em Trio
      const diagramNode = renderCircuitDiagram(selectedCircuit, {
        onConfirmApproval: (id) => this.handleConfirmApproval(id),
        onOpenHandshake: (c) => this.handleOpenHandshake(c),
      });
      detailCol.appendChild(diagramNode);

      // 2. Resumo de Pagamento Seguro / Garantia Permuta
      const escrowNode = renderEscrowBalance(selectedCircuit);
      detailCol.appendChild(escrowNode);
    }

    marketplaceGrid.appendChild(detailCol);
    main.appendChild(marketplaceGrid);
    shell.appendChild(main);
    this.root.appendChild(shell);

    // 3. Modal de Segurança na Entrega (quando aberto)
    if (this.state.isHandshakeModalOpen && selectedCircuit) {
      const modalNode = renderHandshakeModal(selectedCircuit, {
        onConfirmPin: (circuitId, stepId) => this.handleConfirmPin(circuitId, stepId),
        onClose: () => this.handleCloseHandshake(),
      });
      this.root.appendChild(modalNode);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.__permutaApp = new PermutaConsumerApp();
});
