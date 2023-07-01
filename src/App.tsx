import { SearchSolanaAddress } from "./components/search-solana-address";
import { ShortcutToSearch } from "./components/shortcut-to-search";
import "./styles/global.css";

function App() {
  // Add docker file and docker compose
  // Add image on docker hub on the readme
  // Add key combinatios to search (Firefox, Linux and mac)
  // How to add a env variable in github pages
  // How to add a env variable in Dcoker
  // Config vite.config

  if (!import.meta.env.VITE_SOLANA_RPC) {
    throw new Error(
      "Solana RPC is not defined. Set your Solana RPC on your .env file."
    );
  }

  return (
    <main className="h-full w-full flex justify-center items-center flex-col relative">
      <SearchSolanaAddress />
      <ShortcutToSearch />
    </main>
  );
}

export { App };
