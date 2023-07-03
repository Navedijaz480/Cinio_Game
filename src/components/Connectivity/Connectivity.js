import Web3 from "web3";

const networks = {
  bsc: {
    chainId: `0x${Number(56).toString(16)}`, // BSC chainId
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
        "https://data-seed-prebsc-1-s2.binance.org:8545",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

export const connectToMetaMask = async () => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (err) {
    console.log("Error connecting to MetaMask:", err);
  }
};

export const handleNetworkSwitch = async (networkName) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");

    const chainId = networks[networkName].chainId;
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    return true;
  } catch (err) {
    console.log("Error switching network:", err);
    return false;
  }
};

export const getAccountAddress = async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) throw new Error("No accounts found");
    return accounts[0];
  } catch (error) {
    console.log("Error retrieving account address:", error);
    return null;
  }
};

export const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return true;
    } else {
      console.log("No crypto wallet found");
      return false;
    }
  } catch (error) {
    console.log("Error loading web3:", error);
    return false;
  }
};
