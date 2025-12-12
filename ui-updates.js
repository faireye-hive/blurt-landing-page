// ui-updates.js

import * as BlurtAPI from './blurt-api.js'; // Assumindo que você criou este arquivo
import { getCurrentLang } from './i18n.js'; // Assumindo que você exportou essa função

// Objeto de nomes de transação (Poderia estar em ./data/transaction-names.js)
// Para o exemplo, vamos mantê-lo aqui por enquanto, mas o ideal é mover.
const transactionTypeNames = {
  pt: {
    comment: "Comentário",
    vote: "Voto",
    transfer: "Transferência",
    custom_json: "Operação Customizada",
    account_create: "Criação de Conta",
    claim_reward_balance: "Reclamar recompensa",
  },
  en: {
    comment: "Comment",
    vote: "Voto",
    transfer: "Transfer",
    custom_json: "Custom Operation",
    account_create: "Account Creation",
    claim_reward_balance: "Claim reward",
  },
};

/**
 * Atualiza a seção de Transações Recentes na página.
 * Assume que a função fetchRecentOperations existe no BlurtAPI.
 */
export async function updateRecentTransactions() {
  const currentLang = getCurrentLang();
  
  try {
    const operations = await BlurtAPI.fetchRecentOperations(8);
    const container = document.getElementById("transactionsContainer");

    if (!container) return;
    
    container.innerHTML = ""; // Limpa container

    if (operations.length === 0) {
      container.innerHTML = `
        <div class="transaction-item">
            <div class="transaction-type">${currentLang === "pt" ? "Sem transações recentes" : "No recent transactions"}</div>
            <div class="transaction-details">
                <span class="transaction-time">${currentLang === "pt" ? "Agora" : "Now"}</span>
            </div>
        </div>
      `;
      return;
    }

    // Adiciona cada transação
    operations.forEach((op) => {
      const opType = op.operation[0];
      const opData = op.operation[1];
      
      // Obtém o nome traduzido
      const typeName = transactionTypeNames[currentLang][opType] || opType;

      let details = "";
      let timeText = "";

      // Formatação de Tempo (Baseado na sua lógica original)
      const now = new Date();
      const opTime = new Date(op.timestamp + "Z");
      const diffMinutes = Math.floor((now - opTime) / (1000 * 60));

      if (currentLang === "pt") {
        timeText = diffMinutes === 0 ? "Agora" : `${diffMinutes} min atrás`;
      } else {
        timeText = diffMinutes === 0 ? "Now" : `${diffMinutes} min ago`;
      }

      // Formatação de Detalhes
      switch (opType) {
        case "transfer":
          details = `${opData.from} → ${opData.to} (${opData.amount})`;
          break;
        case "vote":
          details = `${opData.voter} ${currentLang === "pt" ? "votou em" : "voted on"} @${opData.author}`;
          break;
        case "comment":
          details = `${opData.author} ${currentLang === "pt" ? "comentou" : "commented"}`;
          break;
        case "custom_json":
          details = `${JSON.parse(opData.json)[1].follower} ${opData.id}  ${JSON.parse(opData.json)[1].following}`;
          break;
        case "claim_reward_balance":
          details = `${opData.account} ${currentLang === "pt" ? "reclamou a recompensa" : "claim the reward"} : ${opData.reward_blurt}  `;
          break;
        case "account_create":
          details = `${currentLang === "pt" ? "Nova conta:" : "New account:"} @${opData.new_account_name}`;
          break;
        default:
          details = JSON.stringify(opData).substring(0, 50) + "...";
      }

      const transactionItem = document.createElement("div");
      transactionItem.className = "transaction-item";
      transactionItem.innerHTML = `
          <div class="transaction-type">${typeName}</div>
          <div class="transaction-details">
              <span>${details}</span>
              <span class="transaction-time">${timeText}</span>
          </div>
      `;

      container.appendChild(transactionItem);
    });
  } catch (error) {
    console.error("Erro ao atualizar transações:", error);
  }
}


/**
 * Atualiza todos os dados da blockchain na página (blocos, contas, preço).
 * Assume que todas as funções de fetch existem no BlurtAPI.
 */
export async function updateBlockchainData() {
  try {
    // 1. Fetch todos os dados em paralelo
    const [properties, witnessSchedule, marketData, accountCount] =
      await Promise.all([
        BlurtAPI.fetchDynamicGlobalProperties(),
        BlurtAPI.fetchWitnessSchedule(),
        BlurtAPI.fetchMarketData(),
        BlurtAPI.fetchAccountCount(),
      ]);

    // 2. Atualiza Bloco Atual e Estatísticas
    if (properties) {
      document.getElementById("currentBlock").textContent =
        properties.head_block_number.toLocaleString();

      const blocksInMillions = (properties.head_block_number / 1000000).toFixed(1);
      if (document.getElementById("statBlocks")) {
          document.getElementById("statBlocks").textContent = blocksInMillions;
      }

      // Atualiza transações diárias (estimativa)
      const dailyTx = Math.floor(properties.head_block_number / 3); 
      if (document.getElementById("dailyTransactions")) {
          document.getElementById("dailyTransactions").textContent =
            dailyTx.toLocaleString();
      }
    }

    // 3. Atualiza Testemunhas (Witnesses)
    if (witnessSchedule) {
      const witnessCount = witnessSchedule.num_scheduled_witnesses || 25;
      document.getElementById("totalWitnesses").textContent = witnessCount;
      if (document.getElementById("statWitnesses")) {
          document.getElementById("statWitnesses").textContent = witnessCount;
      }
    }

    // 4. Atualiza Contas
    if (accountCount) {
        document.getElementById("totalAccounts").textContent =
          accountCount.toLocaleString();
        document.getElementById("statAccounts").textContent = (
          accountCount / 1000
        ).toFixed(1);
    }

    // 5. Atualiza Preço
    if (marketData) {
      const priceFormatted = marketData.price.toFixed(4);
      const changeFormatted = marketData.change24h.toFixed(2);
      const changeClass =
        marketData.change24h >= 0 ? "text-success" : "text-danger";

      document.getElementById("blurtPrice").innerHTML =
        `$${priceFormatted} <small class="${changeClass}">(${changeFormatted}%)</small>`;
    }

    // 6. Atualiza transações recentes (chamada separada)
    await updateRecentTransactions();
  } catch (error) {
    console.error("Erro ao atualizar dados da UI:", error);
    // Aqui você pode querer chamar uma função em Utils para mostrar erro na UI
    // Utils.updateApiStatus(false, "Erro ao atualizar dados");
  }
}