// API endpoints for Blurt blockchain
const BLURT_RPC_NODES = [
  "https://api.blurt.world",
  "https://rpc.blurt.world",
  "https://rpc.blurt.one",
];
let currentNodeIndex = 0;

// Exporta as funções de fetch
export let blockchainCache = {
  dynamicGlobalProperties: null,
  witnessSchedule: null,
  marketData: null,
  lastUpdate: 0,
  accountCount: 0,
headBlockNumber: 55850000,
  lastOperations: [],
};



function updateApiStatus(isConnected, message) {
  const statusDot = document.getElementById("apiStatusDot");
  const statusText = document.getElementById("apiStatusText");
  const badge = document.getElementById("apiStatusBadge");

  if (statusDot) {
    statusDot.className =
      "status-dot " + (isConnected ? "status-online" : "status-syncing");
  }

  if (statusText) {
    statusText.textContent = message;
  }

  if (badge) {
    badge.style.background = isConnected
      ? "rgba(0, 100, 0, 0.8)"
      : "rgba(200, 100, 0, 0.8)";
  }
}

export async function callBlurtRPC(method, params = []) {
  const currentNode = BLURT_RPC_NODES[currentNodeIndex];

  try {
    console.log(`Calling Blurt RPC: ${method} on ${currentNode}`);

    const response = await fetch(currentNode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: method,
        params: params,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`RPC error: ${JSON.stringify(data.error)}`);
    }

    updateApiStatus(true, `Conectado: ${new URL(currentNode).hostname}`);
    return data.result;
  } catch (error) {
    console.error(`Error calling Blurt RPC on ${currentNode}:`, error);

    // Try next node
    currentNodeIndex = (currentNodeIndex + 1) % BLURT_RPC_NODES.length;

    if (currentNodeIndex === 0) {
      // We've tried all nodes
      updateApiStatus(false, "Erro: Todos os nós falharam");
      throw new Error("All RPC nodes failed");
    }

    // Retry with next node
    console.log(`Switching to next node: ${BLURT_RPC_NODES[currentNodeIndex]}`);
    return callBlurtRPC(method, params);
  }
}


export async function fetchDynamicGlobalProperties() {
  try {
    if(blockchainCache.dynamicGlobalProperties){
               console.log("Using cached Dynamic Global Properties");
        console.log(blockchainCache.dynamicGlobalProperties);

    if (blockchainCache.dynamicGlobalProperties) {
      blockchainCache.dynamicGlobalProperties.head_block_number+= 1;
    }

        return blockchainCache.dynamicGlobalProperties;
 
    }
    const properties = await callBlurtRPC(
      "condenser_api.get_dynamic_global_properties",
      []
    );

    blockchainCache.dynamicGlobalProperties = properties;
    blockchainCache.lastUpdate = Date.now();
    console.log("Dynamic Global Properties fetched:", properties);
    return properties;
  } catch (error) {
    console.error("Error fetching dynamic global properties:", error);
    return null;
  }
}


// Exporta todas as outras funções de fetch
export async function fetchWitnessSchedule() {
  try {
    if (blockchainCache.witnessSchedule) {
      return blockchainCache.witnessSchedule;
    }
    else{
    const schedule = await callBlurtRPC(
      "condenser_api.get_witness_schedule",
      []
    );

    blockchainCache.witnessSchedule = schedule;
    return schedule;

    }



  } catch (error) {
    console.error("Error fetching witness schedule:", error);
    return null;
  }
}
// Tipos de transações falsas
const FAKE_OP_TYPES = [
  "vote",
  "comment",
  "transfer",
  "custom_json",
  "claim_reward_balance"
];

// Pick aleatório
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Gera nomes fake
function fakeUser() {
  const names = ["bgo", "ctime", "khrom", "cleanenergygarro", "fervi", "yayogerardo", "jeffjagoe", "offgridlife", "unmutedsoul","justyy","cryptokannon","blurtbuzz","blurtworld","blurtblog","blurtguru","blurtian","blurtit","blurtapps","blurtmedia","blurtnews","blurtwatch","blurtstation"];
  return rand(names);
}

// Gera permlink fake
function fakePermlink() {
  const words = ["hello", "world", "test", "update", "photo", "post", "daily", "blurt", "blockchain", "crypto", "fun", "life", "adventure", "story", "news", "guide", "tips", "tricks", "review", "video", "music", "art", "travel", "food", "health", "fitness"];
  return rand(words) + "-" + Math.floor(Math.random() * 99999);
}

// -------------------------------
// Gerador de operações falsas
// -------------------------------
function generateFakeOperation(blockNum) {

  const opType = rand(FAKE_OP_TYPES);

  switch (opType) {
    case "vote":
      return [
        "vote",
        {
          voter: fakeUser(),
          author: fakeUser(),
          permlink: fakePermlink(),
          weight: Math.floor(Math.random() * 10000)
        }
      ];

    case "comment":
      return [
        "comment",
        {
          author: fakeUser(),
          permlink: fakePermlink(),
          parent_author: "",
          parent_permlink: "introduceyourself",
          body: "This is a fake autogenerated comment."
        }
      ];

    case "transfer":
      return [
        "transfer",
        {
          from: fakeUser(),
          to: fakeUser(),
          amount: `${(Math.random() * 10).toFixed(3)} BLURT`,
          memo: "fake transfer"
        }
      ];

    case "custom_json":
      return [
        "custom_json",
        {
          id: "follow",
          json: JSON.stringify(["follow", { follower: fakeUser(), following: fakeUser() }])
        }
      ];

    case "claim_reward_balance":
      return [
        "claim_reward_balance",
        {
          account: fakeUser(),
          reward_blurt: `${(Math.random() * 3).toFixed(3)} BLURT`,
          reward_vests: `${(Math.random() * 50).toFixed(3)} VESTS`
        }
      ];

    default:
      return ["unknown", {}];
  }
}


// -------------------------------
// A função principal: tudo FAKE
// -------------------------------
export async function fetchRecentOperations(limit = 10) {

  const blockNum = blockchainCache.headBlockNumber++;

  // Gera entre 1 e 5 operações fake por bloco
  const opCount = Math.floor(Math.random() * 4) + 1;

  const newOps = [];

  for (let i = 0; i < opCount; i++) {
    newOps.push({
      block_num: blockNum,
      timestamp: blurtTimestamp(),
      operation: generateFakeOperation(blockNum)
    });
  }

  // Mantém histórico
  blockchainCache.lastOperations = [
    ...newOps,
    ...blockchainCache.lastOperations
  ].slice(0, 30); // mantém até 30 registros

  return blockchainCache.lastOperations;
}


export async function fetchMarketData() {
  try {
    // Try to get price from CoinGecko (Blurt might not be listed)
    /*const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=blurt&vs_currencies=usd&include_24hr_change=true",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );*/

    if (false) {
      const data = await response.json();
      if (data.blurt && data.blurt.usd) {
        return {
          price: data.blurt.usd,
          change24h: data.blurt.usd_24h_change || 0,
        };
      }
    }

    // Fallback: Use internal Blurt price if available
    // This is a placeholder - in reality you'd need to calculate from internal market
    return {
      price: 0.0125, // Example price
      change24h: 0,
    };
  } catch (error) {
    console.error("Error fetching market data:", error);
    return {
      price: 0.0125,
      change24h: 0,
    };
  }
}
export async function fetchAccountCount() {
  try {
    if (blockchainCache.accountCount > 0) {
      return blockchainCache.accountCount;
    }

    const count = await callBlurtRPC("condenser_api.get_account_count", []);

    blockchainCache.accountCount = count;
    return count;

  } catch (error) {
    console.error("Error fetching account count:", error);
    return blockchainCache.accountCount || 1398664;
  }
}

function blurtTimestamp() {
  const d = new Date();

  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");

  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}`;
}
