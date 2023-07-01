import { FormEvent, useState } from "react";
import { showErrorMessage } from "@lib/dom";
import { updateAddressData } from "@lib/solana";
import { SkeletonLoading } from "@components/skeleton-loading";

const SearchSolanaAddress = () => {
  const [isLoading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState({
    balance: 0,
    address: "",
    isExecutable: "",
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const inputAddress: HTMLInputElement = document.querySelector(
      "#solana_address"
    ) as HTMLInputElement;
    const inputNetwork: HTMLSelectElement = document.querySelector(
      "#solana_networks"
    ) as HTMLSelectElement;
    try {
      const newAddressData = await updateAddressData(
        inputAddress?.value,
        inputNetwork?.value as SolanaNetworks
      );
      if (newAddressData) {
        setAddressData(newAddressData);
        inputAddress.value = "";
        inputAddress.focus({ preventScroll: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        showErrorMessage("You need to enter a solana address first", 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const addressRequired = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    showErrorMessage("You need to enter a solana address first", 3000);
  };

  return (
    <section className="bg-fourth w-full max-w-2xl px-7 py-4 shadow-lg">
      <form
        onSubmit={submit}
        className="
          flex flex-col justify-center items-start w-full gap-4 border-b-[1px] pb-7
          md:flex-row md:items-center
        "
      >
        <div className="flex flex-col justify-center items-start w-full gap-y-2 relative">
          <label htmlFor="solana_address" className="max-w-max font-bold">
            Search an address
          </label>
          <input
            type="text"
            id="solana_address"
            title="Search an Solana address"
            autoComplete="on"
            disabled={isLoading}
            readOnly={isLoading}
            autoFocus={true}
            placeholder="ej. 3GhJ75pGwgPmfTvEGUe1pTWXLPs6dhumJEhN4U4aHYpg"
            required={true}
            aria-describedby="address-validation"
            onInvalid={addressRequired}
            className={`
              bg-transparent border-[1px] border-solana_first rounded-md px-3 py-1 w-full focus:border-solana_second outline-none caret-solana_second h-full
              placeholder:opacity-40
              ${isLoading && "animate-pulse select-none pointer-events-none"}
            `}
          />
          <span
            id="address-validation"
            aria-live="assertive"
            className="bg-red-600 rounded-md px-2 py-1 absolute -bottom-11 hidden"
          ></span>
        </div>

        <div
          className="
          flex flex-col justify-center items-start w-full gap-y-2
          md:max-w-max
        "
        >
          <label htmlFor="solana_networks" className="max-w-max font-bold">
            Network
          </label>
          <select
            id="solana_networks"
            required={true}
            disabled={isLoading}
            name="network"
            title="Solana networks"
            defaultValue="Mainnet"
            className={`
              w-full border-[1px] border-solana_first bg-transparent cursor-pointer rounded-md h-full px-3 py-1 outline-none font-semibold align-middle
              focus:border-solana_second
              [&_option]:bg-fourth 
              md:text-center
              ${isLoading && "animate-pulse select-none pointer-events-none"}
            `}
          >
            <option value="mainnet-beta">Mainnet</option>
            <option value="testnet">Testnet</option>
            <option value="devnet">Devnet</option>
          </select>
        </div>
        <label
          className={`
              w-full rounded-md self-end relative h-full min-w-min overflow-hidden border-[1px] border-solana_first 
              before:h-full before:w-full before:bg-gradient-to-l before:from-solana_first before:to-solana_second before:inline-block before:absolute before:-left-full before:transition-all before:duration-1000 before:ease-in-out
              hover:before:left-full hover:border-solana_second
              md:max-w-max
              ${
                isLoading &&
                "animate-pulse cursor-default select-none pointer-events-none"
              }
            `}
        >
          <input
            type="submit"
            value={isLoading ? "Searching..." : "Search"}
            accessKey="s"
            readOnly={isLoading}
            disabled={isLoading}
            title="Search"
            className={`
              w-full h-full px-4 py-1 cursor-pointer relative font-semibold
            `}
          />
        </label>
      </form>
      <div className="mt-7 flex flex-col justify-center items-start gap-y-3 overflow-auto [&_p_span]:font-semibold">
        <p className=" w-full flex justify-start items-center gap-x-2 whitespace-nowrap">
          <span>Address:</span>{" "}
          {isLoading ? <SkeletonLoading /> : addressData.address}
        </p>
        <p className="w-full flex justify-start items-center gap-x-2 whitespace-nowrap">
          <span>Balance:</span>{" "}
          {isLoading ? <SkeletonLoading /> : `${addressData.balance} SOL`}
        </p>
        <p className="w-full flex justify-start items-center gap-x-2 whitespace-nowrap">
          <span>Is it executable?:</span>{" "}
          {isLoading ? <SkeletonLoading /> : addressData.isExecutable}
        </p>
      </div>
    </section>
  );
};

export { SearchSolanaAddress };
