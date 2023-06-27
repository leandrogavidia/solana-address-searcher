import { FormEvent, useState } from "react";
import "./App.css";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

function App() {
  const [addressData, setAddressData] = useState({
    balance: 0,
    address: "",
    isExecutable: false,
  });
  // const getSolanaAccountBalanceByJSONRPC = async (address: string) => {
  //   const url = clusterApiUrl("devnet");
  //   console.log("URL:", url);
  //   return fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       jsonrpc: "2.0",
  //       id: 1,
  //       method: "getBalance",
  //       params: [address],
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       if (json.error) {
  //         throw json.error;
  //       }
  //       return json["result"]["value"] as number;
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // };

  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const getSolBalanceBySDK = async (address: string) => {
    try {
      const publicKey = new PublicKey(address);
      const balance = await CONNECTION.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      alert(error);
    }
  };

  const isItExecutable = async (address: string) => {
    try {
      const publicKey = new PublicKey(address);
      const accountInfo = await CONNECTION.getAccountInfo(publicKey);
      return accountInfo?.executable;
    } catch (error) {
      alert(error);
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const inputAddress: HTMLInputElement = document.querySelector(
      "#solana_address"
    ) as HTMLInputElement;
    try {
      const addressBalance = await getSolBalanceBySDK(inputAddress?.value);
      const isAddressExecutable = await isItExecutable(inputAddress?.value);
      if (
        typeof addressBalance === "undefined" ||
        typeof isAddressExecutable === "undefined"
      )
        return;
      setAddressData({
        address: inputAddress?.value,
        balance: addressBalance,
        isExecutable: isAddressExecutable,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="">Search an address</label>
        <input
          type="text"
          id="solana_address"
          title="Search an Solana address"
          autoComplete="on"
          autoFocus={true}
          placeholder="ej. 3GhJ75pGwgPmfTvEGUe1pTWXLPs6dhumJEhN4U4aHYpg"
          required={true}
        />
        <input type="submit" value="Search" accessKey="s" title="Search" />
      </form>
      <p>Alt + s to search</p>
      <p>Address: {addressData.address}</p>
      <p>Balance: {addressData.balance} SOL</p>
      <p>Is it executable?: {JSON.stringify(addressData.isExecutable)}</p>
    </div>
  );
}

export default App;
