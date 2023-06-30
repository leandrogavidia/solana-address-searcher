import { SearchSolanaAddress } from "./components/search-solana-address";
import { ShortcutToSearch } from "./components/shortcut-to-search";
import "./styles/global.css";

function App() {
  // Add Solana Font
  // Add docker file and docker compose
  // Add LICENSE
  // Add readme
  // Change outline color
  // Add styles to errors of the input
  // Fix mobile version
  // Check alt + s in other browsers

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
