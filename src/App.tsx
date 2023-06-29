import { SearchSolanaAddress } from "./components/search-solana-address";
import { ShortcutToSearch } from "./components/shortcut-to-search";
import "../styles/global.css";

function App() {
  // Change mouse shadow
  // Add loading styles
  // Add Solana Font
  // Add docker file and docker compose
  // Add LICENSE
  // Add readme
  // Change outline color
  // Add input for select mainnet, devnet or testnet
  // Add styles to errors of the input
  return (
    <main className="h-full w-full flex justify-center items-center flex-col relative">
      <SearchSolanaAddress />
      <ShortcutToSearch />
    </main>
  );
}

export { App };
