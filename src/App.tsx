import { SearchSolanaAddress } from "./components/SearchSolanaAddress";
import { ShortcutToSearch } from "./components/ShortcutToSearch";
import "../styles/global.css";

function App() {
  // Add Styles
  // Add loading styles
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
