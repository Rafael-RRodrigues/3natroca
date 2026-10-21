# 🔄 3 na Troca (Troca Triangular)

<p align="center">
  <strong>Democratizando o acesso à tecnologia e eletrônicos através de permutas inteligentes em ciclos de 3 partes.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Docker-Supported-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Fundamentação Teórica & Validação Científica](#-fundamentação-teórica--validação-científica)
- [Como Funciona](#-como-funciona)
- [O Algoritmo de Ciclo Triangular](#-o-algoritmo-de-ciclo-triangular)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Stack Tecnológica](#-stack-tecnológica)
- [Como Executar Localmente](#-como-executar-localmente)
- [Roadmap](#-roadmap)
- [Como Contribuir](#-como-contribuir)
- [Licença](#-licença)

---

## 📌 Visão Geral

No cenário econômico atual, o acesso a eletrônicos novos (smartphones, computadores, consoles, tablets e periféricos) impõe barreiras financeiras severas para a grande maioria das pessoas. O mercado de seminovos é a alternativa natural, mas o modelo clássico de permuta direta esbarra em um limite estrutural: a **troca bilateral ($1 \leftrightarrow 1$) depende da improvável coincidência mútua de desejos**.

> *"Quem quer o seu produto raramente possui o que você quer; quem tem o que você procura não tem interesse no que você oferece."*

O **3 na Troca** rompe essa barreira ao transformar a intenção de troca em um **grafo direcionado de desejos**, identificando automaticamente ciclos fechados de **3 pessoas** ($A \rightarrow B \rightarrow C \rightarrow A$). Com isso:
- O hardware ocioso ganha liquidez imediata;
- Os usuários realizam upgrades com custo de aquisição próximo de zero;
- Fomenta-se ativamente a **economia circular** e a redução do lixo eletrônico (*e-waste*).

---

## 📚 Fundamentação Teórica & Validação Científica

A escolha deliberada por ciclos de 3 pontas não é arbitrária — ela é respaldada pela literatura clássica de **Teoria dos Jogos**, **Design de Mercados (Market Design)** e **Economia Circular**:

| Estudo / Teoria | Autores / Referência | Contribuição para o Projeto |
| :--- | :--- | :--- |
| **Dupla Coincidência de Desejos** | W. S. Jevons (*Money and the Mechanism of Exchange*, 1875) | Identifica a ineficiência matemática da permuta direta pura, justificando a expansão para trocas multilaterais. |
| **Top Trading Cycles (TTC)** | Lloyd Shapley & Herbert Scarf (*Journal of Mathematical Economics*, 1974) | Demonstra formalmente que mercados de bens indivisíveis sem moeda atingem equilíbrios Pareto-eficientes no *core* quando organizados em ciclos fechados de preferência. |
| **Kidney Exchange & Ciclos Restritos** | Alvin E. Roth, Tayfun Sönmez, M. Utku Ünver (*Quarterly Journal of Economics*, 2004; *AER*, 2005) — *Prêmio Nobel de Economia (2012)* | Comprova empiricamente que estender permutas para **ciclos de tamanho 3 ($k=3$) captura a grande maioria dos ganhos de eficiência e liquidez**, mantendo a complexidade operacional e o risco de quebra de cadeia drasticamente menores do que em ciclos longos ($k \ge 4$). |
| **Economia Circular e Extensão de Vida Útil** | Ellen MacArthur Foundation / European Commission Circular Economy Action Plan | Evidencia que manter produtos eletrônicos funcionais em circulação reduz em até 70% as emissões de carbono associadas à fabricação e diminui a geração de resíduos tóxicos. |

---

## 💡 Como Funciona

```text
               ┌───────────────────────┐
               │       Usuário A       │
               │ Tem: Monitor 144Hz    │
               │ Quer: Placa de Vídeo  │
               └───────────┬───────────┘
                           │
                 Envia     │     Recebe
                 Monitor   │     Placa de Vídeo
                           │
                           ▼
┌───────────────────────┐     Envia      ┌───────────────────────┐
│       Usuário B       │  Notebook i5   │       Usuário C       │
│ Tem: Placa de Vídeo   ├───────────────►│ Tem: Notebook i5      │
│ Quer: Notebook        │                │ Quer: Monitor         │
└───────────────────────┘                └───────────────────────┘
