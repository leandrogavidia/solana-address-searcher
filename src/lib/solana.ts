import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
  } from "@solana/web3.js";

const CONNECTION = new Connection(clusterApiUrl("devnet"));

export const getSolBalanceBySDK = async (address: string) => {
    try {
        const publicKey = new PublicKey(address);
        const balance = await CONNECTION.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL;
    } catch (error) {
        alert(error);
    }
};

export const isItExecutable = async (address: string) => {
    try {
        const publicKey = new PublicKey(address);
        const accountInfo = await CONNECTION.getAccountInfo(publicKey);
        return accountInfo?.executable;
    } catch (error) {
        alert(error);
    }
};

export const updateAddressData = async (address: string) => {
    try {
      const [addressBalance, isAddressExecutable] = await Promise.all([
        getSolBalanceBySDK(address),
        isItExecutable(address),
      ]);
      if (
        typeof addressBalance === "number" &&
        typeof isAddressExecutable === "boolean"
      ) {
        return {
          address,
          balance: addressBalance,
          isExecutable: isAddressExecutable,
        };
      }
    } catch (error) {
      alert(error);
    }
};