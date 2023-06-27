import { FormEvent, useState } from "react";
import { updateAddressData } from "../../lib";

const SearchSolanaAddress = () => {
  const [isLoading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState({
    balance: 0,
    address: "",
    isExecutable: false,
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const inputAddress: HTMLInputElement = document.querySelector(
      "#solana_address"
    ) as HTMLInputElement;
    try {
      const newAddressData = await updateAddressData(inputAddress?.value);
      if (newAddressData) {
        setAddressData(newAddressData);
        inputAddress.value = "";
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("RENDER");

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="solana_address">Search an address</label>
        <input
          type="text"
          id="solana_address"
          title="Search an Solana address"
          autoComplete="on"
          autoFocus={true}
          placeholder="ej. 3GhJ75pGwgPmfTvEGUe1pTWXLPs6dhumJEhN4U4aHYpg"
          required={true}
        />
        <input
          type="submit"
          value={isLoading ? "Loading" : "Search"}
          accessKey="s"
          title="Search"
        />
      </form>
      <p>Address: {isLoading ? "Loading" : addressData.address}</p>
      <p>Balance: {isLoading ? "Loading" : `${addressData.balance} SOL`}</p>
      <p>
        Is it executable?:{" "}
        {isLoading ? "Loading" : JSON.stringify(addressData.isExecutable)}
      </p>
    </>
  );
};

export { SearchSolanaAddress };
