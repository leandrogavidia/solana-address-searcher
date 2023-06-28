import { FormEvent, useState } from "react";
import { updateAddressData } from "../../lib";

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
    try {
      console.log(inputAddress.value);
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
    <section className="bg-fourth w-full max-w-2xl px-7 py-4 shadow-lg">
      <form
        onSubmit={submit}
        className="flex justify-center items-center w-full gap-x-5 border-b-[1px] pb-7"
      >
        <div className="flex flex-col justify-center items-start w-full gap-y-2">
          <label htmlFor="solana_address" className="max-w-max font-bold">
            Search an address
          </label>
          <input
            type="text"
            id="solana_address"
            title="Search an Solana address"
            autoComplete="on"
            autoFocus={true}
            placeholder="ej. 3GhJ75pGwgPmfTvEGUe1pTWXLPs6dhumJEhN4U4aHYpg"
            required={true}
            className="
              bg-transparent border-[1px] border-second rounded-md px-3 py-1 w-full focus:border-first outline-none caret-first h-full
              placeholder:opacity-40
            "
          />
        </div>
        <input
          type="submit"
          value={isLoading ? "Loading" : "Search"}
          accessKey="s"
          title="Search"
          className="cursor-pointer bg-gradient-to-l from-solana_first to-solana_second rounded-md px-4 py-1 font-bold self-end"
        />
      </form>
      <div className="mt-7 flex flex-col justify-center items-start gap-y-3 overflow-auto [&_p_span]:font-semibold">
        <p>
          <span>Address:</span> {isLoading ? "Loading" : addressData.address}
        </p>
        <p>
          <span>Balance:</span>{" "}
          {isLoading ? "Loading" : `${addressData.balance} SOL`}
        </p>
        <p>
          <span>Is it executable?:</span>{" "}
          {isLoading ? "Loading" : addressData.isExecutable}
        </p>
      </div>
    </section>
  );
};

export { SearchSolanaAddress };
