import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
  } from "@solana/web3.js";


export const getSolBalanceBySDK = async (address: string, network: SolanaNetworks) => {
    const connection = new Connection(network === "mainnet-beta" ? import.meta.env.VITE_SOLANA_RPC : clusterApiUrl(network));
    try {
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL;
    } catch (error) {
        alert(error);
    }
};

export const isItExecutable = async (address: string, network: SolanaNetworks) => {
    const connection = new Connection(network === "mainnet-beta" ? import.meta.env.VITE_SOLANA_RPC : clusterApiUrl(network));
    try {
        const publicKey = new PublicKey(address);
        const accountInfo = await connection.getAccountInfo(publicKey);
        return accountInfo?.executable;
    } catch (error) {
        alert(error);
    }
};

export const updateAddressData = async (address: string, network: SolanaNetworks) => {
    try {
      const [addressBalance, isAddressExecutable] = await Promise.all([
        getSolBalanceBySDK(address, network),
        isItExecutable(address, network),
      ]);
      if (
        typeof addressBalance === "number" &&
        typeof isAddressExecutable === "boolean"
      ) {
        return {
          address,
          balance: addressBalance,
          isExecutable: JSON.stringify(isAddressExecutable),
        };
      }
    } catch (error) {
      alert(error);
    }
};